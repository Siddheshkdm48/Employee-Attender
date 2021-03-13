import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Form, } from '@angular/forms';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  FormEmployee: FormGroup;
  EditEmployee: FormGroup;
  allEmp: any;
  Emp: any;
  EmpID: any;

  constructor( private serv: CrudService, private fb: FormBuilder ){}
  ngOnInit(){
    
    this.getallemp();
    this.FormEmployee = this.fb.group({
        name: [''],
        age: [''],
        date: Date.now(),
        attended: ['']
    })
    this.EditEmployee = this.fb.group({
      name: [''],
      age: [''],
      date: Date.now(),
      attended: ['']
  })
  }

  getallemp(){
    this.serv.getAllEmployees().subscribe(
      (data) => { 
        this.allEmp = data;
        console.log(data);
      }
    )
  }
  getempbyid(id: any){
    this.serv.getEmpById(id).subscribe(
      (data) => { 
        this.Emp = data;
        this.EmpID = this.Emp._id;
        this.EditEmployee.controls.name.setValue(this.Emp.name);
        this.EditEmployee.controls.age.setValue(this.Emp.age);
        if(this.Emp.attended == true){
          this.EditEmployee.controls.attended.setValue("Present");
        }else{
          this.EditEmployee.controls.attended.setValue("Absent");
        }
      }
    )
  }
  addEmp(){
    let x: Boolean;
    if(this.FormEmployee.controls.attended.value == "Present"){
      x = true;
    }else{
      x = false;
    }
    let data = Object.assign(this.FormEmployee.value);
    data['attended'] = x
    console.log("New Emp =>",data);
    this.serv.addEmployee(data).subscribe((data)=>{
      this.FormEmployee.reset();
      this.getallemp();
    },
    (error)=>{
      console.log("Something went Wrong!")
    }
    )
  }
  editemp(){
    let x: Boolean;
    if(this.EditEmployee.controls.attended.value == "Present"){
      x = true;
    }else{
      x = false;
    }
    let data = Object.assign(this.EditEmployee.value);
    data['attended'] = x;
    console.log("Data to be edited =>",data);
    this.serv.editEmployee(this.EmpID, data).subscribe((data)=>{
      console.log("edited data => ", data);
      this.EditEmployee.reset();
      this.getallemp();
    },
    (error)=>{
      console.log("Something went Wrong!")
    }
    )
  }
  delemp(id: any){
    console.log("deleted emp => ",id);
    this.serv.deleteEmployee(id).subscribe((data)=>{
    this.getallemp();
    },
    (error)=>{
      console.log("Something went Wrong!")
    }
    )
  }
}
