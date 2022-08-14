import React from "react";

import { ApiProvider } from "./providers/api";
import PageHome from "./pages/home";

function App() {
  return (
    <ApiProvider>
      <PageHome />
    </ApiProvider>
  );
}

export default App;
