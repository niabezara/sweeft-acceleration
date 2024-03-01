import { Link } from "react-router-dom";
import styled from "styled-components";
import { sidebarLinks } from "../../constants";
export default function SideMenu() {
  return (
    <SidebarContainer>
      <SidebarSection>
        <SectionTitle>Manage</SectionTitle>
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
      </SidebarSection>
    </SidebarContainer>
  );
}
const SidebarContainer = styled.div`
  display: none;
  visibility: hidden;
  @media (min-width: 500px) {
    display: inline-block;
    visibility: visible;
    padding-bottom: 12px;
    width: 20%;
    color: white;
  }
`;

const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 4px;
  gap: 1rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 2px;
  padding: 0 16px;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.02em;
`;

const SectionLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
