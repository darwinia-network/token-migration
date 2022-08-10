import type { PropsWithChildren } from "react";

import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }: PropsWithChildren<{}>) => (
  <div className="min-h-screen relative flex flex-col justify-center">
    <Header />
    <main className="container mx-auto py-16">{children}</main>
    <Footer />
  </div>
);

export default Layout;
