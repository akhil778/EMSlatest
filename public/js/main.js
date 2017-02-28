angular.module('myApp', ['ngRoute', 'appRoutes', 'MainCtrl']); 
angular.module('appRoutes',[]).config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	
	$routeProvider

	.when('/',{
		templateUrl: 'views/home.html',
		controller: 'MainController'
	});

	$locationProvider.html5Mode(true);
}]);
angular.module('MainCtrl', [])
.directive("fileModel",['$parse', function($parse){
	return{
		restrict: 'A',
		link: function(scope,element,attrs){
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change',function(){
				scope.$apply(function(){
					modelSetter(scope,element[0].files[0]);
				});
			});
		}
	};
}])
.controller("MainController",function($scope,$http,$window){
	//colsole.log("In AppCtrl function");
	var refresh = function(){
		$http.get("/employees").success(function(response){
			console.log('refresh success');
			$scope.employees = response;	
			console.log($scope);
		});	
		$scope.ip = $http.get("/ip").success(function(response){
			$scope.ip = response;
		});
	};

	var resetControls = function(){
			$scope.employee.id = "";
			$scope.employee.name = "";
			$scope.employee.designation = "";
			$scope.employee.email = "";
			$scope.employee.file.val = null;
	};

	$scope.addEmployee = function(){
		console.log($scope.employee);
		var fd = new FormData();
		for(var key in $scope.employee)
			fd.append(key,$scope.employee[key]);

		$http.post("/employees",fd,{
                transformRequest: angular.indentity,
                headers: { 'Content-Type': undefined }
            }).success(function(response){
            	console.log("...in success function...");
			refresh();
			resetControls();
		});
		
	};

	$scope.removeEmployee = function(id){
		console.log("Employee id to delete : " + id);
		if($window.confirm('Are you sure you want to delete employee?'))
		{
			$http.delete("/employees/"+id).success(function(response){
				console.log('employee removed : ' + response);
				refresh();
				resetControls();
			});
		}
		
		
	//});
		
	};

	refresh();
});