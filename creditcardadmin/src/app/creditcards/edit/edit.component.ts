import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CreditCard } from 'src/app/models/credit-card';
import { CreditcardsService } from 'src/app/services/creditcards.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  editCreditCardForm!: FormGroup;
  creditCardData: CreditCard | null = null;
  private snackBar!: MatSnackBar
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private builder: FormBuilder,
    private service: CreditcardsService,
    private route: ActivatedRoute,
  ) {

    this.editCreditCardForm = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: ['', Validators.required],
      // bankName: ['', Validators.required],
      maxCredit: ['', Validators.required],
      interestRate: ['', Validators.required],
      // active: [false, Validators.required],
      recommendScore: [null, Validators.required],
      annualFee: ['', Validators.required],
      // termsAndConditions: ['', Validators.required],
      // createdDate: ['', Validators.required],
      // updateDate: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get("id") || '')

    if (id !== 0) {
      this.service.getCreditCardById(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.creditCardData = data;
          this.editCreditCardForm.patchValue(this.creditCardData)
        })
    }

  }

  onSubmit() {
    if (this.editCreditCardForm.valid) {
      const updateFormData: CreditCard = this.editCreditCardForm.value

      this.service.updateCreditCard(updateFormData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.showSuccessMessage("Credit Card Updated Successfully")
        })
    }
  }

  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
