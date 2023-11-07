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

    // used for all possible exits of add/edit property popup so that property cards refresh
    const homeGoBack = () => {
        navigate("");
        doRefresh(true);
    }

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
                        onClickOutside={homeGoBack}
                        onKeyboardEsc={homeGoBack}
                        element={<AddProperty goBack={
                            homeGoBack
                        } />}
                    />
                } />
                <Route path="edit-property/:id/*" element={
                    <Popup
                        onClickOutside={homeGoBack}
                        onKeyboardEsc={homeGoBack}
                        element={<AddProperty goBack={
                            homeGoBack
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