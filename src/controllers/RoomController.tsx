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

export const createRooms = async (input: string, property_id: number) => {
    //parse comma separated string
    const names = input.split(',');

    let existingRooms = await getRooms(property_id);
    let existingNames = new Set<string>();
    existingRooms.forEach(room => {
        existingNames.add(room.name);
    })

    //store new Room entry in database for each name and add room_id of each to returned array
    let room_ids = await Promise.all(names.map(async name => {
        if (name && !existingNames.has(name)) {
            const { data, error } = await supabase
                .from('Rooms')
                .insert({ name: name, property_id: property_id })
                .select();

            if (error) {
                throw (error);
            }

            return data[0].room_id;
        }
    }
    ));

    return room_ids; //return array of room ids of rooms created
}