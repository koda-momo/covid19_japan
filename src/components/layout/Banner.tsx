import { FC, memo, ReactNode } from "react";
import styled from "styled-components";

type Props = {
  link: string;
  imageSrc: string;
  imageAlt: string;
};

export const Banner: FC<Props> = memo(({ link, imageSrc, imageAlt }) => {
  return (
    <>
      <Main>
        <a href={link}>
          <img src={imageSrc} alt={imageAlt} />
        </a>
      </Main>
    </>
  );
});

const Main = styled.div`
  margin: 1vw;
`;
