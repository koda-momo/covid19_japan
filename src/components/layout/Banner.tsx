import { FC, memo } from "react";

export const Banner: FC = memo(() => {
  return (
    <>
      <div className="banner">
        <a href="https://note.stopcovid19.jp/n/n0b078f2b3dce">
          <img alt="コロナの専門家" src="/img/notestopcovid19-banner.png" />
        </a>
      </div>
    </>
  );
});
