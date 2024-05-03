$(document).ready(function () {
    function updateAmenitiesH4() {
        const amenityNames = Object.values(selectedAmenity);
        let text = amenityNames.join(', ');
        if (text.length > 50) {
            text = amenityNames.slice(0, 3).join(', ');
            if (amenityNames.length > 3) {
                text += '...';
            }
        }
        $('.amenities h4').text(text);
    }
  
    let selectedAmenity = {};
  
    $('input[type="checkbox"]').change(function () {
        if (this.checked) {
            selectedAmenity[$(this).data('id')] = $(this).data('name');
        } else {
            delete selectedAmenity[$(this).data('id')];
        }
        updateAmenitiesH4();
    });
  
    // AJAX request to check API status
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
        if (status === 'success' && data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
  
    // Function to make AJAX request to places_search
    function makePlacesSearchRequest() {
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: Object.keys(selectedAmenity) }),
            success: function (response) {
                $('.places').empty();
                response.forEach(function (place) {
                    const article = $('<article></article>');
                    article.append('<div class="title"><h2>' +
                        place.name +
                        '</h2><div class="price_by_night">$' +
                        place.price_by_night + '</div></div>');
  
                    article.append('<div class="information"><div class="max_guest">' +
                        place.max_guest + ' Guest(s)</div><div class="number_rooms">' +
                        place.number_rooms + ' Bedroom(s)</div><div class="number_bathrooms">' +
                        place.number_bathrooms + ' Bathroom(s)</div></div>');
                    article.append('<div class="description">' + place.description + '</div>');
                    $('.places').append(article);
                });
            }
        });
    }
  
    // Event listener for button click
    $('button').click(function () {
        makePlacesSearchRequest();
    });
  });
  