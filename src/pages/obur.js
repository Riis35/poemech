import React, {useState} from 'react';

// regex to match numbers between 1 and 10 digits long
const validPhoneNumber = /^\d{1,10}$/;

export default function PhoneNumber() {
  // declare current state and state setter 
  const [phone, setPhone] = useState('');
    const [ahraz, setahraz] = useState('');

  const [tarname, setTarname] = useState('');

  const handleChange = ({ target })=> {
    const newPhone = target.value;
    const isValid = validPhoneNumber.test(newPhone);
    if (isValid) {
        // update state 
        if (target.id === 'phone-input'){
        setPhone(target.value);}
        else{setahraz(target.value)}
        setTarname(target.id);
    }
    // just ignore the event, when new value is invalid
  };

  return (
    <div className='phone'>
      <label for='phone-input'>Phone: </label>
      <input  value={phone} onChange={handleChange} id='phone-input' />
       <input  value={ahraz} onChange={handleChange} id='ahraz' />
      <h1> {tarname}</h1>
    </div>
  );
}