import { supabase } from "../supabase/db";
import { Database } from "../supabase/supabase";

export const getRoom = async (room_id: number) => {
    const res = await supabase
        .from('Rooms')
        .select()
        .eq('room_id', room_id)
        .maybeSingle();

    if (res.error || res.data === null) {
        throw new Error(res.error?.message || `Room id ${room_id} not found.`);
    }

    return res.data;
}

export const getRooms = async (property_id: Database['public']['Tables']['Properties']['Row']['property_id']) => {
    const res = await supabase
        .from('Rooms')
        .select()
        .eq('property_id', property_id);

    if (res.error) {
        throw new Error(res.error.message);
    }

    return res.data;
}

