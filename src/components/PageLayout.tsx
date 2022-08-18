import React, { PropsWithChildren } from "react";

import { PageHeader } from "./PageHeader";
import { PageFooter } from "./PageFooter";

export const PageLayout = ({ children }: PropsWithChildren<unknown>) => (
  <div className="min-h-screen min-w-fit mx-auto relative flex flex-col justify-center">
    <PageHeader className="h-16 absolute top-0 left-0" />
    <main className="container py-16">{children}</main>
    <PageFooter className="h-16 absolute bottom-0 left-0" />
  </div>
);
