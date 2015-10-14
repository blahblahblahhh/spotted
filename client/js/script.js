console.log('script loaded')

// ------------------------ geolocate & populate form -------------------------

//this is where my two inputs live
function findSpot() {
var latElement = document.getElementById("lat");
var lonElement = document.getElementById("lon");
//spot im going to replace
var foundYou = document.getElementById("findMe");
    getPositionOptions = {
        enableHighAccuracy: false,
        timeout: 10000,
    },
    getPos = function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            var coords = position.coords;
            latElement.innerHTML = coords.latitude;
            lonElement.innerHTML = coords.longitude;
            foundYou.innerHTML = 'found you!';
            console.log(latElement.value);
            setTimeout(getPos, 5000);
        },function (error){
            setTimeout(getPos, 5000);
        }, getPositionOptions);
        //this keeps updating their position every 5000 so if they move
        //they dont have to click the button again
    };
    getPos();
}



// ------------------------ navigation -------------------------

// side navigation

function toggleSidenav(bool) {
document.body.classList.toggle('sidenav-active');
document.body.classList.toggle('noscroll');
}

// skip to section
$("nav").find("a").click(function(e) {
    e.preventDefault();
    var section = $(this).attr("href");
    $("html, body").animate({
        scrollTop: $(section).offset().top
    });
});

$(document).ready(function() {

  $("#findMe").click(function(){
      alert("LOC CLICKED");
      // $(".latInput").hide();
      findSpot();
  });


// ------------------------ google maps -------------------------

  //    self starting google map with markers from API

    // execute immediately on page ready
    (function hi() {
        // set the options for the map
        var options = {
            zoom: 10,
            center: new google.maps.LatLng(40.75453936473234, -73.973407773301), // Centered over NYC
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            mapTypeControl: false
        };

        // create the map
        var map = new google.maps.Map(document.getElementById('map'), options);

        //ajax call to my API to gather posts
        $.ajax({
            url: '/api/posts',
            success:function(data){
                // var obj = JSON.parse(data);
                var obj = data;
                var totalLocations = obj.length;
                var infowindow = new google.maps.InfoWindow({
                            content: "holding..."
                            });
                // setting markers for each location in my api
                for (var i = 0; i < totalLocations; i++) {
                    // marker content
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(obj[i].geoindex[0].lat, obj[i].geoindex[0].lon),
                        icon: new google.maps.MarkerImage('http://i.imgur.com/kF3o2sV.png'),
                        map: map,
                        title: 'Click Me ' + i,
                        html: '<h3>' + obj[i].item + '</h3>' +
                        '<b>type of item:</b> <em>' + obj[i].details[0].name + '</em> <br>' +
                        '<b>must be gone by:</b> <em>' + obj[i].details[0].age + '</em> <br>' +
                        '<b>info:</b> <em>' + obj[i].details[0].info + '</em>'
                    });
                    // markerArray.push(marker.position);
                    // console.log(markerArray);
                    //console.log(marker);

                    // info window events
                    (function(marker, i) {
                        // add click event
                        google.maps.event.addListener(marker, 'click', function() {
                            // infowindow = new google.maps.InfoWindow({
                            //     content: 'Hello, World!!'
                            // });
                            // infowindow.open(map, marker);
                            // console.log(obj);
                            infowindow.setContent(this.html);
                            infowindow.open(map, this);
                        });
                    })(marker, i);
                    // var mcOptions = {
                    //     gridSize: 50,
                    //     maxZoom: 15
                    // };
                    // var markerclusterer = new MarkerClusterer(map, marker, mcOptions);
                    //
                    // (function() {
                    //   var bounds = new google.maps.LatLngBounds();
                    //   $.each(marker, function (index, marker) {
                    //   bounds.extend(marker.position);
                    //       });
                    //       map.fitBounds(bounds);
                    //     })();
                }
            },
            complete: function() {
      // Schedule the next request when the current one's complete
      // setTimeout(hi, 5000);
      console.log('complete')
      // google.maps.event.trigger(hi, 'resize');
      //trying to make the map auto refresh every x to obtain new markers
      google.maps.event.addListener(map, 'click', function( event ){
        var latElement = document.getElementById("lat");
        var lonElement = document.getElementById("lon");
        latElement.innerHTML = event.latLng.lat();
        lonElement.innerHTML = event.latLng.lng();
  // alert( "Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lat() );
});
    }


        });
    })();

    //
    //
    //

    $('#createNew').click(function(){
      var latVal = $('#lat').val();
      var lonVal = $('#lon').val();
      alert(latVal + lonVal)
    })

});
