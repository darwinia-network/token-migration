import type { PropsWithChildren } from "react";

import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }: PropsWithChildren<{}>) => (
  <div className="min-h-screen relative flex flex-col justify-center">
    <Header className="h-16 absolute top-0 left-0" />
    <main className="container mx-auto py-16">{children}</main>
    <Footer className="h-16 absolute bottom-0 left-0" />
  </div>
);

export default Layout;
