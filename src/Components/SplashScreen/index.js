// SplashScreen.js
import React, { useEffect, useState } from "react";
import "./styles.css";

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return showSplash ? (
    <div className="splash-screen">
      <h1>DIEGO_ALVES/</h1>

      <p>WEB_DEVELOPER</p>
    </div>
  ) : null;
};

export default SplashScreen;
