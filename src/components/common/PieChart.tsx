import { useMemo } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Box, Heading, Text, Stack, Flex, Grid } from "@chakra-ui/react";

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
      type: "donut", // Change to "donut"
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
          size: "65%", // This makes it a donut
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
    <Stack align="center" w="full" gap={4}>
      <Box w="full">
        {title && (
          <Heading size="md" textAlign="center" mb={4}>
            {title}
          </Heading>
        )}

        <Box height={height}>
          <Chart
            options={chartOptions}
            series={values}
            type="donut"
            height="100%"
          />
        </Box>

        {showTable && (
          <Grid templateColumns="repeat(2, 1fr)" gap={2} mt={4}>
            {filteredData.map((item, index) => (
              <Flex
                key={index}
                justify="space-between"
                p={2}
                bg="gray.50"
                borderLeft="4px solid"
                borderColor={colors[index]}
                borderRadius="md"
              >
                <Text fontWeight="medium">{item.label}:</Text>
                <Text>
                  {item.value} ({((item.value / total) * 100).toFixed(1)}%)
                </Text>
              </Flex>
            ))}
            <Flex
              columnSpan={"initial"}
              justify="space-between"
              p={2}
              bg="gray.200"
              fontWeight="semibold"
              borderRadius="md"
            >
              <Text>Total:</Text>
              <Text>{total}</Text>
            </Flex>
          </Grid>
        )}
      </Box>
    </Stack>
  );
};

export default PieChart;
