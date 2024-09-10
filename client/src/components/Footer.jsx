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
        <ul class="flex justify-center content-between">
            <li class="inline-block mr-6 ml-6">
                <a href="https://github.com/CrisSal2" class="underline text-sm">Christian Salgado</a>
            </li>
            <li class="inline-block mr-6 ml-6">
                <a href="https://github.com/ngojohn2002" class="underline text-sm">Truong Ngo</a>
            </li>
            <li class="inline-block mr-6 ml-6">
                <a href="https://github.com/hweltzien" class="underline text-sm">Heather Weltzien</a>
            </li>
            <li class="inline-block mr-6 ml-6">
                <a href="https://github.com/jy8liu" class="underline text-sm">Jason Y. Liu</a>
            </li>
            <li class="inline-block mr-6 ml-6">
                <a href="https://github.com/jesse437" class="underline text-sm">Jesus Ruiz Gutierrez</a>
            </li>
        </ul>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

