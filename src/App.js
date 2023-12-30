import React, { useState, useEffect } from "react";
import SplashScreen from "./Components/SplashScreen";
import Home from "./Pages/Home";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <div className="app">{showSplash ? <SplashScreen /> : <Home />}</div>;
};

export default App;
