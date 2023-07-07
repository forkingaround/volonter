import { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor';
import { AutoComplete } from 'primereact/autocomplete';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
const serverUrl = 'http://localhost:5000';


export default function ProjectForm() {
    const [title, setTitle] = useState('');
    const [teaserText, setTeaserText] = useState('');
    const causesList = [
        'Climate change',
        'Environmental conservation',
        'Renewable energy',
        'Sustainable agriculture',
        'Wildlife conservation',
        'Ocean conservation',
        'Clean water',
        'Deforestation',
        'Air pollution',
        'Plastic pollution',
        'Sustainable transportation',
        'Biodiversity',
        'Sustainable fashion',
        'Waste management',
        'Sustainable cities',
        'Ecosystem restoration',
        'Animal rights',
        'Social justice',
        'Gender equality',
        'LGBTQ+ rights',
        'Racial equality',
        'Poverty alleviation',
        'Education access',
        'Mental health awareness',
        'Humanitarian aid',
        'Community development',
        'Food security',
        'Public health',
        'Accessible technology'
    ];
    const [causes, setCauses] = useState(causesList);
    const [selectedCauses, setSelectedCauses] = useState([]);
    const [filteredCauses, setFilteredCauses] = useState([]);
    const [mainImage, setMainImage] = useState('');
    const [skills, setSkills] = useState('');
    const toast = useRef(null);

    const navigate = useNavigate();
    const data = {
        title: title,
        teaser: teaserText.toString(),
        causes: JSON.stringify(selectedCauses),
        main_image: mainImage
    };

    const searchCauses = (event) => {
        //console.log(event.query.trim().length);
        //console.log(causes);
        // Timeout to emulate a network connection
        setTimeout(() => {
            let _filteredCauses;
            //console.log(!event.query.trim().length);

            if (!event.query.trim().length) {
                _filteredCauses = causes;
            } else {
                _filteredCauses = causes.filter((cause) => {
                    return cause.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            console.log(_filteredCauses);
            const valueArr = [];
            _filteredCauses.map(v => {
                const o = { name: v };
                valueArr.push(o);
                return true;
            });
            setFilteredCauses(valueArr);
        }, 250);
    }

    const basicHeader = (() => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
                <button className="ql-strike" aria-label="Strike"></button>
                <button className="ql-link" aria-label="Link"></button>
            </span>
        );
    })();

    const onUpload = (e) => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
        const uploadedFile = e.files[0];
        console.log('Uploaded file:', uploadedFile);
        const formData = new FormData();
        formData.append('file', uploadedFile);

        fetch(`${serverUrl}/api/upload`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response from the server
                console.log('Server response:', data);
                setMainImage(data.link);
                // Perform any necessary actions based on the response
            })
            .catch((error) => {
                // Handle any error that occurred during the API call
                console.error('Error uploading file:', error);
            });
    };

    function handleSubmit(e) {
        e.preventDefault();

        fetch(`${serverUrl}/newproject`, {
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
                console.error('Error uploading file:', error);
            });
    };

    return (
        <>
            <label>Project Title</label>
            <InputText value={title} onChange={(e) => setTitle(e.target.value)} className='w-full mb-3' />
            <label>Short Description</label>
            <Editor value={teaserText} onTextChange={(e) => setTeaserText(e.htmlValue)} headerTemplate={basicHeader} style={{ height: '160px' }} />
            {/* <label>Main Image</label> */}
            <label>Causes</label>
            <div className='p-fluid'><AutoComplete field="name" multiple value={selectedCauses} suggestions={filteredCauses} completeMethod={searchCauses} onChange={(e) => setSelectedCauses(e.value)} /></div>
            <label>Skills</label>
            <InputText value={skills} onChange={(e) => setSkills(e.target.value)} className='w-full mb-3' />
            <label>Main image</label>
            <Toast ref={toast}></Toast>
            <FileUpload mode="basic" name="mainImageUpload" url="/api/upload" accept="image/*" maxFileSize={1000000} customUpload uploadHandler={onUpload} chooseLabel="Browse" />
            
            <Button label="Save" onClick={handleSubmit} size='large' className='m-3 w-full md:max-w-min'></Button>
        </>
    );
}