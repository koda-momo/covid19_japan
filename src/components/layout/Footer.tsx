import { FC, memo } from "react";
import styled from "styled-components";
import { Banner } from "./Banner";

/**
 * フッターコンポーネント.
 */
export const Footer: FC = memo(() => {
  return (
    <>
      <Banners>
        <Banner
          link="https://note.stopcovid19.jp/n/n0b078f2b3dce"
          imageSrc="/img/notestopcovid19-banner.png"
          imageAlt="コロナの専門家"
        />

        <HowAreYou>
          <Iframe
            title="How are you? / げんきですか？"
            data-src="https://tk3-805-12365.vw.sakura.ne.jp:3443/mini"
            scrolling="no"
            src="https://tk3-805-12365.vw.sakura.ne.jp:3443/mini"
          ></Iframe>
        </HowAreYou>

        <Banner
          link="https://whowatch.tv/"
          imageSrc="/img/whowatch-banner.png"
          imageAlt="#STAYHOME x ふわっち"
        />
      </Banners>
    </>
  );
});

const Banners = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const HowAreYou = styled.div`
  display: inline-block;
  margin: 1vw;
`;

const Iframe = styled.iframe`
  display: inline-block;
  width: 300px;
  height: 70px;
  border: #ddd solid 1px;
  box-sizing: border-box;
  padding: 5px 0 0 0;
`;
