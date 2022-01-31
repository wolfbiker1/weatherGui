<template>
  <div>
    <div :class="field"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MeasurementGraphs",
  props: {
    field: String,
    plotId: String,
    strokeColor: String,
    areaColor: String,
    apiRoute: String,
  },
  computed: {
    ...mapGetters("history", ["getHistory"]),
    getCurrentHistory() {
      return this.getHistory(this.apiRoute);
    },
  },
  mounted() {
    this.fetchHist();

    setInterval(() => {
      this.drawPlot();
    }, 15000);
  },
  data() {
    return {
      mode: 0,
    };
  },
  methods: {
    ...mapActions("history", ["fetchHistory"]),
    fetchHist() {
      this.fetchHistory(this.apiRoute).then(() => {
        this.drawPlot();
      });
    },
    createDataLine(x, y) {
      return d3
        .line()
        .x(function (d) {
          return x(new Date(d.date_of_record));
        })
        .y(function (d) {
          return y(d.value);
        })
        .curve(d3.curveMonotoneX);
    },
    createArea(x, y) {
      return d3
        .area()
        .x(function (d) {
          return x(new Date(d.date_of_record));
        })
        .y0(window.height)
        .y1(function (d) {
          return y(d.value);
        });
    },
    createXAxis(start, end, window) {
      return d3
        .scaleTime()
        .domain([new Date(start), new Date(end)])
        .range([0, window.width]);
    },
    createYAxis(start, end, window) {
      return d3.scaleLinear().domain([start, end]).range([window.height, 0]);
    },
    setUpWindow() {
      const margin = { top: 20, right: 20, bottom: 50, left: 70 };
      return {
        width: window.innerWidth / 4 - margin.left - margin.right,
        height: window.innerHeight / 3 - margin.top - margin.bottom,
        margin: margin,
      };
    },
    removePlot() {
      d3.select("#" + this.plotId).remove();
      // d3.select("#yaxis").remove();
    },
    drawPlot() {
      const dataset = this.getCurrentHistory;
      this.removePlot();

      // set the dimensions and margins of the graph
      const window = this.setUpWindow();
      const start = this.getCurrentHistory[0].date_of_record;
      const end =
        this.getCurrentHistory[this.getCurrentHistory.length - 1]
          .date_of_record;

      /*** DO NOT DELETE!!!! ***/
      // short time period
      var x = this.createXAxis(start, end, window);

      const getYs = () => {
        return dataset.map((e) => e.value);
      };
      const y = this.createYAxis(
        Math.min(...getYs()),
        Math.max(...getYs()),
        window
      );

      const valueline = this.createDataLine(x, y);
      const area = d3
        .area()
        .x(function (d) {
          return x(new Date(d.date_of_record));
        })
        .y0(window.height)
        .y1(function (d) {
          return y(d.value);
        });
      // few days
      this.mode = 0;
      /*** DO NOT DELETE!!!! ***/
      // long time period
      // const x = d3
      //   .scaleTime()
      //   .domain([
      //     new Date("1995-12-13T12:24:00"),
      //     new Date("1995-12-13T17:24:00"),
      //   ])
      //   .range([0, width]);

      // main
      const svg = d3
        .select("." + this.field)
        .append("svg")
        .attr("id", this.plotId)
        .attr("width", window.width + window.margin.left + window.margin.right)
        .attr(
          "height",
          window.height + window.margin.top + window.margin.bottom
        )
        .append("g")
        .attr(
          "transform",
          "translate(" + window.margin.left + "," + window.margin.top + ")"
        );

      // Add the area
      svg
        .append("path")
        .datum(dataset)
        .attr("class", "area")
        .attr("fill", this.areaColor)
        .attr("fill-opacity", 0.1)
        .attr("stroke", "none")
        .attr("d", area);

      svg
        .append("path")
        .data([dataset])
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke-width", 1)
        .attr("opacity", 1)
        .style("stroke", this.strokeColor)
        .attr("d", valueline);

      // Add the x Axis
      svg
        .append("g")
        .attr("transform", "translate(0," + window.height + ")")
        .style("stroke", "white")
        .attr("class", "axisWhite")
        .call(
          d3
            .axisBottom(x)
            .ticks(8)
            .tickFormat(
              this.mode === 0 ? d3.timeFormat("%H:%M") : d3.timeFormat("%d/%m")
            )
        );

      // Add the y Axis
      svg
        .append("g")
        // .attr("class", "axisWhite")
        .style("stroke", "white")
        .attr("id", "yaxis")
        .call(d3.axisLeft(y));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .area {
  fill: rgb(0, 204, 255);
  stroke-width: 0;
} */
.axisWhite line {
  stroke: red;
}

.axisWhite path {
  stroke: red;
}
.axisWhite text {
  fill: red;
}
</style>
