import { supabase } from "../supabase/db";
import { Database } from "../supabase/supabase";
import { createRooms } from "./CreateRoomController";


export const createProperty = async (property: Database['public']['Tables']['Properties']['Insert'], rooms: string) => {
    //create new Property entry in database
    const { data, error } = await supabase
        .from('Properties')
        .insert(property)
        .select();

    if (error) {
        throw error;
    }

    //create new Room entries in database if needed
    let room_ids: Array<number> = [];
    if (rooms) {
        room_ids = await createRooms(rooms, data[0].property_id)
            .catch(err => { throw (err); });
    }

    return { property_id: data[0].property_id, room_ids: room_ids };
};
