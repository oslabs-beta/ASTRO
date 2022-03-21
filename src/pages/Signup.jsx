import React from 'react';
import { useForm } from 'react-hook-form';


function Signup(){

  // const handleSubmit = () => {
  //     //does something with submit
  //     console.log('submitted')
  // }

  //register is a callback function that will return some of the props and inject into your inputs
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <section>
      <h1>Sign Up</h1>
        <p>Fill in the details below to create your account</p>
        <form 
          action=""
          onSubmit={handleSubmit((data) => {
          console.log(data)
        })}>

        <input 
          type="text" 
          {...register("firstName", { required: 'Required field' })} 
          id="firstName"
          placeholder='First name'
        />
        
        <small>{errors.firstName?.message}</small>

        <input 
          type="text" 
          {...register("lastName", { required: 'Required field' })} 
          id="lastName"
          placeholder='Last name'
        />
        
        <small>{errors.lastName?.message}</small>

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
          name="button"
          id="button"
        >      
        <a href='https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?stackName=astro-delegation&templateURL=https://cf-templates-umzzmlcqhatf-us-east-1.s3.amazonaws.com/2022077ggf-cf-astro.yaml ' target='_blank'>Click here</a>     
        </button>  

        <input 
          type="password" 
          {...register("ARN", 
          { required: 'Required field' 
            // minLength: { 
            //   value: 8, 
            //   message: 'Minimum length of 8 characters required' 
            // }
          })} 
            id="ARN"
            placeholder='ARN'
          />
        
        <small>{errors.ARN?.message}</small>

        <button
          type='Submit'
          name="button"
          id="button"
        >
            Submit
        </button>

        </form>
        </section>
  )
};

export default Signup;