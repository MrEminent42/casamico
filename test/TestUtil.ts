import { supabase } from "../src/supabase/db"

/**
 * contains the bare minimum information to create a property, 
 * other than the property_id
 */
export const bare_bones_testing_property = {
    address: "AUTOMATED TESTING PROPERTY",
    image_url: "https://picsum.photos/200",
}

export const bare_bones_testing_room = {
    name: "AUTOMATED TESTING ROOM"
}

export const bare_bones_testing_task = {
    title: "AUTOMATED TESTING TASK",
    due_date: "2023-01-01"
}

/**
 * manually delete a property FOR AUTOAMTED TESTING PURPOSES
 * @param id the property id of the property to delete
 * @returns the deleted property
 */
export const test_manualDeleteProperty = async (id: number) => {
    const { data, error } = await supabase
        .from("Properties")
        .delete()
        .eq("property_id", id)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

/**
 * manually create a property FOR AUTOMATED TESTING PURPOSES
 * @returns the created property
 */
export const test_manualCreateProperty = async () => {
    //create new Property entry in database
    const { data, error } = await supabase
        .from('Properties')
        .insert({
            ...bare_bones_testing_property,
        })
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

/**
 * manually delete a room FOR AUTOAMTED TESTING PURPOSES
 * @param id the room id of the room to delete
 * @returns the deleted room
 */
export const test_manualDeleteRoom = async (id: number) => {
    const { data, error } = await supabase
        .from("Rooms")
        .delete()
        .eq("room_id", id)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

/**
 * manually create a room FOR AUTOMATED TESTING PURPOSES
 * @param property_id the property id of the property this room corresponds to
 * @returns the created room
 */
export const test_manualCreateRoom = async (property_id: number) => {
    //create new Room entry in database
    const { data, error } = await supabase
        .from('Rooms')
        .insert({
            ...bare_bones_testing_room,
            property_id: property_id
        })
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

/**
* manually delete a task FOR AUTOAMTED TESTING PURPOSES
* @param id the task id of the task to delete
* @returns the deleted task
*/
export const test_manualDeleteTask = async (id: number) => {
    const { data, error } = await supabase
        .from("Tasks")
        .delete()
        .eq("task_id", id)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

/**
 * manually create a room FOR AUTOMATED TESTING PURPOSES
 * @param property_id the property id of the property this task corresponds to
 * @param room_id the room id of the room this task corresponds to
 * @returns the created room
 */
export const test_manualCreateTask = async (property_id: number, room_id: number) => {
    //create new Task entry in database
    const { data, error } = await supabase
        .from('Tasks')
        .insert({
            ...bare_bones_testing_room,
            property_id: property_id,
            room_id: room_id
        })
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}