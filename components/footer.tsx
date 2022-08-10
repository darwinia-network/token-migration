import Image from "next/image";

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

const Footer = ({ className }: { className?: string }) => (
  <footer className={`h-16 flex flex-col justify-center border-t border-t-white backdrop-blur-2xl w-full ${className}`}>
    <div className="container mx-auto flex items-center justify-between">
      <div className="flex items-center">
        <Image src="/images/copyright.svg" width={16} height={16} />
        <span className="ml-px text-sm font-light">2022 Darwinia Network</span>
      </div>
      <div className="flex items-center space-x-4">
        {social.map((item) => (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={item.isMail ? `mailto:${item.link}` : item.link}
            className="inline-flex"
          >
            <Image src={item.icon} width={20} height={20} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
