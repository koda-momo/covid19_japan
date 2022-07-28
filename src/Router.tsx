import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Top } from "./templates/Top";
import { Prefectures } from "./templates/Prefectures";
import { LineGraph } from "./templates/LineGraph";

export const Router: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/prefectures" element={<Prefectures />} />
          <Route path="/lineGraph" element={<LineGraph />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};
