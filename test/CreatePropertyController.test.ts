import { createProperty } from "../src/controllers/CreatePropertyController"
import { deleteProperty } from "../src/controllers/DeletePropertyController"

const bare_bones_property = {
    address: "123-testing-st",
    image_url: "default_house.jpg",
}
const test_rooms = "test_room_1,test_room_2"

test("create-property", async () => {
    // property id shoud be unique to each test so tests remain independent of each other
    // throw it in a constant to make it easily changeable in the future 
    const id = -1;
    const property = {
        ...bare_bones_property,
        property_id: id,
    }

    try {
        let res = await createProperty(property, test_rooms)
        // tests should be independent of each other, so we need to delete it
        expect(res).toHaveProperty("property_id", id)
    } finally {
        // always attempt to delete the created property
        await deleteProperty(property.property_id, property.image_url)
    }
})
