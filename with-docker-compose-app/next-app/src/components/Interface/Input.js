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
  flagIcon 
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <p>
      <label htmlFor={id} className="d-flex align-items-center gap-2">
       
        <span className="d-flex align-items-center">{icon}</span> 
        {flagIcon && <span className={`fi fi-${flagIcon}`}></span>}
        <span className="d-flex align-items-center mt-1">{label} :</span> 
        <span className="text-danger">*</span>
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        {...register(name, { required: `${label} est requis`, ...validations })}
        className="text-dark mt-2 mb-2"
      />
      {errors[name] && (
        <span className="error text-danger">{errors[name].message}</span>
      )}
    </p>
  );
}
