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

    function updateStatesH4() {
        const statesNames = Object.values(selectedStates);
        let text = statesNames.join(', ');
        $('.states h4').text(text)
    }
  
    
    let selectedAmenity = {};
    $('.amenities input[type="checkbox"]').change(function () {
        if (this.checked) {
            selectedAmenity[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete selectedAmenity[$(this).data('id')];
        }
        updateAmenitiesH4();
    });
    
    let selectedCities = {};
    $('.locations li.c input[type="checkbox"]').change(function () {
        if (this.checked) {
            selectedCities[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete selectedCities[$(this).data('id')]
        }
        $(".locations h4").text(Object.values(selectedCities).join(', '));
    });

    let selectedStates = {};
    $('.locations li.s input[type="checkbox"]').change(function () {
        if (this.checked) {
            selectedStates[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete selectedCities[$(this).data('id')];
        }
        console.log(Object.values(selectedStates));
        updateStatesH4();
    });

    // AJAX request to check API status
    $.get('http://localhost:5001/api/v1/status/', function (data, status) {
        if (status === 'success' && data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
    

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5001/api/v1/places_search/',
        data: JSON.stringify({}),
        contentType: 'application/json',
        success: function (data) {
            for (let i=0; i < data.length; i++) {
                const article = $('<article></article>');
                article.append('<div class="title"><h2>' +
                        data[i].name +
                        '</h2><div class="price_by_night">$' +
                        data[i].price_by_night + '</div></div>');
                article.append('<div class="information"><div class="max_guest">' +
                        data[i].max_guest + ' Guest(s)</div><div class="number_rooms">' +
                        data[i].number_rooms + ' Bedroom(s)</div><div class="number_bathrooms">' +
                        data[i].number_bathrooms + ' Bathroom(s)</div></div>');
                article.append('<div class="description">' + data[i].description + '</div>');
                $('.places').append(article);
            }
        }
    });

    // Function to make AJAX request to places_search
    function makePlacesSearchRequest() {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: Object.keys(selectedAmenity), cities: Object.keys(selectedCities), states: Object.keys(selectedStates) }),
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
