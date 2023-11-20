import { updateTask } from "../src/controllers/UpdateTaskController"
import { test_manualCreateProperty, test_manualCreateRoom, test_manualCreateTask, test_manualDeleteProperty } from "./TestUtil";

describe('updating a task', () => {
    test('should change the task entry to match the new data', async () => {
        const property = await test_manualCreateProperty();
        const room = await test_manualCreateRoom(property.property_id);
        const task = await test_manualCreateTask(property.property_id, room.room_id);

        //returned value from adding task is its task_id
        let res = await updateTask({...task, title: task.title+" 2"}, task.task_id);
        expect(res).toHaveProperty("title", "AUTOMATED TESTING TASK 2");

        // tests should be independent of each other, so we need to delete all created entries
        await test_manualDeleteProperty(property.property_id); // cascade delete from property will delete rooms and tasks associated with it
    })

    test('should throw error if no task with given id exists', async () => {
        //returned value from adding task is its task_id
        await expect(updateTask({
            title: "AUTOMATED TESTING TASK",
            due_date: "2023-01-01",
            room_id: -1,
            property_id: -1
        }, -1)).rejects.toThrowError("JSON object requested, multiple (or no) rows returned");
    })
})