import { supabase } from "../supabase/db";
import { Database } from "../supabase/supabase";

export const getTagsOfTask = async (task_id: number) => {
    const res = await supabase
        .from('TasksWithTags')
        .select()
        .eq('task_id', task_id);

    if (res.error) {
        throw res.error;
    }

    return res.data;
}

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

export const deleteTagsOfTask = async (task_id: number) => {
    const res = await supabase
        .from('TasksWithTags')
        .delete()
        .eq('task_id', task_id);

    if (res.error) {
        throw res.error;
    }

    return res.data;
}