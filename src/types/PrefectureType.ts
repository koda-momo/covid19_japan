//都道府県全体の表で使うデータ
export type PrefecturesType = {
  prefectureNumber: string;
  prefectureName: string;
  bed: number; //病床
  patients: number; //現在患者数
  upDown: "up" | "down"; //昨日より減ったか増えたか(昨日と同じならup)
};
