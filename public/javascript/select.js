$("select").on('change', function(e) {
    if (Object.keys($(this).val()).length > 3) {
        $('option[value="' + $(this).val().toString().split(',')[3] + '"]').prop('selected', false);
    }
});

$(document).ready(function() {
    $('.multiple-checkboxes').multiselect({
    includeSelectAllOption: true,
    });
});