"use client";

import React from "react";

export default function FeatureExtras() {
  return (
    <>
      <div className="col-md-6">
        <div>
          <img
            src="/images/illustration-laptop-desktop.svg"
            alt="Descriptive Image"
            className="img-fluid illustration-laptop-desktop"
          />
        </div>
      </div>
      <div className="col-md-6">
        <h2>Technologies Utilisées</h2>
        <strong>Next.js</strong> : Framework React pour la construction de sites
        web et applications avec des fonctionnalités optimisées.
        <br />
        <strong>Docker</strong> : Conteneurisation pour uniformiser
        l'environnement de développement et simplifier les déploiements.
        <br />
        <strong>WSL 2</strong> (Windows Subsystem for Linux) : Pour les
        développeurs sous Windows, permettant une expérience de développement
        proche de Linux.
        <br />
        <strong>Visual Studio Code (VS Code) </strong>: L'éditeur de code
        recommandé, avec des extensions pour faciliter le développement sous
        Next.js et Docker.
        <br />
      </div>
    </>
  );
}
