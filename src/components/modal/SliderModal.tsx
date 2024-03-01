import { useRef } from "react";
import styled from "styled-components";
import { UseGallery } from "../../context/Gallerycontext";
import { useDisableBodyScroll } from "../../hooks/use-disable-scroll";
import useOnClickOutside from "../../hooks/use-click-outside";

interface ModalProps {
  children: React.ReactNode;
  imageUrl: string | undefined;
  Open: boolean;
}

export default function SliderModal({ imageUrl, Open }: ModalProps) {
  const { dataStatistic, closeModal, isLoading } = UseGallery();
  const RetRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(RetRef, closeModal);
  useDisableBodyScroll(Open);

  if (!Open || isLoading) return null;
  return (
    <>
      <div />
      <RetModal ref={RetRef}>
        <img src={imageUrl} alt="Image" />
        <p>Downloads{dataStatistic?.downloads.total}</p>
        <p>Likes{dataStatistic?.likes.total}</p>
        <p>Views{dataStatistic?.views.total}</p>
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
  background-color: #fff;
  padding: 3rem;
  border-radius: 8px;
  flex-direction: column;
  gap: 2rem;
`;
