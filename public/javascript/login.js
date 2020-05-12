$('#myForm').submit((event) => {
    event.preventDefault();
    if (Object.keys($('#genres').val()).length > 0) {
        $('#error').hide();
        if (Object.keys($('#artists').val()).length > 0) {
            $('#error').hide();
        } else {
            $('#error').show();
            $('#error').html('You must choose up to 3 favorite artists.');
            $('#artists').focus();
        }
    } else {
        $('#error').show();
        $('#error').html('You must choose up to 3 favorite genres.');
        $('#genres').focus();
    }
});

$('#reset').click(() => {
    $('#error').hide();
    $('#error').html('');
})