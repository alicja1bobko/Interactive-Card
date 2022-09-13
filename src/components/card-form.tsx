/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import "./card-form.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "../interface/schema/form-input";
import { validationSchema } from "../interface/schema/validation-schema";

interface FormProps {
  // onSubmit: React.FormEventHandler;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// const handleSubmit = (e: React.FormEvent<CardFormElements>) => {
//   e.preventDefault();
// };

// interface FormElements extends HTMLFormControlsCollection {
//   nameSurname: HTMLInputElement;
//   cardNumber: HTMLInputElement;
//   month: HTMLInputElement;
//   year: HTMLInputElement;
//   cvc: HTMLInputElement;
// }

// interface CardFormElements extends HTMLFormElement {
//   readonly elements: FormElements;
// }

export const CardForm: React.FC<FormProps> = ({ handleInput }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit((data) => {
    // alert(JSON.stringify(data));
  });

  const handleErrorAnimation = () => {
    if (document.querySelectorAll(".input--error").length !== 0) {
      const submitBtn = document.querySelector(".submit-btn");
      submitBtn?.classList.add("shake");
      submitBtn?.addEventListener("animationend", () =>
        submitBtn?.classList.remove("shake")
      );
    }
  };

  return (
    <form className="card-form" onSubmit={onSubmit}>
      {/* Cardholder Name  */}
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
            onChange={handleInput}
          />
        </div>
        {errors.nameSurname && (
          <p className="input--error" role="alert">
            {errors.nameSurname.message}
          </p>
        )}
      </div>
      {/* Card Number */}
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
            onChange={handleInput}
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
          {/* Expiration Month */}
          <div className="wrapper--rounded">
            <input
              id="month"
              aria-required="true"
              aria-invalid={errors.month ? "true" : "false"}
              placeholder="MM"
              className="mm-yy"
              type="number"
              {...register("month")}
              onChange={handleInput}
            />
          </div>
          {/* Expiration Year */}
          <div className="wrapper--rounded">
            <input
              id="year"
              aria-required="true"
              aria-invalid={errors.year ? "true" : "false"}
              placeholder="YY"
              className="mm-yy"
              type="number"
              {...register("year")}
              onChange={handleInput}
            />
          </div>
          {/* CVC Field */}
          <div className="wrapper--rounded">
            <input
              id="cvc"
              aria-required="true"
              aria-invalid={errors.cvc ? "true" : "false"}
              placeholder="e.g. 012"
              className="cvc"
              type="text"
              {...register("cvc")}
              onChange={handleInput}
            />
          </div>
        </div>
        <div id="mmyy-cvc-errors">
          {errors.month && (
            <p className="input--error" id="month-error" role="alert">
              {errors.month.message}
            </p>
          )}
          {errors.year && (
            <p className="input--error" id="year-error" role="alert">
              {errors.year.message}
            </p>
          )}
          {errors.cvc && (
            <p className="input--error" id="cvc-error" role="alert">
              {errors.cvc.message}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="submit-btn"
        onClick={handleErrorAnimation}
      >
        Confirm
      </button>
    </form>
  );
};
