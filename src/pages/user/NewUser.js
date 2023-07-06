import { useState } from 'react';
//import { useEffect } from 'react';
import { useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Fieldset } from 'primereact/fieldset';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { calculateAge } from 'utils/user/isAdult';
//import TextInput from 'components/TextInput';
//import { isTextOnly } from 'utils/form/validation';
import { useNavigate } from 'react-router-dom';


export function ImageUpload() {
    const toast = useRef(null);

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    return (
        <div className="card flex justify-content-left mb-5 mt-3">
            <Toast ref={toast}></Toast>
            <FileUpload mode="basic" name="avatar" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} auto chooseLabel="Browse" />
        </div>
    )
}

export default function NewUser() {
    // fields' values
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    //const [customGender, setCustomGender] = useState('');
    //const [avatar, setAvatar] = useState();
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [additionalNumbers, setAdditionalNumbers] = useState([]);
    const [hasWhatsapp, setHasWhatsapp] = useState(false);
    const [nic, setNic] = useState('');
    const navigate = useNavigate();
    const data = {
        first_name: firstName.toLowerCase(),
        last_name: lastName.toLowerCase(),
        gender: gender,
        date_of_birth: dob,
        age: calculateAge(dob),
        email: email,
        phone: [mobile, ...additionalNumbers],
        address: address,
        has_whatsapp: hasWhatsapp,
        nic: nic
    };

    function handleAddNumber() {
        console.log(additionalNumbers);
        setAdditionalNumbers([...additionalNumbers, '']);
    };

    function handleAdditionalNumbers(index, value) {

        const updatedInputs = [...additionalNumbers];
        updatedInputs[index] = value;
        setAdditionalNumbers(updatedInputs);

    };

    function handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:5000/register', {
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
            <section id="bio">
                <Fieldset legend="Personal Information">
                    <div className="formgrid grid">
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label mb-5">
                                <InputText id="fname" value={firstName} onChange={(e) => setFirstName(e.target.value)} className='w-full' />
                                <label htmlFor="fname">First Name</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label mb-5">
                                <InputText id="lname" value={lastName} onChange={(e) => setLastName(e.target.value)} className='w-full' />
                                <label htmlFor="lname">Last Name</label>
                            </span>
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label mb-5">
                                <Calendar inputId="birth_date" value={dob} onChange={(e) => setDob(e.value)} showIcon dateFormat="d/m/yy" className='w-full' />
                                <label htmlFor="birth_date">Birth Date</label>
                            </span>
                        </div>

                        <div className="field col-12 md:col-6">

                            <span className="p-float-label mb-5 w-full">
                                <InputText id="nic" value={nic} onChange={(e) => setNic(e.target.value)} className='w-full' />
                                <label htmlFor="nic">National Identity Card Number</label>
                            </span>

                        </div>
                    </div>
                    <div className="formgroup-inline">
                        <div className="field-radiobutton mt-3">
                            <RadioButton inputId="female" name="female" value="female" onChange={(e) => setGender(e.value)} checked={gender === 'female'} />
                            <label htmlFor="female" className="ml-2">Female</label>
                        </div>
                        <div className="field-radiobutton mt-3">
                            <RadioButton inputId="male" name="male" value="male" onChange={(e) => setGender(e.value)} checked={gender === 'male'} />
                            <label htmlFor="male" className="ml-2">Male</label>
                        </div>
                        {/*
                        <div className="field-radiobutton mt-3">
                            <RadioButton inputId="otherGender" name="otherGender" value="other" onChange={(e) => setGender(e.value)} checked={gender === 'other'} />
                            <label htmlFor="otherGender" className="ml-2 mr-4">Other</label>
                        </div>
                         
                        {gender === 'other' && (
                            <div className="field mt-1">
                                <span className="p-float-label">
                                    <InputText id="otherGenderInput" value={customGender} onChange={(e) => setCustomGender(e.value)} />
                                    <label htmlFor="otherGenderInput">Please state your gender</label>
                                </span>
                            </div>
                        )} 
                        */}
                    </div>

                    <Divider />
                    <label htmlFor="avatar" className='font-semibold'>Avatar image</label>
                    <ImageUpload />
                </Fieldset>
            </section >
            <section id="contact-details">
                <Fieldset legend="Contact details">
                    <div className="formgrid grid">
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label mb-5">
                                <InputText id="email" keyfilter="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full' />
                                <label htmlFor="email">Email</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <div className="flex w-full">
                                <span className="p-float-label mb-5 w-full">
                                    <InputText id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} className='w-full' />
                                    <label htmlFor="mobile">Mobile Number</label>
                                </span>
                                <Button
                                    icon="pi pi-plus"
                                    rounded
                                    label="Add another"
                                    size="small"
                                    outlined
                                    onClick={handleAddNumber}
                                    className="min-w-max mb-5 ml-3"
                                />
                            </div>
                            <div id="otherNumbers" className="formgroup-inline">
                                {Array.isArray(additionalNumbers) && (additionalNumbers.map((inputValue, index) => (
                                    <div className="field">
                                        <span className="p-float-label mb-2" key={index}>
                                            <InputText id={"phone" + index} value={inputValue} onChange={(e) => handleAdditionalNumbers(index, e.target.value)} />
                                            <label htmlFor={"phone" + index}>Phone Number {index + 1}</label>
                                        </span>
                                    </div>
                                )))}
                            </div>
                        </div>
                    </div>
                    <div className="field flex align-items-center">
                        <label htmlFor="whatsapp" className='mt-2'>Do you have WhatsApp? </label>
                        <span className="flex align-items-center surface-50 border-round p-2 ml-3">
                            <Checkbox name="whatsapp" onChange={e => setHasWhatsapp(e.checked)} checked={hasWhatsapp} className='mr-2'></Checkbox><span className='text-500'>Yes</span>
                        </span>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label mb-5 mt-5">
                                <InputTextarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} rows={5} className='w-full' />
                                <label htmlFor="">Address</label>
                            </span>
                        </div>
                    </div>
                </Fieldset>
            </section >
            <section id="submit" className='flex justify-content-end'><Button label="Register" onClick={handleSubmit} size='large' className='m-3 w-full md:max-w-min'></Button></section>
        </>
    );
}
