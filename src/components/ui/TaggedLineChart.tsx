import Chart from "react-apexcharts";

type TaggedDataPoint = {
  count: number;
  ts: number; // UNIX timestamp in seconds
};

type Props = {
  taggedData: TaggedDataPoint[];
};

const TaggedLineChart: React.FC<Props> = ({ taggedData }) => {
  const categories = taggedData.map((item) =>
    new Date(item.ts * 1000).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  const series = [
    {
      name: "Tagged Comments",
      data: taggedData.map((item) => item.count),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      zoom: { enabled: false },
    },
    xaxis: {
      categories,
      title: {
        text: "Time",
      },
    },
    yaxis: {
      title: {
        text: "Comment Count",
      },
    },
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 5,
    },
    tooltip: {
      x: {
        formatter: (val: number) => categories[val - 1] || "",
      },
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="line" height={500} />
    </div>
  );
};

export default TaggedLineChart;
