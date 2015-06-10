/**
 * 
 */

//creates the d3.core module, which contains the various D3 charts
angular.module('d3.directives', ['d3.core'])
/**
 * Draws basic 2D chart, as in ``<barchart2d data="{{numbers}}"/>``, where
 * ``{{numbers}}`` is a simple array of numbers.
 * 
 * It "requires" the ``.barchart2d div`` style definition, which should be
 * 
 * ``` .barchart2d div { font: 10px sans-serif; background-color: steelblue;
 * text-align: right; padding: 3px; margin: 1px; color: white; } ```
 */
.directive('barchart2d', ['d3Service', function(d3Service) {
	return {
		restrict: 'E',
		transclude: true,
		scope: { data: '@' },
		template: '<div class="barchart2d" ng-transclude></div>',
		replace: true,
		link: function(scope, element, attrs) {
			d3Service.d3().then(function(d3) {
				function fmt(element, x) {
					element.style("width", function(d) { return x(d) + "px"; })
					.text(function(d) { return d; });
					
				}

										var count = 0;

 var t = -1;
       var n = 40;
    var v = 0;
    var data = d3.range(n).map(next);
								
								
							
								
								
								 function next () {
        return {
            time: v,
            value: v        };
    }	 
	
 var margin = {top: 10, right: 10, bottom: 20, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
	 
    var x = d3.scale.linear()
        .domain([0, n - 1])
        .range([0, width]);
	 
    var y = d3.scale.linear()
        .domain([0, 100])
        .range([height, 0]);
	 
    var line = d3.svg.line()
        .x(function(d, i) { return x(d.time); })
        .y(function(d, i) { return y(d.value); });
		 
    var svg = d3.select(element[0]).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
	
    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
    var graph = g.append("svg")
        .attr("width", width)
        .attr("height", height + margin.top + margin.bottom);	
	 
    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var axis = graph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
	 
    g.append("g")
        .attr("class", "y axis")
        .call(d3.svg.axis().scale(y).orient("left"));
	 
	var path = graph.append("g")
		.append("path")
		.data([data])
		.attr("class", "line")
		.attr("d", line);
								

                                 attrs.$observe('data', function(rawValue) {



var data2 = JSON.parse(rawValue);


		data.push(data2);				  // push a new data point onto the back
        
console.log(data2.time);

        // update domain
        x.domain([data2.time - n, data2.time]);
	console.log(data2.time);
        // redraw path, shift path left
        path
            .attr("d", line)
            .attr("transform", null)
            .transition()
            .duration(50)
            .ease("linear")
            .attr("transform", "translate(" + data2.time - 1 + ")")
   
	
        // shift axis left
        axis
            .transition()
            .duration(50)
            .ease("linear")
            .call(d3.svg.axis().scale(x).orient("bottom"));
	 
        // pop the old data point off the front
        data.shift();	 
				  
                        });
		
			});
		}
	}
}]);