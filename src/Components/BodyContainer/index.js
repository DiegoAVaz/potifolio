import React, { useState, useEffect } from "react";
import Redes from "../Redes/Redes";
import Projetos from "../Projetos";
import Contato from "../Contato";
import "./styles.css";
import Stacks from "../Stacks";

function BodyContainer() {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedNavItem, setSelectedNavItem] = useState("Home");
  const [instantText, setInstantText] = useState(false);
  const text =
    "C:/diego_alves/web_dev: \n Saído da Zona Sul de São Paulo, sou um Desenvolvedor Web apaixonado pela área. Acredito que a tecnologia tem não só o poder de solucionar problemas técnicos pontuais: ela é uma máquina que pode nos ajudar nos problemas sociais do nosso cotidiano. E nós somos suas engrenagens.";

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        if (currentIndex < text.length) {
          setTypedText((prevText) => prevText + text.charAt(currentIndex));
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          clearInterval(intervalId);
        }
      },
      instantText ? 0 : 50
    );

    return () => clearInterval(intervalId);
  }, [currentIndex, text, instantText]);

  const toggleCursor = () => {
    setCursorVisible((prev) => !prev);
  };

  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(toggleCursor, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const renderSelectedComponent = () => {
    switch (selectedNavItem) {
      case "Projetos":
        return <Projetos />;
      case "Contato":
        return <Contato />;
      case "stacks":
        return <Stacks />;
      default:
        return <Redes />;
    }
  };

  const handleInstantText = () => {
    setInstantText(true);
  };

  return (
    <div className="container">
      <div className="subContainer">
        <section className="leftSection">
          <div className="myName">
            <h1>DIEGO_ALVES/</h1>
            <h4>WEB_DEVELOPER</h4>
          </div>

          <div className="command-line" onClick={handleInstantText}>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {typedText}
              {cursorVisible && <span className="cursor">_</span>}
            </pre>
          </div>
        </section>
        <section className="rightSection">
          <nav className="navbar">
            <ul>
              <li onClick={() => setSelectedNavItem("Home")}>Home</li>
              <li onClick={() => setSelectedNavItem("Projetos")}>Projetos</li>
              <li onClick={() => setSelectedNavItem("stacks")}>Stacks</li>
              <li onClick={() => setSelectedNavItem("Contato")}>Contato</li>
            </ul>
          </nav>

          <div className="rightSectionContainer">
            {renderSelectedComponent()}
          </div>
        </section>
      </div>
    </div>
  );
}

export default BodyContainer;
