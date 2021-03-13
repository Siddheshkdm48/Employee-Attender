import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiUrl: any = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getAllEmployees(){
    return this.httpClient.get(this.apiUrl + "employees/");
  }

  addEmployee(data){
    return this.httpClient.post(this.apiUrl + "employees/add", data);
  }
  editEmployee(id,data){
    return this.httpClient.put(this.apiUrl + "employees/update/"+id , data);
  }
  deleteEmployee(data){
    return this.httpClient.delete(this.apiUrl + "employees/delete/"+data);
  }
  getEmpById(id){
    return this.httpClient.get(this.apiUrl + "employees/findById/"+id);
  }
}
