// Load data
let popData = []

d3.csv("assets/data/data.csv").then(data => {
    popData = data
    console.log(popData);
    init(popData);
})

function init(data) {

    states = []

    for (let j = 0; j < data.length; j++) {[
        abbr = data[j].abbr,
        states.push(abbr)
    ]}
    console.log(states)

    incomes = []

    for (let k = 0; k < data.length; k++) {[
        income = +data[k].income,
        incomes.push(income)
    ]}
    incomes.sort((a, b) => a - b)
    console.log(incomes)

    obesity = []

    for (let l = 0; l < data.length; l++) {[
        obesityData = +data[l].obesity,
        obesity.push(obesityData)
    ]}
    obesity.sort((a, b) => a - b)

    console.log(obesity)

    // Define SVG area dimensions
    var svgWidth = 960;
    var svgHeight = 560;

    // Define the chart's margins as an object
    var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
    };

    // Define dimensions of the chart area
    var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

    // Select body, append SVG area to it, and set the dimensions
    var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

    // Append a group to the SVG area and shift ('translate') it to the right and down to adhere
    // to the margins set in the "chartMargin" object.
    var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

    // scale y to chart height
    var yScale = d3.scaleLinear()
    .domain([0, 40])
    .range([chartHeight, 0]);

    // scale x to chart width
    var xScale = d3.scaleLinear()
    .domain([38000, 78000])
    .range([0, chartWidth])
    // .padding(0.05);

    // create axes
    var yAxis = d3.axisLeft(yScale);

    var xAxis = d3.axisBottom(xScale);

    // set x to the bottom of the chart
    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);

    // set y to the y axis
    chartGroup.append("g")
    .call(yAxis);

    chartGroup.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cy", function (d) { return yScale(d.obesity); } )
    .attr("cx", function (d) { return xScale(d.income); } )
    .attr("r", 10)
    .style("fill", "#69b3a2")
    //   .append()
    
    chartGroup.selectAll("text")
    .data(data)
    .enter()
    .append('text')
    .attr("y", function(d) { return yScale(d.obesity); })
    .attr("x", function(d) { return xScale(d.income); })
    .text((d) => `${d.abbr}`)
    
    // text label for the x axis
    chartGroup.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", chartWidth)
        .attr("y", chartHeight - 6)
        .text("Income ($ per Year)");

    chartGroup.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Obesity (%)");
}





