import React from "react";
import RadioGroup from "../../Interface/RadioGroup";
import Input from "../../Interface/Input";
import BirthDateInput from "../../Interface/BirthDateInput";

// Import des icônes de Material-UI
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

export default function RegisterInformation() {
  const options = [
    { value: "Mr", label: "Mr" },
    { value: "Mme", label: "Mme" },
  ];

  return (
    <div className="row">
      <div className="col-md-12 col-xs-12 mb-4">
        <RadioGroup
          name="gender"
          label="Civilité"
          options={options}
          icon={<PersonIcon />}
        />
      </div>
      <div className="col-md-6 col-xs-12">
        <Input
          name="lastName"
          label="Nom"
          type="text"
          placeholder="Nom"
          validations={{
            required: "Nom est requis",
            pattern: {
              value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
              message:
                "Le nom ne peut contenir que des lettres, des espaces, et des tirets",
            },
          }}
          icon={<PersonIcon />}
        />
      </div>
      <div className="col-md-6 col-xs-12">
        <Input
          name="firstName"
          label="Prénom"
          type="text"
          placeholder="Prénom"
          validations={{
            required: "Nom est requis",
            pattern: {
              value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
              message:
                "Le nom ne peut contenir que des lettres, des espaces, et des tirets",
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
          label="Numéro Téléphone"
          type="tel"
          placeholder="+33 7 22 33 44 55"
          validations={{
            pattern: {
              value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
              message: "Numéro de téléphone invalide",
            },
          }}
          icon={<PhoneIcon />}
        />
      </div>
      <div className="col-md-12 col-xs-12">
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="Email"
          validations={{
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email invalide",
            },
          }}
          icon={<EmailIcon />}
        />
      </div>
    </div>
  );
}
