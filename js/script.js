var restaurant = [
    {
        name: "Sura",
        imgSrc: "img/sura.jpg",
        address: "1518 Robson St, Vancouver, BC V6G 1C3",
        cuisine: "Spicy, Korean",
        webSrc: "http://surakoreancuisine.com",
        videoLink: "https://www.youtube.com/embed/GdEYaeFWTbE"
    },
    {
        name: "留一手",
        imgSrc: "img/留一手.jpg",
        address: "1542 Robson St, Vancouver, BC V6G 1C2",
        cuisine: "Spicy, Chinese",
        webSrc: "http://liuyishouna.com",
        videoLink: "https://www.youtube.com/embed/Ni9EVatZ_CY"

    },
    {
        name: "Miku",
        imgSrc: "img/miku.jpg",
        address: "200 Granville St #70, Vancouver, BC V6C 1S4",
        cuisine: "Sushi, Japanese",
        webSrc: "http://mikurestaurant.com",
        videoLink: "https://www.youtube.com/embed/bjh6G_P4RYE"

    },
    {
        name: "Joe Fortes",
        imgSrc: "img/joe_fortes.jpg",
        address: "777 Thurlow St, Vancouver, BC V6E 3V5",
        cuisine: "Seafood, Western",
        webSrc: "http://goldenszechuanrestaurant.com",
        videoLink: "https://www.youtube.com/embed/NU02xBg6TSU"

    },
    {
        name: "Church Chicken",
        imgSrc: "img/church_chicken.png",
        address: "3449 Main St, Vancouver, BC V5V 3M9",
        cuisine: "Fired Chicken, Fast food",
        webSrc: "http://churchschickenbc.ca/",
        videoLink: "https://www.youtube.com/embed/C1oS8a-uOaU"


    },
    {
        name: "Steveston Pizza",
        imgSrc: "img/steveston_pizza.jpg",
        address: "100-3400 Moncton St, Richmond, BC V7E 3A2",
        cuisine: "Pizza, Western",
        webSrc: "http://www.stevestonpizza.com/",
        videoLink: "https://www.youtube.com/embed/ych3e3zwkOc"

    },
];

var idMapperToCss={
    "0": {
        "data-hover": "slideLeft",
        "data-return": "slideLeftRetourn"
    },
    "1": {
        "data-hover": "slideUp",
        "data-return": "slideUPRetourn"
    },
    "2": {
        "data-hover": "slideRight",
        "data-return": "slideRightRetourn"
    },
    "3": {
        "data-hover": "slideLeft",
        "data-return": "slideLeftRetourn"
    },
    "4": {
        "data-hover": "slideDown",
        "data-return": "slideDownRetourn"
    },
    "5": {
        "data-hover": "slideRight",
        "data-return": "slideRightRetourn"
    }
}

function insertDetailDiv(obj, i){
    i = i%6
    var contentDiv = $("<div>").addClass("food-img")
    var iframeBox = $("<iframe>").attr("src", obj.videoLink)
                                 .attr("frameborder", 0)
                                 .attr("allowfullscreen", "true")

    var shellDiv=$("<div>").addClass("shell").addClass("magictime")
                           .attr("data-hover", idMapperToCss[i]["data-hover"])
                           .attr("data-return", idMapperToCss[i]["data-return"])

    $("<div>").addClass("content-bg").appendTo(shellDiv)
    $("<img>").attr('src', obj.imgSrc).appendTo(shellDiv)
    $("<h1>").text(obj.name).appendTo(shellDiv)
    $("<h3>").text(obj.cuisine).appendTo(shellDiv)
    $("<p>").text(obj.address).appendTo(shellDiv)

    //add click handler, redirecting to other page
    contentDiv.click(function(){
        window.open(obj.webSrc, '_blank')
    });
    $(iframeBox).appendTo(contentDiv)
    shellDiv.appendTo(contentDiv)
    contentDiv.appendTo($("#content-container"))
}



$(function () {

    restaurant.forEach(function(item, i){
        insertDetailDiv(item, i)
    });

    $('.food-img').hover(
        function () {
            var overlay = $(this).find('.shell');
            overlay.removeClass(overlay.data('return')).addClass(overlay.data('hover'));
        },
        function () {
            var overlay = $(this).find('.shell');
            overlay.removeClass(overlay.data('hover')).addClass(overlay.data('return'));

        }
    );
    console.log("ready")
});

// <div class="food-img">
//     <iframe style="position: absolute;width: 100%;height: 100%;left:0" src="https://www.youtube.com/embed/2Z603ccaj74" frameborder="0" allowfullscreen></iframe>
// <div class="shell magictime" data-return="slideLeftRetourn" data-hover="slideLeft">
//     <div class="content-bg"></div>
//     <img src="img/老四川温哥华.jpg" alt="">
//     <h1>老四川</h1>
//     <h3>Chinese</h3>
//     <p>3631 No 3 Rd, Richmond, BC V6X 2B9</p>
// </div>
// </div>
<html>
var APIURL = 'https://imhungry-app.herokuapp.com'

$ .ajax({
    method: 'GET',
    url: APIURL + '/restaurant',
})

.done(function(restaurantList){
  for(var i = 0; i < restaurantList.length; i++) {
      $('#rList').append($('<li class="type" id="' + restaurantList[i]._id + '">').html('<p>' + restaurantList[i].name +'</p>'))
  }
})

$('#rList').on('click','.showdetail', function () {
    var rid = $(this).attr('id')
    $.ajax({
        method:'GET',
        url: APIURL +'/restaurant' + rid,
    })
    .done(function(showDetail) {
      var rlist = showdetail.name
      for (var i = 0; i < rList.length; i++) {
        $('#' + rid).append($('<span>').addClass('tag').text(rList[i]))
      }
      $('#' + rid).removeClass('showdetail')
    })
})

var findRestaurant = function(restaurant, query) {
    return !query || new RegExp(query, 'i').test(restaurant.Name) ? restaurant : false
}

$('#search-btn').click(function() {
    $('#restaurant-container').empty()
    var query = $('#search').val()
    $.get( APIURL + '/restaurant', function(response) {
      for (var i = 0; i < response.length; i++) {
        if (findRestaurant(response[i], query)) {
          var currentRestaurant = $('<div>').addClass('Restaurant').attr('id', response[i]._id)
            $('<h1>').text(response[i].Name).appendTo(currentRestaurant)
            $('#restaurant-container').append(currentRestaurant)
        }
      }
    })
})

$('#add-form').submit(function(e) {
    e.preventDefault()
    var restaurantList = $('#restaurant').val().split(',')
    var newRestaurant = {
        Name: $('#name').val(),
        Type: $('#type').val(),
        Address: $('#address').val(),
        Image: $('#image').val(),
        rList: showDetail
    }


$.ajax({
    method:'POST',
    url: APIURL + '/restaurant',
    data: JSON.stringify(newRestaurant),
    contentType: 'application/json',
    success: function(data) {
      $('#add-form').trigger('reset')
      alert('Success!')
    }
})

})
