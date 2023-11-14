import { useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { Dialog, DialogContent, DialogTitle, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { getTags } from '../controllers/TagController';
import { displayError } from '../App';
import { Database } from '../supabase/supabase';
import { getRooms } from '../controllers/RoomController';
import { getTasksAndTagsOfProperty } from '../controllers/TaskController';


interface FiltersProps {
  propertyId: number,
  allTasks: Database['public']['Tables']['Tasks']['Row'][],
  setFilteredTasks: (tasks: Database['public']['Tables']['Tasks']['Row'][]) => void,
}

export default function FiltersPopup(props: Readonly<FiltersProps>) {

  const [dialogOpen, setDialogOpen] = useState(false);

  const [allTags, setAllTags] = useState<Database['public']['Tables']['Tags']['Row'][]>([]);
  const [allRooms, setAllRooms] = useState<Database['public']['Tables']['Rooms']['Row'][]>([]);
  const [selectedTags, setSelectedTags] = useState<Database['public']['Tables']['Tags']['Row'][]>([]);
  // const [selectedDueDate, setSelectedDueDate] = useState<Date | null>();
  const [selectedRooms, setSelectedRooms] = useState<Database['public']['Tables']['Rooms']['Row'][]>([]);

  useEffect(() => {
    if (props.propertyId) {
      getTags().then(setAllTags).catch((err) => displayError(err, "fetching tags"));
      getRooms(props.propertyId).then(setAllRooms).catch((err) => displayError(err, "fetching tags"));
    }
  }, [props.propertyId])



  const doFiltering = useCallback(async () => {
    let tasksWithTags;
    try {
      tasksWithTags = await getTasksAndTagsOfProperty(props.propertyId);
    } catch (err) {
      displayError(err, "fetch tasks and their corresponding tags");
      return;
    }

    props.setFilteredTasks(tasksWithTags.filter((task) => {
      let passes = true;
      if (selectedTags.length > 0) {
        passes = passes && selectedTags.some((tag) => task.TasksWithTags.some((taskTag) => taskTag.tag_name === tag.tag_name));
      }
      if (selectedRooms.length > 0) {
        passes = passes && selectedRooms.some((room) => task.room_id === room.room_id);
      }
      return passes;
    }))
  }, [props, selectedRooms, selectedTags]);


  // any time the list of tasks changes, we need to re-filter
  // (also, display all tasks upon loading the page for the first time)
  useEffect(() => {
    doFiltering();
  }, [props.allTasks, doFiltering]);
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
        onClose={async () => {
          await doFiltering();
          setDialogOpen(false)
        }}
        maxWidth='md'
      >
        <DialogTitle>Filter</DialogTitle>
        <DialogContent>
          <FormGroup>
            <DialogColumns>
              <Col>
                <Typography><b>Tags</b></Typography>
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
                <Typography><b>Due Date</b></Typography>
              </Col>
              <Col>
                <Typography><b>Rooms</b></Typography>
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