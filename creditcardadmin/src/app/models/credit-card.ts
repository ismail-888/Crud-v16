export interface CreditCard {
    id:number | undefined;
    name:string;
    description:string;
    bankName:string;
    maxCredit:number;
    interestRate:number;
    active:boolean;
    recommendScore:string;
    annualFee:number;
    termsAndConditions:string;
    createdDate:string;
    updateDate:string
}
