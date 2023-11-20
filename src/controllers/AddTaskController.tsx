import { supabase } from "../supabase/db";
import { Database } from "../supabase/supabase";

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
        throw new Error(res.error.message);
    }

    return res.data.task_id;
};
