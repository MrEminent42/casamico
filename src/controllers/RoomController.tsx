import { supabase } from "../supabase/db";
import { Database } from "../supabase/supabase";

export const getRoom = async (room_id: number) => {
    const res = await supabase
        .from('Rooms')
        .select()
        .eq('room_id', room_id)
        .maybeSingle();

    if (res.error || res.data === null) {
        throw (res.error || `Room id ${room_id} not found.`);
    }

    return res.data;
}

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

export const deleteRoom = async (room_id: number) => {
    const { error } = await supabase
        .from('Rooms')
        .delete()
        .eq('room_id', room_id);

    if (error) {
        throw (error);
    }
}

export const createRooms = async (input: string, property_id: number) => {
    //parse comma separated string
    const names = input.split(',');
    for (let i = 0; i < names.length; i++) {
        names[i] = names[i].trim();
    }

    //get existing room names to avoid making duplicates later
    let existingRooms = await getRooms(property_id);
    let existingNames = new Set<string>();

    //check all existing rooms
    //if name is also in values retrieved from UI, add it to existing names
    //if name not in values retrieved from UI, delete it from database
    existingRooms.forEach(async room => {
        if (names.includes(room.name)) {
            existingNames.add(room.name);
        }
        else {
            await deleteRoom(room.room_id);
        }
    })

    //store new Room entry in database for each name and add room_id of each to returned array
    //ensure room name isn't empty string or already used
    let room_ids = await Promise.all(names.filter((name) => (name && !existingNames.has(name))).map(async name => {
        const { data, error } = await supabase
            .from('Rooms')
            .insert({ name: name, property_id: property_id })
            .select();

        if (error) {
            throw (error);
        }

        existingNames.add(data[0].name); //include newly created room names to avoid future duplicates

        return data[0].room_id;
    }
    ));

    return room_ids; //return array of room ids of rooms created (NEW ONES ONLY) with invalid ids (like -1) removed
}