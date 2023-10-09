import styled from 'styled-components'
import PropertyCard from './PropertyCard';
import NewPropertyCard from './NewPropertyCard';
import { useEffect, useState } from 'react';
import { getAllProperties } from '../controllers/PropertyController';
import { Property } from '../Types';

const PropertyCardView = () => {
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
                            address={property.address}
                            image={property.image_url}
                            numTasks={-1}
                            key={property.property_id}
                        />
                    ))
                }
                <NewPropertyCard />
            </PropertyCardViewContainer>
        </div>
    )
}

export default PropertyCardView

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