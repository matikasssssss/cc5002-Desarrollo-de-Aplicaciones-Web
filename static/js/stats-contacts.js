Highcharts.chart("container", {
  chart: {
      type: "pie",
  },
  title: {
      text: "Total de contactos por comuna",
  },
  tooltip: {
      pointFormat: "{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)",
  },
  accessibility: {
      point: {
          valueSuffix: "%",
      },
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.y} ({point.percentage:.1f}%)",
          },
      },
  },
  series: [
      {
          name: "Contactos",
          colorByPoint: true,
          data: [],
      },
  ],
});

fetch("http://127.0.0.1:5000/api/contactos-por-comuna")
  .then((response) => response.json())
  .then((data) => {
      let parsedData = Object.entries(data).map(([comuna, cantidad]) => {
          return { name: comuna, y: cantidad };
      });

      const chart = Highcharts.charts.find(
          (chart) => chart && chart.renderTo.id === "container"
      );

      chart.update({
          series: [
              {
                  data: parsedData,
              },
          ],
      });
  })
  .catch((error) => console.error("Error:", error));
