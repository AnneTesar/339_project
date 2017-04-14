var app = angular.module('app', ["ngRoute"]);

app.controller('ctrl', function($scope, $location, $http, $rootScope, $filter) {

$(document).ready(function() {
        $scope.selected = {};
        var selectedLayout;

        furniture_pieces = [{name:"Table", width:5, height:7}, {name:"Chair", width:2, height:2}];

        rooms = [{name:"Dining Room", width:20, height:15}, {name:"Living Room", width:20, height:30}];

        $scope.layouts = [{room:rooms[0], furniture:[{piece:furniture_pieces[1], left:3, top:1, rotate:0},
                                                     {piece:furniture_pieces[0], left:3, top:3.5, roatate:45},
                                                     {piece:furniture_pieces[1], left:3, top:11, rotate:30}]},
                        {room:rooms[1], furniture:[{piece:furniture_pieces[1], left:3, top:2, rotate:0},
                                                   {piece:furniture_pieces[1], left:3, top:2, rotate:0}]}];


         $scope.displayRoom4 = function() {
           selectedLayout = $scope.layouts[$scope.selected.index];
           window_width = $( window ).width();
           room_display_width = window_width * .75;
           console.log("Room Display Width: " + room_display_width);

           pixels_per_foot = room_display_width / selectedLayout.room.width;
           console.log("pixels_per_foot: " + pixels_per_foot);
           $('.scale').width(pixels_per_foot).height(pixels_per_foot).show();

           $('.room').width(pixels_per_foot * selectedLayout.room.width).height(pixels_per_foot * selectedLayout.room.height).show();

           $('.room').empty();
           var sum = 0;
           for (i = 0; i < selectedLayout.furniture.length; i++) {
             $('.room').append( $("<div class=\"furniture\" id=\"" + i +"\">"+ selectedLayout.furniture[i].piece.name +"</div>")
                                     .width(pixels_per_foot * selectedLayout.furniture[i].piece.width)
                                     .height(pixels_per_foot * selectedLayout.furniture[i].piece.height));
                                     //.draggable(  )
                                     //.rotatable( {snap:true, handle: $(document.createElement('img')).attr('src', 'alternate_rotate.png')})
                                     //.css({left: pixels_per_foot * selectedLayout.furniture[i].left, top: pixels_per_foot * selectedLayout.furniture[i].top})  );

           }
           Draggable.create(".furniture", {
             bounds: document.getElementById("room"),
             onDragEnd:function() {
               console.log("drag ended");
               console.log(this._eventTarget);
               console.log(this._eventTarget.id);
               for (i = 0; i < selectedLayout.furniture.length; i++) {
                   if (this._eventTarget.id == i) {

                     selectedLayout.furniture[i].top = this.endY / pixels_per_foot;
                     selectedLayout.furniture[i].left = this.endX / pixels_per_foot;

                     console.log("top at : " + this.endY);
                     console.log("left at : " + this.endX);
                     console.log("New top: " + selectedLayout.furniture[i].top);
                     console.log($scope.layouts[0].furniture[i]);
                   }
                 }

             }
           });

           $scope.updatePlacements();

         }




        $scope.displayRoom2 = function() {
          selectedLayout = $scope.layouts[$scope.selected.index];

          window_width = $( window ).width();
          room_display_width = window_width * .75;
          console.log("Room Display Width: " + room_display_width);

          pixels_per_foot = room_display_width / selectedLayout.room.width;
          console.log("pixels_per_foot: " + pixels_per_foot);

          $('.scale').width(pixels_per_foot).height(pixels_per_foot).show();

          $('#myCanvas').height(pixels_per_foot * selectedLayout.room.height).width(pixels_per_foot * selectedLayout.room.width);

          pixels_per_foot = pixels_per_foot / 2;

          for (i = 0; i < selectedLayout.furniture.length; i++) {

            $('#myCanvas').drawRect({
              layer: true,
              draggable: true,
              bringToFront: true,
              name: selectedLayout.furniture[i].piece.name,
              fillStyle: 'steelblue',
              x: selectedLayout.furniture[i].left * pixels_per_foot,
              y: selectedLayout.furniture[i].top * pixels_per_foot,
              width: selectedLayout.furniture[i].piece.width * pixels_per_foot,
              height: selectedLayout.furniture[i].piece.height * pixels_per_foot,
              rotate: selectedLayout.furniture[i].rotate
            });

          }

        }

        $scope.displayRoom3 = function() {
          selectedLayout = $scope.layouts[$scope.selected.index];

          window_width = $( window ).width();
          room_display_width = window_width * .75;
          console.log("Room Display Width: " + room_display_width);

          pixels_per_foot = room_display_width / selectedLayout.room.width;
          console.log("pixels_per_foot: " + pixels_per_foot);

          $('.scale').width(pixels_per_foot).height(pixels_per_foot).show();

          $('#myCanvas').height(pixels_per_foot * selectedLayout.room.height).width(pixels_per_foot * selectedLayout.room.width);

          pixels_per_foot = pixels_per_foot / 2;

          // $('#myCanvas').drawRect({
          //   layer: true,
          //   draggable: true,
          //   bringToFront: true,
          //   name: "Table",
          //   fillStyle: 'steelblue',
          //   x: 3 * pixels_per_foot,
          //   y: 6 * pixels_per_foot,
          //   width: 5 * pixels_per_foot,
          //   height: 7 * pixels_per_foot,
          //   rotate: 0
          // });

          $('#myCanvas').drawRect({
            layer: true,
            draggable: true,
            bringToFront: true,
            name: "Table",
            fillStyle: 'steelblue',
            x: 1 * pixels_per_foot,
            y: 6 * pixels_per_foot,
            width: 2 * pixels_per_foot,
            height: 2 * pixels_per_foot,
            rotate: 45
          });


        }

        $scope.displayRoom = function() {
          selectedLayout = $scope.layouts[$scope.selected.index];
          window_width = $( window ).width();
          room_display_width = window_width * .75;
          console.log("Room Display Width: " + room_display_width);

          pixels_per_foot = room_display_width / selectedLayout.room.width;
          console.log("pixels_per_foot: " + pixels_per_foot);
          $('.scale').width(pixels_per_foot).height(pixels_per_foot).show();

          $('.room').width(pixels_per_foot * selectedLayout.room.width).height(pixels_per_foot * selectedLayout.room.height).show();

          $('.room').empty();
          var sum = 0;
          for (i = 0; i < selectedLayout.furniture.length; i++) {
            $('.room').append( $("<div class=\"furniture\" id=\"" + i +"\">"+ selectedLayout.furniture[i].piece.name +"</div>")
                                    .width(pixels_per_foot * selectedLayout.furniture[i].piece.width)
                                    .height(pixels_per_foot * selectedLayout.furniture[i].piece.height)
                                    .draggable(  )
                                    .rotatable( {snap:true, handle: $(document.createElement('img')).attr('src', 'alternate_rotate.png')})
                                    .css({left: pixels_per_foot * selectedLayout.furniture[i].left, top: pixels_per_foot * selectedLayout.furniture[i].top})  );

          }





          // selectedLayout.furniture.sort(function(a, b) {
          //   return b.top - a.top;
          // })
          // console.log(selectedLayout.furniture);
          // for (i = 0; i < selectedLayout.furniture.length; i++) {
          //   $('.room').append( $("<div class=\"furniture\" id=\"" + i +"\">"+ selectedLayout.furniture[i].piece.name +"</div>")
          //                           .width(1)
          //                           .height(1)
          //                           .draggable(  )
          //                           .rotatable( {snap:true, handle: $(document.createElement('img')).attr('src', 'alternate_rotate.png')})
          //                           .css({left: pixels_per_foot * selectedLayout.furniture[i].left, top: pixels_per_foot * selectedLayout.furniture[i].top})  );
          //
          // }
          // for (i = 0; i < selectedLayout.furniture.length; i++) {
          //   $('#' + i).width(pixels_per_foot * selectedLayout.furniture[i].piece.width).height(pixels_per_foot * selectedLayout.furniture[i].piece.height);
          //   console.log($('#' + i));
          // }

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




        function keepInside() {
          //check if the furniture div is outside the room
          //move it back inside
        }

});

});
