import { Link } from "react-router-dom";
import { Wrapper, Text, Table, TableHead, TableRow, TableData, TitleHeader } from "./Employee.styles";
import React, { useEffect, useState } from 'react'

const EmployeeTable = () => {

    const [allemployee, setAllEmployee] = useState([]) 

    const handleAllEmployeeAPI = async () => {
        await fetch('https://employeeslist-qa3j.onrender.com/allemployee')
        .then((response)=> response.json())
        .then((data)=> setAllEmployee(data))
        .catch((error)=> console.error('Issue fetching employee data', error))
        console.log(data)
    }

    useEffect(()=>{
        handleAllEmployeeAPI()
    },[])

    const removeEmployee = async (id) => {
        await fetch('https://employeeslist-qa3j.onrender.com/removeemployee',{
            method: 'POST',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
        })
        
        await handleAllEmployeeAPI()
    }

  return (
    <Wrapper>
        <TitleHeader>
            <Text>Employee List</Text>
            <Text>
                <Link className="addbtn" to="/addemployee">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={32}
                    height={32}
                    viewBox="0 0 24 24"
                    style={{ fill: "rgba(0, 0, 0, 1)", transform: "", msfilter: "" }}
                    >
                    <path d="M13 9h-2v3H8v2h3v3h2v-3h3v-2h-3z" />
                    <path d="M20 5h-8.586L9.707 3.293A.996.996 0 0 0 9 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z" />
                </svg>
                <span>ADD</span>
                </Link>
            </Text>
        </TitleHeader>
        <Table>
            <TableRow>
                <TableHead>No:</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email Id</TableHead>
                <TableHead>Phone no</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joining Date</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Aadhar no</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Remove</TableHead>
                <TableHead>Edit</TableHead>
            </TableRow>

            {allemployee.map((empdata, index)=>{

                    const { id, name, image, email, phone, role, joiningdate, dateofbirth, aadharno, address} = empdata
                    return <>
                    <TableRow key={index}>
                        <TableData>{index + 1}</TableData>
                        <TableData><img className='empImg' src={image} alt={name} /></TableData>
                        <TableData>{name}</TableData>
                        <TableData>{email}</TableData>
                        <TableData>{'+91'} {phone}</TableData>
                        <TableData>{role}</TableData>
                        <TableData>{joiningdate}</TableData>
                        <TableData>{dateofbirth}</TableData>
                        <TableData>{aadharno}</TableData>
                        <TableData>{address}</TableData>
                        <TableData><span onClick={()=>{removeEmployee(id)}}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dd0f00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></span></TableData>
                        <TableData>
                            <Link to={`/editemployee/${id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0000FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 0 1 4 4L7 21H3v-4L17 3z"></path></svg>
                            </Link>    
                        </TableData>
                    </TableRow>
                    </>
                })}
        </Table>
    </Wrapper>
  )
}

export default EmployeeTable