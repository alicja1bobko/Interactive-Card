import React, { useState } from "react";
import { Hero } from "./components/hero";
import { CardForm } from "./components/card-form";
import { FormInput } from "./interface/schema/form-input";


function App() {
  const [formData, setFormData] = useState<FormInput>({
    nameSurname: "",
    cardNumber: "",
    month: null,
    year: null,
    cvc: null,
  });

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

  return (
    <main className="App">
      <Hero formData={formData} />
      <CardForm handleInput={handleInput} />
    </main>
  );
}

export default App;
