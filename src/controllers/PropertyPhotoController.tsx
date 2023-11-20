import { supabase } from "../supabase/db";


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
        throw new Error(error.message);
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
        throw new Error(error.message);
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