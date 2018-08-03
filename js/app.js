$(document).ready(function() {
  showResult(restaurantes);
  $('.search').click(findRestaurants);
});

// Filtrar restaurantes
function findRestaurants() {
  var searchValue = $('.filter').val();
  var resultRestaurants = [];

  for (restaurant in restaurantes) {
    if (searchValue === restaurantes[restaurant]["type"]) {
      resultRestaurants.push(restaurantes[restaurant]);
    }
  }

  if (resultRestaurants.length === 0) {
    $('.search-result').text('Não foram encontrados restaurantes. Que tal tentar outra busca?')
  } else {
    initMap(resultRestaurants);
    showResult(resultRestaurants);
  }
};

// Mostrar restaurantes
function showResult(objResult) {
  $('.search-result').text('');
  for (result of objResult) {
    image = fixSrcImage(result["image"]);
    name = result["name"];

    var template = `
      <div class="item">
      <img src="${image}" class="thumb-item" data-toggle="modal" data-target="#exampleModal">
      <span class="title">${name}</span>
    `;
    $('.search-result').append(template);

    $('.modal-body').text(name)
  }
}

// Chamar mapa primeira vez
function callMap() {
  initMap(restaurantes);
}

// Iniciar ou atualizar mapa
function initMap(objRestaurants) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -23.557529, lng: -46.658621},
    zoom: 15
  });
  // Colocar marcadores no mapa
  for (restaurant of objRestaurants) {
    var restaurantLocation = { lat: restaurant["latitude"], lng: restaurant["longitude"]};
    var name = "<h4>" + restaurant["name"] + "</h4>"
    var infowindow = new google.maps.InfoWindow({content: name});
    var marker = new google.maps.Marker({
      position: restaurantLocation,
      map: map,
    });
    marker.infowindow = infowindow;
    google.maps.event.addListener(marker, 'mouseover', function() {
      this.infowindow.open(map, this); 
    }); 
    google.maps.event.addListener(marker, 'mouseout', function() {
      this.infowindow.close(map, this);
    }); 
  }
}

// Arrumar a url da imagem
function fixSrcImage(srcImage){
  var newSrc = srcImage;
  var splitSrc = srcImage.split("");
  while (splitSrc[1] === ".") {
    splitSrc.splice(0,1);
  } 
  newSrc = splitSrc.join("");
  return newSrc;
}

//Lista, ajudar: $('.filter').keyup(findRestaurants);
