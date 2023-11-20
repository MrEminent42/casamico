import { supabase } from "../supabase/db";
import { Database } from "../supabase/supabase";


export const getTasksOfProperty = async (propertyId: number) => {
    const res = await supabase
        .from('Tasks')
        .select()
        .eq('property_id', propertyId)
        .order('due_date', { ascending: true });

    if (res.error) {
        throw (res.error);
    }

    return res.data as Database['public']['Tables']['Tasks']['Row'][];
};

export const getTasksAndTagsOfProperty = async (propertyId: number) => {
    const res = await supabase
        .from('Tasks')
        .select('*, TasksWithTags!left(task_id, tag_name)')
        .eq('property_id', propertyId);

    if (res.error) {
        throw (res.error);
    }

    return res.data;
};
