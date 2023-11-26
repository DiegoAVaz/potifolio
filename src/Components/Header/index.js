import "./styles.css";
import animatedLogo from "../../assets/gif/animatedLogo.gif";

function Header() {
  return (
    <>
      <div className="Header">
        <div className="logo">
          <img src={animatedLogo} alt="Logo" />
        </div>
      </div>
    </>
  );
}

export default Header;
