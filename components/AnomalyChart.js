"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

export default function AnomalyChart({ data }) {
  // Format the data for recharts
  const chartData = useMemo(() => {
    return data.map((d) => ({
      ...d,
      date: new Date(d.timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
    }));
  }, [data]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-[#0e0e0e] border border-[#262626] p-sm rounded shadow-lg">
          <p className="text-on-surface font-label-caps text-label-caps mb-1">{dataPoint.date}</p>
          <p className="text-[#008CFF] font-mono-data">Consumption: {dataPoint.consumption} MWh</p>
          {dataPoint.is_anomaly && (
            <div className="mt-1 pt-1 border-t border-[#262626]">
              <p className="text-[#E82127] font-bold text-[12px] uppercase">
                {dataPoint.severity} ANOMALY
              </p>
              <p className="text-on-surface-variant text-[12px]">
                Type: {dataPoint.anomaly_type}
              </p>
              <p className="text-on-surface-variant text-[12px]">
                Score: {dataPoint.ensemble_score}
              </p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // Find all anomalies to plot them as dots
  const anomalies = chartData.filter((d) => d.is_anomaly);

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#525252" 
            tick={{ fill: "#A1A1AA", fontSize: 10 }} 
            tickMargin={10}
            minTickGap={30}
          />
          <YAxis 
            stroke="#525252" 
            tick={{ fill: "#A1A1AA", fontSize: 10 }}
            tickFormatter={(val) => `${val}`}
            domain={['auto', 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="consumption"
            stroke="#008CFF"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#008CFF", stroke: "#000" }}
            isAnimationActive={false}
          />
          {anomalies.map((entry, index) => (
            <ReferenceDot
              key={`anomaly-${index}`}
              x={entry.date}
              y={entry.consumption}
              r={4}
              fill={entry.severity === 'CRITICAL' ? '#E82127' : entry.severity === 'HIGH' ? '#f59e0b' : '#eab308'}
              stroke="none"
              isFront={true}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
