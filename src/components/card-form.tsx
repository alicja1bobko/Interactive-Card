/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback } from "react";
import creditCardType, { getTypeInfo, types as type } from "credit-card-type";
import valid from "card-validator"; //import statement
import { useForm } from "react-hook-form";
import "./card-form.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormInput {
  nameSurname: string;
  cardNumber: string;
  month: number;
  year: number;
  cvc: number;
}

const validationSchema = yup.object().shape({
  nameSurname: yup
    .string()
    .required("Name is required")
    .min(5, "Name is too short")
    .matches(/^[A-Z]{1}[a-z]+[ ]{1}[A-Z]{1}[a-z]+$/, "Incorrect format"),
  cardNumber: yup
    .string()
    .required("Number is required")
    .matches(/(\d{4}[\s|-]?\d{4}[\s|-]?\d{4}[\s|-]?\d{4})/, "Incorrect format")
    .test("test-number", "Is valid", (value) => {
      var numberValidation = valid.number(value);
      var cardType = numberValidation.card?.niceType;
      var cvcLength = numberValidation.card?.code.size;
      return valid.number(value).isValid;
    }),
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

export const CardForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data));
  });

  return (
    <form className="card-form" onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Cardholder name</label>
        <div className="wrapper--rounded">
          <input
            type="text"
            id="nameSurname"
            aria-required="true"
            aria-invalid={errors.nameSurname ? "true" : "false"}
            placeholder="e.g. Jane Appleseed"
            {...register("nameSurname")}
          />
        </div>
        {errors.nameSurname && (
          <p className="input--error" role="alert">
            {errors.nameSurname.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="card-number">card number</label>
        <div className="wrapper--rounded">
          <input
            type="text"
            id="cardNumber"
            aria-required="true"
            aria-invalid={errors.cardNumber ? "true" : "false"}
            placeholder="e.g. 1234 5678 9123 0000"
            {...register("cardNumber")}
          />
        </div>
        {errors.cardNumber && (
          <p className="input--error" role="alert">
            {errors.cardNumber.message}
          </p>
        )}
      </div>
      <div id="mmyy-cvc">
        <div id="mmyy-cvc-labels">
          <label htmlFor="mm-yy">exp. date (mm/yy)</label>
          <label htmlFor="cvc">cvc</label>
        </div>
        <div id="mmyy-cvc-inputs">
          <div className="wrapper--rounded">
            <input
              id="month"
              aria-required="true"
              aria-invalid={errors.month ? "true" : "false"}
              placeholder="MM"
              className="mm-yy"
              type="number"
              {...register("month")}
            />
          </div>
          {errors.month && (
            <p className="input--error" role="alert">
              {errors.month.message}
            </p>
          )}
          <div className="wrapper--rounded">
            <input
              id="year"
              aria-required="true"
              aria-invalid={errors.year ? "true" : "false"}
              placeholder="YY"
              className="mm-yy"
              type="number"
              {...register("year")}
            />
            {errors.year && (
              <p className="input--error" role="alert">
                {errors.year.message}
              </p>
            )}
          </div>
          <div className="wrapper--rounded">
            <input
              id="cvc"
              aria-required="true"
              aria-invalid={errors.cvc ? "true" : "false"}
              placeholder="e.g. 012"
              className="cvc"
              type="text"
              {...register("cvc")}
            />
          </div>
          {errors.cvc && (
            <p className="input--error" role="alert">
              {errors.cvc.message}
            </p>
          )}
        </div>
        <div id="mmyy-cvc-errors"></div>
      </div>
      <button type="submit">Confirm</button>
    </form>
  );
};
