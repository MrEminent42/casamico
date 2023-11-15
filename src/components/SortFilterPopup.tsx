import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import ChevronRight from '@mui/icons-material/ChevronRight';
import {
  Dialog, DialogContent, DialogTitle, FormControlLabel,
  FormGroup, RadioGroup, Radio, FormLabel
} from '@mui/material';
import { getTags } from '../controllers/TagController';
import { displayError } from '../App';
import { Database } from '../supabase/supabase';
import { getRooms } from '../controllers/RoomController';

interface SortFilterProps {
  propertyId: number,

  selectedTags: Database['public']['Tables']['Tags']['Row'][],
  setSelectedTags: React.Dispatch<React.SetStateAction<Database['public']['Tables']['Tags']['Row'][]>>,
  selectedDueBefore: string,
  setSelectedDueBefore: React.Dispatch<React.SetStateAction<string>>,
  selectedRooms: Database['public']['Tables']['Rooms']['Row'][],
  setSelectedRooms: React.Dispatch<React.SetStateAction<Database['public']['Tables']['Rooms']['Row'][]>>,
  selectedSort: string | null,
  setSelectedSort: React.Dispatch<React.SetStateAction<string | null>>,

  sortOptions: string[]
}

export default function SortFilterPopup(props: Readonly<SortFilterProps>) {
  const {
    propertyId,
    selectedTags, setSelectedTags,
    setSelectedDueBefore,
    selectedRooms, setSelectedRooms,
    selectedSort, setSelectedSort,
    sortOptions,
  } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const [allTags, setAllTags] = useState<Database['public']['Tables']['Tags']['Row'][]>([]);
  const [allRooms, setAllRooms] = useState<Database['public']['Tables']['Rooms']['Row'][]>([]);

  useEffect(() => {
    if (propertyId) {
      getTags().then(setAllTags).catch((err) => displayError(err, "fetching tags"));
      getRooms(propertyId).then(setAllRooms).catch((err) => displayError(err, "fetching tags"));
    }
  }, [propertyId]);

  const handleClose = async () => {
    setDialogOpen(false)
  }

  return (
    <div>
      <Button
        variant='contained'
        disableElevation
        color='secondary'
        onClick={() => setDialogOpen(true)}
      >
        Sort & Filter
        <ChevronRight />
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        maxWidth='md'
      >
        <DialogTitle>Sort by</DialogTitle>
        <DialogContent>
          <RadioGroup row value={selectedSort || undefined} onChange={(event) => setSelectedSort(event.target.value)}>
            {
              sortOptions.map((option) =>
                <FormControlLabel value={option} control={<Radio />} label={option} key={option} />
              )
            }
          </RadioGroup>
        </DialogContent>
        <DialogTitle>Filters</DialogTitle>
        <DialogContent>
          <FormGroup>
            <DialogColumns>
              <Col>
                <FormLabel><b>Tags</b></FormLabel>
                {allTags.map((tag) => <FormControlLabel
                  control={<Checkbox
                    checked={selectedTags.some((t) => t.tag_name === tag.tag_name)}
                  />}
                  label={tag.tag_name}
                  key={tag.tag_name}
                  onChange={(event) => {
                    /*
                    There's a bug in MUI here where `event.target.checked` doesn't
                    exist in the Types, so VS Code and the compiler thinks this is
                    an error. It's not, so we use @ts-ignore to ignore the error.
                    */
                    // @ts-ignore
                    if (event.target.checked) {
                      setSelectedTags([...selectedTags, tag]);
                    } else {
                      setSelectedTags(selectedTags.filter((t) => t.tag_name !== tag.tag_name));
                    }
                  }}
                />)}
              </Col>
              <Col>
                <FormLabel><b>Due Before</b></FormLabel>
                <input
                  type='date'
                  onChange={(e) => setSelectedDueBefore(e.target.value)}
                />
              </Col>
              <Col>
                <FormLabel><b>Rooms</b></FormLabel>
                {allRooms.map((room) => <FormControlLabel
                  control={<Checkbox
                    checked={selectedRooms.some((r) => r.room_id === room.room_id)}
                  />}
                  label={room.name}
                  key={room.room_id}
                  onChange={(event) => {
                    /*
                    There's a bug in MUI here where `event.target.checked` doesn't
                    exist in the Types, so VS Code and the compiler thinks this is
                    an error. It's not, so we use @ts-ignore to ignore the error.
                    */
                    // @ts-ignore
                    if (event.target.checked) {
                      setSelectedRooms([...selectedRooms, room]);
                    } else {
                      setSelectedRooms(selectedRooms.filter((r) => r.room_id !== room.room_id));
                    }
                  }}
                />)}
              </Col>
            </DialogColumns>
          </FormGroup>

        </DialogContent>
        <DialogContent sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <Button
            variant='contained'
            sx={{ alignSelf: 'flex-end' }}
            onClick={handleClose}
          >Save</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const DialogColumns = styled('div')`
  // 3 columns
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 30px;
`

const Col = styled('div')`
  display: flex;
  flex-direction: column;
`