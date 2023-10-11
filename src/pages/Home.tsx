import React from 'react'
import PropertyCard from '../components/properties/PropertyCard';
import NewPropertyCard from '../components/properties/NewPropertyCard'
import styled from 'styled-components';

// check out Navbar.tsx for an explanation of this
interface HomeProps {
    setSelectedProperty: (property: string) => void;
}

const Home = (props: HomeProps) => {
    return (
        <div>
            <PropertyCardViewContainer>
                <PropertyCard
                    address="123 Main St"
                    image={"https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                    numTasks={1}
                    setSelectedProperty={props.setSelectedProperty}
                />
                <PropertyCard
                    address="123 Main St"
                    image={"https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                    numTasks={1}
                    setSelectedProperty={props.setSelectedProperty}
                />
                <PropertyCard
                    address="123 Main St"
                    image={"https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                    numTasks={1}
                    setSelectedProperty={props.setSelectedProperty}
                />
                <PropertyCard
                    address="123 Main St"
                    image={"https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                    numTasks={1}
                    setSelectedProperty={props.setSelectedProperty}
                />
                <PropertyCard
                    address="123 Main St"
                    image={"https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                    numTasks={1}
                    setSelectedProperty={props.setSelectedProperty}
                />
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
export const PropertyGridItemPadding = styled.div`
    padding: 20px;
`