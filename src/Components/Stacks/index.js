import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaJs,
  FaHtml5,
  FaCss3,
} from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import "./styles.css";

function Stacks() {
  return (
    <div className="stacksContainer">
      <div className="stacksIcons">
        <div className="stackIcon">
          <FaReact />
          <p>React</p>
        </div>
        <div className="stackIcon">
          <FaNodeJs />
          <p>Node.js</p>
        </div>
        <div className="stackIcon">
          <FaDatabase />
          <p>MySQL</p>
        </div>
      </div>
      <div className="stacksIcons">
        <div className="stackIcon">
          <DiMongodb />
          <p>MongoDB</p>
        </div>
        <div className="stackIcon">
          <FaJs />
          <p>JavaScript</p>
        </div>
        <div className="stackIcon">
          <FaHtml5 />
          <p>HTML5</p>
        </div>
        <div className="stackIcon">
          <FaCss3 />
          <p>CSS3</p>
        </div>
      </div>
    </div>
  );
}

export default Stacks;
