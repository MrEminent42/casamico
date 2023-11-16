import { supabase } from "../supabase/db";


export const getAllProperties = async () => {
    const res = await supabase
        .from('Properties')
        .select();

    if (res.error) {
        throw (res.error);
    }

    return res.data;
};

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
};
