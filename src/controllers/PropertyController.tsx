import { Property } from "../Types";
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

export const createProperty = () => {
    alert("You have asked PropertyController to create a property.");
}

export const updateProperty = () => {
    alert("You have asked PropertyController to update a property.");
}

export const deleteProperty = () => {
    alert("You have asked PropertyController to delete a property.");
}