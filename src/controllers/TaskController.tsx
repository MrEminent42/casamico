import { supabase } from "../supabase/db";
import { Database } from "../supabase/supabase";

export const getTask = async (taskId: number) => {
    const res = await supabase
        .from('Tasks')
        .select()
        .eq('task_id', taskId)
        .maybeSingle();

    if (res.error || res.data === null) {
        throw (res.error || `Task id ${taskId} not found.`);
    }

    return res.data;
}

export const getTasksOfProperty = async (propertyId: number) => {
    const res = await supabase
        .from('Tasks')
        .select()
        .eq('property_id', propertyId)
        .order('due_date', { ascending: true })

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

export const updateTask = async (task: Database['public']['Tables']['Tasks']['Update'], task_id: number) => {
    const res = await supabase
        .from('Tasks')
        .update(task)
        .eq('task_id', task_id)
        .select()
        .single();

    if (res.error) {
        throw (res.error);
    }

    return res.data.task_id;
}

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
}

export const getTasksAndTagsOfProperty = async (propertyId: number) => {
    const res = await supabase
        .from('Tasks')
        .select('*, TasksWithTags!left(task_id, tag_name)')
        .eq('property_id', propertyId)

    if (res.error) {
        throw (res.error);
    }

    return res.data;
}