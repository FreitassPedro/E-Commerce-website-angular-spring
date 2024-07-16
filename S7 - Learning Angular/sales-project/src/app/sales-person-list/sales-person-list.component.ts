import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrl: './sales-person-list.component.css'
})
export class SalesPersonListComponent implements OnInit {
  

  salesPersonList: SalesPerson[] = [
    new SalesPerson("Anup", "Kumar", "anup@email.com", 50000),
    new SalesPerson("John", "Doe", "john@email.com", 40000),
    new SalesPerson("Claire", "Murphy", "claire@email.com", 90000),
    new SalesPerson("Mai", "Troung", "mai@email.com", 60000)
  ];

  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
