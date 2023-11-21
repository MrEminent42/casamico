import { Database } from "../src/supabase/supabase";
import { test_manualCreateProperty, test_manualDeleteProperty, bare_bones_testing_property } from "./TestUtil";
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
    })

    // test update property (remove room)
    test('should update the property entry to match the new data', async () => {
        let res = await updateProperty(property, '');

        expect(res).toHaveProperty("room_ids", []);

        await test_manualDeleteProperty(property.property_id);
    })

    // test property with negative id
    test('should throw an error when the property id is negative', async () => {
        await expect(updateProperty({
            property_id: -1,
            ...bare_bones_testing_property
        }, '')).rejects.toThrowError('No property was updated');
    })

})