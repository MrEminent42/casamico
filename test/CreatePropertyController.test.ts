import { createProperty } from "../src/controllers/CreatePropertyController"
import { deleteProperty } from "../src/controllers/DeletePropertyController"
import { supabase } from "../src/supabase/db"

const bare_bones_property = {
    address: "123-testing-st",
    image_url: "default_house.jpg",
}
const test_rooms = "test_room_1,test_room_2"

const deletePropertyWithId = async (id: number) => {
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

const makePropertyWithId = async (id: number) => {
    //create new Property entry in database
    const { data, error } = await supabase
        .from('Properties')
        .insert({
            property_id: id,
            address: "whatever",
            image_url: "cute.jpg",
        })
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

test("create-property", async () => {
    // property id shoud be unique to each test so tests remain independent of each other
    // throw it in a constant to make it easily changeable in the future 
    const id = -1;
    const property = {
        ...bare_bones_property,
        property_id: id,
    }

    // clear db of any existing properties with this id
    await deletePropertyWithId(id)

    try {
        let res = await createProperty(property, test_rooms)
        // tests should be independent of each other, so we need to delete it
        expect(res).toHaveProperty("property_id", id)
    } finally {
        // always attempt to delete the created property
        await deletePropertyWithId(id)
    }
})


test("create-property-duplicate-id", async () => {
    // property id shoud be unique to each test so tests remain independent of each other
    // throw it in a constant to make it easily changeable in the future 
    const id = -2;
    const property = {
        ...bare_bones_property,
        property_id: id,
    }
    try {

        // create the "original" property
        await makePropertyWithId(id)
    } catch (err) {
        console.log("THERE WAS AN ERROR WITH THE ORIGINAL PROPERTY")
        console.log(JSON.stringify(err))
    }

    // create the duplicate property that should be rejected
    await expect(createProperty(property, test_rooms)).rejects.toThrowError("duplicate key");

    console.log("deleting property")
    //always delte the property after 
    await deletePropertyWithId(id);
})
