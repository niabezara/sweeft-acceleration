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
      <Overlay />
      <RetModal ref={RetRef}>
        <Image src={imageUrl} alt="Image" />
        <Wrap>
          <p>Downloads{dataStatistic?.downloads.total}</p>
          <p>Likes{dataStatistic?.likes.total}</p>
          <p>Views{dataStatistic?.views.total}</p>
        </Wrap>
      </RetModal>
    </>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
  @media (min-width: 500px) {
    overflow-x: hidden;
  }
`;

const RetModal = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  width: 100%;
  max-width: 70.5625rem;
  max-height: 50.5625rem;
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

const Wrap = styled.div`
  display: flex;
  gap: 3rem;
`;

const Image = styled.img`
  width: 100%;
  max-height: 40rem;
`;
