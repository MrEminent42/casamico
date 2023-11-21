import { Database } from "../src/supabase/supabase";
import { test_manualCreateProperty, test_manualCreateRoom, test_manualDeleteProperty } from "./TestUtil";
import { getProperty } from "../src/controllers/GetPropertyController";

describe('get property', () => {
    let property: Database['public']['Tables']['Properties']['Row'];

    beforeAll(async () => {
        // create temp property and room for tasks to correspond to
        property = await test_manualCreateProperty();
    })

    afterAll(async () => {
        // delete temp property cascades to delete room too
        await test_manualDeleteProperty(property.property_id);
    })

    // test get property
    test('should return property with matching id', async () => {
        let res = await getProperty(property.property_id);

        expect(res).toHaveProperty("property_id", property.property_id);
    })

    // test invalid property id
    test('should throw error if property id is invalid', async () => {
        await expect(getProperty(-1)).rejects.toThrowError("Property id -1 not found");
    })
})