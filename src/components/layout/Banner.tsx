import { FC, memo } from "react";
import styled from "styled-components";

type Props = {
  link: string;
  imageSrc: string;
  imageAlt: string;
};

export const Banner: FC<Props> = memo(({ link, imageSrc, imageAlt }) => {
  return (
    <>
      <a href={link}>
        <Image src={imageSrc} alt={imageAlt} />
      </a>
    </>
  );
});

const Image = styled.img`
  width: 300px;
  height: 70px;
`;
