/**
 * Main AngularJS Web Application
 */
var app = angular.module('eleminApp', [
    'ngRoute'
]);
/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/", {templateUrl: "partials/dashboard.html", controller: "PageController"})
        .when("/dashboard", {templateUrl: "partials/dashboard.html", controller: "DashboardController"})
		.when("/blank", {templateUrl: "partials/blank.html", controller: "PageController"})	
        .when("/forms", {templateUrl: "partials/forms.html", controller: "PageController"})
		.when("/elements", {templateUrl: "partials/elements.html", controller: "PageController"})	
        .otherwise("/404", {templateUrl: "partials/404.html"});
}]);

/**
 * Filters
 */
app.filter('clean', function(){
    return function (str){
        if(str){
            str = str.replace(/^\s+|\s+$/g, ''); // trim
            str = str.toLowerCase();

            // remove accents, swap ñ for n, etc
            var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
            var to   = "aaaaeeeeiiiioooouuuunc------";
            for (var i=0, l=from.length ; i<l ; i++) {
                str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            }

            str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                .replace(/\s+/g, '-') // collapse whitespace and replace by -
                .replace(/-+/g, '-'); // collapse dashes

            return str;
        } else {
            return false;
        }
    }
});


/**
 * Services
 */


/**
 * Controls all other Pages
 */
app.controller('MetaController', function($scope, $location, $controller) {
    $scope.$on('$routeChangeStart', function(next, current) {
        $scope.current_page = $location.path().substring(1, 2).toUpperCase() + $location.path().substring(2);
        $scope.meta_description = $scope.current_page + ' page';
    });
});
app.controller('NavigationController', function($scope, $location) {
    $scope.menuClass = function(page) {
        var current = $location.path().substring(1);
        return page === current ? "active" : "";
    };
});
app.controller('PageController', function ( $scope, $location, $http, $controller ) {
	
});

app.controller('DashboardController', function ( $scope, $location, $http, $controller ) {
    $scope.load = function() {
       var options = {
            segmentShowStroke : true,
            segmentStrokeColor : "#fff",
            segmentStrokeWidth : 2,
            percentageInnerCutout : 50, 
            animationSteps : 100,
            animationEasing : "easeOutBounce",
            animateRotate : true,
            animateScale : false,
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
        }

        var data = [
            {
                value: 300,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Red"
            },
            {
                value: 50,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Green"
            },
            {
                value: 100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Yellow"
            }
        ];

        var myDoughnutChart = new Chart($('#doughnut').get(0).getContext("2d")).Doughnut(data,options);
   };

   //don't forget to call the load function
   $scope.load();
});