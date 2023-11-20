import { supabase } from "../supabase/db";

export const getTag = async (tag_name: string) => {
    const res = await supabase
        .from('Tags')
        .select()
        .eq('tag_name', tag_name)
        .maybeSingle();

    if (res.error || res.data === null) {
        throw new Error(res.error?.message || `Tag id ${tag_name} not found.`);
    }

    return res.data;
}

export const getTags = async () => {
    const res = await supabase
        .from('Tags')
        .select()
        .order('tag_name', { ascending: true });

    if (res.error || res.data === null) {
        throw new Error(res.error?.message || `Tags not found.`);
    }
    return res.data;
}

