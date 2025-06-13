import React from "react";
import CircularGallery from "./CircularGallery";

const Services = () => {
  return (
    <div>
      Services
      <div style={{ height: "600px", position: "relative" }}>
        <CircularGallery bend={2} textColor="#ffffff" borderRadius={0.05} />
      </div>
    </div>
  );
};

export default Services;
