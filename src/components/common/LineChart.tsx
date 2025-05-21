import {
  Box,
  Stack,
  Heading,
  Portal,
  Select,
  createListCollection,
} from "@chakra-ui/react";
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
    () =>
      createListCollection({
        items: [
          { label: "10 Minute", value: "10m" },
          { label: "1 Hour", value: "1h" },
        ],
      }),
    []
  );

  const attributeOptions = useMemo(
    () =>
      createListCollection({
        items: [
          { label: "Show All", value: "all" },
          ...attributes.map((attr) => ({
            label: attr.replace(/_/g, " "),
            value: attr,
          })),
        ],
      }),
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
    <Box
      w="full"
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow="md"
      border={2}
      borderStyle={"solid"}
      borderColor={"gray.200"}
    >
      <Stack gap={4}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={4}
        >
          <Heading size="md">{title}</Heading>

          <Box display="flex" gap={4}>
            <Select.Root
              w="160px"
              collection={intervalOptions}
              value={[interval]}
              onValueChange={(v) => setInterval(v.value[0] as "10m" | "1h")}
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Interval" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {intervalOptions.items.map((item) => (
                      <Select.Item item={item} key={item.value}>
                        {item.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>

            {attributes.length > 1 && (
              <Select.Root
                w="180px"
                collection={attributeOptions}
                value={[selectedAttribute]}
                onValueChange={(v) => setSelectedAttribute(v.value[0])}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Choose attribute" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {attributeOptions.items.map((item) => (
                        <Select.Item item={item} key={item.value}>
                          {item.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            )}
          </Box>
        </Box>

        <Box w="full">
          <Chart
            options={chartOptions}
            series={series}
            type="line"
            height={350}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default LineChart;
