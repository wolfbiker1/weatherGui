<template>
  <div>
    <div :class="field"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MeasurementBarChart",
  props: {
    field: String,
    plotId: String,
    strokeColor: String,
    areaColor: String,
    apiRoute: String,
  },
  computed: {
    ...mapGetters("history", ["getBarChart"]),
    getCurrentHistory() {
      return this.getBarChart(this.apiRoute);
    },
  },
  mounted() {
    this.fetchHist();

    // setInterval(() => {
    //   this.drawPlot();
    // }, 15000);
  },
  data() {
    return {
      mode: 0,
    };
  },
  methods: {
    ...mapActions("history", ["fetchBarChartHistory"]),
    fetchHist() {
      this.fetchBarChartHistory(this.apiRoute).then(() => {
        this.drawPlot();
      });
    },
    createXAxis(window) {
      return d3.scaleLinear().range([0, window.width]);
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
    },
    drawPlot() {
      let dataset = this.getCurrentHistory;
      // dataset = dataset.reverse();
      this.removePlot();
      const window = this.setUpWindow();
      // set the ranges
      var x = d3.scaleBand().range([0, window.width]).padding(0.1);
      var y = d3.scaleLinear().range([window.height, 0]);

      x.domain(
        dataset.map(function (d) {
          return d.date_of_record;
        })
      );

      // let domainMin;
      // if (this.f)

      y.domain([
        d3.min(dataset, function (d) {
          return d.value;
        }),
        d3.max(dataset, function (d) {
          return d.value;
        }),
      ]);

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

      svg
        .selectAll(".bar")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
          return x(d.date_of_record);
        })
        .attr("width", x.bandwidth())
        .attr("y", function (d) {
          return y(d.value);
        })
        .attr("height", function (d) {
          return window.height - y(d.value);
        })
        .style("stroke", this.strokeColor);

      // Add the x Axis
      svg
        .append("g")
        .attr("transform", "translate(0," + window.height + ")")
        .style("stroke", "white")
        .attr("class", "axisWhite")
        .call(d3.axisBottom(x).ticks(12))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

      // Add the y Axis
      svg
        .append("g")
        .style("stroke", "white")
        .attr("id", "yaxis")
        .call(d3.axisLeft(y));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
