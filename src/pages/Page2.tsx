import { useEffect } from 'react'
import { getTasksOfProperty } from '../controllers/TaskController';

const Page2 = () => {

    // this runs once when a webpage is loaded
    useEffect(() => {
        getTasksOfProperty();
    }, []);

    return (
        <div>THIS IS PAGE 2!</div>
    )
}

export default Page2