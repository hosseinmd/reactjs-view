import jss from "jss";
import rtl from "jss-rtl";
import { ReactNode } from "react";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "../../core/queryClient";

jss.use(rtl());

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

export { AppProviders };
