import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import parse from 'html-react-parser';

export default function Project() {

    const [title, setTitle] = useState('');
    const [teaserText, setTeaserText] = useState('');

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    useEffect(() => {

        fetch('http://localhost:5000/project?id='+id)
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server
                console.log('Server response:', data);
                setTitle(data.title);
                setTeaserText(data.teaser);
            })
            .catch(error => {
                console.error('Error fetching project:', error);
            });
    }, [id]);

    return (
        <>
            <h1 className='text-4xl font-semibold'>{title}</h1>
            <section>{parse(teaserText)}</section>
        </>
    );
}