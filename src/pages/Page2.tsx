import { useState, useEffect } from 'react'
import { getTasksOfProperty } from '../controllers/TaskController';
import { useNavigate, useParams } from 'react-router-dom'

const Page2 = () => {
    const navigate = useNavigate();
    const [propertyId, setPropertyId] = useState('');
    const params = useParams();

    // this runs once when a webpage is loaded
    useEffect(() => {
        getTasksOfProperty();
    }, []);

    // this runs whenever params.id or navigate changes
    useEffect(() => {
        if (!params.id) {
            alert("No property id provided!");
            navigate('/');
        } else {
            setPropertyId(params.id);
        }
    }, [params.id, navigate])


    return (
        <div>This is the future tasks page for property id {propertyId}</div>
    )
}

export default Page2