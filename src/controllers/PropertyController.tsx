import { Property, Room } from "../Types";
import { supabase } from "../supabase/supabaseClient";
import { PostgrestError } from "@supabase/supabase-js";

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
    alert("You have asked PropertyController to create a property.");
    const { data, error } = await supabase
        .from('Properties')
        .insert(property)
        .select();

    if (error) {
        throw error;
    }

    await createRooms(rooms, data[0].property_id);

    return;
}

export const updateProperty = () => {
    alert("You have asked PropertyController to update a property.");
}

export const deleteProperty = () => {
    alert("You have asked PropertyController to delete a property.");
}

export const storePropertyPhoto = async (photo: File) => {
    const ext = photo.name.substring(photo.name.indexOf('.'));

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

    return data.path;
}

export const getPropertyPhotoUrl = (filename: string) => {
    const { data } = supabase
        .storage
        .from('property-photos')
        .getPublicUrl(filename);

    return data.publicUrl;
}

export const createRooms = (input: string, property_id: number) => {
    alert("You have asked PropertyController to make rooms");

    //parse comma separated string
    const names = input.split(',');
    let errors: Array<PostgrestError> = [];
    names.forEach(async function (name) {
        const { error } = await supabase
            .from('Rooms')
            .insert({name: name, property_id: property_id} as Room);

        if (error) {
           alert(error?.message);
           throw(error);
        }
    })

    return errors;
}