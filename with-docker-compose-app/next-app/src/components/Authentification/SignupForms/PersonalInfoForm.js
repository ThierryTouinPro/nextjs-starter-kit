import React from "react";
import { useFormContext } from "react-hook-form";
import RadioGroup from "../../Interface/RadioGroup";
import Input from "../../Interface/Input";
import BirthDateInput from "../../Interface/BirthDateInput";

export default function PersonalInfoForm() {
  const options = [
    { value: "Mr", label: "Mr" },
    { value: "Mme", label: "Mme" },
  ];
  const { handleSubmit } = useFormContext();

  return (
    <div>
      <RadioGroup name="gender" options={options} />
      <Input name="firstName" label="Prénom" type="text" placeholder="Prénom" />
      <Input name="lastName" label="Nom" type="text" placeholder="Nom" />
      <BirthDateInput name="dateDeNaissance" placeholder="31/12/1990" />
      <Input
        name="phone"
        label="Numéro Téléphone"
        type="tel"
        placeholder="+33 7 22 33 44 55"
        validations={{
          pattern: {
            value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
            message: "Numéro de téléphone invalide",
          },
        }}
      />
      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="Email"
        validations={{
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Email invalide",
          },
        }}
      />
    </div>
  );
}
