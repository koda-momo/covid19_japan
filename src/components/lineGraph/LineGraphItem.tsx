import { FC, memo } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables, ChartOptions, ChartData } from "chart.js";
import styled from "styled-components";

type Props = {
  data: ChartData<"line">;
  options: ChartOptions<"line">;
  title: string;
};

/**
 *
 */
export const LineGraphItem: FC<Props> = memo(({ data, options, title }) => {
  Chart.register(...registerables);

  return (
    <>
      <Title>{title}</Title>

      <Line data={data} options={options} />
    </>
  );
});

const Title = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: gray;
`;
