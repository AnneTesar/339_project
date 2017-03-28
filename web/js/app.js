var app = angular.module('app', ["ngRoute"]);

app.controller('ctrl', function($scope, $location, $http, $rootScope, $filter) {

$(document).ready(function() {
        $scope.selected = {};
        var selectedLayout;

        furniture_pieces = [{name:"Table", width:5, height:7}, {name:"Chair", width:2, height:2}];

        rooms = [{name:"Dining Room", width:20, height:15}, {name:"Living Room", width:20, height:30}];

        $scope.layouts = [{room:rooms[0], furniture:[{piece:furniture_pieces[1], left:9.5, top:1.75},  {piece:furniture_pieces[1], left:9.5, top:11.2}, {piece:furniture_pieces[0], left:8, top:2}]},
                        {room:rooms[1], furniture:[furniture_pieces[1], furniture_pieces[1]]}];


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


        $('.room').on("mouseup", "div", function() {
          console.log($(this)[0].innerText);
          for (i = 0; i < selectedLayout.furniture.length; i++) {
            if ($(this).attr('id') == i) {
              selectedLayout.furniture[i].top = $(this).position().top / pixels_per_foot;
              console.log("top at : " + $(this).position().top);
              console.log("left at : " + $(this).position().left);
              console.log("New top: " + selectedLayout.furniture[i].top);
              console.log($scope.layouts[0].furniture[i]);
              selectedLayout.furniture[i].left = $(this).position().left / pixels_per_foot;
            }
          }
        });




        function keepInside() {
          //check if the furniture div is outside the room
          //move it back inside
        }

});

});
