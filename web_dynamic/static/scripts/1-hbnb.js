$(document).ready(function () {
    let selectedAmenity = {};
    $('input[type="checkbox"]').change(function () {
        if (this.checked) {
            selectedAmenity[$(this).data('id')] = $(this).data('name')
        } else {
            delete selectedAmenity[$(this).data('id')]
        }
        updateAmenitiesH4();
    });

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
});
