import { supabase } from "../src/supabase/db"

/**
 * contains the bare minimum information to create a property, 
 * other than the property_id
 */
export const bare_bones_testing_property = {
    address: "AUTOMATED TESTING PROPERTY",
    image_url: "https://picsum.photos/200",
}

/**
 * manually delete a property FOR AUTOAMTED TESTING PURPOSES
 * @param id the property id of the property to delete
 * @returns the deleted property
 */
export const test_manualDeleteProperty = async (id: number) => {
    const { data, error } = await supabase
        .from("Properties")
        .delete()
        .eq("property_id", id)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

/**
 * manually create a property FOR AUTOMATED TESTING PURPOSES
 * @returns the created property
 */
export const test_manualCreateProperty = async () => {
    //create new Property entry in database
    const { data, error } = await supabase
        .from('Properties')
        .insert({
            ...bare_bones_testing_property,
        })
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
