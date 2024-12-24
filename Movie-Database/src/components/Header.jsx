import React from "react";

function Header() {
  return (
    <header className="w-full bg-black bg-opacity-70 backdrop-blur-lg h-[80px] flex items-center justify-center shadow-lg">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-400 tracking-wide">
        🎥 Movie Explorer
      </h1>
    </header>
  );
}

export default Header;
