import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginBody, LoginContainer } from './Login.styles';


  const LoginSignup = () => {

    const navigate = useNavigate()
    const isAuthenticated = localStorage.getItem('auth-token'); 
    const [state, setState] = useState('Login')
    const [msg, setMsg] = useState('')
    const [formData, setFormdata] = useState({
        username: '',
        email:'',
        password: ''
    })
    const changeHandler = (e) => {
        setFormdata({...formData,[e.target.name]:e.target.value})
    }

    const signUp = async () => {
        // let responseData
        // await fetch('https://employeelist-owh1.onrender.com/signup',{
        //     method:'POST',
        //     headers:{
        //         Accept:'application/json',
        //         'Content-Type':'application/json'
        //     },
        //     body:JSON.stringify(formData),
        // }).then((response)=> response.json())
        // .then((data)=> responseData = data)
        // if(responseData.success){
        //     localStorage.setItem('auth-token', responseData.token)
        //     navigate('/employeetable')
        // }else{
        //     // setMsg(responseData.errors)
        //     alert(responseData.errors)
        // }
        setMsg('Singup temporarily disabled')
        setTimeout(()=>{
            setMsg('')
            setState('Login')
        },1500)

    }

    const Login = async () => {
        let responseData
        await fetch('https://employeelist-owh1.onrender.com/login',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        }).then((response)=> response.json())
        .then((data)=> responseData = data)
        if(responseData.success){
            localStorage.setItem('auth-token', responseData.token)
            setMsg('You have Successfully logged in')
            setTimeout(()=>{
                navigate('/employeetable')
            },2000)
        }else{
            setMsg(responseData.errors)
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
          navigate('/employeetable');
        }
    }, [isAuthenticated, navigate]);

  return (
        <>
        <LoginContainer>
            <LoginBody>
            <h1>{state}</h1>
            <div className="loginSignup-fields">
                {state === 'Sign Up'?<input value={formData.email} onChange={changeHandler} name="email" type="email" placeholder='Email ID'/>:""}
                <input value={formData.username} onChange={changeHandler} name="username" type="text" placeholder='Username:'/>
                <input value={formData.password} onChange={changeHandler} name="password" type="password" placeholder='Password' />
                <button onClick={()=>{state === 'Login'?Login():signUp()}}>Continue</button>
                {state === 'Login'?<p className="loginSignup-login">Create an account? <span className="login--link" onClick={()=>setState('Sign Up')}>Sign Up here!</span></p>:<p className="loginSignup-login">Already have an account? <span className="login--link" onClick={()=>setState('Login')}>Login here!</span></p>}
                {msg && <h4 className="successMsg">{msg}</h4>}
            </div>
            </LoginBody>
        </LoginContainer>
        </>
  )
}

export default LoginSignup