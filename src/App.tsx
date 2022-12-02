import React from "react";
import routes from "./routes";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";


const queryClient = new QueryClient();

const Routes = () => {
  const isLogin = document.cookie ? true : false;
  return useRoutes(routes(isLogin));
};

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Router>
            <Routes />
          </Router>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default App;
