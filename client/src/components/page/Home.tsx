
import React from 'react'
import Link from '../Link.tsx'

class HomePage extends React.Component {

    render() {
        return (
            <div>
                <p>Welcome to <Link to="/">On-Shop</Link> online shopping web-app.</p>
                <p>Please login first to browse items for sale and make purchases.</p>
            </div>
        );
    }
}

export default HomePage;
