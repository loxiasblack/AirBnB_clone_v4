$(document).ready(function () {
    function updateAmenitiesH4() {
        const amenityNames = Object.values(selectedAmenity);
        let text = amenityNames.join(', ');
        if (text.length > 50) {
            text = amenityNames.slice(0, 3).join(', ');
            if (amenityNames.length > 3) {
                text += '...'
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
    $.get('http://0.0.0.0:5001/api/v1/status/', function(data, status) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    }).fail(function() {
        $('#api_status').removeClass('available');
    });
  });
  