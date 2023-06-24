"use client";

import {
  ResponsiveContainer,
  RadarChart as RadarRechart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";

import { firstUppercase } from "@/lib/utils";

interface Props {
  data: any[];
}

// const CustomizedAxisTick = ({ x, y, payload }: any) => {
//   const colors = ["#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#ffff00"]; // Warna teks yang berbeda untuk setiap subject
//   const index = payload.index % colors.length;
//   return (
//     <>
//       <g className="recharts-layer recharts-polar-angle-axis-tick">
//         <text
//           cx="147.5"
//           cy="227"
//           orientation="outer"
//           radius="125"
//           stroke="none"
//           fill={colors[index]}
//           x={x}
//           y={y}
//           className="recharts-text recharts-polar-angle-axis-tick-value"
//           textAnchor="midle"
//         >
//           <tspan x={x} dy="0em">
//             {payload.value}
//           </tspan>
//         </text>
//       </g>
//     </>
//   );
// };

export default function RadarChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarRechart
        cx={"50%"}
        cy={"50%"}
        outerRadius={125}
        width={500}
        height={500}
        data={data}
      >
        <PolarGrid cx={0} cy={0} />
        <Tooltip  active={true} cursor={false} />
        <PolarAngleAxis
          fontSize={13}
          fontWeight={700}
          stroke="#888888"
          tickLine={false}
          axisLine={false}
          tickFormatter={(values) => {
            return firstUppercase(values);
          }}
          //   tick={<CustomizedAxisTick />}
          dataKey="subject"
        />
        <PolarRadiusAxis />
        <Radar
          name="Mike"
          dataKey="A"
          stroke="#D21312"
          fill="#D21312"
          strokeWidth={2}
          fillOpacity={0.35}
        />
      </RadarRechart>
    </ResponsiveContainer>
  );
}
