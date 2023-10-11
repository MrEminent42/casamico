import React from 'react'
import PropertyCardView from '../components/PropertyCardView'

// check out Navbar.tsx for an explanation of this
interface HomeProps {
    setSelectedProperty: (property: string) => void;
}

const Home = (props: HomeProps) => {
    return (
        <div>
            <PropertyCardView setSelectedProperty={props.setSelectedProperty} />
        </div>
    )
}

export default Home