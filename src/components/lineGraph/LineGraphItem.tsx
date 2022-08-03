import { FC, memo } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables, ChartOptions, ChartData } from "chart.js";

type Props = {
  data: ChartData<"line">;
  options: ChartOptions<"line">;
  title: string;
};

/**
 *　折れ線グラフコンポーネント.
 */
export const LineGraphItem: FC<Props> = memo(({ data, options, title }) => {
  Chart.register(...registerables);

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
});
