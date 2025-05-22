import { useMemo } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface DataItem {
  label: string;
  value: number;
}

interface PieChartProps {
  data: DataItem[];
  title?: string;
  height?: number | string;
  showLegend?: boolean;
  showDataLabels?: boolean;
  showTable?: boolean;
  customColors?: string[];
}

const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 65 + Math.floor(Math.random() * 25);
  const lightness = 45 + Math.floor(Math.random() * 15);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const PieChart: React.FC<PieChartProps> = ({
  data,
  title = "Pie Chart",
  height = 350,
  showLegend = true,
  showDataLabels = true,
  showTable = true,
  customColors = [],
}) => {
  const filteredData = data.filter((item) => item.value > 0);
  const labels = filteredData.map((item) => item.label);
  const values = filteredData.map((item) => item.value);
  const total = values.reduce((sum, value) => sum + value, 0);

  const colors = useMemo(() => {
    if (customColors.length >= filteredData.length) {
      return customColors;
    }
    const generatedColors = [];
    for (let i = 0; i < filteredData.length; i++) {
      if (i < customColors.length) {
        generatedColors.push(customColors[i]);
      } else {
        generatedColors.push(generateRandomColor());
      }
    }
    return generatedColors;
  }, [filteredData.length, customColors]);

  const chartOptions: ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
      background: "transparent",
      foreColor: document.documentElement.classList.contains("dark")
        ? "#e5e7eb"
        : "#1f2937",
    },
    labels,
    colors,
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      fontWeight: 500,
      show: showLegend,
      labels: {
        colors: document.documentElement.classList.contains("dark")
          ? "#e5e7eb"
          : "#1f2937",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              fontSize: "16px",
              fontWeight: 600,
              color: document.documentElement.classList.contains("dark")
                ? "#e5e7eb"
                : "#1f2937",
              formatter: () => `${total}`,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: showDataLabels,
      formatter: function (val: number, opts: any) {
        return `${Math.round(val)}% (${opts.w.config.series[opts.seriesIndex]})`;
      },
      style: {
        fontSize: "12px",
        fontWeight: 500,
        colors: document.documentElement.classList.contains("dark")
          ? ["#e5e7eb"]
          : ["#1f2937"],
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return `${val} (${((val / total) * 100).toFixed(1)}%)`;
        },
      },
      theme: document.documentElement.classList.contains("dark")
        ? "dark"
        : "light",
      style: {
        fontSize: "12px",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: height,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="flex flex-col items-center w-full gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 transition-colors duration-200">
      {title && (
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      )}

      <div className="w-full" style={{ height }}>
        <Chart
          options={chartOptions}
          series={values}
          type="donut"
          height="100%"
        />
      </div>

      {showTable && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4"
              style={{ borderLeftColor: colors[index] }}
            >
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {item.label}:
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {item.value} ({((item.value / total) * 100).toFixed(1)}%)
              </span>
            </div>
          ))}
          <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-600 rounded-lg font-semibold col-span-1 sm:col-span-2">
            <span className="text-sm text-gray-900 dark:text-gray-100">
              Total:
            </span>
            <span className="text-sm text-gray-900 dark:text-gray-100">
              {total}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PieChart;
