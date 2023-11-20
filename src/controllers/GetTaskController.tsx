import { supabase } from "../supabase/db";

export const getTask = async (taskId: number) => {
    const res = await supabase
        .from('Tasks')
        .select()
        .eq('task_id', taskId)
        .maybeSingle();

    if (res.error || res.data === null) {
        throw new Error(res.error?.message || `Task id ${taskId} not found.`);
    }

    return res.data;
}

