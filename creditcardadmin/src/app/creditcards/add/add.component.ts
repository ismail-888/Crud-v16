import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreditCard } from 'src/app/models/credit-card';
import { CreditcardsService } from 'src/app/services/creditcards.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnDestroy {

  private subscription!:Subscription

  constructor(private service:CreditcardsService,
              private router:Router,){ }


  newCreditCard:CreditCard={
    id:undefined,
    name:'',
    description:'',
    bankName:"",
    maxCredit:5000,
    interestRate:12,
    active:true,
    recommendScore:"100-200",
    annualFee:12,
    termsAndConditions:"Terms and conditions for the credit card",
    createdDate:Date(),
    updateDate:Date()

  }

  saveCreditCard(){
   this.subscription= this.service.createCreditCard(this.newCreditCard).subscribe(data=>{
      alert('credit card added');
      this.router.navigate(['creditcards'])
    })
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }


}
