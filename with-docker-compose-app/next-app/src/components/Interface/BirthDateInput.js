import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BirthDateInput({ name, placeholder, icon }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const today = new Date(); // Date d'aujourd'hui

  return (
    <div className="mb-3">
      <label className="d-flex align-items-center gap-2">
        {/* {icon}  */}
        Date de Naissance : <span className="text-danger">*</span>
      </label>
      <div className="mt-2 mb-2">
        <Controller
          name={name}
          control={control}
          rules={{
            required: "Date de naissance est requise",
            validate: {
              isValid: (value) =>
                (value instanceof Date && !isNaN(value)) || "Date invalide",
            },
          }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={field.onChange}
              dateFormat="dd/MM/yyyy"
              className="text-dark"
              placeholderText={placeholder}
              maxDate={today} // Empêche la sélection de dates dans le futur
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
