// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-sprockets
//= require d3.min
//= require underscore
//= require_tree .

$(document).ready(function() {
  var val1, val2, val3;
  $("#param1").on('input', function(){
    val1 = $(this).val();
  });

  $("#param2").on('input', function(){
    val2 = $(this).val();
  });

  $("#param3").on('input', function(){
    val3 = $(this).val();
  });


  $("#calc").on("click", function(){
    lineChart(parseFloat(val1), parseFloat(val2), parseFloat(val3));
  });

  function lineChart(val1, val2, val3) {
    $("#line-chart").empty();
    var m = [80, 80, 80, 80]; // margins
    var w = 800 - m[1] - m[3]; // width
    var h = 400 - m[0] - m[2]; // height
    var data = [val1, val2, val3];
    var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
    var y = d3.scale.linear().domain([0, 10]).range([h, 0]);

    var MaxValue = _.max(data);
    x.domain([0, MaxValue]);
    y.domain([0, MaxValue]);

    var line = d3.svg.line()
        .x(function(d,i) {
          return x(i);
        })
        .y(function(d) {
          return y(d);
        });

    var graph = d3.select("#line-chart").append("svg:svg")
        .attr("width", w + m[1] + m[3])
        .attr("height", h + m[0] + m[2])
        .append("svg:g")
        .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);
    graph.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + h + ")")
        .call(xAxis);

    var yAxisLeft = d3.svg.axis().scale(y).ticks(5).orient("left");

    graph.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(-25,0)")
        .call(yAxisLeft);

    graph.append("svg:path").attr("d", line(data));

  }
});
