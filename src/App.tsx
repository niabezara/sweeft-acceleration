import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./routes/HomePage";
import HistoryPage from "./routes/HistoryPage";
import NavBar from "./components/shared/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/History" element={<HistoryPage />} />
      </Routes>
    </>
  );
}

export default App;
