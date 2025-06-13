import React from "react";

const Header = () => {
  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 mx-[25%] mt-2 h-14 grid grid-cols-3 items-center px-8 rounded-full backdrop-blur-2xl bg-black/50 shadow-[inset_0_1px_0px_rgba(255,255,255,0.2),0_2px_8px_rgba(0,0,0,0.16)] max-lg:mx-[15%] max-md:mx-[5%] max-md:px-5 max-md:grid-cols-2 max-md:justify-between">
        <div className="text-white text-lg font-bold">Bookme</div>

        <ul className="flex items-center justify-center gap-4 list-none max-md:hidden">
          <li>
            <a
              href="#"
              className="text-white/90 text-sm font-medium px-4 py-2 rounded-full transition hover:bg-white/10 hover:text-white"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white/90 text-sm font-medium px-4 py-2 rounded-full transition hover:bg-white/10 hover:text-white"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white/90 text-sm font-medium px-4 py-2 rounded-full transition hover:bg-white/10 hover:text-white"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white/90 text-sm font-medium px-4 py-2 rounded-full transition hover:bg-white/10 hover:text-white"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
