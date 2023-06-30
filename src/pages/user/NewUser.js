import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Fieldset } from 'primereact/fieldset';

import { useState } from 'react';

export default function NewUser() {

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [gender, setGender] = useState();
    const [customGender, setCustomGender] = useState();
    const [avatar, setAvatar] = useState();
    const [dob, setDob] = useState();
    const [guardianFirstName, setGuardianFirstName] = useState();

    function handleAddNumber (e) {
        const holder = document.getElementById("otherNumbers");
        const fields = document.createElement("");
    }
    return (
        <form>
            <section id="bio">
                <Fieldset legend="Personal Information">
                    <span className="p-float-label mb-5">
                        <InputText id="fname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <label htmlFor="fname">First Name</label>
                    </span>
                    <span className="p-float-label mb-5">
                        <InputText id="lname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <label htmlFor="lname">Last Name</label>
                    </span>
                    <span className="p-float-label mb-5">
                        <Calendar inputId="birth_date" value={dob} onChange={(e) => setDob(e.value)} showIcon dateFormat="d/m/yy" />
                        <label htmlFor="birth_date">Birth Date</label>
                    </span>
                    <div className="flex flex-wrap gap-3 mb-5">
                        <div className="flex align-items-center">
                            <RadioButton inputId="female" name="female" value="female" onChange={(e) => setGender(e.value)} checked={gender === 'female'} />
                            <label htmlFor="female" className="ml-2">Female</label>
                        </div>
                        <div className="flex align-items-center">
                            <RadioButton inputId="male" name="male" value="male" onChange={(e) => setGender(e.value)} checked={gender === 'male'} />
                            <label htmlFor="male" className="ml-2">Male</label>
                        </div>
                        <div className="flex align-items-center">
                            <RadioButton inputId="otherGender" name="otherGender" value="other" onChange={(e) => setGender(e.value)} checked={gender === 'other'} />
                            <label htmlFor="otherGender" className="ml-2 mr-4">Other</label>
                            {gender === 'other' && (
                                <span className="p-float-label">
                                    <InputText id="otherGenderInput" onChange={e => setCustomGender(e.value)} value={customGender} />
                                    <label htmlFor="otherGenderInput">Please state your gender</label>
                                </span>
                            )}
                        </div>
                    </div>
                </Fieldset>
            </section>
            <section id="contact-details">
                <Fieldset legend="Contact details">
                    <span className="p-float-label mb-5">
                        <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email">Email</label>
                    </span>
                    <span className="p-float-label mb-5">
                        <InputText id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        <label htmlFor="mobile">Mobile Number</label>
                    </span>
                    <div id="otherNumbers"></div>
                    <Button 
                        icon="pi pi-plus" 
                        rounded 
                        label="Add another" 
                        size="small" 
                        onClick={handleAddNumber} 
                    />
                    <label htmlFor="">WhatsApp</label>
                    <span className="p-float-label mb-5">
                        <InputTextarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        <label htmlFor="">Address</label>
                    </span>
                    <span className="p-float-label mb-5">
                        <label htmlFor="">ID Card Number</label>
                    </span>

                </Fieldset>
            </section>
            <section id="emergency">
                <Fieldset legend="Emergency Contact">
                    <label htmlFor="">First Name</label>
                    <InputText />
                    <label htmlFor="">Last Name</label>
                    <InputText />
                    <label htmlFor="">Mobile</label>
                    <InputText />
                    <label htmlFor="">Relation</label>
                    <InputText />
                </Fieldset>
            </section>
        </form>
    );
}
