import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiTableau } from "react-icons/si";

function NavBar() {
  return (
    /* Full-width sticky bar */
    <header className="sticky top-0 z-20 w-full bg-gray-50/90 backdrop-blur border-b border-gray-200">
      {/* Center-ed **inner** container (max 1100 px) */}
      <div className="max-w-5xl mx-auto h-16 px-4 flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          By&nbsp;Vopesh
        </h1>

        <nav className="flex items-center space-x-6">
          <a
            href="https://www.linkedin.com/in/vopeshchandra"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaLinkedin className="mr-1 shrink-0" />
            <span className="hidden sm:inline text-lg">LinkedIn</span>
          </a>

          <a
            href="https://github.com/vopesh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-800 hover:text-black"
          >
            <FaGithub className="mr-1 shrink-0" />
            <span className="hidden sm:inline text-lg">GitHub</span>
          </a>

          <a
            href="https://public.tableau.com/app/profile/vopesh.chandra/vizzes"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-purple-600 hover:text-purple-800"
          >
            <SiTableau className="mr-1 shrink-0" size={18} />
            <span className="hidden sm:inline text-lg">Tableau</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
