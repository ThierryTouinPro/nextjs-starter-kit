import React from "react";
import { useFormContext } from "react-hook-form";
import Input from "../../Interface/Input";
import { FaLock } from "react-icons/fa";

export default function ChoosePwdForm({ onNext }) {
  const { watch } = useFormContext();
  const password = watch("password");

  return (
    <div>
      <Input
        name="password"
        label="Mot de passe"
        type="password"
        placeholder="Mot de passe"
        validations={{
          pattern: {
            value:
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
              "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
          },
        }}
        icon={<FaLock />}
      />
      <Input
        name="confirmPassword"
        label="Confirmation du mot de passe"
        type="password"
        placeholder="Confirmer le mot de passe"
        validations={{
          validate: (value) =>
            value === password || "Les mots de passe ne correspondent pas",
        }}
        icon={<FaLock />}
      />
    </div>
  );
}
