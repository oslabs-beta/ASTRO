import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react'

function Login() {

    const { register, handleSubmit, formState: { errors} } = useForm();

    const [info, setInfo] = useState()

    // const handleSubmit = () => {
    //     //does something with submit
    // }

    return (
        <section>
        <h1>Login</h1>
        <p>Fill in the details below to login</p>
        <form 
        action=""
        onSubmit={handleSubmit((data) => {
            setInfo(data)
            //send fetch request to verify that user account exists
            //if it doesnt then do something
            //if it does then change userSlice state to true and take person to home page
        })}>

            <input 
            type="email" 
            {...register("email", { required: 'Required field' })}  
            id="email"
            placeholder='Email'
            />
            <small>{errors.email?.message}</small>

            <input 
            type="password" 
            {...register("password", 
            { required: 'Required field', 
            minLength: { 
                value: 8, 
                message: 'Minimum length of 8 characters required' 
                }
            })} 
            id="password"
            placeholder='Password'
            />
           <small>{errors.password?.message}</small>

            <button
            type='Submit'
            name="button"
            id="button"
            >Submit</button>

        </form>
    </section>
    )
};

export default Login;
