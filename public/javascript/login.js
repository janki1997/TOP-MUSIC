$('#myForm').submit((event) => {
    let password_regular_expression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(!password_regular_expression.test($('#password').val())){
        showError('password','Password length must be 6 to 15 character and atleast one special character')
    } else if(!Object.keys($('#genres').val()).length){
        showError('genres','You must choose up to 3 favorite genres.')
    } else if (!Object.keys($('#artists').val()).length) {
        showError('artists','You must choose up to 3 favorite artists.')
    } else {
        $('#error').hide();
    }
});

function showError(focusFeild,message){
    $('#error').show();
    $('#error').html(message);
    $('#'+focusFeild).focus();
    event.preventDefault();
}
$('#reset').click(() => {
    $('#error').hide();
    $('#error').html('');
})