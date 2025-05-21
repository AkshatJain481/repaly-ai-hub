
import Chart from "react-apexcharts";
import { useMemo, useState } from "react";
import {
  CommentTimeseriesResponse,
  CommentTimeseriesPoint,
} from "@/utils/interfaces";

const LineChart = ({
  rawData,
  attributes,
  colors = [],
  title = "Line Chart",
}: {
  rawData: CommentTimeseriesResponse;
  attributes: string[];
  colors?: string[];
  title?: string;
}) => {
  const [interval, setInterval] = useState<"10m" | "1h">("1h");
  const [selectedAttribute, setSelectedAttribute] = useState<string>("all");

  const intervalOptions = useMemo(
    () => [
      { label: "10 Minute", value: "10m" },
      { label: "1 Hour", value: "1h" },
    ],
    []
  );

  const attributeOptions = useMemo(
    () => [
      { label: "Show All", value: "all" },
      ...attributes.map((attr) => ({
        label: attr.replace(/_/g, " "),
        value: attr,
      })),
    ],
    [attributes]
  );

  const data = interval === "10m" ? rawData.by_10m : rawData.by_1h;

  const categories = data.map((item) =>
    new Date(item.ts * 1000).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const displayedAttributes =
    selectedAttribute === "all"
      ? attributes
      : attributes.filter((a) => a === selectedAttribute);

  const series = displayedAttributes.map((attr) => ({
    name: attr.replace(/_/g, " "),
    data: data.map((item) => item[attr as keyof CommentTimeseriesPoint] ?? 0),
  }));

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      zoom: { enabled: false },
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif",
    },
    xaxis: {
      categories,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: colors.slice(0, displayedAttributes.length),
    tooltip: {
      shared: true,
      intersect: false,
    },
    markers: {
      size: 6,
      strokeWidth: 2,
      hover: {
        size: 8,
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white rounded-md shadow-md border-2 border-gray-200 border-solid">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
          <h3 className="text-lg font-medium">{title}</h3>

          <div className="flex gap-4">
            <select
              className="w-40 border rounded p-2"
              value={interval}
              onChange={(e) => setInterval(e.target.value as "10m" | "1h")}
            >
              {intervalOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {attributes.length > 1 && (
              <select
                className="w-44 border rounded p-2"
                value={selectedAttribute}
                onChange={(e) => setSelectedAttribute(e.target.value)}
              >
                {attributeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="w-full">
          <Chart
            options={chartOptions}
            series={series}
            type="line"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
