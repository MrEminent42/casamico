import { supabase } from "../supabase/db";
import { deleteTagsOfTask } from "./TasksWithTagsController";

export const deleteTask = async (task_id: number) => {
    const { data, error } = await supabase
        .from('Tasks')
        .delete()
        .eq('task_id', task_id)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    await deleteTagsOfTask(task_id);

    return Promise.resolve(data.task_id);
}