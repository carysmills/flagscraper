
//remove the Google Charts automated legend by selecting the specific SVG parts
function deleteLegend() {
	for (i=24; i>-1;i--){
		$("#calendarContain text").eq(i).remove();
	}
	for (i=25; i>-1;i--){
		$("#calendarContain path").eq(i).remove();
	}
}

// add each masting notice to the correct year, based on their classes
function placeContent() {
	$(".current_masting").each(function(){
		$(".current").append($(this));
	});

	$(".current_year").each(function(){
		$(".currentyear").append($(this));
	});
	
	
	$(".masting2017").each(function(){
		$(".year2017").append($(this));
	});

	$(".masting2016").each(function(){
		$(".year2016").append($(this));
	});

	$(".masting2015").each(function(){
		$(".year2015").append($(this));
	});

	$(".masting2014").each(function(){
		$(".year2014").append($(this));
	});

	$(".masting2013").each(function(){
		$(".year2013").append($(this));
	});

	$(".masting2012").each(function(){
		$(".year2012").append($(this));
	});

	$(".masting2011").each(function(){
		$(".year2011").append($(this));
	});
}

//click on a collapsed year, see the content or vice versa
$(".yearcontainer > h3").click(function(){
	$(this).next().toggleClass("big");
	if ($(this).children().hasClass("fa-chevron-right") == true) {
		$(this).children().removeClass('fa-chevron-right').addClass('fa-chevron-down');
	}
	else {
		$(this).children().removeClass('fa-chevron-down').addClass('fa-chevron-right');
	}
});

// D3 bar chart !!!

//get an array of data by finding the number of each year elements. then create matching arrays of categories and rules
var rules =[$(".s1").length,$(".s2").length,$(".s3").length,$(".s4").length,$(".s5").length,$(".s6").length,$(".s7").length,$(".s8").length,$(".s9").length,$(".s10").length,$(".s11").length,$(".s12").length,$(".s13").length,$(".s14").length,$(".s15").length,$(".s16").length,$(".s17").length,$(".s18").length,$(".s19").length,$(".s20").length,$(".s21").length,$(".s22").length,$(".s23").length,$(".sMultiple").length];
var categories= ["The Sovereign, the Governor General and the Prime Minister", "Sovereign's Family", 'Former Prime Minister', 'Former Governor General', 'Chief Justice of Canada and Members of the Canadian Ministry','Lieutenant Governors', 'Privy Councillors and Senators', 'Members of the House of Commons', 'Accredited Heads of Mission to Canada while in Canada', 'Half-Masting Initiated by a Province or Territory', 'Special Days', 'Foreign Heads of State or Heads of Government - Half-masting Abroad', 'Special Circumstances in a Foreign Country', 'Employees of the Federal Government', 'Foreign Heads of State or Heads of Government - Half-masting in Canada', 'Exceptional Circumstances', 'Delegation of Authority', 'Information from the Department of Canadian Heritage', 'Legal Holidays', 'Visiting Foreign Head of State or Head of Government', 'Exceptions to Sections 19 and 20', 'Half-Masting Notice', 'Coming into Effect', 'Multiple rules cited'];
var colors = ["#FFFF00","#1CE6FF","#FF34FF","#008941","#006FA6","#A30059","#63FFAC", "#B79762","#997D87","#FFB500","#C2FFED","#7900D7","#D25B88","#6C5E46","#6C8F7D","#BDC9D2","#EA8B66","#00C6C8","#fff","#B894A6","#006A66","#F4D749", "#6B94AA","#00005F"];

//set up future arrays
var newrules = [];
var newcategories = [];
var newcolors = [];

// get rid of any 0 values and corresponding category and data values from their arrays
for (i=0;i < rules.length;i++) {
	if (rules[i] !== 0) {
		newrules.push(rules[i]);
		newcategories.push(categories[i]);
		newcolors.push(colors[i]);
  }
}

var grid = d3.range(25).map(function(i){
  return {'x1':0,'y1':0,'x2':0,'y2':480};
});

var tickVals = grid.map(function(d,i){
  if(i>0){ return i * 15; }
  else if(i===0){ return "0";}
});

var xscale = d3.scale.linear()
  .domain([0,80])
  .range([1,150]);

var yscale = d3.scale.linear()
  .domain([0,8])
  .range([0,400]);

//matches up values and categories by setting the scale
var colorScale = d3.scale.quantize()
  .domain([0,newcategories.length])
  .range(newcolors);

var canvas = d3.select('#wrapper')
    .append('svg')
    .attr({'width':175,'height':530});

//make the graph by plotting the bar chart on the grid
var grids = canvas.append('g')
.attr('id','grid')
.attr('transform','translate(15,10)')
.selectAll('line')
.data(grid)
.enter()
.append('line')
.attr({'x1':function(d,i){ return i*30; },
     'y1':function(d){ return d.y1; },
     'x2':function(d,i){ return i*30; },
     'y2':function(d){ return d.y2; },
    })
.style({'stroke':'#adadad','stroke-width':'0.5px'});

var xAxis = d3.svg.axis();
	xAxis
	.orient('bottom')
	.tickSize(1)
	.scale(xscale)
	.tickValues(tickVals);

// Define the div for the tooltip
var div = d3.select('#wrapper')
	.append("div")	
	.attr("class", "tooltip2")				
	.style("opacity", 0);


var x_xis = canvas.append('g')
  .attr("transform", "translate(15,480)")
  .attr('id','xaxis')
  .call(xAxis);

var x_label = canvas.append("text")
		      .attr("class", "xlabel")
		      .attr("font-size", "13px")
		      .attr("font-weight", "bold")
		      .attr("x", 20)
		      .attr("y", 517)
		      .text("Number of half-mastings");

var y_label = canvas.append("text")
		      .attr("class", "ylabel")
		      .attr("font-size", "13px")
		      .attr("font-weight", "bold")
		      .attr("x", -300)
		      .attr("y", 10)
		      .attr("transform", "translate(0," + 100 + ")")
		      .attr("transform", "rotate(-90)")
		      .text("Rule cited");

var chart = canvas.append('g')
	.attr("transform", "translate(15,0)")
	.attr('id','bars')
	.selectAll('rect')
	.data(newrules)
	.enter()
	.append('rect')
	.attr('height',35)
	.attr('stroke','#adadad')
	.attr({'x':0,'y':function(d,i){ 
	return yscale(i)+35; 
	}
	})
	.style('fill',function(d,i){ 
	return colorScale(i);
	})
	.attr("width", function(d) {return d * 2; }) //width dependent on value
//create tooltips and behaviour for mouseover and mouseout (could be separate functions)
	.on("mouseover", function(d, i) {	
	div.transition()		
	.duration(200)		
	.style("opacity", 1);		
	div.html("<p><strong>Rule cited:</strong> " + newcategories[i] + "</p><p>" + "<strong>Number of half-mastings:</strong> " + d + "</p>")	
	.style("left", (d3.event.pageX + 30) + "px")		
	.style("top", (d3.event.pageY - 28) + "px");	
	})					
	.on("mouseout", function(d) {		
	div.transition()		
	.duration(500)		
	.style("opacity", 0);	
	});


$(document).ready(function(){
	setTimeout(deleteLegend, 2000);
	placeContent();
});
