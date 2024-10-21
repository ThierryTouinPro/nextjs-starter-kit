import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BirthDateInput({ name, placeholder, icon }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-3">
      <label>
        {" "}
        {icon} Date de Naissance : <span className="text-danger">*</span>
      </label>
      <div>
        <Controller
          name={name}
          control={control}
          rules={{
            required: "Date de naissance est requise",
            validate: {
              isValid: (value) =>
                (value instanceof Date && !isNaN(value)) || "Date invalide",
            },
            minDate: {
              value: new Date("1900-01-01"),
              message: "La date doit être après le 1er janvier 1900",
            },
            maxDate: {
              value: new Date(),
              message: "La date ne peut pas être dans le futur",
            },
          }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={field.onChange}
              dateFormat="dd/MM/yyyy"
              className="text-dark"
              placeholderText={placeholder}
            />
          )}
        />
      </div>
      {errors[name] && (
        <p className="error text-danger">{errors[name].message}</p>
      )}
    </div>
  );
}
