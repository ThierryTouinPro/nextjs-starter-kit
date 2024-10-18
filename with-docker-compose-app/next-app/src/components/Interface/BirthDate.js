import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BirthDateInput({ name, placeholder }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-3">
      <label>Date de Naissance</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: "Date de naissance est requise" }}
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={field.onChange}
            dateFormat="dd/MM/yyyy"
            className="text-dark"
          />
        )}
        placeholderText={placeholder}
      />
      {errors[name] && (
        <span className="error text-danger">{errors[name].message}</span>
      )}
    </div>
  );
}
