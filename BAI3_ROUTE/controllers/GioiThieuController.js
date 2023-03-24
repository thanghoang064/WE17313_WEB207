window.GioiThieuController = function($scope,$routeParams) {
    //$routeParams lấy ra object các tham số trên url
    // console.log($routeParams.name);
    // khởi tạo 1 đối tượng kiểm tra dữ liệu = false 
    $scope.kiemTraDuLieu = {
        ten:false, // chưa lỗi
        tuoi:false //chưa lỗi 
    }
    $scope.onSubmitForm = function() {
        // kiểu tra nếu họ tên bỏ trống 
        let flag = false;
        if(!$scope.inputValue || !$scope.inputValue.ten) {
            $scope.kiemTraDuLieu.ten = true; // có lỗi 
            flag = true;
        }

        if(!$scope.inputValue || !$scope.inputValue.tuoi) {
            $scope.kiemTraDuLieu.tuoi = true; // có lỗi 
            flag = true;
        }
        if(!flag) {
            alert("Không lỗi");
        }
    }

}