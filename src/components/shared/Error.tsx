import styled from "styled-components";

export default function Error() {
  return (
    <Container>
      <ErrorTitle>Sorry Something went wrong 😥</ErrorTitle>
    </Container>
  );
}

const ErrorTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: white;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
