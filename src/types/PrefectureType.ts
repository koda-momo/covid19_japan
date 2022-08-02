//都道府県全体の表で使うデータ
export type PrefecturesType = {
  prefectureNumber: string;
  prefectureName: string;
  bed: number; //病床
  patients: number; //現在患者数
  upDown: "up" | "down"; //昨日より減ったか増えたか(昨日と同じならup)
  romaji: string; //都道府県名ローマ字
  fullName: string; //都道府県削っていない名前
};

//都道府県ごとのデータ
export type PrefectureType = {
  date: string;
  npatients: number;
  ncurrentpatients: number;
  nexits: number;
  ndeaths: number;
  nheavycurrentpatients: number;
  nunknowns: number;
  ninspections: number;
};
