import { Property, Room } from "../Types";
import { supabase } from "../supabase/db";

export const getAllProperties = async () => {
    const res = await supabase
        .from('Properties')
        .select();

    if (res.error) {
        throw (res.error);
    }

    return res.data as Property[];
}

export const getProperty = async (propertyId: number) => {
    const res = await supabase
        .from('Properties')
        .select()
        .eq('property_id', propertyId)
        .maybeSingle();

    if (res.error || res.data === null) {
        throw (res.error || `Property id ${propertyId} not found.`);
    }

    return res.data as Property;
}

export const createProperty = async (property: Property, rooms: string) => {
    //create new Property entry in database
    const { data, error } = await supabase
        .from('Properties')
        .insert(property)
        .select();

    if (error) {
        throw error;
    }

    //create new Room entries in database if needed
    let room_ids: Array<number | undefined>=[];
    if (rooms) {
        room_ids=await createRooms(rooms, data[0].property_id)
            .catch(err => { throw (err); });
    }

    return { property_id: data[0].property_id, room_ids: room_ids }; //return object containing property id and room ids
}

export const updateProperty = () => {
    alert("You have asked PropertyController to update a property.");
}

export const deleteProperty = () => {
    alert("You have asked PropertyController to delete a property.");
}

//store given file in the database Property Photos bucket
export const storePropertyPhoto = async (photo: File) => {
    const ext = photo.name.substring(photo.name.lastIndexOf('.'));

    const { data, error } = await supabase
        .storage
        .from('property-photos')
        .upload(crypto.randomUUID()+ext, photo, {
            cacheControl: '3600',
            upsert: false
        })

    if (error) {
        throw error;
    }

    return data.path; //this is the file path to the stored file in the database
}

//get usable public URL for photo given its path in the database bucket
export const getPropertyPhotoUrl = (filename: string) => {
    const { data } = supabase
        .storage
        .from('property-photos')
        .getPublicUrl(filename);

    return data.publicUrl;
}

export const createRooms = async (input: string, property_id: number) => {
    //parse comma separated string
    const names = input.split(',');

    //store new Room entry in database for each name and add room_id of each to returned array
    let room_ids = await Promise.all(names.map(async name => {
        if (name) {
            const { data, error } = await supabase
                .from('Rooms')
                .insert({ name: name, property_id: property_id } as Room)
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