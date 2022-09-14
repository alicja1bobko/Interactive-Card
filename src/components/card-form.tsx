/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import "./card-form.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "../interface/schema/form-input";
import { validationSchema } from "../interface/schema/validation-schema";

interface FormProps {
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAnimation: (arg: boolean) => void;
}

export const CardForm: React.FunctionComponent<FormProps> = ({
  handleInput,
  handleAnimation,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit((data) => {
    // alert(JSON.stringify(data));
    handleAnimation(true);
  });

  const handleErrorDisplay = () => {
    // button animation
    if (Object.keys(errors).length === 0) {
      const submitBtn = document.querySelector(".submit-btn");
      submitBtn?.classList.add("shake");
      submitBtn?.addEventListener("animationend", () =>
        submitBtn?.classList.remove("shake")
      );
    }
  };

  return (
    <div className="card">
      <form className="card-form" onSubmit={onSubmit}>
        {/* Cardholder Name  */}
        <div>
          <label htmlFor="name">Cardholder name</label>
          <div className="wrapper--rounded">
            <input
              type="text"
              id="nameSurname"
              className={errors.nameSurname ? "invalid--input-outline" : ""}
              aria-required="true"
              aria-invalid={errors.nameSurname ? "true" : "false"}
              placeholder="e.g. Jane Appleseed"
              {...register("nameSurname")}
              onChange={handleInput}
            />
          </div>
          {errors.nameSurname ? (
            <p className="input--error" role="alert">
              {errors.nameSurname.message}
            </p>
          ) : (
            <p className="input--error hidden"></p>
          )}
        </div>
        {/* Card Number */}
        <div>
          <label htmlFor="card-number">card number</label>
          <div className="wrapper--rounded">
            <input
              type="text"
              id="cardNumber"
              className={errors.cardNumber ? "invalid--input-outline" : ""}
              aria-required="true"
              aria-invalid={errors.cardNumber ? "true" : "false"}
              placeholder="e.g. 1234 5678 9123 0000"
              {...register("cardNumber")}
              onChange={handleInput}
            />
          </div>
          {errors.cardNumber ? (
            <p className="input--error" role="alert">
              {errors.cardNumber.message}
            </p>
          ) : (
            <p className="input--error hidden"></p>
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
                className={errors.month ? "invalid--input-outline" : ""}
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
                className={errors.year ? "invalid--input-outline" : ""}
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
                className={errors.cvc ? "invalid--input-outline" : ""}
                type="text"
                {...register("cvc")}
                onChange={handleInput}
              />
            </div>
          </div>
          <div id="mmyy-cvc-errors">
            {errors.month ? (
              <p className="input--error" id="month-error" role="alert">
                {errors.month.message}
              </p>
            ) : (
              <p className="input--error hidden"></p>
            )}
            {errors.year ? (
              <p className="input--error" id="year-error" role="alert">
                {errors.year.message}
              </p>
            ) : (
              <p className="input--error hidden"></p>
            )}
            {errors.cvc ? (
              <p className="input--error" id="cvc-error" role="alert">
                {errors.cvc.message}
              </p>
            ) : (
              <p className="input--error hidden"></p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="submit-btn"
          onClick={handleErrorDisplay}
        >
          Confirm
        </button>
      </form>
    </div>
  );
};
