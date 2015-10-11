angular.module('PostListing', ['ngCookies']);

angular.module('PostListing')
  .controller('UsersController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){

    $scope.welcome = "spotted!";

    $scope.users = [];
    $scope.newUser = {};
    $scope.logInUser = {};
    // $scope.posts = [];
    $scope.newPost = {item: '', details:[{}], geoindex:[{}]};

    // trying to get angular and jquery to play nice
  //   $scope.setFormDirty = function(){
  //   $scope.myForm.$setDirty();
  // };
  //
  //   $scope.setInputDirty = function() {
  //   $scope.myForm.lat.$setDirty();
  // };

    $scope.getUsers = function(){
      $http.get('/api/users').then(function(response){
        $scope.users = response.data;
      });
    };
    $scope.getUsers();

    $scope.createUser = function(){
      $http.post('/api/users', $scope.newUser).then(function(response){
        $scope.users.push(response.data);
        $scope.newUser = {};
      });
    };

    $scope.createPost = function(){
      $http({
        url: '/api/posts',
        method: 'post',
        headers: {
          token: $scope.token
        },
        data: $scope.newPost,
      }).then(function(response){
        console.log(response.data)
        $scope.getUsers();
      });
    };

    $scope.allPosts = function(){
      $http.get('/api/posts').then(function(response){
        $scope.posts = response.data;
      });
    };
    $scope.allPosts();

  //   $scope.removePost = function($index){
  //   var post = $scope.post[$index];
  //   var url = '/api/posts/' + post._id;
  //   $http.delete(url).then(function(){
  //     $scope.posts.splice($index, 1);
  //   });
  // };

    // $scope.addPostLocation = function(){
    // $scope.newPost.details.push({})
    // }

    $scope.obtainToken = function(){
      $http.post("/api/users/authentication_token", $scope.logInUser).then(function(response){
        $scope.token = response.data.token;
        $cookies.put('token', $scope.token);
      });
    };

    $scope.logOut = function(){
      $cookies.remove('token');
      $scope.token = $cookies.remove('token');
    };

    $scope.removePost = function(post){
      $http({
        url: '/api/posts/'+post._id,
        method: 'delete',
        headers: {
          token: $scope.token
        }
      }).then(function(response){
        console.log('... it is gone');
      })
    };
    // angular
    // $scope.addText = function(){
    //   $scope.lat = $('#latField').value;
    //   }

    $scope.token = $cookies.get('token');

  }]);
