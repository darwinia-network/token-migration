import type { PropsWithChildren } from "react";

import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }: PropsWithChildren<{}>) => (
  <>
    <Header />
    <main className="container mx-auto">{children}</main>
    <Footer />
  </>
);

export default Layout;
