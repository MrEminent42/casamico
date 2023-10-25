import { supabase } from "../supabase/db";
import { Database } from "../supabase/supabase";

export const addTaskWithTags = async (taskWithTag: Database['public']['Tables']['TasksWithTags']['Insert']) => {
    const res = await supabase
        .from('TasksWithTags')
        .insert(taskWithTag)
        .select()
        .single();

    if (res.error) {
        throw res.error;
    }

    // returns the newly created taskWithTag
    return res.data;
}