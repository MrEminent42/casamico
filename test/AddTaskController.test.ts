import { Database } from "../src/supabase/supabase";
import { addTask } from "../src/controllers/AddTaskController"
import { test_manualCreateProperty, test_manualCreateRoom, test_manualDeleteProperty, test_manualDeleteTask } from "./TestUtil";


test("add-task", async () => {
    const property = await test_manualCreateProperty();
    const room = await test_manualCreateRoom(property.property_id);
    const task: Database['public']['Tables']['Tasks']['Insert'] = {
        title: "AUTOMATED TESTING TASK",
        due_date: "2023-01-01",
        property_id: property.property_id,
        room_id: room.room_id
    }

    //returned value from adding task is its task_id
    let res = await addTask(task);
    expect(res).toBe(res);
   
    // tests should be independent of each other, so we need to delete all created entries
    await test_manualDeleteProperty(property.property_id); // cascade delete from property will delete rooms and tasks associated with it
})
