import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <SubContainer>
        <img
          src="/assets/album.webp"
          width="50"
          height="50"
          alt="icon of this photo album app"
        />
        <Title>Photo Album</Title>
      </SubContainer>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  border-bottom: 1px solid #18181a;

  background-color: black;
  color: white;
  width: 100%;
`;

const SubContainer = styled.div`
  display: flex;
  height: 64px;
  align-items: center;
  padding-left: 32px;
  padding-right: 32px;
  width: 100%;
`;
const Title = styled.h1`
  font-size: 14px;
  font-weight: 700;
  margin-left: 8px;
  @media (min-width: 1024px) {
    font-size: 28px;
    margin-left: 32px;
  }
`;
