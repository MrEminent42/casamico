import { Task } from "../Types";
import { supabase } from "../supabase/db";

export const getTasksOfProperty = async (propertyId: number) => {
    alert("You have asked TaskController to fetch all tasks related to a property.")
    const res = await supabase
        .from('Tasks')
        .select()
        .eq('property_id', propertyId)

    if (res.error) {
        throw (res.error);
    }

    return res.data as Task[];
}

export const addTask = async () => {
    alert("You have asked TaskController to add a task.")
}

export const updateTask = async () => {
    alert("You have asked TaskController to update a task.")
}