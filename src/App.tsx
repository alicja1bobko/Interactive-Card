import React, { useState } from "react";
import { Hero } from "./components/hero";
import { CardForm } from "./components/card-form";

function App() {
  const [formData, setFormData] = useState({
    nameSurname: null,
    cardNumber: null,
    month: null,
    year: null,
    cvc: null,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="App">
      <Hero />
      <CardForm handleInput={handleInput} />
    </main>
  );
}

export default App;
