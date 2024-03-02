import { Link } from "react-router-dom";
import styled from "styled-components";
import { sidebarLinks } from "../../constants";

const Header = () => {
  return (
    <Container>
      <Link to="/" className="Link">
        <SubContainer>
          <img
            src="/assets/album.webp"
            width="50"
            height="50"
            alt="icon of this photo album app"
          />
          <Title>Photo Album</Title>
        </SubContainer>
      </Link>
      <SectionLinks>
        {sidebarLinks.map((link) => {
          return (
            <StyledButton key={link.id}>
              <Link className="link" to={link.route}>
                <link.icon />
                {link.label}
              </Link>
            </StyledButton>
          );
        })}
      </SectionLinks>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  border-bottom: 1px solid #18181a;

  background-color: black;
  color: white;
  width: 100%;
  .Link {
    text-decoration: none;
    color: white;
  }
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
const SectionLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 32px;
  padding-right: 32px;
  @media (min-width: 500px) {
    display: none;
    visibility: hidden;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  display: flex;

  justify-content: start;
  gap: 0.5rem;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  :hover {
    cursor: pointer;
    border-radius: 8px;
    background-color: #1f2937;
  }
  .link {
    width: 100%;
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: white;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
  }
`;
