import React from "react";
import { useFormContext } from "react-hook-form";

export default function Input({
  name,
  label,
  type,
  id,
  placeholder,
  validations,
  icon,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <p>
      <label htmlFor={id}>
        {icon} {label} : <span className="text-danger">*</span>
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        {...register(name, { required: `${label} est requis`, ...validations })}
        className="text-dark"
      />
      {errors[name] && (
        <span className="error text-danger">{errors[name].message}</span>
      )}
    </p>
  );
}
