import { supabase } from "../supabase/db";
import { Database } from "../supabase/supabase";
import { createRooms } from "./RoomController";

export const getAllProperties = async () => {
    const res = await supabase
        .from('Properties')
        .select();

    if (res.error) {
        throw (res.error);
    }

    return res.data;
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

    return res.data;
}

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

    return { property_id: data[0].property_id, room_ids: room_ids }; //return object containing property id and room ids
}

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
}

export const deleteProperty = async (property_id: number, image_url: string) => {
    const { error } = await supabase
        .from('Properties')
        .delete()
        .eq('property_id', property_id);

    if (error) {
        throw (error);
    }

    await deletePropertyPhoto(image_url.substring(image_url.lastIndexOf('/') + 1))
        .catch(error => { throw (error) });
}

//store given file in the database Property Photos bucket
export const storePropertyPhoto = async (photo: File) => {
    const ext = photo.name.substring(photo.name.lastIndexOf('.'));

    const { data, error } = await supabase
        .storage
        .from('property-photos')
        .upload(crypto.randomUUID() + ext, photo, {
            cacheControl: '3600',
            upsert: false
        })

    if (error) {
        throw error;
    }

    return data.path; //this is the file path to the stored file in the database
}

//delete given file in the database Property Photos bucket
export const deletePropertyPhoto = async (name: string) => {
    const { data, error } = await supabase
        .storage
        .from('property-photos')
        .remove([name])

    if (error) {
        throw error;
    }

    return data; //array of FileObjects, each object has info on the file that was deleted
}

//get usable public URL for photo given its path in the database bucket
export const getPropertyPhotoUrl = (filename: string) => {
    const { data } = supabase
        .storage
        .from('property-photos')
        .getPublicUrl(filename);

    return data.publicUrl;
}