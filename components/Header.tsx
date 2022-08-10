import Image from "next/image";

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

const Header = () => (
  <div className="h-16 flex flex-col justify-center w-full absolute top-0 left-0">
    <div className="container mx-auto flex items-center justify-between">
      <Image src="/images/logo.svg" width={178} height={22} />
      <div className="flex items-center space-x-5">
        {navData.map((item) => (
          <a target="_blank" rel="noopener noreferrer" href={item.link} className="text-sm font-light">
            {item.text}
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default Header;
