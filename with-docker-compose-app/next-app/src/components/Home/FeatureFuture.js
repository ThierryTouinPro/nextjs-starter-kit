"use client";

import React from 'react';

export default function FeatureFuture() {
  return (
      <>
        <h1 className="text-center my-4">Designed for the future</h1>
        <div className="col-md-5">
            <h2>Introducing an extensible editor</h2>
            <p>Blogr features an exceedingly intuitive interface which lets you focus on one thing: creating content. The editor supports management of multiple blogs and allows easy manipulation of embeds such as images, videos, and Markdown. Extensibility with plugins and themes provide easy ways to add functionality or change the looks of a blog.</p>
            <h2>Robust content management</h2>
            <p>Flexible content management enables users to easily move through posts. Increase the usability of your blog by adding customized categories, sections, format, or flow. With this functionality, you're in full control.</p>
        </div>
        <div className="col-md-7">
            <div>
                <img src="/images/illustration-editor-desktop.svg" alt="Editor Interface" class="img-fluid illustration-editor-desktop" />
            </div>
        </div>
      </>
  )
}
