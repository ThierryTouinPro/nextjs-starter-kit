import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";

export default function RadioGroupUI({ label, name, options, icon }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl component="fieldset">
      <div className="d-flex align-items-center gap-3">
        {/* Label et icône alignés à gauche */}
        <label className="d-flex align-items-center gap-2">
          <span className="d-flex align-items-center">{icon}</span>
          <span className="d-flex align-items-center mt-1">{label} :</span>
          <span className="text-danger">*</span>
        </label>
        {/* RadioGroup pour gérer correctement la sélection */}
        <Controller
          name={name}
          control={control}
          rules={{ required: "Ce champ est requis" }}
          render={({ field }) => (
            <RadioGroup row {...field} value={field.value || ""}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                  className="d-flex align-items-center"
                />
              ))}
            </RadioGroup>
          )}
        />
      </div>
      {/* Affichage des erreurs */}
      {errors[name] && (
        <span className="error text-danger">{errors[name].message}</span>
      )}
    </FormControl>
  );
}
