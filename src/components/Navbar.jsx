import Container from "./common/container";

export default function Navbar() {
  return (
    <Container>
      <nav className="w-full bg-dark border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">Hamza Nadeem</div>
          <ul className="flex  gap-8 text-white">
            <li>
              <a
                href="#about"
                className="hover:text-blue-400 transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-blue-400 transition-colors"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contacts"
                className="hover:text-blue-400 transition-colors"
              >
                Contacts
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </Container>
  );
}
