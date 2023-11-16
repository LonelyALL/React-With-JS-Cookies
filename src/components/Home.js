import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Home() {
    const [cookie, setCookie] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('Token');
        setCookie(token);
        
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <p>You're at home</p>
    );
}
