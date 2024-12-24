import { useState } from "react";
import ButtonSubmit from "@/components/Interface/ButtonSubmit";
import styles from "@/components/Header/css/Header.module.css";

const AdminLogs = (): JSX.Element => {
  const [logLevel, setLogLevel] = useState<string>("info");
  const [response, setResponse] = useState<string | null>(null);

  const updateLogLevel = async (): Promise<void> => {
    try {
      const res = await fetch("/api/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ level: logLevel }), // Envoie le niveau sélectionné au backend
      });
      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      setResponse("Une erreur est survenue");
    }
  };

  return (
    <div>
      <header
        className={`${styles.header} container-fluid py-4`}
        style={{ backgroundColor: "transparent" }}
      >
        <div className="container justify-content-center my-4">
          <div className="row">
            <div className="col-md-12">
              <div className=" d-flex align-items-center justify-content-center">
                <h1 className="ml-4 text-white">
                  Administration - Gestion des Logs
                </h1>
                <img
                  src="/images/admin.png"
                  alt="Administration"
                  className="img-fluid mx-4"
                  style={{ maxWidth: "50px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container justify-content-center my-4">
        <div className="row">
          <div className="col-md-12">
            <h2>Niveau de log</h2>
            <div className="my-2">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-4">
                  <select
                    id="logLevel"
                    value={logLevel}
                    onChange={(e) => setLogLevel(e.target.value)} // Met à jour l'état du niveau sélectionné
                    className="form-select"
                  >
                    <option value="error">Error</option>
                    <option value="warn">Warn</option>
                    <option value="info">Info</option>
                    <option value="http">Http</option>
                    <option value="verbose">Verbose</option>
                    <option value="debug">Debug</option>
                    <option value="silly">Silly</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <ButtonSubmit
                    action={updateLogLevel}
                    type="submit"
                    label="Mettre à jour"
                    mode="secondary"
                  />
                </div>
                <div className="col-md-6">
                  <h5 className="my-2">
                    {response && (
                      <p className="text-success fw-bold">
                        {response
                          .split(" ")
                          .map((word, index, arr) =>
                            index === arr.length - 1 ? word.toUpperCase() : word
                          )
                          .join(" ")}
                      </p>
                    )}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogs;
