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