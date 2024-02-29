import styled from "styled-components";
import { getPhotos } from "../api/gallery";
import Loader from "../components/shared/Loader";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

export default function HomePage() {
  const { items, isLoading, lastItemRef, hasMore } = useInfiniteScroll(
    getPhotos,
    20,
    "popular"
  );
  console.log(items);
  return (
    <Wrap>
      {items.map((photo, index) => (
        <Card
          key={`${photo.id}-${index}`}
          ref={index === items.length - 1 ? lastItemRef : null}
        >
          <img src={photo.urls.small} alt={photo.description} />
        </Card>
      ))}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: grid;
  align-items: start;
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
