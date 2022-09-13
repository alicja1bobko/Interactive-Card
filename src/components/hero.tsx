import React from "react";
import "./hero.scss";
import { FormInput } from "../interface/schema/form-input";

interface FormProps {
  formData: FormInput;
}

export const Hero: React.FC<FormProps> = ({ formData }) => {
  return (
    <div className="card-hero">
      <div id="card-front">
        <span id="card-number">
          {formData.cardNumber || "0000 0000 0000 0000"}
        </span>
        <div id="card-personal-data">
          <span>{formData.nameSurname || "Jane Appleseed"}</span>
          <span>
            {formData.month
              ? formData.month < 10
                ? `0${formData.month}`
                : formData.month
              : "00"}
            /{formData.year || "00"}
          </span>
        </div>
      </div>
      <div id="card-back">
        <span>{formData.cvc || "000"}</span>
      </div>
    </div>
  );
};
