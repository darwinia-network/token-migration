import React from "react";

const social = [
  {
    icon: "/images/twitter.svg",
    link: "https://twitter.com/DarwiniaNetwork",
  },
  {
    icon: "/images/telegram.svg",
    link: "https://t.me/DarwiniaNetwork",
  },
  {
    icon: "/images/github.svg",
    link: "https://github.com/darwinia-network",
  },
  {
    icon: "/images/medium.svg",
    link: "https://medium.com/darwinianetwork",
  },
  {
    icon: "/images/mail.svg",
    link: "hello@darwinia.network",
    isMail: true,
  },
] as { icon: string; link: string; isMail?: boolean }[];

export const PageFooter = ({ className }: { className?: string }) => (
  <footer className={`h-16 flex flex-col justify-center border-t border-t-white backdrop-blur-2xl w-full ${className}`}>
    <div className="w-[1280px] px-8 mx-auto flex items-center justify-between">
      <div className="flex items-center">
        <img alt="..." src="/images/copyright.svg" width={16} height={16} />
        <span className="ml-px text-sm font-light">2022 Darwinia Network</span>
      </div>
      <div className="flex items-center space-x-4">
        {social.map((item, index) => (
          <a
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            href={item.isMail ? `mailto:${item.link}` : item.link}
            className="inline-flex hover:opacity-80"
          >
            <img alt="..." src={item.icon} width={20} height={20} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);
