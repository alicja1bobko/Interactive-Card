import React from 'react';
import { Hero } from "./components/hero";
import { CardForm } from "./components/card-form";




function App() {
  // const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.name === "cardNumber" && e.target.value) {
  //     e.target.value = e.target.value
  //       .replace(/\s/g, "")
  //       .replace(/(.{4})/g, "$1 ")
  //       .trim()
  //       .slice(0, 19);
  //   }
  // };

  return (
    <main className="App">
      <Hero />
      <CardForm />
    </main>
  );
}

export default App;
