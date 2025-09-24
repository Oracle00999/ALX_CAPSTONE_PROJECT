import React from "react";

function Header() {
  return (
    <header className="w-full bg-navy-900 bg-opacity-90 backdrop-blur-lg h-[80px] flex items-center justify-center shadow-2xl border-b border-gold-500/20">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gold-400 tracking-wide font-cinematic">
        🎥 Movie Explorer
      </h1>
    </header>
  );
}

export default Header;
