import React from "react";
import { useFormContext } from "react-hook-form";

export default function RadioGroup({ label, name, options, icon }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="d-flex align-items-center gap-5">
      <label className="d-flex align-items-center gap-2">
        {icon} {label} : <span className="text-danger">*</span>
      </label>
        {options.map((option) => (
          <label key={option.value} className="d-flex align-items-center gap-2 mt-2 mb-2">
            <span>{option.label}</span>
            <input
              type="radio"
              name={name}
              value={option.value}
              {...register(name, { required: "Ce champ est requis" })}
            />
          </label>
        ))}
      </div>
      {errors[name] && (
        <span className="error text-danger">{errors[name].message}</span>
      )}
    </>
  );
}
