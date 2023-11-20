import { supabase } from "../supabase/db";


export const deleteRoom = async (room_id: number) => {
    const { error } = await supabase
        .from('Rooms')
        .delete()
        .eq('room_id', room_id);

    if (error) {
        throw (error);
    }
};
