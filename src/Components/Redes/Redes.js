import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import "./styles.css";

function Redes() {
  return (
    <>
      <div className="redesIcons">
        <a href="#">
          <CiLinkedin />
        </a>
        <a href="#">
          <FaGithub />
        </a>
      </div>
    </>
  );
}

export default Redes;
