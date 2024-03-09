// ImageHoverComponent.jsx

import React, { useState } from "react";
import "./ImageHoverComponent.css";

const ImageHoverComponent = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="image-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src="/Photo/prof.jpeg"
        alt="User Avatar"
        className="hoverable-image"
      />
      {isHovered && (
        <div
          className="hover-content"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p>Hi, User!</p>
          <ul className="ulChoose">
            <li>
              <a href="/profile">
                <span class="material-symbols-outlined">account_circle</span>
                View Profile
              </a>
            </li>
            <li>
              {" "}
              <a href="/logout"><span class="material-symbols-outlined">logout</span>Logout</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageHoverComponent;
