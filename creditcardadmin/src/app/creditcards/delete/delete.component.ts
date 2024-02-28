import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CreditcardsService } from 'src/app/services/creditcards.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnDestroy{

  creditCardId!: Number;
  private destroy$:Subject<void>=new Subject<void>();

  constructor(private router: ActivatedRoute,
    private service: CreditcardsService,
    private route: Router,
    private matSnackBar:MatSnackBar
  ) {
    this.creditCardId = parseInt(this.router.snapshot.paramMap.get('id') || ''
    )

    // Delete Functionality
    this.service.deleteCreditCard(this.creditCardId)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
     this.showSuccessMessage('Credit Card Deleted Successfully')
      this.route.navigate(['/creditcards'])
    })
  }


  showSuccessMessage(message:string){
    this.matSnackBar.open(message,'Close',{
      duration:3000,
      horizontalPosition:'end',
      verticalPosition:'top',
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
