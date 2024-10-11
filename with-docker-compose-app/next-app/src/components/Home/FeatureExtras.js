"use client";

import React from 'react';

export default function FeatureExtras() {
  return (
    <>
        <div className="col-md-6">
            <div>
                <img src="/images/illustration-laptop-desktop.svg" alt="Descriptive Image" class="img-fluid illustration-laptop-desktop" />
            </div>
        </div>
        <div className="col-md-6">
            <h2>Free, open, simple</h2>
            <p>Blogr is a free and open source application backed by a large community of helpful developers. It supports features such as code syntax highlighting, RSS feeds, social media integration, third-party commenting tools, and works seamlessly with Google Analytics. The architecture is clean and is relatively easy to learn.</p>
            <h2>Powerful tooling</h2>
            <p>Batteries included. We built a simple and straightforward CLI tool that makes customization and deployment a breeze, but capable of producing even the most complicated sites.</p>
        </div>
    </>
)
}
