import React, { useState, useEffect } from "react";
import "./styles.css";

function BodyContainer() {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const text = `Saído da Zona Sul de São Paulo, sou um Desenvolvedor Web apaixonado pela área. Acredito que a tecnologia tem não só o poder de solucionar problemas tecnicos pontuais: ela é uma máquina que pode nos ajudar os problemas sociais do nosso cotidiano. E nós somos suas engrenagens`;

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
            <div className="command-line">
              <pre style={{ whiteSpace: "pre-wrap" }}>{typedText}</pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BodyContainer;
