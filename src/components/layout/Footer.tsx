import { FC, memo } from "react";

/**
 * フッターコンポーネント.
 */
export const Footer: FC = memo(() => {
  return (
    <>
      <div className="banner">
        <a href="https://note.stopcovid19.jp/n/n0b078f2b3dce">
          <img alt="コロナの専門家" src="/img/notestopcovid19-banner.png" />
        </a>
      </div>

      <iframe
        title="How are you? / げんきですか？"
        data-src="https://tk3-805-12365.vw.sakura.ne.jp:3443/mini"
        scrolling="no"
        src="https://tk3-805-12365.vw.sakura.ne.jp:3443/mini"
      ></iframe>
      <a href="https://whowatch.tv/">
        <img alt="#STAYHOME x ふわっち" src="img/whowatch-banner.png" />
      </a>
    </>
  );
});
