<template>
  <div>
    <div class="pressurePlot"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PressureGraph",
  props: {
    msg: String,
  },
  computed: {
    ...mapGetters("pressure", ["getCurrentHistory"]),
  },
  mounted() {
    this.fetchHistory().then(() => {
      this.drawPlot();
    });
    setInterval(() => {
      this.drawPlot();
    }, 15000);
  },
  data() {
    return {
      mode: 0,
      data: [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 4 },
        { x: 5, y: 5 },
      ],
      data2: [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 4 },
        { x: 5, y: 5 },
      ],
    };
  },
  methods: {
    ...mapActions("pressure", ["fetchHistory"]),
    createDataLine(x, y) {
      return d3
        .line()
        .x(function (d) {
          return x(new Date(d.x));
        })
        .y(function (d) {
          return y(d.y);
        })
        .curve(d3.curveMonotoneX);
    },
    createArea(x, y) {
      return d3
        .area()
        .x(function (d) {
          return x(new Date(d.x));
        })
        .y0(window.height)
        .y1(function (d) {
          return y(d.y);
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
        width: 500 - margin.left - margin.right,
        height: 300 - margin.top - margin.bottom,
        margin: margin,
      };
    },
    removePlot() {
      d3.select("#bar").remove();
      d3.select("#yaxis").remove();
    },
    drawPlot() {
      const dataset = this.getCurrentHistory;
      this.removePlot();

      // set the dimensions and margins of the graph
      const window = this.setUpWindow();
      const start = this.getCurrentHistory[0].x;
      const end = this.getCurrentHistory[this.getCurrentHistory.length - 1].x;

      /*** DO NOT DELETE!!!! ***/
      // short time period
      var x = this.createXAxis(start, end, window);

      const getYs = () => {
        return dataset.map((e) => e.y);
      };
      console.log(Math.min(...getYs()));
      const y = this.createYAxis(
        Math.min(...getYs()),
        Math.max(...getYs()),
        window
      );

      const valueline = this.createDataLine(x, y);
      const area = d3
        .area()
        .x(function (d) {
          return x(new Date(d.x));
        })
        .y0(window.height)
        .y1(function (d) {
          return y(d.y);
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
        .select(".pressurePlot")
        .append("svg")
        .attr("id", "bar")
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

      svg
        .append("linearGradient")
        .attr("id", "temperature-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", y(1010))
        .attr("x2", 0)
        .attr("y2", y(1030))
        .selectAll("stop")
        .data([
          { offset: "0%", color: "steelblue" },
          { offset: "50%", color: "gray" },
          { offset: "100%", color: "red" },
        ])
        .enter()
        .append("stop")
        .attr("offset", function (d) {
          return d.offset;
        })
        .attr("stop-color", function (d) {
          return d.color;
        });

      // Add the area
      svg
        .append("path")
        .datum(dataset)
        .attr("class", "area")
        .attr("fill", "rgb(207, 228, 255)")
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
        .style("stroke", "rgb(0, 204, 255)")
        .attr("d", valueline);

      // Add the x Axis
      svg
        .append("g")
        .attr("transform", "translate(0," + window.height + ")")
        .call(
          d3
            .axisBottom(x)
            .ticks(5)
            .tickFormat(
              this.mode === 0 ? d3.timeFormat("%H:%M") : d3.timeFormat("%d/%m")
            )
        );

      // Add the y Axis
      svg.append("g").attr("id", "yaxis").call(d3.axisLeft(y));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
/* .area {
  fill: rgb(0, 204, 255);
  stroke-width: 0;
} */
.area {
  fill: url(#temperature-gradient);
  stroke-width: 05px;
}
</style>
