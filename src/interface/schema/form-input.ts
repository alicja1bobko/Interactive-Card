type Nullable<T> = T | undefined | null;
export interface FormInput {
  nameSurname: string;
  cardNumber: string;
  month: Nullable<number>;
  year: Nullable<number>;
  cvc: Nullable<number>;
}
