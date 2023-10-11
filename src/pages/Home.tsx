import { useEffect, useState } from 'react';
import PropertyCard from '../components/properties/PropertyCard';
import NewPropertyCard from '../components/properties/NewPropertyCard'
import styled from 'styled-components';
import { getAllProperties } from '../controllers/PropertyController';
import { Property } from '../Types';

const Home = () => {
    const [properties, setProperties] = useState<Property[]>([]);

    // this runs when a webpage is loaded
    useEffect(() => {
        getAllProperties()
            .then((res) => setProperties(res))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
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
        </div>
    )
}

export default Home

const PropertyCardViewContainer = styled.div`
    display: grid;
    /* gap: 10px; */
    grid-template-columns: 1fr 1fr 1fr;
    color: black;
    height: 83vh;
    -ms-overflow-style: none;
    overflow: auto;
    padding: 0 1rem;
    scrollbar-width: none;
`


// to be used by each child in the grid
export const PropertyGridViewWrapper = styled.div`
    padding: 20px;
`