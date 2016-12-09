/**
 * Created by ikism on Dec 6, 2016
 */

app.controller('jobController', function($scope, jobService, $location) {

	console.log('entering jobController')

	$scope.job = {
		jobId : '',
		company : '',
		description : '',
		postDate : '',
		qualification : '',
		salary : '',
		title : ''
	};

	$scope.jobs;

	function fetchAllJobs() {
		console.log('entering list of jobs')
		jobService.fetchAllJobs().then(function(data) {
			console.log('fetching data')
			$scope.jobs = data;
		}, function(error) {
			console.log('Error :' + error)
		});
	}
	;

	fetchAllJobs();

	$scope.createJob = function(job) {
		console.log('creating job')
		jobService.createJob(job).then(fetchAllJobs(), function() {
			console.log('Create Error : ' + error)
		})
	};

	$scope.submit = function() {
		{
			console.log('saving')
			$scope.createJob($scope.job);
		}
		$scope.reset();
		$location.path('/listOfJobs')
	}

	$scope.updateJob = function() {
		console.log('updating Job Id: ' + $scope.job.jobId)
		jobService.updateJob($scope.job.jobId).then(fetchAllJobs(),
				function(error) {
					console.log('Update Error :' + error)
				})
	};

	$scope.deleteJob = function(jobId) {
		console.log('deleting')
		jobService.deleteJob(jobId).then(function() {
			alert('Deleted Successfully')
			$location.path('/')
		}, function() {
			console.log('Unable to delete')
		})
	};

	$scope.reset = function() {
		$scope.job = {
			jobId : '',
			company : '',
			description : '',
			postDate : '',
			qualification : '',
			salary : '',
			title : ''
		};
		$scope.myForm.$setPristine();
	};
});