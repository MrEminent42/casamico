import { createProperty } from "../src/controllers/CreatePropertyController"
import { test_manualDeleteProperty, test_manualCreateProperty, bare_bones_testing_property } from "./TestUtil";

const test_rooms = "test_room_1,test_room_2"

test("create-property", async () => {
    // property id shoud be unique to each test so tests remain independent of each other
    // throw it in a constant to make it easily changeable in the future 

    let res = await createProperty(bare_bones_testing_property, test_rooms)
    // tests should be independent of each other, so we need to delete it
    expect(res).toHaveProperty("property_id", res.property_id)
    // delete the created property
    await test_manualDeleteProperty(res.property_id)
})


test("create-property-duplicate-id", async () => {
    // create the "original" property
    let res = await test_manualCreateProperty()

    // create the duplicate property that should be rejected
    await expect(createProperty({
        property_id: res.property_id,
        ...bare_bones_testing_property
    }, test_rooms)).rejects.toThrowError("duplicate key");

    //always delte the property after 
    await test_manualDeleteProperty(res.property_id);
})
