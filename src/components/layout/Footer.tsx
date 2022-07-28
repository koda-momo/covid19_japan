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

        {/* 
        <Banner>
          <iframe
            title="How are you? / げんきですか？"
            data-src="https://tk3-805-12365.vw.sakura.ne.jp:3443/mini"
            scrolling="no"
            src="https://tk3-805-12365.vw.sakura.ne.jp:3443/mini"
          ></iframe>
        </Banner> */}

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
  gap: 3;
`;
