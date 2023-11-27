import React, { useState, useEffect } from "react";
import Redes from "../Redes/Redes";
import "./styles.css";

function BodyContainer() {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const text =
    "C:/diego_alves/web_dev: \n Saído da Zona Sul de São Paulo, sou um Desenvolvedor Web apaixonado pela área. Acredito que a tecnologia tem não só o poder de solucionar problemas técnicos pontuais: ela é uma máquina que pode nos ajudar nos problemas sociais do nosso cotidiano. E nós somos suas engrenagens.";

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setTypedText((prevText) => prevText + text.charAt(currentIndex));
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [currentIndex, text]);

  const toggleCursor = () => {
    setCursorVisible((prev) => !prev);
  };

  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(toggleCursor, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="container">
      <div className="subContainer">
        <section className="leftSection">
          <div className="myName">
            <h1>DIEGO_ALVES/</h1>
            <h4>WEB_DEVELOPER</h4>
          </div>
          <div>
            <nav className="navbar">
              <ul>
                <li>Home</li>
                <li>Projetos</li>
                <li>Redes</li>
                <li>Contato</li>
              </ul>
            </nav>
          </div>
          <div className="command-line">
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {typedText}
              {cursorVisible && <span className="cursor">_</span>}
            </pre>
          </div>
        </section>
        <section className="rightSection">
          <div className="rightSectionContainer">
            <div className="redesIcons">
              <Redes />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BodyContainer;
