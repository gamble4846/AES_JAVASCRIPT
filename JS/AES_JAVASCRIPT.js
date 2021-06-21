var myApp = angular.module("app", []);  

myApp.controller("MyController",
   function ($scope) {
        $scope.ENCRYPT = function () {
            var InputString = $scope.INPUTDATA + "R";
            var Devided_ARR = $scope.DEVIDESTRING_16(InputString);
            var Converted_ARR = $scope.Convert_To_HEXA(Devided_ARR);
            var SubBytes_Mat = $scope.Convert_SubBytes(Converted_ARR);

            $scope.InputString = InputString;
            $scope.Devided_ARR = Devided_ARR;
            $scope.Converted_ARR = Converted_ARR;
            $scope.SubBytes_Mat = SubBytes_Mat;
        };

        $scope.DECRYPT = function () {
            $scope.OUTPUTDATA = $scope.INPUTDATA;
        };

        $scope.DEVIDESTRING_16 = function (full_string) {
            var Devided_ARR = full_string.match(/.{1,16}/g);
            var Devided_ARR_Length = Devided_ARR.length;
            var TOBEADDED = "";
            if(Devided_ARR[Devided_ARR_Length-1].length < 16)
            {
                for (let i = Devided_ARR[Devided_ARR_Length-1].length; i < 16; i++) { 
                    TOBEADDED += "X";
                }
            }
            Devided_ARR[Devided_ARR_Length-1] = Devided_ARR[Devided_ARR_Length-1] + TOBEADDED;
            return Devided_ARR;
        };

        $scope.Convert_To_HEXA = function (Devided_ARR){
            var HEX_Arr = ["20","21","22","23","24","25","26","27","28","29","2A","2B","2C","2D","2E","2F","30","31","32","33","34","35","36","37","38","39","3A","3B","3C","3D","3E","3F","40","41","42","43","44","45","46","47","48","49","4A","4B","4C","4D","4E","4F","50","51","52","53","54","55","56","57","58","59","5A","5B","5C","5D","5E","5F","60","61","62","63","64","65","66","67","68","69","6A","6B","6C","6D","6E","6F","70","71","72","73","74","75","76","77","78","79","7A","7B","7C","7D","7E"];
            var ALPHA_ARR = [" ","!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/","0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?","@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","[","\\","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","{","|","}","~"]
            var Converted_ARR = [];
            var converted_string = "";

            for (let i = 0; i < Devided_ARR.length; i++) { 
                for (let j = 0; j < Devided_ARR[i].length; j++) {
                    for (let k = 0; k < ALPHA_ARR.length; k++) {
                        if(Devided_ARR[i][j].toString() == ALPHA_ARR[k].toString())
                        {
                            converted_string += HEX_Arr[k].toString();
                        }
                    }
                }
                Converted_ARR.push(converted_string);
                converted_string = "";
            }

            return Converted_ARR;
        };

        $scope.Convert_SubBytes = function (Converted_ARR){
            var H_ROW = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
            var REST_TB = [["63","7C","77","7B","F2","6B","6F","C5","30","01","67","2B","FE","D7","AB","76"],
                           ["CA","82","C9","7D","FA","59","47","F0","AD","D4","A2","AF","9C","A4","72","C0"],
                           ["B7","FD","93","26","36","3F","F7","CC","34","A5","E5","F1","71","D8","31","15"],
                           ["04","C7","23","C3","18","96","05","9A","07","12","80","E2","EB","27","B2","75"],
                           ["09","83","2C","1A","1B","6E","5A","A0","52","3B","D6","B3","29","E3","2F","84"],
                           ["53","D1","00","ED","20","FC","B1","5B","6A","CB","BE","39","4A","4C","58","CF"],
                           ["D0","EF","AA","FB","43","4D","33","85","45","F9","02","7F","50","3C","9F","A8"],
                           ["51","A3","40","8F","92","9D","38","F5","BC","B6","DA","21","10","FF","F3","D2"],
                           ["CD","0C","13","EC","5F","97","44","17","C4","A7","7E","3D","64","5D","19","73"],
                           ["60","81","4F","DC","22","2A","90","88","46","EE","B8","14","DE","5E","0B","DB"],
                           ["E0","32","3A","0A","49","06","24","5C","C2","D3","AC","62","91","95","E4","79"],
                           ["E7","C8","37","6D","8D","D5","4E","A9","6C","56","F4","EA","65","7A","AE","08"],
                           ["BA","78","25","2E","1C","A6","B4","C6","E8","DD","74","1F","4B","BD","8B","8A"],
                           ["70","3E","B5","66","48","03","F6","0E","61","35","57","B9","86","C1","1D","9E"],
                           ["E1","F8","98","11","69","D9","8E","94","9B","1E","87","E9","CE","55","28","DF"],
                           ["8C","A1","89","0D","8F","E6","42","68","41","99","2D","0F","B0","54","BB","16"]
                        ];
            
            $scope.N_H_ROW = H_ROW;
            $scope.N_REST_TB = REST_TB;

            var SubBytes_Mat = [];

            for (let i = 0; i < Converted_ARR.length; i++) { 
                var Matrix = Converted_ARR[i].match(/.{1,2}/g);
                var ToBeAdded = [];
                for (let j = 0; j < Matrix.length; j++) {
                    var x_axis = 0;
                    var y_axis = 0;
                    for(let k = 0; k < Matrix[j].length; k++) {
                        for (let v = 0; v < H_ROW.length; v++) {
                            if(Matrix[j][k].toString() == H_ROW[v].toString()){
                                if(k==0){
                                    x_axis = v;
                                }
                                else{
                                    y_axis = v;
                                }
                            }
                        }
                    }
                    ToBeAdded.push(REST_TB[x_axis][y_axis]);
                }
                SubBytes_Mat.push(ToBeAdded);
            }
            return SubBytes_Mat;
        };
    }
);