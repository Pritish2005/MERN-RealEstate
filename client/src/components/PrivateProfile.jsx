import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet,Navigate } from 'react-router-dom';

const PrivateProfile = () => {
    const currentUser=useSelector((state)=>state.user.currentUser);
    return (currentUser!=null)?<Outlet/>:<Navigate to={'/sign-in'}/>
}

export default PrivateProfile;