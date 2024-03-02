import styled from "styled-components";
import HistoryBtns from "../components/shared/HistoryBtns";
import HistoryGallery from "../components/gallery/HistoryGallery";

export default function HistoryPage() {
  return (
    <Container>
      <HistoryBtns />
      <HistoryGallery />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  margin: 20px;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
`;
