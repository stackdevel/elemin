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
        .when("/", {templateUrl: "partials/dashboard.html", controller: "DashboardController"})
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
			
				var myData = {
				  labels : ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
				  datasets : [
				    {
							label: "sfsd",
				      fillColor : "#f4a827",
				      pointColor : "#fff",
				      pointStrokeColor : "#f4a827",
				      data : [300,400,500,550,700,800,1200]
				    },
				  ]
				}

				new Chart(document.getElementById("canvas").getContext("2d")).Line(myData)
   };

   //don't forget to call the load function
   $scope.load();
});