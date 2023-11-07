import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import PropertyCard from '../components/properties/PropertyCard';
import NewPropertyCard from '../components/properties/NewPropertyCard'
import styled from 'styled-components';
import { getAllProperties } from '../controllers/PropertyController';
import { Database } from '../supabase/supabase';
import Popup from '../components/Popup';
import AddProperty from './AddProperty';

const Home = () => {
    const [properties, setProperties] = useState<Database['public']['Tables']['Properties']['Row'][]>([]);
    const [refresh, doRefresh] = useState(false); //state variable used to force properties to update twice to refresh cards
    const navigate = useNavigate();

    // this runs when a webpage is loaded
    useEffect(() => {
        getAllProperties()
            .then((res) => setProperties(res))
            .catch(err => {
                console.log(err);
                alert(err);
            });

        //refresh starts as false and is set to true when starting refresh
        //this sets it back to false and does necessary second fetch of properties
        if (refresh) {
            getAllProperties()
                .then((res) => setProperties(res))
                .catch(err => {
                    console.log(err);
                    alert(err);
                });
            doRefresh(false);
        }
    }, [refresh]);

    return (
        <>
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
            <Routes>
                <Route path="add-property" element={
                    <Popup
                        onClickOutside={() => navigate("")}
                        onKeyboardEsc={() => navigate("")}
                        element={<AddProperty goBack={
                            () => {
                                navigate("");
                                doRefresh(true);
                            }
                        } />}
                    />
                } />
                <Route path="edit-property/:id/*" element={
                    <Popup
                        onClickOutside={() => navigate("")}
                        onKeyboardEsc={() => navigate("")}
                        element={<AddProperty goBack={
                            () => {
                                navigate("");
                                doRefresh(true);
                            }
                        } />}
                    />
                } />
            </Routes>
        </>
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