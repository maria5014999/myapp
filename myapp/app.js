Parties = new Mongo.Collection("parties");

if (Meteor.isClient) {
  angular.module('myapp', ['angular-meteor', 'ui.router']);


angular.module('myapp');

  angular.module('myapp').config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){ 

    $locationProvider.html5Mode(true);
 
    $stateProvider
      .state('parties', {
        url: '/parties',
        templateUrl: 'parties-list_ng.html',
        controller: 'PartiesListCtrl'
      })

      .state('partydetalles', {
        url: '/parties/:partyId',
        template: 'party-detalles_ng.html',
        controller: 'PartiesListCtrl'
      });  

      $urlRouterProvider.otherwise("/parties");
 
   }]);
  angular.module('myapp').controller('PartiesListCtrl','$stateParams', function ($scope, $stateParams, $meteor) {
    $scope.helpers({
      parties: () => {
        return Parties.find({});

     }


     })
     $scope.addParty = () => {
          Parties.insert($scope.newParty);
          this.newParty = {};
        };

    $scope.remove = (party) =>{
      Parties.remove({_id: party._id})
    }
    
     $scope.partyId = $stateParams.partyId;
  })
    
      
   
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Parties.find().count() === 0) {
      var parties = [
        {
          'name': 'Dubstep-Free Zone',
          'description': 'Fast just got faster with Nexus S.'
        },
        {
          'name': 'All dubstep all the time',
          'description': 'Get it on!'
        },
        {
          'name': 'Savage lounging',
          'description': 'Leisure suit required. And only fiercest manners.'
        }
      ];
 
      for (var i = 0; i < parties.length; i++) {
        Parties.insert(parties[i]);
       }
    }
  });
}