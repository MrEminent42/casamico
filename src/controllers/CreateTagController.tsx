import { supabase } from "../supabase/db";


export const createTag = async (tag_name: string) => {
    const res = await supabase
        .from("Tags")
        .insert({ tag_name: tag_name })
        .select()
        .single();

    if (res.error) {
        throw new Error(res.error.message);
    }

    return res.data.tag_name;
};
