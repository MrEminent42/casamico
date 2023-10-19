import { Tag } from "../Types";
import { supabase } from "../supabase/db";


export const getTags = async () => {
    const res = await supabase
        .from('Tags')
        .select()
        .order('tag_name', { ascending: true });

    if (res.error || res.data === null) {
        throw (res.error || `Tags not found.`);
    }
    return res.data;
}

export const createTag = async (tag_name: string) => {
    const { error } = await supabase
        .from("Tags")
        .insert({ tag_name: tag_name });

    if (error) {
        throw error;
    }
}