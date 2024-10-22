import React, { useState } from 'react'
import { Grid, FromContainer, Wrapper, Text } from "./AddEmployee.styles";
import { useNavigate } from 'react-router-dom';
import upload from '../Assets/placeholder.svg'

const AddEmployee = () => {

    const navigate = useNavigate(); 

    const [image, setImage] = useState(false)
    const [msg, setMsg] = useState('')
    const [error, setErrors] = useState({})
    const ImageHandler = (e) => {
        setImage(e.target.files[0])
    }

    const validateEmployeeData = () => {
        let tempError = {}
        let isValid = true

        if(!employeeData.name){
            tempError['name'] = 'name is required';
            isValid = false
        }
        if(!employeeData.email){
            tempError['email'] = 'valid email id requried';
            isValid = false
        }
        if(!employeeData.phone){
            tempError['phone'] = 'valid 10 digit phone number required';
            isValid = false
        }
        if(!employeeData.role){
            tempError['role'] = 'enter your role';
            isValid = false
        }
        if(!employeeData.joiningdate){
            tempError['joiningdate'] = 'enter your joining date';
            isValid = false
        }
        if(!employeeData.dateofbirth){
            tempError['dateofbirth'] = 'enter your birth date';
            isValid = false
        }
        if(!employeeData.aadharno){
            tempError['aadharno'] = 'enter your aadhar no';
            isValid = false
        }
        if(!employeeData.address){
            tempError['address'] = 'enter your address';
            isValid = false
        }

        setErrors(tempError);
        return isValid
    }

    const [employeeData, setEmployeeData] = useState({
        name:'',
        image:'',
        email:'',
        phone:'',
        role:'',
        joiningdate:'',
        dateofbirth:'',
        aadharno:'',
        address:''
    })

    const changeHandler = (e) => {
        setEmployeeData({...employeeData,[e.target.name]:e.target.value})
    }

    const AddEmployee = async () => {

        if (!validateEmployeeData()) {
            return;
          }

        let responseData
        let employeeimage = employeeData
        let formData = new FormData()
        formData.append('employeeimage', image)
        await fetch('https://employeeslist-qa3j.onrender.com/upload',{
            method:'POST',
            headers:{
                Accept:'application/json'
            },
            body:formData,
        }).then((response)=> response.json())
          .then((data)=> responseData = data)
          .catch((error) => alert(error))
        
        if(responseData.success){
            employeeimage.image = responseData.image_url
            await fetch('https://employeeslist-qa3j.onrender.com/addemployee',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },

                body:JSON.stringify(employeeimage),

            }).then((response) => {
                if (!response.ok) throw new Error('Failed to add employee');
                return response.json();
              })
              .then((data) => {
                if (data.success) {
                    setMsg('Employee Details Added');
                    setTimeout(() => {
                      navigate('/employeetable'); 
                    }, 2500);
                  } else {
                    setMsg('Failed to added employee details');
                  }
              })
              .catch((error) => {
                alert('Error adding employee');
                console.error(error);
              });
        }

    }
  
  return (
    <>
    <FromContainer>
        <Wrapper>
            <Grid>
                
                <div className='formData'>
                    <div className="forminput">
                        <label htmlFor="productImage">
                            <img src={image?URL.createObjectURL(image):upload} alt="" />
                        </label>
                        <input onChange={ImageHandler} type="file" name="image" id="productImage" hidden />
                        <span>Choose your Image</span>
                    </div>
                </div>
                <div className='formData'>
                    <Text>Add Employee</Text>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <div className="inputCell">
                            <input value={employeeData.name} onChange={changeHandler} id="name" type="text" name="name" placeholder='Name:' />
                            {error.name && <span className="error">{error.name}</span>}
                        </div>
                    </div>
                    <div className="form-group d-grid">
                        <div className="g--cell">
                            <label htmlFor="email">Email ID:</label>
                            <div className="inputCell">
                                <input value={employeeData.email} onChange={changeHandler} id="email" type="email" name="email" placeholder='Email:' />
                                {error.email && <span className="error">{error.email}</span>}
                            </div>
                        </div>
                        <div className="g--cell">
                            <label htmlFor="phone">Phone:</label>
                            <div className="inputCell">
                                <input value={employeeData.phone} onChange={changeHandler} id="phone" type="tel" name="phone" placeholder='Phone:' />
                                {error.phone && <span className="error">{error.phone}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role:</label>
                        <div className="inputCell">
                            <input value={employeeData.role} onChange={changeHandler} id="role" type="text" name="role" placeholder='Role:' />
                            {error.role && <span className="error">{error.role}</span>}
                        </div>
                    </div>
                    <div className="form-group d-grid">
                        <div className="g--cell">
                            <label htmlFor="joiningdate">Joining Date:</label>
                            <div className="inputCell">
                                <input value={employeeData.joiningdate} onChange={changeHandler} id="joiningdate" type="text" name="joiningdate" placeholder='Joining Date:' />
                                {error.joiningdate && <span className="error">{error.joiningdate}</span>}
                            </div>
                        </div>
                        <div className="g--cell">
                            <label htmlFor="dateofbirth">Date of Birth:</label>
                            <div className="inputCell">
                                <input value={employeeData.dateofbirth} onChange={changeHandler} id="dateofbirth" type="text" name="dateofbirth" placeholder='Date of Birth:' />
                                {error.dateofbirth && <span className="error">{error.dateofbirth}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="aadharno">Aadhar no:</label>
                        <div className="inputCell">
                            <input value={employeeData.aadharno} onChange={changeHandler} id="aadharno" type="text" name="aadharno" placeholder='Aadhar no:' />  
                            {error.aadharno && <span className="error">{error.aadharno}</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <div className="inputCell">
                            <input value={employeeData.address} onChange={changeHandler} id="address" type="text" name="address" placeholder='Address:' />
                            {error.address && <span className="error">{error.address}</span>}
                        </div>
                    </div>
                    <button onClick={()=>AddEmployee()} type="submit" className='submitBtn'>Submit</button>
                    {msg && <h4 className="successMsg">{msg}</h4>}
                </div>
            </Grid>
        </Wrapper>
    </FromContainer>
    </>
  )
}

export default AddEmployee