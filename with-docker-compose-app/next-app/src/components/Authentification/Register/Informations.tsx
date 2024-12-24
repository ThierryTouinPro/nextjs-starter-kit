import RadioGroup from "@/components/Interface/RadioGroup";
import Input from "@/components/Interface/Input";
import BirthDateInput from "@/components/Interface/BirthDateInput";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next"; // Importer le hook de traduction

export default function RegisterInformation({ onCheckEmail }): JSX.Element {
  const { t } = useTranslation(); // Initialiser le hook de traduction
  const { watch } = useFormContext();
  const email = watch("email"); // Surveille le champ email

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (email) {
        onCheckEmail(email);
      }
    }, 500); // délai de 500 ms pour éviter les requêtes excessives

    return () => clearTimeout(delayDebounceFn); // nettoie le timeout en cas de changement
  }, [email, onCheckEmail]);

  const options = [
    { value: "Mr", label: "Mr" },
    { value: "Mme", label: t("register-civilite-woman") },
  ];

  return (
    <div className="row">
      <RadioGroup
        name="gender"
        label={t("register-civilite")} // Utilisation de la clé i18n
        options={options}
        icon={<PersonIcon />}
      />
      <div className="col-md-6 col-12 mt-0">
        <Input
          name="lastName"
          label={t("register-nom")} // Utilisation de la clé i18n
          type="text"
          placeholder={t("register-nom")} // Utilisation de la clé i18n
          validations={{
            required: `${t("register-nom")} ${t("label-required")}`,
            pattern: {
              value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
              message: t("pattern-lastname"),
            },
          }}
          icon={<PersonIcon />}
        />
      </div>
      <div className="col-md-6 col-12 mt-0">
        <Input
          name="firstName"
          label={t("register-prenom")} // Utilisation de la clé i18n
          type="text"
          placeholder={t("register-prenom")} // Utilisation de la clé i18n
          validations={{
            required: `${t("register-prenom")} ${t("label-required")}`,
            pattern: {
              value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
              message: t("pattern-firstname"),
            },
          }}
          icon={<PersonIcon />}
        />
      </div>
      <div className="col-md-6 col-xs-12">
        <BirthDateInput
          name="birthDate"
          placeholder="31/12/1990"
          icon={<CalendarTodayIcon />}
        />
      </div>
      <div className="col-md-6 col-xs-12">
        <Input
          name="phone"
          label={t("register-numero")} // Utilisation de la clé i18n
          type="tel"
          placeholder="+33 7 22 33 44 55"
          validations={{
            pattern: {
              value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
              message: t("pattern-phone"),
            },
          }}
          icon={<PhoneIcon />}
          flagIcon="fr" // Ajout de l'icône du drapeau français
        />
      </div>
      <div className="col-md-12 col-xs-12">
        <Input
          name="email"
          label={t("register-email")} // Utilisation de la clé i18n
          type="email"
          placeholder={t("register-email")} // Utilisation de la clé i18n
          validations={{
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: t("pattern-email"),
            },
          }}
          icon={<EmailIcon />}
        />
      </div>
    </div>
  );
}
