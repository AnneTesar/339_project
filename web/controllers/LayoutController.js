angular.module('app')
.controller('LayoutController', function($scope, $location, $http, $rootScope, $filter,LayoutService) {
    $(document).ready(function() {
            $scope.selected = {};
            var selectedLayout;



            // furniture_pieces = [{name:"Table", width:5, height:7}, {name:"Chair", width:2, height:2}];

            // rooms = [{name:"Dining Room", width:20, height:15}, {name:"Living Room", width:20, height:30}];

            // $scope.layouts = [{room:rooms[0], furniture:[{piece:furniture_pieces[1], left:3, top:1, rotate:0},
            //                                             {piece:furniture_pieces[0], left:3, top:3.5, roatate:45},
            //                                             {piece:furniture_pieces[1], left:3, top:11, rotate:30}]},
            //                 {room:rooms[1], furniture:[{piece:furniture_pieces[1], left:3, top:2, rotate:0},
            //                                         {piece:furniture_pieces[1], left:3, top:2, rotate:0}]}];

            $scope.newFName = ""
            $scope.newFWidth;
            $scope.newFLength;
            $scope.selectedFurniture = "";
            $scope.furniture_pieces = LayoutService.getFurniture();
            $scope.rooms = LayoutService.getRooms();
            $scope.layouts = LayoutService.getLayout();

            $scope.addFurniture = function(){ //only adds to first layout doesnt factor in current layout
                LayoutService.addFurnitureToRoom(LayoutService.addFurniture($scope.newFName, $scope.newFWidth,  $scope.newFLength));
                $scope.newFName = ""
                $scope.newFWidth;
                $scope.newFLength;
                $scope.layouts = LayoutService.getLayout();
                $scope.displayRoom4();
            }

             $scope.addFurnitureFromList = function(){ //same
                LayoutService.addFurnitureToRoom(LayoutService.getFurnitureByName($scope.selectedFurniture));
                $scope.selectedFurniture = "";
                $scope.layouts = LayoutService.getLayout();
                $scope.displayRoom4();
            }

            $scope.displayRoom4 = function() {
            selectedLayout = $scope.layouts[$scope.selected.index];
            window_width = $( window ).width();
            window_height = $( window ).height();

            room_display_width = window_width * .75;
            room_display_height = window_height * .85;
            console.log("Room Display Width: " + room_display_width);

            pixels_per_foot_width = room_display_width / selectedLayout.room.width;
            pixels_per_foot_height = room_display_height / selectedLayout.room.height;

            if (pixels_per_foot_width > pixels_per_foot_height) {
              pixels_per_foot = pixels_per_foot_height;
            }
            else {
              pixels_per_foot = pixels_per_foot_width;
            }

            console.log("pixels_per_foot: " + pixels_per_foot);
            //$('.scale').width(pixels_per_foot).height(pixels_per_foot).show();

            $('.room').width(pixels_per_foot * selectedLayout.room.width).height(pixels_per_foot * selectedLayout.room.height).show();
            //$('.room').show();
            $('.editRoomButtons').show();

            $('.room').empty();
            var sum = 0;
            for (i = 0; i < selectedLayout.furniture.length; i++) {
              var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
              var svgNS = svg.namespaceURI;

              console.log(selectedLayout.furniture[i]);

              var rect = document.createElementNS(svgNS,'rect');
              rect.setAttribute('rx',  0);
              rect.setAttribute('ry',  0);
              rect.setAttribute('width', pixels_per_foot * selectedLayout.furniture[i].piece.width);
              rect.setAttribute('height', pixels_per_foot * selectedLayout.furniture[i].piece.height);
              rect.setAttribute('fill','green');
              svg.appendChild(rect);

              var circle = document.createElementNS(svgNS,'circle');
              circle.setAttribute('r', 8);
              circle.setAttribute('cx',  5);
              circle.setAttribute('cy', 5);
              circle.setAttribute('fill','#000000');
              circle.setAttribute('class', 'knob');
              svg.appendChild(circle);

              svg.setAttribute('class', 'furniture');
              svg.setAttribute('width', pixels_per_foot * selectedLayout.furniture[i].piece.width);
              svg.setAttribute('height', pixels_per_foot * selectedLayout.furniture[i].piece.height);
              svg.style.left = selectedLayout.furniture[i].x;
              svg.style.top = selectedLayout.furniture[i].y;

              $('.room').append(svg);


            }

            var R = Draggable.create( $(".furniture"), { type: "rotation" })[0].disable();
            var M = Draggable.create( $(".furniture"),{type: "x,y"})[0].enable();

            console.log("here");

            $(".knob").on("click", function(event) {
              console.log("clicked handle");
              event.stopPropagation();
              M.disable();   R.enable().startDrag(event);
            });


            $(".furniture").on("mousedown", function(event) {
              console.log("clicked drag");
              R.disable();   M.enable().startDrag(event);
            });





            // Draggable.create(".furniture", {
            //     bounds: document.getElementById("room"),
            //     onDragEnd:function() {
            //     console.log("drag ended");
            //     console.log(this._eventTarget);
            //     console.log(this._eventTarget.id);
            //     for (i = 0; i < selectedLayout.furniture.length; i++) {
            //         if (this._eventTarget.id == i) {
            //
            //             selectedLayout.furniture[i].top = this.endY / pixels_per_foot;
            //             selectedLayout.furniture[i].left = this.endX / pixels_per_foot;
            //
            //             console.log("top at : " + this.endY);
            //             console.log("left at : " + this.endX);
            //             console.log("New top: " + selectedLayout.furniture[i].top);
            //             console.log($scope.layouts[0].furniture[i]);
            //         }
            //         }
            //
            //     }
            // });

            $scope.updatePlacements();

            }

            $scope.updatePlacements = function() {
            selectedLayout = $scope.layouts[$scope.selected.index];
            for (i = selectedLayout.furniture.length - 1; i >= 0 ; i--) {

                $('#' + i).css({left: pixels_per_foot * selectedLayout.furniture[i].left, top: pixels_per_foot * selectedLayout.furniture[i].top});
                console.log($('#' + i));
            }
            }


            // $('.room').on("mouseup", "div", function() {
            //   console.log($(this)[0].innerText);
            //   for (i = 0; i < selectedLayout.furniture.length; i++) {
            //     if ($(this).attr('id') == i) {
            //       selectedLayout.furniture[i].top = $(this).position().top / pixels_per_foot;
            //       console.log("top at : " + $(this).position().top);
            //       console.log("left at : " + $(this).position().left);
            //       console.log("New top: " + selectedLayout.furniture[i].top);
            //       console.log($scope.layouts[0].furniture[i]);
            //       selectedLayout.furniture[i].left = $(this).position().left / pixels_per_foot;
            //     }
            //   }
            // });


            $scope.newLayout = function() {
                $location.path('/NewLayoutView')
            }


    });
});
