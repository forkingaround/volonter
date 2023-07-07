import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Badge } from 'primereact/badge';
import { Image } from 'primereact/image';
import parse from 'html-react-parser';
const serverUrl = 'http://localhost:5000';

export default function Project() {

    const [title, setTitle] = useState('');
    const [teaserText, setTeaserText] = useState('');
    const [causes, setCauses] = useState([]);
    const [mainImage, setMainImage] = useState('');

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    useEffect(() => {

        fetch(`${serverUrl}/project?id=` + id)
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server
                console.log('Server response:', data);
                setTitle(data.title);
                setTeaserText(data.teaser);
                // Convert the causes string into an array
                const causesObj = JSON.parse(data.causes);
                //console.log('Causes obj:', causesObj);
                setCauses(causesObj);
                setMainImage(data.main_image);
            })
            .catch(error => {
                console.error('Error fetching project:', error);
            });
    }, [id]);


    return (
        <>
            <h1 className='text-4xl font-semibold'>{title}</h1>
            <section>{parse(teaserText)}</section>
            <section>
                {causes.length > 0 && causes.map(item => (<Badge key={item.name} value={item.name} className='mr-2'></Badge>))}
            </section>
            <Image src={mainImage} alt="Image" preview />
        </>
    );
}