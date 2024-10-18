"use client";

import React from "react";

export default function FeatureFuture() {
  return (
    <>
      <h1 className="text-center my-4">Objectifs</h1>
      <div className="col-md-5">
        <h2>Mise en place des principes de Next.js</h2>
        <p>
          Le framework Next.js est au cœur du projet et nous permet d'intégrer
          des fonctionnalités comme le rendu côté serveur (SSR), le pré-rendu
          statique (SSG), et la gestion optimisée des routes, en se basant sur
          React.
        </p>
        <h2>Standardiser les bonnes pratiques</h2>
        <p>
          fonctionnalités, tout en permettant des évolutions rapides et une
          maintenance aisée.
        </p>
        <h2>Faciliter la collaboration</h2>
        <p>
          Ce projet est conçu pour que chaque développeur au sein de l'équipe
          puisse contribuer facilement grâce à une structure claire et à des
          outils modernes tels que Docker et WSL 2.
        </p>
      </div>
      <div className="col-md-7">
        <div>
          <img
            src="/images/illustration-editor-desktop.svg"
            alt="Editor Interface"
            className="img-fluid illustration-editor-desktop"
          />
        </div>
      </div>
    </>
  );
}
