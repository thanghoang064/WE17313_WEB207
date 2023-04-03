window.GioiThieuController = function($scope,$routeParams,$http) {
    //$routeParams lấy ra object các tham số trên url
    // console.log($routeParams.name);
    // khởi tạo 1 đối tượng kiểm tra dữ liệu = false 
    //$http để thao tác với API
    $scope.kiemTraDuLieu = {
        ten:false, // chưa lỗi
        tuoi:false //chưa lỗi 
    }
    //link API khi đón nó về 
    let apiURL = "http://localhost:3000/hihi";
    // $scope.danhsach = [
    //     {id:1,ten:'ABC',tuoi:20},
    //     {id:2,ten:'ABCD',tuoi:21}
    // ];
    // GET data từ API về
    $scope.getData = function() {
        $http.get(apiURL).then(function(response){
            // dữ liệu được đón về thành công dữ liệu sẽ nằm ở biến response
            // console.log(response.data);
            $scope.danhsach = response.data;
        })
    }
    //gọi hàm getData
    $scope.getData();
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
                // for(var i = 0;i< $scope.danhsach.length;i++) {
                //     if($scope.danhsach[i].id == editId) {
                //         $scope.danhsach[i].ten = $scope.inputValue.ten;
                //         $scope.danhsach[i].tuoi =  $scope.inputValue.tuoi;
                //     }
                // }
                //cục dữ liệu được update 
                let updateItem = {
                    ten : $scope.inputValue.ten,
                    tuoi : $scope.inputValue.tuoi
                }
                // sửa 
                $http.put(
                    `${apiURL}/${editId}`, // link api cập nhập theo id cần sửa
                    updateItem // data cần cập nhập 
                ).then(function(response){
                    if(response.status == 200) {
                        //gọi hàm getData để cập nhập lại dữ liệu
                        $scope.getData();
                    }
                })
                $scope.onClose();
                return;
            }
            // xử lý thêm 
            // var ds = $scope.danhsach;
            //fake id tăng tự động 
            // var newID = ds.length > 0 ? ds[ds.length - 1].id + 1 : 1;
            var newItem = {
                // id:newID,
                ten:$scope.inputValue.ten,
                tuoi:$scope.inputValue.tuoi
            } //đây là cục đối tượng được thêm mới vào danh sách  
            // push đối tượng mới vào mảng đối tượng danh sách 
            // $scope.danhsach.push(newItem);
            // call api với phương thức post để đẩy dữ liệu vào json server
            $http.post(
                apiURL,// đường dẫn API 
                newItem // dữ liệu thêm
            ).then(
                function(response) {
                    // console.log(response);
                    //nếu như thêm thành công trạng thái status là 201 
                    if(response.status == 201) {
                        //gọi lại hàm getData();
                        $scope.getData();
                    }
                }
            )
            $scope.onClose();
        }
    }
    $scope.selectedDate = new Date();
    console.log(new Date());

    // Xử lý sự kiện khi người dùng chọn ngày
    $scope.dateSelected = function() {
      console.log("Bạn đã chọn ngày: " + $scope.selectedDate);
    }
    $scope.onEdit = function(editId) {
        $scope.editId = editId;
        //tạo ra 1 đối tượng sửa 
        // var editItem  = {
        //     ten:"",
        //     tuoi:""
        // };
        // for(var i = 0;i< $scope.danhsach.length;i++) {
        //     if($scope.danhsach[i].id == editId) {
        //         editItem.ten = $scope.danhsach[i].ten;
        //         editItem.tuoi = $scope.danhsach[i].tuoi;
        //     }
        // }
        
        $http.get(`${apiURL}/${editId}`).then(function(response){
            console.log(response);
            if(response.status == 200) { // khi gọi api thành công sẽ bắn 
                // dữ liệu lên form 
                 $scope.inputValue = {
                    ten: response.data.ten,
                    tuoi: response.data.tuoi
                }
            }
        })
        // bắn giá trị cần sửa vào input form 
        // $scope.inputValue = {
        //     ten: editItem.ten,
        //     tuoi: editItem.tuoi
        // }
    }

}