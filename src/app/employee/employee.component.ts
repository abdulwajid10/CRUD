import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';

//to save response value in Employee array
import { EmployeeService } from '../shared/employee.service';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']

})
export class EmployeeComponent implements OnInit {
  answer = "";
  constructor(public employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.refereshEmployeeList();
  }

  //to reset Form
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: null
    }
  }

  //to insert records
  onSubmit(form: NgForm) {
    //Insert new record if id is empty
    if (form.value._id == "") {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.resetForm();
        this.refereshEmployeeList();
        alert("Saved Succesfully");

      });
    }

    //update record if id field is not empty
    else {
      this.employeeService.updateEmployee(form.value).subscribe((res) => {
        this.resetForm();
        alert("Updated successfully");
        this.refereshEmployeeList();
      })
    }
  }

  //Fetch all employee record in table
  refereshEmployeeList() {
    this.employeeService.getAllEmployee().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    })
  }

  //Edit employee record
  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  //Delete Employee Record
  onDelete(_id: string, form: NgForm) {
    console.log(_id);
    if (confirm("Are you sure you want to delete this record?") == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refereshEmployeeList();
        this.resetForm(form);
        alert("Record deleted succesfully");
      });
    }

  }

}
