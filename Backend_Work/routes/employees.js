const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const Employee =  require('../models/Employee')



//Get all employee
router.get('/',(req,res) => {
    Employee.find().then(data =>{
        res.send(data);
    },
        ).catch(err => {
            console.log(err);
        })
});

//Get employee by id
router.get('/findById/:id',(req,res) => {
    Employee.findById({_id: req.params.id}).then(data =>{
        res.send(data);
    },
        ).catch(err => {
            console.log(err);
        })
});

// Add Employee
router.post('/add', (req,res) => {
    const emp = new Employee();
    emp.name= req.body.name;
    emp.age= req.body.age;
    emp.attended = req.body.attended;
    emp.save().then(data =>{
        res.send(data);
        console.log("Employee Saved!")
    },
        ).catch(err => {
            console.log(err);
        })
});

// Delete Employee
router.delete('/delete/:id', (req,res) => {
    var emp = req.params.id;

    Employee.deleteOne({_id : emp}).then(data =>{
        res.send(data);
    })  
    .catch(err => {
        console.log(err);
    })
    
})

//Update emp

router.put('/update/:id', (req,res) => {
    var emp = req.params.id;

    var updated = Employee.updateOne({_id : emp}, {name: req.body.name, age: req.body.age, attended: req.body.attended}).then(data =>{
        res.send(data);
        //res.json(updated);
    })  
    .catch(err => {
        console.log(err);
    })
    
})




 module.exports = router;