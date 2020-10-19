// Load data
d3.csv("assets/data/data.csv").then(data => {

    // Define SVG area dimensions
    var svgHeight = 650
    var svgWidth = 1300;
    
    // Define the chart's margins as an object
    var chartMargin = {
        top: 60,
        right: 60,
        bottom: 60,
        left: 60
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

    // Scale y to chart height
    var yScale = d3.scaleLinear()
        .domain([0, 26])
        .range([chartHeight, 0]);

    // Scale x to chart width
    var xScale = d3.scaleLinear()
        .domain([8, 24])
        .range([0, chartWidth]);

    // Create axes
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    // Set x to the bottom of the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    // Set y to the y axis
    chartGroup.append("g")
        .call(yAxis);

    // Add dots to the scatter plot
    chartGroup.append("g")
        .attr("stroke-width", 1)
        .attr("stroke", "gray")
        .attr("opacity", .75)
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cy", d => yScale(d.healthcareLow))
        .attr("cx", d => xScale(d.poverty))
        .attr("r", 12)
        .style("fill", "#69b3a2");
    
    // Add state abbreviations to the dots
    chartGroup.append("g")
        .attr("font-family", "Calibri")
        .attr("font-weight", 600)
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(data)
        .join("text")
        .attr("dy", "0.35em")
        .attr("y", d => yScale(d.healthcareLow))
        .attr("x", d => xScale(d.poverty))
        .text(d => d.abbr);
    
    // Add the text label for the y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 60 - chartMargin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Lacks Healthcare (%)");  
    
    // Add the text label for the x axis
    svg.append("text")             
        .attr("transform", "translate(" + (chartWidth/2) + " ," + (chartHeight + chartMargin.top + 50) + ")")
        .style("text-anchor", "middle")
        .text("In Poverty (%)");

})





