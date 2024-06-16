import React from 'react';
import { app } from '../firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

function OAuth() {
    const dispatch = useDispatch();
    const Navigate=useNavigate()
    
    const handleGoogleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            const user = result.user; 

            const res = await fetch('/api/auth/google', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    name: user.displayName, 
                    email: user.email,
                    image: user.photoURL
                })
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            console.log(data);
            dispatch(signInSuccess(data));
            Navigate("/");
        } catch (error) {
            console.log("Could not sign in with Google", error);
        }
    };

    return (
        <button className='bg-red-600 p-3 rounded-lg text-white hover:opacity-90' onClick={handleGoogleAuth} type="button">
            Sign in with Google
        </button>
    );
}

export default OAuth;
