import { Property } from "../Types";
import { supabase } from "../supabase/supabaseClient";

export const getAllProperties = async () => {
    alert("You have asked PropertyController to fetch all properties.");
    const res = await supabase
        .from('Properties')
        .select();

    if (res.error) {
        throw (res.error);
    }

    return res.data as Property[];
}

export const getProperty = async (propertyId: number) => {
    alert("You have asked PropertyController to fetch a property.");
    const res = await supabase
        .from('Properties')
        .select()
        .eq('property_id', propertyId)
        .maybeSingle();

    if (res.error || res.data === null) {
        throw (res.error || `Property id ${propertyId} not found.`);
    }

    return res.data as Property; //change back at end to avoid conflict
}

export const createProperty = async (property: Property) => {
    alert("You have asked PropertyController to create a property.");
    const { error } = await supabase
        .from('Properties')
        .insert(property);

    if (error) {
        throw error;
    }

    return;
}

export const updateProperty = () => {
    alert("You have asked PropertyController to update a property.");
}

export const deleteProperty = () => {
    alert("You have asked PropertyController to delete a property.");
}

export const storePropertyPhoto = async (photo: File) => {
    const { data, error } = await supabase
        .storage
        .from('property-photos')
        .upload(photo.name, photo, {
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