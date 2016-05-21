angular.module('ChefEzy')
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['Authorization'] = "hi eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NWY2YTBiMTQ5YzQ3YzI4OWQ1MjhkYjMiLCJ1c2VyTmFtZSI6IndhcnIiLCJpYXQiOjE0NjM3MjM5ODYsImV4cCI6MTQ2NDkzMzU4Nn0.go17W_N2YbplR0XDtlVj0wLIeMJ3UbznrHfIZIvSl1w";
  }])
  .factory('Member', function($resource){
    return $resource('http://localhost:5000/user/list');
  })
