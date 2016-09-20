let h = 200;
let w = 400;
let padding = 10;
d3.json("https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json", function(error, rawData){
	if(error){
		console.log(error);
		return;
	}
    
    var data = JSON.parse(window.atob(rawData.content));
    console.log(JSON.stringify(data.contents));
    data.contents.forEach( function(datum, index) {
    	let caption = (index+1)+". "+datum.category + " sales at "+datum.region+" region";
    	console.log(caption);
    	let body = d3.select("body");
		body.append("h1").text(caption)
			.style("font-family","sans-serif")
			.style("font-size","16px")
			.exit()
			.append("br");
    	let svg = body.append('svg').attr("height",h).attr("width",w);
		svg.style("background-color","cyan");
		body.append("br");
		let lineFunction = d3.line()
		.x((d,i)=>i*(w/datum.monthlySales.length)+padding)
		.y((d,i)=>h-d.sales);
		svg.append('path')
		.attr('d',lineFunction(datum.monthlySales))
		.attr('stroke','black')
		.attr('fill','none');
    });

});