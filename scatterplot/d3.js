let h=120;
let w=400;
let padding = 10;
let textPadding = 2;

let salesKPI = (d)=>{
	if(d>70) 
		return "#33CC66" 
	else 
		return "#666666"
}

let data = [12,15,20,80,90,25,75,47,53];
let max = Math.max(...data);
let min = Math.min(...data); 

let isMinMax = (d)=> d == max || d == min

let showLabel = (d) =>{
	let labelOption = d3.select("#label-option").node().value;
	if(
		(labelOption === 'minmax' && isMinMax(d)) ||
	    labelOption === 'all' ){
		return d;
	}else{
		return "";
	}
}

let svg = d3.select('body').append('svg').attr("height",h).attr("width",w);
svg.style('background-color','lightgray');

svg.selectAll("circle").data(data).enter()
.append("circle")
.attr("cx",(d,i)=>i*(w/data.length)+padding)
.attr("cy",(d,i)=>h-d)
.attr("r",2)
.attr("fill",(d,i)=>salesKPI(d));


svg.selectAll("text").data(data).enter()
.append("text")
.text((d,i)=>showLabel(d))
.attr("x",(d,i)=>i*(w/data.length)+padding)
.attr("y",(d,i)=>h-d-textPadding)
.attr("text-anchor","middle")
.attr("font-family","sans-serif")
.attr("font-size","12")
.attr("fill",(d,i)=>salesKPI(d));

d3.select("#label-option").on("change",function(){
	svg.selectAll("text")
		.text((d,i)=>showLabel(d))
});