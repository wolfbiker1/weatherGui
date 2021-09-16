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
    setInterval(() => {
      this.fetchHistory().then(() => {
        this.drawPlot();
      });
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
    drawPlot() {
      console.log("draw...");
      d3.select("#bar").remove();
      // set the dimensions and margins of the graph
      const margin = { top: 20, right: 20, bottom: 50, left: 70 },
        width = 500 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

      const start = this.getCurrentHistory[0].x;
      const end = this.getCurrentHistory[this.getCurrentHistory.length - 1].x;

      /*** DO NOT DELETE!!!! ***/
      // short time period
      var x = d3
        .scaleTime()
        .domain([new Date(start), new Date(end)])
        .range([0, width]);

      // few days
      this.mode = 0;
      // const x = d3
      //   .scaleTime()
      //   .domain([
      //     new Date("1995-12-13T12:24:00"),
      //     new Date("1995-12-13T17:24:00"),
      //   ])
      //   .range([0, width]);

      const y = d3.scaleLinear().domain([1019, 1021]).range([height, 0]);

      // define the line
      const valueline = d3
        .line()
        .x(function (d) {
          return x(new Date(d.x));
        })
        .y(function (d) {
          return y(d.y);
        })
        .curve(d3.curveMonotoneX);
      const svg = d3
        .select(".pressurePlot")
        .append("svg")
        .attr("id", "bar")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // const dd = [
      //   { x: new Date("1995-12-13T12:24:00"), y: 1024.2 },
      //   { x: new Date("1995-12-13T12:51:00"), y: 1028.2 },
      //   { x: new Date("1995-12-13T13:25:00"), y: 1027.2 },
      //   { x: new Date("1995-12-13T15:24:00"), y: 1021.2 },
      //   { x: new Date("1995-12-13T16:54:00"), y: 1018.2 },
      // ];

      const dd = this.getCurrentHistory;
      svg
        .append("path")
        .data([dd])
        .style("fill", "none")
        .attr("class", "line")
        .style("stroke", "#b77efc")
        .attr("d", valueline);

      // Add the x Axis
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(
          d3
            .axisBottom(x)
            .ticks(5)
            .tickFormat(
              this.mode === 0 ? d3.timeFormat("%H:%M") : d3.timeFormat("%d/%m")
            )
        );

      // Add the y Axis
      svg.append("g").call(d3.axisLeft(y));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css"></style>
