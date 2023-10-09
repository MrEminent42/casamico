import styled from 'styled-components'
import PropertyCard from './PropertyCard';
import NewPropertyCard from './NewPropertyCard';

const PropertyCardView = () => {

    return (
        <div>
            <PropertyCardViewContainer>
                <PropertyCard
                    address="123 Main St"
                    image={"https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                    numTasks={1}
                />
                <PropertyCard
                    address="123 Main St"
                    image={"https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                    numTasks={1}
                />
                <PropertyCard
                    address="123 Main St"
                    image={"https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                    numTasks={1}
                />
                <PropertyCard
                    address="123 Main St"
                    image={"https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                    numTasks={1}
                />
                <PropertyCard
                    address="123 Main St"
                    image={"https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                    numTasks={1}
                />
                <NewPropertyCard />
            </PropertyCardViewContainer>
        </div>
    )
}

export default PropertyCardView

const PropertyCardViewContainer = styled.div`
    display: grid;
    /* gap: 10px; */
    grid-template-columns: 33% 33% 33%;
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