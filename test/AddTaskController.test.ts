import { Database } from "../src/supabase/supabase";
import { addTask } from "../src/controllers/AddTaskController"
import { test_manualCreateProperty, test_manualCreateRoom, test_manualCreateTask, test_manualDeleteProperty } from "./TestUtil";

describe('adding a task', () => {
    test('task_id is unique', async () => {
        const property = await test_manualCreateProperty();
        const room = await test_manualCreateRoom(property.property_id);

        // create object test task to add to database
        // task_id must be specified so we know that function returns correct ID
        const task: Database['public']['Tables']['Tasks']['Insert'] = {
            title: "AUTOMATED TESTING TASK",
            due_date: "2023-01-01",
            property_id: property.property_id,
            room_id: room.room_id
        }

        //returned value from adding task is its task_id
        let res = await addTask(task);
        expect(res).toHaveProperty("title", "AUTOMATED TESTING TASK");

        // tests should be independent of each other, so we need to delete all created entries
        await test_manualDeleteProperty(property.property_id); // cascade delete from property will delete rooms and tasks associated with it
    })

    test('task_id is duplicate', async () => {
        const property = await test_manualCreateProperty();
        const room = await test_manualCreateRoom(property.property_id);
        const testTask = await test_manualCreateTask(property.property_id, room.room_id)

        // create object test task to add to database
        // task_id must be specified so we know that function returns correct ID
        const task: Database['public']['Tables']['Tasks']['Insert'] = {
            ...testTask,
            task_id: testTask.task_id
        }

        await expect(addTask(task)).rejects.toThrowError("duplicate key");

        // tests should be independent of each other, so we need to delete all created entries
        await test_manualDeleteProperty(property.property_id); // cascade delete from property will delete rooms and tasks associated with it
    })
})