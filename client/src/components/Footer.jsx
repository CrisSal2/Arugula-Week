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
        <ul className="flex justify-center content-between">
            <li className="inline-block mr-6 ml-6">
                <a href="https://github.com/CrisSal2" className="underline text-sm">Christian Salgado</a>
            </li>
            <li className="inline-block mr-6 ml-6">
                <a href="https://github.com/ngojohn2002" className="underline text-sm">Truong Ngo</a>
            </li>
            <li className="inline-block mr-6 ml-6">
                <a href="https://github.com/hweltzien" className="underline text-sm">Heather Weltzien</a>
            </li>
            <li className="inline-block mr-6 ml-6">
                <a href="https://github.com/jy8liu" className="underline text-sm">Jason Y. Liu</a>
            </li>
            <li className="inline-block mr-6 ml-6">
                <a href="https://github.com/jesse437" className="underline text-sm">Jesus Ruiz Gutierrez</a>
            </li>
        </ul>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

