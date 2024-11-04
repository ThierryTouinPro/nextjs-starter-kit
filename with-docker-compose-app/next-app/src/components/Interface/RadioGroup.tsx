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
      <div className="row">
        <FormControl component="fieldset">
          <div className="row pb-4">
            {/* Label avec col-6 en mobile */}
            <label className="col-12 col-md-4 d-flex align-items-center gap-2 mb-3 mb-md-0">
              <span className="d-flex align-items-center">{icon}</span>
              <span className="d-flex align-items-center mt-1">{label} :</span>
              <span className="text-danger">*</span>
            </label>
            
            {/* RadioGroup aligné horizontalement */}
            <div className="col-12 col-md-6 d-flex flex-row align-items-center  mb-3 mb-md-0">
              <Controller
                name={name}
                control={control}
                rules={{ required: "Ce champ est requis" }}
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

          </div>
        
          {/* Affichage des erreurs */}
          {errors[name] && (
            <span className="error text-danger">{errors[name].message}</span>
          )}
        </FormControl>
      </div>
  );
}
