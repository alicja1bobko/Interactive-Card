import * as yup from "yup";
import valid from "card-validator"; //import statement
// import creditCardType, { getTypeInfo, types as type } from "credit-card-type";

export const validationSchema = yup.object().shape({
  nameSurname: yup
    .string()
    .required("Name is required")
    .min(5, "Name is too short")
    .matches(/^[A-Z]{1}[a-z]+[ ]{1}[A-Z]{1}[a-z]+$/, "Incorrect format"),
  cardNumber: yup
    .string()
    .required("Number is required")
    // .matches(/(\d{4}[\s|-]?\d{4}[\s|-]?\d{4}[\s|-]?\d{4})/, "Incorrect format")
    .test(
      "test-number",
      "Is not valid",
      (value) => valid.number(value).isValid
      //   var numberValidation = valid.number(value);
      //   var cardType = numberValidation.card?.niceType;
      //   var cvcLength = numberValidation.card?.code.size;
    ),
  month: yup
    .string()
    .required("Can't be blank")
    .test(
      "test-month",
      "Is not valid",
      (value) => valid.expirationMonth(value).isValid
    ),
  year: yup
    .string()
    .required("Can't be blank")
    .test(
      "test-year",
      "Is not valid",
      (value) => valid.expirationYear(value).isValid
    ),
  cvc: yup
    .string()
    .required("Can't be blank")
    .test("test-cvv", "Is not valid", (value) => valid.cvv(value).isValid),
});
