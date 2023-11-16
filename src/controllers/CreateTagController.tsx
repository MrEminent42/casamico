import { supabase } from "../supabase/db";


export const createTag = async (tag_name: string) => {
    const res = await supabase
        .from("Tags")
        .insert({ tag_name: tag_name })
        .select()
        .single();

    if (res.error) {
        throw res.error;
    }

    return res.data.tag_name;
};
