import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, FromContainer, Wrapper, Text } from "../EditEmployee/EditEmployee.styles"

const EditEmployee = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [msg, setMsg] = useState('')
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    joiningdate: '',
    dateofbirth: '',
    aadharno: '',
    address: '',
    image: ''
  }); // Initialize all fields to empty strings

  const [image, setImage] = useState(null); // For storing the selected image file

  useEffect(() => {

    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`https://employeelist-owh1.onrender.com/${id}`);
        const result = await response.json();
    
        console.log('API Response:', result);
    
        if (result.success && result.data) {
          setEmployeeData(result.data); 
          setImage(result.data.image ? result.data.image : null);
          console.log('Employee Name:', result.data.name); 
        } else {
          console.log('Employee data not found');
        }
      } catch (error) {
        console.error('Error fetching employee data', error);
      }
    };
    
    
    fetchEmployeeData();
  }, [id]);

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]; 
    setImage(selectedImage);
  };

  const handleUpdate = async () => {
    try {
      let updatedEmployeeData = { ...employeeData };
      
      // Handle image upload if a new image is selected
      if (image && typeof image === 'object') {
        const formData = new FormData();
        formData.append('employeeimage', image);
  
        const imageUploadResponse = await fetch('https://employeelist-owh1.onrender.com/upload', {
          method: 'POST',
          body: formData,
        });
  
        const imageData = await imageUploadResponse.json();
  
        if (imageData.success) {
            updatedEmployeeData.image = imageData.image_url; 
        } else {
          setMsg('Image upload failed!');
          return;
        }
      }
  
      // Send updated employee data
      const response = await fetch(`https://employeelist-owh1.onrender.com/updatedemployee/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployeeData),
      });
  
      const result = await response.json();
  
      if (result.success) {
        setMsg('Employee Details added successfully');
          setTimeout(() => {
            navigate('/employeetable'); 
          }, 2500);
      } else {
        setMsg('Failed to update employee data');
      }
    } catch (error) {
      console.error('Error updating employee data:', error);
    }
  };
  

  return (
    <>
      <FromContainer>
        <Wrapper>
            <Grid>
              <div className="formData">
                <div className="forminput">
                  <label htmlFor="productImage">
                    <div className="img--wrapper">
                      <img src={image && typeof image === 'object' ? URL.createObjectURL(image) : employeeData.image} alt={employeeData.name} />
                      <div className="empImg--overlay"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 0 1 4 4L7 21H3v-4L17 3z"></path></svg></div>
                    </div>
                  </label>
                  <input onChange={handleImageChange} type="file" name="image" id="productImage" hidden />
                  <div className='emp--id'><strong>ID: {employeeData._id}</strong></div>
                </div>
              </div>
              <div className='formData'>
                {/* Image input field with preview */}
                <Text>Update Employee Details</Text>
                <div className="form-group"> 
                  <label htmlFor="name">Name:</label>
                  <input value={employeeData.name || ''} onChange={handleChange} id="name" type="text" name="name" placeholder='Name:' />
                </div>

                <div className="form-group d-grid">
                  <div className="g--cell">
                    <label htmlFor="email">Email ID:</label>
                    <input value={employeeData.email || ''} onChange={handleChange} id="email" type="email" name="email" placeholder='Email:' />
                  </div>
                  <div className="g--cell">
                    <label htmlFor="phone">Phone:</label>
                    <input value={employeeData.phone || ''} onChange={handleChange} id="phone" type="tel" name="phone" placeholder='Phone:' />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="role">Role:</label>
                  <input value={employeeData.role || ''} onChange={handleChange} id="role" type="text" name="role" placeholder='Role:' />
                </div>

                <div className="form-group d-grid">
                  <div className="g--cell">
                    <label htmlFor="joiningdate">Joining Date:</label>
                    <input value={employeeData.joiningdate || ''} onChange={handleChange} id="joiningdate" type="text" name="joiningdate" placeholder='Joining Date:' />
                  </div>
                  <div className="g--cell">
                    <label htmlFor="dateofbirth">Date of Birth:</label>
                    <input value={employeeData.dateofbirth || ''} onChange={handleChange} id="dateofbirth" type="text" name="dateofbirth" placeholder='Date of Birth:' />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="aadharno">Aadhar no:</label>
                  <input value={employeeData.aadharno || ''} onChange={handleChange} id="aadharno" type="text" name="aadharno" placeholder='Aadhar no:' />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input value={employeeData.address || ''} onChange={handleChange} id="address" type="text" name="address" placeholder='Address:' />
                </div>

                <button onClick={handleUpdate} className='submitBtn'>Update</button>
                {msg && <h4 className="successMsg">{msg}</h4>}
              </div>
          </Grid>
        </Wrapper>
      </FromContainer>
    </>
  );
};

export default EditEmployee;
