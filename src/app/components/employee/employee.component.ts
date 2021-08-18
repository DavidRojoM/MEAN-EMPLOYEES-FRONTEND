import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  constructor(public employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (res) => (this.employeeService.employees = res),
      (err) => console.log(err)
    );
  }

  addEmployee(form: NgForm) {
    this.employeeService.createEmployee(form.value).subscribe(
      (res) => {
        console.log(res);
        this.getEmployees();
        form.reset();
      },
      (err) => console.error(err)
    );
  }

  deleteEmployee(_id: any) {
    const res = confirm('Are you sure you want to delete it?');
    if (res) {
      this.employeeService.deleteEmployee(_id).subscribe(
        (res) => {
          console.log(res);
          this.getEmployees();
        },
        (err) => console.error(err)
      );
    }
  }
}
