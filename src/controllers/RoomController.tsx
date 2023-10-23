import { supabase } from "../supabase/db";
import { Database } from "../supabase/supabase";

export const getRooms = async (property_id: Database['public']['Tables']['Properties']['Row']['property_id']) => {
    const res = await supabase
        .from('Rooms')
        .select()
        .eq('property_id', property_id);

    if (res.error) {
        throw (res.error);
    }

    return res.data;
}

export const getAllUniqueRoomNames = async () => {
    const res = await supabase
        .from('Rooms')
        .select('name');

    if (res.error) {
        throw (res.error);
    }

    return res.data;
}