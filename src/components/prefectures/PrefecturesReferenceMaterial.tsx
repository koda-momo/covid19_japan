import { FC, memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useGetPrefectureData } from "../../hooks/useGetPrefectureData";
import { PrefectureTextType } from "../../types/PrefectureType";

type Props = {
  ncurrentpatients: number; //重症患者
  npatients: number; //累積陽性者
  nexits: number; //累積退院者
  ndeaths: number; //累積死者
  bed: number; //対策病床数
  fullName: string;
  date: string; //患者の数の更新日
  hospitalBeds: number; //病院床
  hotelsBeds: number; //ホテル床
};

/**
 * 円グラフの下に入ってくるテキストコンポーネント.
 */
export const PrefecturesReferenceMaterial: FC<Props> = memo(
  ({
    ncurrentpatients,
    npatients,
    nexits,
    ndeaths,
    bed,
    fullName,
    date,
    hospitalBeds,
    hotelsBeds,
  }) => {
    const { getPrefectureTextData } = useGetPrefectureData();

    const [textData, setTextData] = useState<PrefectureTextType>({
      ventilator: 0,
      doctor: 0,
      ecmo: 0,
      bedDataUpdate: "0000-00-00",
    });

    useEffect(() => {
      getPrefectureTextData(fullName, setTextData);
    }, []);

    return (
      <>
        <div>
          累積陽性者: {npatients.toLocaleString()}人 累積退院者:
          {nexits.toLocaleString()}人
        </div>

        <div>
          累積死者: {ndeaths.toLocaleString()}人 対策病床数:
          {bed.toLocaleString()}床
        </div>

        <Text>
          <div>
            現在患者数 出典:
            <LinkUrl href="https://www.mhlw.go.jp/content/10906000/000972158.pdf">
              厚生労働省 新型コロナウイルス感染症 各都道府県の検査陽性者の状況
            </LinkUrl>
            (更新日: {date})
          </div>
          <div>
            一般社団法人
            <LinkUrl href="http://www.jibika.or.jp/members/information/info_corona.html">
              日本耳鼻咽喉科学会
            </LinkUrl>
            定義におけるハイリスク地域（現在患者数 {ncurrentpatients}名 {">="}
            10名{")"}
          </div>
          <div>
            対策病床数 医療機関{hospitalBeds}床+宿泊施設{hotelsBeds}室 出典:
            <LinkUrl href="https://www.mhlw.go.jp/stf/seisakunitsuite/newpage_00023.html">
              新型コロナウイルス対策病床数オープンデータ
            </LinkUrl>
            (発表日: {textData.bedDataUpdate})
          </div>
          <Margin />
          <div>
            (参考) 臨床工学技士:{textData.doctor}人
            マスク専用含む人工呼吸器取扱:{textData.ventilator}台 ECMO装置取扱:
            {textData.ecmo}台
          </div>
          <div>
            2020年2月回答 出典:
            <LinkUrl href="https://ja-ces.or.jp/info-ce/%e4%ba%ba%e5%b7%a5%e5%91%bc%e5%90%b8%e5%99%a8%e3%81%8a%e3%82%88%e3%81%b3ecmo%e8%a3%85%e7%bd%ae%e3%81%ae%e5%8f%96%e6%89%b1%e5%8f%b0%e6%95%b0%e7%ad%89%e3%81%ab%e9%96%a2%e3%81%99%e3%82%8b%e7%b7%8a/">
              一般社団法人 日本呼吸療法医学会 公益社団法人 日本臨床工学技士会
            </LinkUrl>
          </div>
        </Text>
      </>
    );
  }
);

const Text = styled.div`
  font-size: 13px;
  margin-top: 20px;
`;

const Margin = styled.div`
  height: 30px;
`;

const LinkUrl = styled.a`
  color: gray;
`;
