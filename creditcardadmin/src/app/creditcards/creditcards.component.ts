import { Component, ViewChild } from '@angular/core';
import { CreditCard } from '../models/credit-card';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CreditcardsService } from '../services/creditcards.service';


@Component({
  selector: 'app-creditcards',
  templateUrl: './creditcards.component.html',
  styleUrls: ['./creditcards.component.scss']
})
export class CreditcardsComponent {

  creditcards: CreditCard[] = [];
  creditCardMaximumAmount:number=0
  creditCardMaxInterest:number=0
  constructor(private service: CreditcardsService) {
    this.service.getCreditCards().subscribe((data: CreditCard[]) => {
      this.creditcards = data;
      this.dataSource = new MatTableDataSource(this.creditcards)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

        this.calculatMatrix();

    })
  }

  dataSource=new MatTableDataSource(this.creditcards)
  displayColumns = ['select', 'id', 'name', 'description', 'bankName', 'maxCredit', 'interestRate', 'active', 'recommendScore','actions']



  selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  selectHandler(row: CreditCard) {
    this.selection.toggle(row as never);
  }

  calculatMatrix(){
    this.creditCardMaximumAmount=this.creditcards.filter(card=>card.maxCredit> 3000).length;
    this.creditCardMaxInterest=this.creditcards.filter(card=>card.interestRate> 7).length;
  }

}
