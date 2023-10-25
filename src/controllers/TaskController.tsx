import { supabase } from "../supabase/db";
import { Database } from "../supabase/supabase";

export const getTasksOfProperty = async (propertyId: number) => {
    const res = await supabase
        .from('Tasks')
        .select()
        .eq('property_id', propertyId)

    if (res.error) {
        throw (res.error);
    }

    return res.data as Database['public']['Tables']['Tasks']['Row'][];
}

/**
 * Create a task in the database.
 * @param task the task to create
 * @returns on success, the task_id of the created task; on failure, throws an error
 */
export const addTask = async (task: Database['public']['Tables']['Tasks']['Insert']) => {
    const res = await supabase
        .from('Tasks')
        .insert(task)
        .select()
        .single();

    if (res.error) {
        throw (res.error);
    }

    return res.data.task_id;
}

export const updateTask = async () => {
    alert("You have asked TaskController to update a task.")
}