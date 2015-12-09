var globalHeatmap;
var globalIdMap = new Array();

function HeatMapGrid(divSelector,n,widthPx_) {

	//setup colors
    this.colors = ['#FFF','#FF0','#F00','GREEN'];
    this.heatMapColorScale = d3.scale.quantile()
      .domain([ 0 , 3])
      .range(this.colors);


	var rangeN = d3.range(n);
	var gridSideNum = Math.sqrt(n);
	//initialize heatmap
	this.heatMap = new HeatMap(divSelector,gridSideNum,widthPx_,this.heatMapColorScale);
	globalHeatmap = this.heatMap;

	var rectangles = this.heatMap.dataPoints.selectAll("rect")
		.data(rangeN).each(function(p,i) {
			//no rectangles should exist
		})
		.enter().append("rect").each(function(p,i) {
			d3.select(this).attr("id",function(p,i) {
				var cellId = "cell"+p;
				globalIdMap[i] = cellId;
				return cellId; }
			);
			var row = Math.floor(i/gridSideNum);
			var col = i % gridSideNum;

			globalHeatmap.setDataPointFill(row,col,0,d3.select(this));
		})


	this.updateCellColor = function(personId_,val_) {
		d3.select("#cell"+personId_).attr("fill",this.colors[val_]);
	}

}


/**
http://knowledgestockpile.blogspot.com/2012/01/using-d3js-to-draw-grid.html
http://bl.ocks.org/ianyfchang/8119685
http://bost.ocks.org/mike/miserables/
**/
function HeatMap(divSelector, numNodes,widthPx,colorScaleFn) {

  //widthPx of the grid
  this.widthPx = widthPx;
  this.colorScaleFn = colorScaleFn;
  var singleGridWidth = widthPx / numNodes;
  var strokeWidth = 0.25;
  var strokeColor = "rgba(100,100,100,0.7)";
  var rx = "2px";

    //Function: create SVG group for gridlines
    this.createGrid = function() {
	if (this.grid == null) {
	    this.grid = this.lineGraph.append("g")
		.attr("id","grid")
		.style("stroke", strokeColor)
		.style("stroke-width", strokeWidth);
	}
      // Using for loop to draw grid lines
      for (var j=0; j <= numNodes; j++) {
	  var currRowY = j*singleGridWidth;
	  var currColX = currRowY;

	  //draw horizontal lines
	  this.grid.append("svg:line")
              .attr("x1", 0)
              .attr("y1", currRowY)
              .attr("x2", this.widthPx)
              .attr("y2", currRowY);

	  //draw vertical lines
	  this.grid.append("svg:line")
              .attr("x1", currColX)
              .attr("y1", 0)
              .attr("x2", currColX)
              .attr("y2", this.widthPx);
      } // for (var j=0; j < numNodes; j++) {
    } //createGrid


    this.setDataPointFill = function(row,col,value,currDataSVG) {
   	    var color = this.colorScaleFn(value);

	    currDataSVG.attr("width",singleGridWidth-strokeWidth)
	    .attr("height",singleGridWidth-strokeWidth)
	    .attr("x",singleGridWidth*col+strokeWidth/2)
	    .attr("y",singleGridWidth*row+strokeWidth/2)
	    .attr("fill",color)
	    .text(function(d) {
		return row+","+col;
	    })
	    .on("click",function(d) {
                alert(row+","+col+":"+value);
	    })
	    .on("mouseover",function(d) {
		d3.select(this).attr("fill","rgb(255,255,255)");
                d3.select(this).select("text").style({opacity:'1'});
	    })
	    .on("mouseout",function(d) {
		d3.select(this).attr("fill",color);
                d3.select(this).select("text").style({opacity:'0'});
	    });

    }

    //Function: initialize SVG elements
    this.init = function() {
	//get the div and add the SVG
	this.lineGraph = d3.select(divSelector)
	    .append("svg:svg")
	    .attr("width", this.widthPx+2)
	    .attr("height", this.widthPx+2);

	//create SVG group for data cells
	this.dataPoints = this.lineGraph.append("g")
	    .attr("class","cells")
	    .attr("rx",rx)
	    .attr("ry",rx);

	this.createGrid();
	//this.fillDataPoint(9,9,"rgb(0,255,0)");
    }

    this.init();

};
