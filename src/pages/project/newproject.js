import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor';
import { useNavigate } from 'react-router-dom';



export default function ProjectForm () {
    const [title, setTitle] = useState('');
    const [teaserText, setTeaserText] = useState('');

    const navigate = useNavigate();
    const data = {
        title: title,
        teaser: teaserText.toString(),
    };

    const basicHeader = (() => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );
    })();

    function handleSubmit (e) {
        e.preventDefault();

        fetch('http://localhost:5000/newproject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                // Handle the response
                console.log('data passed to server', data);
                // show success message

                // redirect to homepage
                navigate('/');
            })
            .catch(error => {
                // Handle the error
            });
    };

    return (
        <>
        <label>Project Title</label>
        <InputText value={title} onChange={(e) => setTitle(e.target.value)} className='w-full mb-3' />
        <label>Short Description</label>
        <Editor value={teaserText} onTextChange={(e) => setTeaserText(e.htmlValue)} headerTemplate={basicHeader} style={{ height: '320px' }} />
        {/* <label>Main Image</label> */}
        <label>Causes</label>
        
        <Button label="Save" onClick={handleSubmit} size='large' className='m-3 w-full md:max-w-min'></Button>
        </>
    );
}