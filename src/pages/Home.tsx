import { useEffect, useState } from 'react';
import PropertyCard from '../components/properties/PropertyCard';
import NewPropertyCard from '../components/properties/NewPropertyCard'
import styled from 'styled-components';
import { getAllProperties } from '../controllers/PropertyController';
import { Database } from '../supabase/supabase';

const Home = () => {
    const [properties, setProperties] = useState<Database['public']['Tables']['Properties']['Row'][]>([]);

    // this runs when a webpage is loaded
    useEffect(() => {
        getAllProperties()
            .then((res) => setProperties(res))
            .catch(err => alert(err));
    }, []);

    return (
        <PropertyCardViewContainer>
            {
                properties.map((property) => (
                    <PropertyCard
                        property={property}
                        key={property.property_id}
                    />
                ))
            }
            <NewPropertyCard />
        </PropertyCardViewContainer>
    )
}

export default Home

const PropertyCardViewContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    color: black;
    height: 83vh;
    -ms-overflow-style: none;
    overflow: auto;
    padding: 0 1rem;
    scrollbar-width: none;
`


// to be used by each child in the grid
export const PropertyGridItemPadding = styled.div`
    padding: 20px;
`