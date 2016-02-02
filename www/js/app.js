angular.module('starter', ['ionic', 'starter.temanControllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  
    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        controller: 'tabCtrl',
        templateUrl: 'templates/tab.html'
      })


    .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })

      
    .state('tab.teman', {
      url: '/teman',
      views: {
        'tab-teman': {
          templateUrl: 'templates/dataTeman.html',
          controller: 'dataTemanCtrl'
        }
      }
    })

    .state('tab.teman-detail', {
        url: '/teman/:temanId',
        views: {
          'tab-teman': {
            templateUrl: 'templates/temanDetail.html',
            controller: 'temanDetailCtrl'
          }
        }
      })
    
    .state('tab.tambah', {
      url: '/tambah',
      views: {
        'tab-tambah': {
          templateUrl: 'templates/tambahTeman.html',
          controller: 'tambahTemanCtrl'
        }
      }
    })

    .state('pembayaran', {
      url   : '/pembayaran',
      views : {
        'pembayaran' : {
          templateUrl   : 'templates/pembayaran.html',
          controller    : 'pembayaranCtrl'
        }
      }
    });
    $urlRouterProvider.otherwise('/tab/home');
})

.directive("initFromForm", function ($parse) {
    return {
        link: function (scope, element, attrs) {
            var attr = attrs.initFromForm || attrs.ngModel || element.attrs('name'),
            val = attrs.value;
            $parse(attr).assign(scope, val);
        }
    };
});