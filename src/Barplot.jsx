import * as d3 from "d3";
import { useState } from "react";

export default function Barplot({ data }) {
  const width = 700;
  const height = 500;

  const margin = { top: 80, right: 80, bottom: 60, left: 160 };
  const bottomY = height - margin.bottom;

  // Hover state
  const [hovered, setHovered] = useState(null);
  const [hoverX, setHoverX] = useState(false);

  // X scale -> maps students to width
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.students)])
    .range([margin.left, width - margin.right]);

  // Y scale -> maps countries to vertical positions
  const yScale = d3
    .scaleBand()
    .domain(data.map(d => d.country))
    .range([margin.top, height - margin.bottom])
    .padding(0.2);

  return (
    <svg width={width} height={height} style={{ background: "#F5F6F8" }}>
      
      {/* ================= TITLE ================= */}
      <text
        x={margin.left - 114}
        y={40}
        fontSize="28"
        fill="#0F1117"
        fontFamily="DM Sans"
        fontWeight="360"
      >
        <tspan fill="#0F1117"> D3 </tspan>
        <tspan
          fill="#5B9BD5"
          fontWeight="900"
          style={{
            cursor: "pointer",
            transition: "all 0.15s ease",
            fontSize: hoverX ? "30px" : "28px"
          }}
          onMouseEnter={() => setHoverX(true)}
          onMouseLeave={() => setHoverX(false)}
        >
          ×
        </tspan>
        <tspan fill="#0F1117"> React </tspan>
      </text>

      {/* ================= SUBTITLE ================= */}
      <text
        x={margin.left - 114}
        y={60}
        fontSize="14"
        fill="#6B7280"
        fontFamily="DM Sans"
      >
        Where data storytellers are quietly building
      </text>

      {/* ================= X GRID + TICKS ================= */}
      {[0, 20, 40, 60].map((tick, i) => (
        <g key={i}>
          {/* vertical grid line */}
          <line
            x1={xScale(tick)}
            x2={xScale(tick)}
            y1={margin.top}
            y2={height - margin.bottom}
            stroke="#1B5FA8"
            opacity={0.08}
          />

          {/* tick label */}
          <text
            x={xScale(tick)}
            y={bottomY + 10}
            textAnchor="middle"
            fontSize="10"
            fill="#6B7280"
            opacity={0.6}
            fontFamily="DM Mono"
          >
            {tick}
          </text>
        </g>
      ))}

      {/* ================= X AXIS LABEL ================= */}
      <text
        x={margin.left}
        y={bottomY + 25}
        fontSize="11"
        fill="#6B7280"
        opacity={0.6}
        fontFamily="DM Sans"
        letterSpacing="0.1em"
      >
        NUMBER OF STUDENTS
      </text>

      {/* ================= BARS ================= */}
      {data.map((d, i) => (
        <g key={i}>

          {/* =============== NOTE ================ */}
          <text
            x={margin.left}
            y={bottomY + 45}
            textAnchor="start"
            fontSize="10"
            fill="#6B7280"
            opacity={0.027}
            fontFamily="DM Sans"
          >
            (Small counts (&lt; 3) removed)
          </text>

          {/* Bar */}
          <rect
            x={margin.left}
            y={yScale(d.country)}
            width={xScale(d.students) - margin.left}
            height={yScale.bandwidth()}
            fill={hovered === i ? "#1B5FA8" : "#5B9BD5"}
            opacity={hovered === null || hovered === i ? 0.9 : 0.3}
            rx={4}

            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}

            style={{
              transition: "all 0.2s ease",
              cursor: "pointer",
              transform: hovered === i ? "translateX(2px)" : "translateX(0)"
            }}
          />

          {/* Country label */}
          <text
            x={margin.left - 10}
            y={yScale(d.country) + yScale.bandwidth() / 2}
            textAnchor="end"
            alignmentBaseline="middle"
            fill={hovered === i ? "#0F1117" : "#6B7280"}
            fontWeight={hovered === i ? "500" : "400"}
            fontSize="12"
            fontFamily="DM Mono"
          >
            {d.country}
          </text>

          {/* Value (only on hover) */}
          {hovered === i && (
            <text
              x={xScale(d.students) + 6}
              y={yScale(d.country) + yScale.bandwidth() / 2}
              alignmentBaseline="middle"
              fill="#0F1117"
              fontSize="12"
              fontFamily="DM Mono"
            >
              {d.students}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}