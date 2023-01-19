import classes from './Checkout.module.css';
import { useRef,useState } from 'react';

const isEmpty = value=>value.trim()===
"";
const isNotFiveChars = value=>value.trim().length !==5;

const Checkout = (props) => {
  const[formInputValidity,setFormInputValidity]=useState({
    name: true,
    street: true,
    city:true,
    postalCode:true

  })

  const nameInputRef=useRef();
  const streetInputRef=useRef();
  const postalInputRef=useRef();
  const cityInputRef=useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName=nameInputRef.current.value;
    const streetName=streetInputRef.current.value;    
    const postalName=postalInputRef.current.value;    
    const cityName=cityInputRef.current.value;

    const enteredNameIsValid=!isEmpty(enteredName);
    const streetNameIsValid =!isEmpty(streetName);
    const postalNameIsValid =!isNotFiveChars(postalName);
    const cityNameIsValid =!isEmpty(cityName);

    setFormInputValidity({
      name:enteredNameIsValid,
      street:streetNameIsValid,
      postalCode:postalNameIsValid,
      city:cityNameIsValid
    })

    const formisValid=enteredNameIsValid && streetNameIsValid && postalNameIsValid && cityNameIsValid;
    if(!formisValid){
      return;
    }

    props.onConfirm({
      name:enteredName,
      street:streetName,
      postalCode:postalName,
      city:cityName
    });

    

    };

    const nameControlClasses=`${classes.control} ${formInputValidity.name?"":classes.invalid}`
    const streetControlClasses=`${classes.control} ${formInputValidity.street?"":classes.invalid}`
    const postalControlClasses=`${classes.control} ${formInputValidity.postalCode?"":classes.invalid}`
    const cityControlClasses=`${classes.control} ${formInputValidity.city?"":classes.invalid}`



  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputValidity.name && <p>Please Enter Valid Name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputValidity.street && <p>Please Enter Valid Address</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formInputValidity.postalCode && <p>Please Enter Valid Postal Code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputValidity.city && <p>Please Enter Valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
