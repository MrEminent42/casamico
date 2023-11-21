import { Database } from "../src/supabase/supabase";
import { addTask } from "../src/controllers/AddTaskController"
import { updateTask } from "../src/controllers/UpdateTaskController"
import { toggleTaskStatus } from "../src/controllers/ToggleTaskStatusController"
import { test_manualCreateProperty, test_manualCreateRoom, test_manualCreateTask, test_manualDeleteProperty, test_manualDeleteTask } from "./TestUtil";

describe('tasks', () => {
    let property: Database['public']['Tables']['Properties']['Row'];
    let room: Database['public']['Tables']['Rooms']['Row'];

    beforeAll(async () => {
        // create temp property and room for tasks to correspond to
        property = await test_manualCreateProperty();
        room = await test_manualCreateRoom(property.property_id);
    })

    afterAll(async () => {
        // delete temp property cascades to delete room too
        await test_manualDeleteProperty(property.property_id);
    })

    describe('adding a task', () => {
        test('should create a task with a unique task id', async () => {
            // create object test task to add to database
            // task_id must be specified so we know that function returns correct ID
            const task: Database['public']['Tables']['Tasks']['Insert'] = {
                title: "AUTOMATED TESTING TASK",
                due_date: "2023-01-01",
                property_id: property.property_id,
                room_id: room.room_id
            }

            // check that task title is correct
            let res = await addTask(task);
            expect(res).toHaveProperty("title", "AUTOMATED TESTING TASK");

            // tests should be independent, so remove created task
            await test_manualDeleteTask(res.task_id);
        })

        test('should throw error if task_id is duplicate', async () => {
            const testTask = await test_manualCreateTask(property.property_id, room.room_id);

            // create object test task to add to database
            const task: Database['public']['Tables']['Tasks']['Insert'] = {
                ...testTask,
                task_id: testTask.task_id
            }

            // check that task title is correct
            await expect(addTask(task)).rejects.toThrowError("duplicate key");

            // tests should be independent, so remove created task
            await test_manualDeleteTask(testTask.task_id);
        })
    })

    describe('updating a task', () => {
        test('should change the task entry to match the new data', async () => {
            const task = await test_manualCreateTask(property.property_id, room.room_id);

            // check that task title is correct
            let res = await updateTask({ ...task, title: task.title + " 2" }, task.task_id);
            expect(res).toHaveProperty("title", "AUTOMATED TESTING TASK 2");

            // tests should be independent, so remove created task
            await test_manualDeleteTask(res.task_id);
        })

        test('should throw error if no task with given id exists', async () => {
            // check that error is thrown
            await expect(updateTask({
                title: "AUTOMATED TESTING TASK",
                due_date: "2023-01-01",
                room_id: -1,
                property_id: -1
            }, -1)).rejects.toThrowError("JSON object requested, multiple (or no) rows returned");
        })
    })

    describe('toggle status a task', () => {
        test('should change the status of task when toggled', async () => {
            //create a task with completed = false
            const task: Database['public']['Tables']['Tasks']['Insert'] = {
                title: "ZACH TESTING TASK",
                due_date: "2023-01-01",
                completed: false,
                property_id: property.property_id,
                room_id: room.room_id
            }
            
            // store the add task in temp_task

            let temp_task = await addTask(task);

            //run the testToggle from the controller

            toggleTaskStatus(temp_task.task_id, false)

            //expect statemenet to check results
            expect(temp_task).toHaveProperty("completed", true);

            // tests should be independent, so remove created task
            await test_manualDeleteTask(temp_task.task_id);
        })

        test('should change the status of task when toggled', async () => {
            //create a task with completed = true
            const task: Database['public']['Tables']['Tasks']['Insert'] = {
                title: "ZACH TESTING TASK",
                due_date: "2023-01-01",
                completed: true,
                property_id: property.property_id,
                room_id: room.room_id
            }
            
            // store the add task in temp_task

            let temp_task = await addTask(task);

            //run the testToggle from the controller

            toggleTaskStatus(temp_task.task_id, true)

            //expect statemenet to check results
            expect(temp_task).toHaveProperty("completed", false);

            // tests should be independent, so remove created task
            await test_manualDeleteTask(temp_task.task_id);
        })
    })
    // describe('get a task', () => {
    //     test('should return the correct task when running getTask', async () => {
    //         const task: Database['public']['Tables']['Tasks']['Insert'] = {
    //             title: "AUTOMATED TESTING TASK",
    //             due_date: "2023-01-01",
    //             property_id: property.property_id,
    //             room_id: room.room_id
    //         }
    //         // check that task title is correct

    //         let temp_task = await addTask(task);

    //         toggleTaskStatus(temp_task.task_id, false)

    //         expect(temp_task.completed).toBe(true)

    //         // tests should be independent, so remove created task
    //         await test_manualDeleteTask(temp_task.task_id);
    //     })

    //     test('should throw error if toggling task with false id exists', async () => {
    //         // check that error is thrown
    //         const bad_task: Database['public']['Tables']['Tasks']['Insert'] = {
    //             title: "AUTOMATED TESTING TASK",
    //             due_date: "2023-01-01",
    //             completed: false,
    //             property_id: -1,
    //             room_id: -1
    //         }
    //         let test_bad_task = await addTask(bad_task);

    //         await expect(toggleTaskStatus(test_bad_task.task_id, false)).rejects.toThrowError("JSON object requested, multiple (or no) rows returned");

    //         await test_manualDeleteTask(test_bad_task.task_id);
    //     })
    // })

})