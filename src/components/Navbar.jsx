export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-gray-700">
      <div className="container-custom h-20 flex items-center justify-between">
        <div className="text-2xl font-bold">Hamza Nadeem</div>
        <ul className="hidden md:flex gap-8">
          <li>
            <a href="#about" className="hover:text-accent transition-colors">
              About
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:text-accent transition-colors">
              Projects
            </a>
          </li>
          <li>
            <a href="#contacts" className="hover:text-accent transition-colors">
              Contacts
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
