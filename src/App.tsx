import React, { useState } from "react";
import { Hero } from "./components/hero";
import { CardForm } from "./components/card-form";
import { FormInput } from "./interface/schema/form-input";
import ThankYouPage from "./components/card-thank-you";

const App: React.FunctionComponent = () => {
  const [formData, setFormData] = useState<FormInput>({
    nameSurname: "",
    cardNumber: "",
    month: null,
    year: null,
    cvc: null,
  });
  const [validate, setValidate] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "nameSurname" && e.target.value) {
      e.target.value = e.target.value.substring(0, 30);
    }
    if (e.target.name === "cardNumber" && e.target.value) {
      e.target.value = e.target.value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
    }
    if (e.target.name === "cvc") {
      e.target.value = e.target.value.substring(0, 4);
    }
    if (e.target.name === "month") {
      e.target.value = e.target.value.substring(0, 2);
    }
    if (e.target.name === "year") {
      e.target.value = e.target.value.substring(0, 2);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      nameSurname: "",
      cardNumber: "",
      month: null,
      year: null,
      cvc: null,
    });
    backgroundAnimation(false);
  };

  const backgroundAnimation = (validate: boolean): void => {
    let axis;
    window.matchMedia("(max-width: 750px)").matches
      ? (axis = "Y")
      : (axis = "X");
    let card: HTMLElement = document.getElementsByClassName(
      "card"
    )[0] as HTMLElement;
    card!.style.transform = `translate${axis}(50${axis === "Y" ? "vh" : "vw"})`;
    const bcg = document.querySelector(".App");
    bcg!.classList.add("bcg-slider");
    setTimeout(() => {
      setValidate(validate);
      bcg!.classList.remove("bcg-slider");
      card!.style.transform = "translate(0)";
    }, 500);
  };

  return (
    <main className="App">
      <Hero formData={formData} />
      {!validate ? (
        <CardForm
          handleInput={handleInput}
          handleAnimation={backgroundAnimation}
        />
      ) : (
        <ThankYouPage resetForm={resetForm} />
      )}
    </main>
  );
};

export default App;
