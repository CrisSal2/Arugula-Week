import { FaGithub } from "react-icons/fa";


function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="icons">
          <a
            href="https://github.com/CrisSal2/Arugula-Week"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;