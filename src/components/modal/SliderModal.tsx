import { useRef } from "react";
import styled from "styled-components";
import { UseGallery } from "../../context/Gallerycontext";
import { Photo } from "../../interfaces/GalleryTypes";
import { UseSearch } from "../../context/Searchcontext";

interface ModalProps {
  children: React.ReactNode;
  Open: boolean;
}

export default function SliderModal({ Open }: ModalProps) {
  const { dataStatistic } = UseGallery();
  const { data } = UseSearch();

  const RetRef = useRef<HTMLDivElement>(null);
  console.log(dataStatistic);

  if (!Open) return null;
  return (
    <>
      <div />
      <RetModal ref={RetRef}>
        <p>{dataStatistic?.id}</p>
      </RetModal>
    </>
  );
}

const RetModal = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  width: 100%;
  max-width: 40.5625rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: var(--color-header);
  padding: 3rem;
  border-radius: 8px;
  flex-direction: column;
  gap: 2rem;
`;
