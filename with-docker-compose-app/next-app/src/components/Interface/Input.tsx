import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface InputProps {
  name: string;
  label: string;
  type: string;
  id?: string;
  placeholder?: string;
  validations?: object;
  icon?: React.ReactNode;
  flagIcon?: string;
}

export default function Input({
  name,
  label,
  type,
  id,
  placeholder,
  validations,
  icon,
  flagIcon,
}: InputProps): JSX.Element {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { t } = useTranslation(); // Initialiser le hook de traduction

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
        {...register(name, {
          required: `${label} ${t("label-required")}`,
          ...validations,
        })}
        className="text-dark mt-2 mb-2"
      />
      {errors[name] && (
        <span className="error text-danger">
          {(errors[name]?.message as string) || ""}
        </span>
      )}
    </p>
  );
}
