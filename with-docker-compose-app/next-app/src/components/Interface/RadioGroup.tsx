import { useFormContext, Controller } from "react-hook-form";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function RadioGroupUI({ label, name, options, icon }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { t } = useTranslation(); // Initialiser le hook de traduction

  return (
    <FormControl component="fieldset">
      <div className="row pb-4">
        {/* Label avec col-6 en mobile */}
        <label className="col-12 col-md-4 d-flex align-items-center gap-2 mb-3 mb-md-0 px-4">
          <span className="d-flex align-items-center">{icon}</span>
          <span className="d-flex align-items-center mt-1">{label} :</span>
          <span className="text-danger">*</span>
        </label>

        {/* RadioGroup aligné horizontalement */}
        <div className="col-12 col-md-6 d-flex flex-row align-items-center mb-3 mb-md-0">
          <Controller
            name={name}
            control={control}
            rules={{ required: t("required") }}
            render={({ field }) => (
              <RadioGroup
                row
                {...field}
                value={field.value || ""}
                className="d-flex flex-row justify-content-start gap-3"
              >
                {options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={
                      <Radio
                        sx={{
                          color: "#999", // Couleur par défaut du bouton
                          "&.Mui-checked": {
                            color: "hsl(356, 100%, 66%)", // Couleur du bouton quand il est checked
                          },
                        }}
                      />
                    }
                    label={option.label}
                    className="d-flex align-items-center me-2 button-form-group"
                  />
                ))}
              </RadioGroup>
            )}
          />
        </div>
        {/* Affichage des erreurs */}
        {errors[name] && (
          <span className="error text-danger mt-1 ms-3">
            {typeof errors[name].message === "string"
              ? errors[name].message
              : ""}
          </span>
        )}
      </div>
    </FormControl>
  );
}
