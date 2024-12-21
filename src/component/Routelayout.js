import React from 'react'
import Navbarpanel from './Navbarpanel';
import { Outlet, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
const Routelayout = () => {
    const location = useLocation();
    const showNavbar = location.pathname !== '/';
    return (
        <>
            <Provider store={store}>
                {/* {showNavbar && <Navbarpanel />} */}
                <Navbarpanel />
                <main>
                    <Outlet />
                </main>
            </Provider>

        </>
    )
}

export default Routelayout
