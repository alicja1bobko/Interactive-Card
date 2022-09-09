import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./card-form.scss";

interface FormInput {
  nameSurname: string;
  cardNumber: string;
  month: number;
  year: number;
  cvc: number;
}

export const CardForm = () => {
  const { register, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  return (
    <form className="card-form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Cardholder name</label>
        <div className="wrapper--rounded">
          <input
            placeholder="e.g. Jane Appleseed"
            {...register("nameSurname", {
              pattern: /^[a-z ,.'-]+$/,
              required: true,
            })}
          />
        </div>
      </div>
      <div>
        <label htmlFor="card-number">card number</label>
        <div className="wrapper--rounded">
          <input
            type="text"
            placeholder="e.g. 1234 5678 9123 0000"
            {...register("cardNumber", {
              pattern: /(\d{4}[\s|-]?\d{4}[\s|-]?\d{4}[\s|-]?\d{4})/,
              required: true,
            })}
          />
        </div>
      </div>
      <div id="mmyy-cvc">
        <div id="mmyy-cvc-labels">
          <label htmlFor="mm-yy">exp. date (mm/yy)</label>
          <label htmlFor="cvc">cvc</label>
        </div>
        <div id="mmyy-cvc-inputs">
          <div className="wrapper--rounded">
            <input
              placeholder="MM"
              className="mm-yy"
              type="number"
              {...register("month", { min: 1, max: 12, required: true })}
            />
          </div>
          <div className="wrapper--rounded">
            <input
              placeholder="YY"
              className="mm-yy"
              type="number"
              {...register("year", {
                min: new Date().getFullYear(),
                required: true,
              })}
            />
          </div>
          <div className="wrapper--rounded">
            <input
              placeholder="e.g. 012"
              className="cvc"
              type="number"
              {...register("cvc", { pattern: /\d{3}/, required: true })}
            />
          </div>
        </div>
      </div>
      <button type="submit">Confirm</button>
      {/* <input type="submit" /> */}
    </form>
  );
};
