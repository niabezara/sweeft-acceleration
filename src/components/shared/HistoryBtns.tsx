import { UseSearch } from "../../context/Searchcontext";
import styled from "styled-components";

export default function HistoryBtns() {
  const { searchHistory, handleButtonClick } = UseSearch();
  return (
    <Card>
      {searchHistory.map((query: any, index: number) => (
        <Btn key={index} onClick={() => handleButtonClick(query)}>
          {query}
        </Btn>
      ))}
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;
const Btn = styled.button`
  cursor: pointer;
  border-radius: 4px;
  border: none;
  background-color: rgb(30 41 59);
  color: rgb(248 250 252);
  font-weight: 500;
  font-size: 14px;
  padding: 8px 16px;
  &:hover {
    background-color: rgba(45, 55, 72, 1);
  }
`;
