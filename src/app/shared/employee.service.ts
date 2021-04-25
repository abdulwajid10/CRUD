import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

selectedEmployee: Employee;
employees: Employee[];
baseURL = 'http://localhost:3000/employees';

  constructor(public http: HttpClient) { 

  }

  //api to insert new record
  postEmployee(emp: Employee){
    return this.http.post(this.baseURL , emp)
  }

  //api to get all records
  getAllEmployee(){
    return this.http.get(this.baseURL);
  }

    //api to update/Edit single record
  updateEmployee(emp: Employee){
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

    //api to delete single reord
  deleteEmployee(_id: string){
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
