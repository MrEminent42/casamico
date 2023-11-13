import { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Checkbox from '@mui/material/Checkbox';
import { DropdownStyling } from '../pages/Tasks';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { ButtonGroup, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, Typography } from '@mui/material';
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
  const [selectedTags, setSelectedTags] = useState<String[]>([]);
  const [selectedDueDate, setSelectedDueDate] = useState<Date>(new Date());

  useEffect(() => {
    getTags().then(setAllTags).catch((err) => displayError(err, "fetching tags"));
    getRooms(props.propertyId).then(setAllRooms).catch((err) => displayError(err, "fetching tags"));
  }, [])

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
                {allTags.map((tag) => <FormControlLabel control={<Checkbox />} label={tag.tag_name} key={tag.tag_name} />)}

              </Col>
              <Col>
                <Typography><b>Due Date</b></Typography>
              </Col>
              <Col>
                <Typography><b>Rooms</b></Typography>
                {allRooms.map((room) => <FormControlLabel control={<Checkbox />} label={room.name} key={room.room_id} />)}
              </Col>
            </DialogColumns>
          </FormGroup>

        </DialogContent>
      </Dialog>
    </div>
  );
}

const BasicCheckbox = styled(Checkbox)`
    margin: 0;
    padding: 0;
`

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