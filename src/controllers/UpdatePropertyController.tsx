import { supabase } from "../supabase/db";
import { Database } from "../supabase/supabase";
import { createRooms } from "./CreateRoomController";


export const updateProperty = async (property: Database['public']['Tables']['Properties']['Update'], rooms: string) => {
    //update Property entry in database
    if (property.property_id) {
        const { data, error } = await supabase
            .from('Properties')
            .update(property)
            .eq('property_id', property.property_id)
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

        return { property_id: data[0].property_id, room_ids: room_ids }; //return object containing property id and room ids
    }
    throw new Error("No property id was given");
};
