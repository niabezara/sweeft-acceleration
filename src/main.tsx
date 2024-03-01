import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { SearchProvider } from "./context/Searchcontext.tsx";
import { GalleryProvider } from "./context/Gallerycontext.tsx";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SearchProvider>
          <GalleryProvider>
            <App />
          </GalleryProvider>
        </SearchProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
