let h = 200;
let w = 400;

d3.json("https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json", function(error, rawData){
	if(error){
		console.log(error);
		return;
	}
    
    var data = JSON.parse(window.atob(rawData.content));
    console.log(JSON.stringify(data.contents));
    data.contents.forEach( function(element, index) {
    	let caption = (index+1)+". "+element.category + " sales at "+element.region+" region";
    	console.log(caption);
    	let body = d3.select("body");
		body.append("h1").text(caption)
			.style("font-family","sans-serif")
			.style("font-size","16px")
			.exit()
			.append("br");
    	let svg = body.append('svg').attr("height",h).attr("width",w);
		svg.style("background-color","darkgray");
		body.append("br");
    });

});