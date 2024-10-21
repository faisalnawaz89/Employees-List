require('dotenv').config();
const port = process.env.PORT || 4000;
const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('./server');
const { Schema } = require('mongoose');

app.use(express.json());
app.use(cors());

const hostUrl = process.env.PORT || `http://localhost:${port}`;

app.listen(port, async () => {
    try {
        console.log('Server is running on port', port);
    } catch (error) {
        console.log('Error occured', error)
    }
})

app.get('/', (req,res)=> {
    res.send('Express App is running')
})

const secret = process.env.JWT_SECRET;

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

app.use('/images', express.static(path.join(__dirname, 'upload/images')))
app.post('/upload', upload.single('employeeimage'),(req,res)=>{
    res.json({
        success:1,
        image_url: `${hostUrl}/images/${req.file.filename}`
    })
})

const Employee = mongoose.model('Employee', new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    joiningdate: {
        type: String,
        required: true
    },
    dateofbirth: {
        type: String,
        required: true
    },
    aadharno: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, { collection: 'emp_record' })); 


//Endpoint for Add Employee
app.post('/addemployee', async (req, res) => {
    let employee = await Employee.find({})
    let id
    if(employee.length > 0 ){
        let lastEmployeeArray = employee.slice(-1)
        let lastEmployee = lastEmployeeArray[0]
        id = lastEmployee.id + 1
    }else{
        id = 1
    }
    const emp_record = new Employee({
        id:id,
        name:req.body.name,
        image:req.body.image,
        email:req.body.email,
        phone:req.body.phone,
        role:req.body.role,
        joiningdate:req.body.joiningdate,
        dateofbirth:req.body.dateofbirth,
        aadharno:req.body.aadharno,
        address:req.body.address
    })
    console.log(emp_record)
    await emp_record.save()
    console.log('Saved')
    res.json({
        success:true,
        name:req.body.name,
    })
})

//Endpoint for All Employee data fetched
app.get('/allemployee', async(req, res)=>{
    let employee = await Employee.find({})
    console.log('All Employee Data Fetch')
    res.send(employee)
})

//Endpoint for remove employee data
app.post('/removeemployee', async(req, res)=>{
    await Employee.findOneAndDelete({id:req.body.id})
    console.log('Removed Employee id')
    res.json({
        success: true,
        name:req.body.name
    })
})

app.get('/employee/:id', async (req, res) => {
    const employeeId = req.params.id; // Get employee ID from the request params

    try {
        // Find employee by ID
        const employee = await Employee.findOne({ id: employeeId });

        // If employee not found, return 404
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found',
            });
        }

        // If employee is found, send the employee data
        res.json({
            success: true,
            data: employee,
        });
    } catch (error) {
        console.error('Error fetching employee by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching employee data',
        });
    }
});

//Endpoint for Edit Employee Data
app.put('/updatedemployee/:id', upload.single('employeeimage'), async (req, res) => {
    const employeeId = req.params.id
    const employeedata = {
        name:req.body.name,
        image:req.body.image,
        email:req.body.email,
        phone:req.body.phone,
        role:req.body.role,
        joiningdate:req.body.joiningdate,
        dateofbirth:req.body.dateofbirth,
        aadharno:req.body.aadharno,
        address:req.body.address
    }

    if (req.file) {
        const imageUrl = `/uploads/${req.file.filename}`; 
        updatedData.image = imageUrl; 
    }

    const employeedataupdate = await Employee.findOneAndUpdate(
        {id: employeeId}, employeedata, {new: true}
    )
    if(employeedataupdate){
        console.log('Employee data updated', employeedataupdate)
        res.json({
            success:true,
            message: 'Employee data updated successfully'
        })
    }else{
        res.status(404).json({
            success: false,
            message: 'Employee data not Found'
        })
    }
})

//Add Schema for Admin Registration
const User = mongoose.model('User', {

    username:{
        type:String,
        requried: true
    },
    email:{
        type:String,
        requried: true
    },
    password:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }

})

//Endpoint for User Signup
app.post('/signup', async(req,res)=>{
    let check = await User.findOne({username:req.body.username})
    if(check){
        return res.status(400).json({
            success: true,
            errors:'Existing user found with same username'
        })
    }
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    })

    await user.save()
    const data = {
        id:{
            id:user.id
        }
    }
    const token = jwt.sign(data, secret)
    res.json({success:true,token})
})

//Endpoint for User Login
app.post('/login', async(req,res)=>{
    let user = await User.findOne({username:req.body.username})
    if(user){
        const passCompare = req.body.password === user.password
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, secret)
            res.json({success:true, token})
        }else{
            res.json({
                success:false,
                errors: 'You have entrered wrong password!'
            })
        }
    }else{
        res.json({
            success: false,
            errors: 'Username you have entered not match'
        })   
    }
})