import React from "react";

import PageHome from "./pages/home";
import { ApiProvider } from "./providers/api";

function App() {
  return (
    <ApiProvider>
      <PageHome />
    </ApiProvider>
  );
}

export default App;
