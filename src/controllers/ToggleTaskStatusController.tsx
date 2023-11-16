import { supabase } from "../supabase/db";


export const toggleTaskStatus = async (task_id: number, status: boolean) => {
    const res = await supabase
        .from('Tasks')
        .update({ completed: !status })
        .eq('task_id', task_id)
        .select()
        .single();

    if (res.error) {
        throw (res.error);
    }

    return res.data;
};
