import { PulseLoader } from "react-spinners";
import styled from "styled-components";

const Loader = () => {
  return (
    <Container>
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
    </Container>
  );
};

export default Loader;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
