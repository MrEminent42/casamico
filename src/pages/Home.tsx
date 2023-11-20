import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import PropertyCard from '../components/properties/PropertyCard';
import NewPropertyCard from '../components/properties/NewPropertyCard'
import styled from 'styled-components';
import { Database } from '../supabase/supabase';
import { displayError } from '../App';
import Popup from '../components/Popup';
import AddProperty from './AddEditProperty';
import Confirmation from '../components/Confirmation';
import { getAllProperties, getProperty } from '../controllers/GetPropertyController';
import { deleteProperty } from '../controllers/DeletePropertyController';

const Home = () => {
    const [properties, setProperties] = useState<Database['public']['Tables']['Properties']['Row'][]>([]);
    const [refresh, setRefresh] = useState(true); //state variable used to force properties to update twice to refresh cards
    const navigate = useNavigate();

    // used for all possible exits of add/edit property popup so that property cards refresh
    const homeGoBack = () => {
        setRefresh(true);
        navigate("");
    }

    // this runs when a webpage is loaded
    useEffect(() => {
        //setting `refresh` to true will trigger this useEffect to re-fetch properties
        //after attempting a refresh, the `refresh` variable is set back to false
        if (refresh) {
            getAllProperties()
                .then((res) => setProperties(res))
                .catch(err => displayError(err, "fetch properties"));
            setRefresh(false);
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
                <Route path="delete-property/:id/*" element={
                    <Popup
                        onClickOutside={homeGoBack}
                        onKeyboardEsc={homeGoBack}
                        element={<Confirmation
                            confirmationText="Are you sure you want to delete this property?"
                            goBack={homeGoBack}
                            doConfirmed={
                                async (id: number) => {
                                    await getProperty(id)
                                        .then(async (res) => {
                                            await deleteProperty(id, res.image_url)
                                                .catch((error) => displayError(error, "delete property"));
                                        })
                                        .catch((error) => displayError(error, "get property when deleting property"));
                                   
                                    homeGoBack();
                                }
                            }
                        />}
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