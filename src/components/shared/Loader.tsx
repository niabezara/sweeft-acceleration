import { PulseLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="spinner-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PulseLoader color="#38ADD2" />
    </div>
  );
};

export default Loader;
