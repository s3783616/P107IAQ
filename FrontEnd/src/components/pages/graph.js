import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto"; //Importing graphing function
const chart = new Chart(ctx, {
  type: "line",
  data: data, //This should be gathered from the JSON at some point
  options: {
    onClick: (e) => {
      const canvasPosition = getRelativePosition(e, chart);

      // Substitute the appropriate scale IDs
      const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
      const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
    },
  },
});
