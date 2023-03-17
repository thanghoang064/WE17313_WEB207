var app = angular.module("myapp",[]);
app.controller("infoController",function ($scope) {
    // $scope.name = "Nguyễn Văn A";
    // $scope.age = 18;
    // $scope.phone = "0929292929";
        //kiểu dữ liệu đối tượng
        $scope.info = [{
            name:"Nguyễn Văn A",
            age:18,
            phone:"09139292929"
        },
        {
            name:"Nguyễn Văn B",
            age:19,
            phone:"09139292955"
        }
        ];
        $scope.sayHello = function() {
            // alert($scope.test);
            // alert($scope.tinh);
            $scope.hihi = ($scope.gioitinh == 1) ? "Nam" : "Nữ";
        }
        $scope.count = 0;
        $scope.myMouse = function() {
            $scope.count++;
        }
     
    
})