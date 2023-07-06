import React, { useEffect, useState } from 'react';

const TestingConnection = () => {
    const [data, setData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('/data');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        const fetchImage = async () => {
            try {
                const response = await fetch('/mountain');
                const jsonData = await response.json();
                setImageUrl(jsonData.imageUrl);
            } catch (error) {
                console.log('Error fetching image data:', error)
            }
        };

        fetchImage();

    }, []);

    if (data === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {data.message}
            <img src={imageUrl} alt="" />
        </div>
    );
};

export default TestingConnection;
