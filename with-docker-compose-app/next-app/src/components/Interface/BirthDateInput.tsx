import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


interface BirthDateInputProps {
  name: string;
  placeholder: string;
  icon: React.ReactNode;
}

export default function BirthDateInput({
  name,
  placeholder,
  icon,
}: BirthDateInputProps): JSX.Element {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const today = new Date();

  return (
    <div className="mb-3">
      <label className="d-flex align-items-center gap-2">
        <span className="d-flex align-items-center">{icon}</span> 
        <span className="d-flex align-items-center mt-1">Date de Naissance :</span> 
        <span className="text-danger">*</span>
      </label>
      <div className="mt-2 mb-2">
        <Controller
          name={name}
          control={control}
          rules={{
            required: "Date de naissance est requise",
            validate: {
              isValid: (value) =>
                (value instanceof Date && !isNaN(value.getTime())) || "Date invalide",
            },
          }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={field.onChange}
              dateFormat="dd/MM/yyyy"
              className="text-dark"
              placeholderText={placeholder}
              maxDate={today}
            />
          )}
        />
      </div>
      {errors[name] && (
        <p className="error text-danger">{(errors[name]?.message as string) || ''}</p>
      )}
    </div>
  );
}
