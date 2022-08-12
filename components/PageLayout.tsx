import type { PropsWithChildren } from "react";

import { PageHeader } from "./PageHeader";
import { PageFooter } from "./PageFooter";

export const PageLayout = ({ children }: PropsWithChildren<{}>) => (
  <div className="min-h-screen relative flex flex-col justify-center">
    <PageHeader className="h-16 absolute top-0 left-0" />
    <main className="container mx-auto py-16">{children}</main>
    <PageFooter className="h-16 absolute bottom-0 left-0" />
  </div>
);
