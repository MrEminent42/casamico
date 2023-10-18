import { Property } from "../Types";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../supabase/supabaseClient"

const supabase = createClient<Database>(
    process.env.REACT_APP_SUPABASE_URL || "",
    process.env.REACT_APP_SUPABASE_KEY || "");

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

    return res.data;
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