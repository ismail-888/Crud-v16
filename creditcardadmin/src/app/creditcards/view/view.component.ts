import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CreditCard } from 'src/app/models/credit-card';
import { CreditcardsService } from 'src/app/services/creditcards.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnDestroy {



  creditCardDetails!: CreditCard;
  creditCardId!: Number;
  private snackBar!: MatSnackBar
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private service: CreditcardsService,
    private router: ActivatedRoute) {

    this.creditCardId = parseInt(this.router.snapshot.paramMap.get("id") || '');

    this.service.getCreditCardById(this.creditCardId)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: CreditCard) => {
      this.showSuccessMessage('Credit Card Loaded Successfully')
      this.creditCardDetails = data;
    })
  }

  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
