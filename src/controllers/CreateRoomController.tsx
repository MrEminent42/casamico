import { supabase } from "../supabase/db";
import { deleteRoom } from "./DeleteRoomController";
import { getRooms } from "./GetRoomController";


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
    existingRooms.forEach(async (room) => {
        if (names.includes(room.name)) {
            existingNames.add(room.name);
        }
        else {
            await deleteRoom(room.room_id);
        }
    });

    //store new Room entry in database for each name and add room_id of each to returned array
    //ensure room name isn't empty string or already used
    let room_ids = await Promise.all(names.filter((name) => (name && !existingNames.has(name))).map(async (name) => {
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

    return room_ids;
};
