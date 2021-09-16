<template>
  <div>
    <div id="temperaturePlot"></div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "TempGraph",
  props: {
    msg: String,
  },
  mounted() {
    this.drawPlot();
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
    drawPlot() {
      // set the dimensions and margins of the graph
      const margin = { top: 20, right: 20, bottom: 50, left: 70 },
        width = 500 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

      /*** DO NOT DELETE!!!! ***/
      // short time period
      // var x = d3.scaleTime().domain([new Date('1995-12-17T12:24:00'), new Date('1995-12-17T17:24:00')]).range([0, width]);

      // few days
      this.mode = 1;
      const x = d3
        .scaleTime()
        .domain([
          new Date("1995-12-13T12:24:00"),
          new Date("1995-12-17T17:24:00"),
        ])
        .range([0, width]);

      const y = d3.scaleLinear().domain([0, 18]).range([height, 0]);

      // define the line
      const valueline = d3
        .line()
        .x(function (d) {
          return x(d.x);
        })
        .y(function (d) {
          return y(d.y);
        });

      const svg = d3
        .select("#temperaturePlot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const dd = [
        { x: new Date("1995-12-13 12:24:00"), y: 9 },
        { x: new Date("1995-12-14 12:51:00"), y: 9 },
        { x: new Date("1995-12-15 13:25:00"), y: 14 },
        { x: new Date("1995-12-16 15:24:00"), y: 11 },
        { x: new Date("1995-12-17 16:54:00"), y: 13 },
      ];

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
