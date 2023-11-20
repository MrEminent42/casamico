import { createProperty } from "../src/controllers/CreatePropertyController"
import { deleteProperty } from "../src/controllers/DeletePropertyController"

const bare_bones_property = {
    address: "123-testing-st",
    image_url: "default_house.jpg",
}
const test_rooms = "test_room_1,test_room_2"

test("delete-property", async () => {
    const id = -2;
    const property = {
        ...bare_bones_property,
        property_id: id,
    }

    await createProperty(property, test_rooms);
    let res = await deleteProperty(property.property_id, property.image_url)
    expect(res).toBe(id)
})