import styled from "styled-components";
import { UseSearch } from "../context/Searchcontext";

export default function SearchBox() {
  const { searchQuery, setSearchQuery, handleKeyDown } = UseSearch();
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
  &::placeholder {
    color: white;
  }
`;
const Form = styled.form`
  width: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
`;
