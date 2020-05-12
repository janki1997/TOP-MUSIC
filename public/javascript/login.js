$('#myForm').submit((event) => {
    if($('#password').val().length < 6 || $('#password').val().length > 15){
        showError('password','Password length must be between 6 to 15')
    } else if(!Object.keys($('#genres').val()).length){
        showError('genres','You must choose up to 3 favorite genres.')
    } else if (!Object.keys($('#artists').val()).length) {
        showError('artists','You must choose up to 3 favorite artists.')
    } else {
        $('#error').hide();
    }
});

function showError(focusField,message){
    $('#error').show();
    $('#error').html(message);
    $('#'+focusField).focus();
    event.preventDefault();
}
$('#reset').click(() => {
    $('#error').hide();
    $('#error').html('');
})