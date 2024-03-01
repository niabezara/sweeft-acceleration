import styled from "styled-components";
import { UseSearch } from "../context/Searchcontext";

export default function SearchBox() {
  const { searchQuery, setSearchQuery, searchHistory, handleKeyDown } =
    UseSearch();
  return (
    <Form action="">
      <label htmlFor="text">Search Photos</label>
      <Input
        type="text"
        placeholder="Search photos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Card>
        {searchHistory.map((query: any, index: number) => (
          <Btn key={index}>{query}</Btn>
        ))}
      </Card>
    </Form>
  );
}

const Input = styled.input`
  background: transparent;
  color: #fff;
  border-radius: 8px;
  border-color: #6464c8;
  padding: 12px 4px;
  font-weight: 500;
  font-size: 14px;
  ::placeholder {
    color: white;
  }
`;
const Form = styled.form`
  margin-top: 20px;
  width: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
`;
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
  :hover {
    background-color: rgba(45, 55, 72, 1);
    opacity: 0.2;
  }
`;
