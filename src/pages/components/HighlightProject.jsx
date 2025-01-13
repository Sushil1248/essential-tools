import React from "react";
import IFrameComponent from "./IFrameComponent";

const HighlightProject = () => {
  return (
    <div>
      <IFrameComponent
        url="https://webmanager-client.vercel.app/landing-page" // Replace with your tool's URL
        title="Content Locker - Your Content, Your Way"
        description="Content-Locker simplifies content management with its headless CMS approach. Manage, integrate, and enhance your content workflow seamlessly."
      />
    </div>
  );
};

export default HighlightProject;
