angular.module('app')
.service('LayoutService', function(){
    selected = {};
    var selectedLayout;

    var furniture_pieces = [{name:"Table", width:5, height:7}, {name:"Chair", width:2, height:2}];

    var rooms = [{name:"Dining Room", width:20, height:15}, {name:"Living Room", width:20, height:30}];

    var layouts = [{room:rooms[0], furniture:[{piece:furniture_pieces[1], x:3, y:1, rotate:0},
                                                {piece:furniture_pieces[0], x:3, y:3.5, rotate:45},
                                                {piece:furniture_pieces[1], x:3, y:11, rotate:30}]},
                    {room:rooms[1], furniture:[{piece:furniture_pieces[1], x:3, y:2, rotate:0},
                                            {piece:furniture_pieces[1], x:3, y:2, rotate:0}]}];

    var addFurniture = function(name, width, height){
        furniture_pieces.push({name:name, width:width, height:height});
        return furniture_pieces.length-1;
    }

    var addRooms = function(name, width, height){
        rooms.push({name:name, width:width, height:height});
    }

    var addFurnitureToRoom = function(furnitureNumber){
        layouts[0].furniture.push({piece:furniture_pieces[furnitureNumber],x:5, y:2, rotate:0 });
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
