import { supabase } from "../supabase/db";
import { Database } from "../supabase/supabase";


export const updateTask = async (task: Database['public']['Tables']['Tasks']['Update'], task_id: number) => {
    const res = await supabase
        .from('Tasks')
        .update(task)
        .eq('task_id', task_id)
        .select()
        .single();

    if (res.error) {
        throw new Error(res.error.message);
    }

    return res.data;
};
