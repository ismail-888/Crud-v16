import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditCard } from '../models/credit-card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditcardsService {

  private apiUrl='http://localhost:3000/creditcards';
  constructor(private http:HttpClient) { }

  // Create new Credit Card
  createCreditCard(creditCard:CreditCard):Observable<CreditCard>{
    return this.http.post<CreditCard>(this.apiUrl,creditCard)
  }

  // Get All Credit Cards
  getCreditCards():Observable<CreditCard[]>{
    return this.http.get<CreditCard[]>(this.apiUrl)
  }

  // Get Specific Credit card
  getCreditCardById(id:Number):Observable<CreditCard>{
    const url=`${this.apiUrl}/${id}`
    return this.http.get<CreditCard>(url);
  }

  // Update Functionality
  updateCreditCard(creditCard:CreditCard):Observable<CreditCard>{
    const url=`${this.apiUrl}/${creditCard.id}`
    return this.http.put<CreditCard>(url,creditCard);
  }

// Delete Functionality
  deleteCreditCard(id:Number):Observable<void>{
    const url=`${this.apiUrl}/${id}`
    return this.http.delete<void>(url)
  }

}
