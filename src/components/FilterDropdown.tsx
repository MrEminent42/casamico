import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { Dialog, DialogContent, DialogTitle, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { getTags } from '../controllers/TagController';
import { displayError } from '../App';
import { Database } from '../supabase/supabase';
import { getRooms } from '../controllers/RoomController';


interface FiltersProps {
  propertyId: number
}

export default function Filters(props: FiltersProps) {

  const [dialogOpen, setDialogOpen] = useState(false);

  const [allTags, setAllTags] = useState<Database['public']['Tables']['Tags']['Row'][]>([]);
  const [allRooms, setAllRooms] = useState<Database['public']['Tables']['Rooms']['Row'][]>([]);
  const [selectedTags, setSelectedTags] = useState<Database['public']['Tables']['Tags']['Row'][]>([]);
  const [selectedDueDate, setSelectedDueDate] = useState<Date>(new Date());
  const [selectedRooms, setSelectedRooms] = useState<Database['public']['Tables']['Rooms']['Row'][]>([]);

  useEffect(() => {
    getTags().then(setAllTags).catch((err) => displayError(err, "fetching tags"));
    getRooms(props.propertyId).then(setAllRooms).catch((err) => displayError(err, "fetching tags"));
  }, [props.propertyId])

  return (
    <div>
      <Button
        variant='contained'
        disableElevation
        color='secondary'
        onClick={() => setDialogOpen(true)}
      >
        Filter
        <ChevronRight />
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth='md'
      >
        <DialogTitle>Filter</DialogTitle>
        <DialogContent>
          <FormGroup>
            <DialogColumns>
              <Col>
                <Typography><b>Tags</b></Typography>
                {allTags.map((tag) => <FormControlLabel
                  control={<Checkbox />}
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
                <Typography><b>Due Date</b></Typography>
              </Col>
              <Col>
                <Typography><b>Rooms</b></Typography>
                {allRooms.map((room) => <FormControlLabel
                  control={<Checkbox />}
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
      </Dialog>
    </div>
  );
}

const DialogColumns = styled('div')`
  // 3 columns
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 10px;
`

const Col = styled('div')`
  display: flex;
  flex-direction: column;
`