import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./routes/HomePage";
import HistoryPage from "./routes/HistoryPage";
import { Helmet } from "react-helmet";
import Header from "./components/shared/Header";
import SideMenu from "./components/shared/SideMenu";

function App() {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Header />
      <div style={{ display: "flex" }}>
        <SideMenu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/History" element={<HistoryPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
