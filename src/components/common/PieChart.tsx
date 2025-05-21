
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
    },
    labels,
    colors,
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      show: showLegend,
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
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return `${val} (${((val / total) * 100).toFixed(1)}%)`;
        },
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
    <div className="flex flex-col items-center w-full gap-4">
      <div className="w-full">
        {title && (
          <h3 className="text-lg font-medium text-center mb-4">
            {title}
          </h3>
        )}

        <div style={{ height }}>
          <Chart
            options={chartOptions}
            series={values}
            type="donut"
            height="100%"
          />
        </div>

        {showTable && (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {filteredData.map((item, index) => (
              <div
                key={index}
                className="flex justify-between p-2 bg-gray-50 border-l-4 rounded-md"
                style={{ borderLeftColor: colors[index] }}
              >
                <span className="font-medium">{item.label}:</span>
                <span>
                  {item.value} ({((item.value / total) * 100).toFixed(1)}%)
                </span>
              </div>
            ))}
            <div
              className="flex justify-between p-2 bg-gray-200 font-semibold rounded-md col-span-2"
            >
              <span>Total:</span>
              <span>{total}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PieChart;
