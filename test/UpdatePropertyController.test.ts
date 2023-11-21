import { Database } from "../src/supabase/supabase";
import { test_manualCreateProperty, test_manualCreateRoom, test_manualDeleteProperty } from "./TestUtil";
import { updateProperty } from "../src/controllers/UpdatePropertyController";

describe('updating a property', () => {
    let property: Database['public']['Tables']['Properties']['Row'];

    beforeAll(async () => {
        // create temp property and room for tasks to correspond to
        property = await test_manualCreateProperty();
    })

    afterAll(async () => {
        // delete temp property cascades to delete room too
        await test_manualDeleteProperty(property.property_id);
        await test_manualDeleteProperty(-1);
    })

    // test update property (remove room)
    test('should update the property entry to match the new data', async () => {
        let res = await updateProperty(property, '');

        expect(res).toHaveProperty("room_ids", []);
    })

    // test throw error if no property was updated
    test('should throw error if no property was updated', async () => {
        property.property_id = -1;

        await expect(updateProperty(property, '')).rejects.toThrowError("No property was updated");
    })
})