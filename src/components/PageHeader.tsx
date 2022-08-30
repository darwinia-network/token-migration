import React from "react";
import Fade from "react-reveal/Fade";

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
  <Fade left>
    <header className={`h-16 flex flex-col justify-center w-full ${className}`}>
      <div className="container flex items-center justify-between">
        <img alt="..." src="/images/logo.svg" width={178} height={22} />
        <div className="flex items-center space-x-8">
          {navData.map((item, index) => (
            <a
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              href={item.link}
              className="text text-sm font-light"
            >
              {item.text}
            </a>
          ))}
        </div>
      </div>
    </header>
  </Fade>
);
