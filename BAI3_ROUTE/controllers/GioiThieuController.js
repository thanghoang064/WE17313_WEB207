window.GioiThieuController = function($scope,$routeParams) {
    //$routeParams lấy ra object các tham số trên url
    // console.log($routeParams.name);
    // khởi tạo 1 đối tượng kiểm tra dữ liệu = false 
    $scope.kiemTraDuLieu = {
        ten:false, // chưa lỗi
        tuoi:false //chưa lỗi 
    }
    $scope.danhsach = [
        {id:1,ten:'ABC',tuoi:20},
        {id:2,ten:'ABCD',tuoi:21}
    ];
    $scope.onClose = function() {
        $scope.inputValue = {
            ten:"",
            tuoi:""
        };  // sau khi thêm xong giá trị của inputValue là rỗng 
        $scope.editId = 0;
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
        // không lỗi xử lý thêm 
        if(!flag) {
            //xử lý sửa  
            var editId = $scope.editId;
            //kiểm tra nếu tồn tại editId thì là sửa 
            if(editId) {
                for(var i = 0;i< $scope.danhsach.length;i++) {
                    if($scope.danhsach[i].id == editId) {
                        $scope.danhsach[i].ten = $scope.inputValue.ten;
                        $scope.danhsach[i].tuoi =  $scope.inputValue.tuoi;
                    }
                }
                $scope.onClose();
                return;
            }
            // xử lý thêm 
            var ds = $scope.danhsach;
            //fake id tăng tự động 
            var newID = ds.length > 0 ? ds[ds.length - 1].id + 1 : 1;
            var newItem = {
                id:newID,
                ten:$scope.inputValue.ten,
                tuoi:$scope.inputValue.tuoi
            } //đây là cục đối tượng được thêm mới vào danh sách  
            // push đối tượng mới vào mảng đối tượng danh sách 
            $scope.danhsach.push(newItem);
            $scope.onClose();
        }
    }
    $scope.onEdit = function(editId) {
        $scope.editId = editId;
        //tạo ra 1 đối tượng sửa 
        var editItem  = {
            ten:"",
            tuoi:""
        };
        for(var i = 0;i< $scope.danhsach.length;i++) {
            if($scope.danhsach[i].id == editId) {
                editItem.ten = $scope.danhsach[i].ten;
                editItem.tuoi = $scope.danhsach[i].tuoi;
            }
        }
        // bắn giá trị cần sửa vào input form 
        $scope.inputValue = {
            ten: editItem.ten,
            tuoi: editItem.tuoi
        }
    }

}