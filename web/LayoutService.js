angular.module('app')
.service('LayoutService', function($http){
    selected = {};
    var selectedLayout;

    var furniture_pieces = [{name:"Table", width:5, height:7}, {name:"Chair", width:2, height:2}];

    var rooms = [{name:"Dining Room", width:20, height:15}, {name:"Living Room", width:20, height:30}];

    var layouts = [{room:rooms[0], furniture:[{piece:furniture_pieces[1], left:3, top:1, rotate:0},
                                                {piece:furniture_pieces[0], left:3, top:3.5, rotate:45},
                                                {piece:furniture_pieces[1], left:3, top:11, rotate:30}]},
                    {room:rooms[1], furniture:[{piece:furniture_pieces[1], left:3, top:2, rotate:0},
                                            {piece:furniture_pieces[1], left:3, top:2, rotate:0}]}];

    var addFurniture = function(name, width, height){
        addFurnitureToDatabase(name, width, height);
        furniture_pieces.push({name:name, width:width, height:height});
        return furniture_pieces.length-1;
    }

    var addFurnitureToDatabase = function(name, width, height) {
        var request = $http({
                method: "post",
                url: "php/saveFurniture.php",
                data: {
                    name: name,
                    width: width,
                    height: height
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data) {
                
            }).error(function (data) {
                console.log("error");
            });        
    }

    var addRooms = function(name, width, height){
        rooms.push({name:name, width:width, height:height});
    }

    var addFurnitureToRoom = function(furnitureNumber){
        layouts[0].furniture.push({piece:furniture_pieces[furnitureNumber],left:5, top:2, rotate:0 });
    }

    var getLayout = function(layoutNumber){
        return layouts;
    }

    var getFurniture = function(layoutNumber){
        return furniture_pieces;
    }
    var getRooms = function(layoutNumber){
        return rooms;
    }

    var getFurnitureByName = function(name){
        for(var i =0; i<furniture_pieces.length; i++){
            if(furniture_pieces[i].name === name){
                return i;
            }
        }
    }

    return {
        addFurniture: addFurniture,
        addRooms: addRooms,
        addFurnitureToRoom: addFurnitureToRoom,
        getLayout: getLayout,
        getFurniture: getFurniture,
        getRooms: getRooms,
        getFurnitureByName: getFurnitureByName
    };

});
