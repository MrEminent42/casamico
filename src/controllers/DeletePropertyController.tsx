import { supabase } from "../supabase/db";
import { deletePropertyPhoto } from "./PropertyPhotoController";


export const deleteProperty = async (property_id: number, image_url: string) => {
    const { data, error } = await supabase
        .from('Properties')
        .delete()
        .eq('property_id', property_id)
        .select()
        .single();

    if (error) {
        throw (error);
    }

    //delete property photo ONLY IF it is not the default
    image_url = image_url.substring(image_url.lastIndexOf('/') + 1);
    if (image_url !== "default_house.png") {
        await deletePropertyPhoto(image_url)
            .catch(error => { throw (error); });
    }

    return Promise.resolve(data.property_id);
};
