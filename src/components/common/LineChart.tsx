import { useMemo, useState } from "react";
import Chart from "react-apexcharts";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "lucide-react";
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
      background: "transparent",
      foreColor: document.documentElement.classList.contains("dark")
        ? "#e5e7eb"
        : "#1f2937",
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: document.documentElement.classList.contains("dark")
            ? "#e5e7eb"
            : "#1f2937",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: document.documentElement.classList.contains("dark")
            ? "#e5e7eb"
            : "#1f2937",
          fontSize: "12px",
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: colors.slice(0, displayedAttributes.length),
    tooltip: {
      shared: true,
      intersect: false,
      theme: document.documentElement.classList.contains("dark")
        ? "dark"
        : "light",
      style: {
        fontSize: "12px",
      },
    },
    markers: {
      size: 6,
      strokeWidth: 2,
      strokeColors: document.documentElement.classList.contains("dark")
        ? "#1f2937"
        : "#ffffff",
      hover: {
        size: 8,
      },
    },
    grid: {
      borderColor: document.documentElement.classList.contains("dark")
        ? "#374151"
        : "#e5e7eb",
    },
  };

  return (
    <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 transition-colors duration-200">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>

          <div className="flex flex-col sm:flex-row gap-3">
            <Select.Root
              value={interval}
              onValueChange={(value) => setInterval(value as "10m" | "1h")}
            >
              <Select.Trigger
                className="w-[140px] inline-flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors"
                aria-label="Select time interval"
              >
                <Select.Value />
                <Select.Icon>
                  <ChevronDownIcon className="w-4 h-4" />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg overflow-hidden"
                  position="popper"
                  sideOffset={4}
                >
                  <Select.Viewport className="p-1">
                    {intervalOptions.map((option) => (
                      <Select.Item
                        key={option.value}
                        value={option.value}
                        className="px-3 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 transition-colors"
                      >
                        <Select.ItemText>{option.label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>

            {attributes.length > 1 && (
              <Select.Root
                value={selectedAttribute}
                onValueChange={setSelectedAttribute}
              >
                <Select.Trigger
                  className="w-[160px] inline-flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors"
                  aria-label="Select attribute"
                >
                  <Select.Value />
                  <Select.Icon>
                    <ChevronDownIcon className="w-4 h-4" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg overflow-hidden"
                    position="popper"
                    sideOffset={4}
                  >
                    <Select.Viewport className="p-1">
                      {attributeOptions.map((option) => (
                        <Select.Item
                          key={option.value}
                          value={option.value}
                          className="px-3 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 transition-colors"
                        >
                          <Select.ItemText>{option.label}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
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
