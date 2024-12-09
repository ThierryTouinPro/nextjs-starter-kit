import React from "react";
import { useFormContext } from "react-hook-form";
import Input from "../../Interface/Input";
import LockIcon from "@mui/icons-material/Lock";
import { useTranslation } from "react-i18next";

export default function RegisterPassword(): JSX.Element {
  const { watch } = useFormContext();
  const password = watch("password");

  const { t } = useTranslation(); // Initialiser le hook de traduction

  return (
    <div>
      <Input
        name="password"
        label={t("register-mdp")}
        type="password"
        placeholder={t("register-mdp")}
        validations={{
          pattern: {
            value:
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message: t("min-password"),
          },
        }}
        icon={<LockIcon />}
      />
      <Input
        name="confirmPassword"
        label={t("register-mdp-confirmation")}
        type="password"
        placeholder={t("register-mdp-confirmation")}
        validations={{
          validate: (value: string) =>
            value === password || t("password-confirmation"),
        }}
        icon={<LockIcon />}
      />
    </div>
  );
}
