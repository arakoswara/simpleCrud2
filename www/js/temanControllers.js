angular.module('starter.temanControllers', [])

.controller('homeCtrl', function($scope,$state){
        
})

// DETAIL
.controller('temanDetailCtrl', function($scope,$stateParams,$ionicPopup,$ionicModal,$state,temanService){
        
    $scope.showDataId = function() {
      temanService.getId($stateParams.temanId).success(function(datateman) {
            $scope.datateman = datateman;
        });
        
    };
    $scope.showDataId();
    
    $scope.back = function (){
        $state.go('tab.teman');
    };
    
    $ionicModal.fromTemplateUrl('edit.html', function(modal){
        $scope.taskModal = modal;
	}, {
            scope : $scope,
            animation : 'slide-in-up'	
	});
        
    $scope.showAlert = function(msg) {
        $ionicPopup.alert({
            title: msg.title,
            template: msg.message,
            okText: 'Ok',
            okType: 'button-positive'
        });
      };
	
	$scope.editModal = function(){
            $scope.taskModal.show();
	};
	
	$scope.batal = function(){
            $scope.taskModal.hide();
            $scope.showDataId();
	};
        
	$scope.edit = function(id,nama,nim){
            if (!id){
                $scope.showAlert({
                    title: "Information",
                    message: "Id Mohon Diisi"
                });
            }else if (!nama){
                $scope.showAlert({
                    title: "Information",
                    message: "Nama Mohon Diisi"
                });
            }else if(!nim){
                $scope.showAlert({
                    title: "Information",
                    message: "NIM Mohon Diisi"
                });
            }else{
                $scope.id = id;
                $scope.nama = nama;
                $scope.nim = nim;
                temanService.update({
                    'id' : id,
                    'nama': nama,
                    'nim': nim
                }).then(function(resp) {
                  console.log('Success', resp);
                  $scope.showAlert({
                        title: "Information",
                        message: "Data Telah Diupdate"
                    });
                },function(err) {
                  console.error('Error', err);
                }); 
            }
	};
	
})

.controller('tabCtrl', function($scope){
})


// SHOW DATA
.controller('dataTemanCtrl', function($scope,$state, temanService){
    $scope.showData = function() {
      temanService.getAll().success(function(data) {
            $scope.datatemans = data;
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.showData();
    
    $scope.reload = function (){
        $state.go('tab.teman');
    };
    
    $scope.delete = function (datateman){
        temanService.delete(datateman.id);
        $scope.datatemans.splice($scope.datatemans.indexOf(datateman),1);
    };
})


// TAMBAH
.controller('tambahTemanCtrl', function($scope,$ionicPopup,temanService){
    $scope.showAlert = function(msg) {
      $ionicPopup.alert({
          title: msg.title,
          template: msg.message,
          okText: 'Ok',
          okType: 'button-positive'
      });
    };
    
    $scope.datateman={};
    $scope.simpan = function (){
        if (!$scope.datateman.nama){
            $scope.showAlert({
                title: "Information",
                message: "nama mohon diisi"
            });
        }else if (!$scope.datateman.nim){
            $scope.showAlert({
                title: "Information",
                message: "nim mohon diisi"
            });
        }else{
            temanService.create({
                nama: $scope.datateman.nama,
                nim: $scope.datateman.nim
            }).success(function(data){
                $scope.showAlert({
                    title: "Information",
                    message: "Data Telah Tersimpan"
                });
            });
        }
        
    };
       
});
