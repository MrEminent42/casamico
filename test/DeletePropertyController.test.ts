import { createProperty } from "../src/controllers/CreatePropertyController"
import { deleteProperty } from "../src/controllers/DeletePropertyController"
import { test_manualCreateProperty } from "./TestUtil";

const test_rooms = "test_room_1,test_room_2"

test("delete-property", async () => {
    let res = await test_manualCreateProperty();
    await expect(deleteProperty(res.property_id, res.image_url)).resolves.toBe(res.property_id);
})