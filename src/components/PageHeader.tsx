import React from "react";

const navData = [
  {
    text: "Apps",
    link: "https://apps.darwinia.network/",
  },
  {
    text: "Website",
    link: "https://darwinia.network/",
  },
] as { text: string; link: string }[];

export const PageHeader = ({ className }: { className?: string }) => (
  <header className={`h-16 flex flex-col justify-center w-full ${className}`}>
    <div className="w-[1280px] px-8 mx-auto flex items-center justify-between">
      <img alt="..." src="/images/logo.svg" width={178} height={22} />
      <div className="flex items-center space-x-5">
        {navData.map((item, index) => (
          <a
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            href={item.link}
            className="text-sm font-light hover:opacity-80"
          >
            {item.text}
          </a>
        ))}
      </div>
    </div>
  </header>
);
