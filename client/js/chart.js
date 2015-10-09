console.log('chart data loaded')

var c1 = document.getElementById("c1");
var parent = document.getElementById("p1");
c1.width = parent.offsetWidth - 40;
c1.height = parent.offsetHeight - 40;

var data1 = {
  labels: ["", "LOW", "", "AVG", "", "HIGH", ""],
  datasets: [{
    fillColor: "rgba(255,255,255,.1)",
    strokeColor: "rgba(255,255,255,1)",
    pointColor: "#b66e5d",
    pointStrokeColor: "rgba(255,255,255,1)",
    data: [0, 60, 141, 374, 334, 250, 700]
  }]
}

var options1 = {
  scaleFontColor: "rgba(255,255,255,1)",
  scaleLineColor: "rgba(255,255,255,1)",
  scaleGridLineColor: "transparent",
  bezierCurve: true,
  scaleOverride: true,
  scaleSteps: 8,
  scaleStepWidth: 100,
  scaleStartValue: 0
}

new Chart(c1.getContext("2d")).Line(data1, options1)
