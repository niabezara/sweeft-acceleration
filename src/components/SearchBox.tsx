import styled from "styled-components";

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBox({
  searchQuery,
  setSearchQuery,
}: SearchBoxProps) {
  return (
    <Form action="">
      <label htmlFor="text">Search Photos</label>
      <Input
        type="text"
        placeholder="Search photos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
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