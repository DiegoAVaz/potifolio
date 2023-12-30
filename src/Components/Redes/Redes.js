import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import "./styles.css";

function Redes() {
  return (
    <>
      <div className="redesIcons">
        <a href="https://www.linkedin.com/in/diego-alves-vaz-dev/">
          <CiLinkedin />
        </a>
        <a href="https://github.com/DiegoAVaz">
          <FaGithub />
        </a>
      </div>
    </>
  );
}

export default Redes;
