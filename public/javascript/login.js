$('#myForm').submit((event) => {
    let password_regular_expression = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(!password_regular_expression.test($('#password').val())){
        showError('password','Password length must be 6 to 15 character and atleast one special character, one number and one alphabate')
    } else if(!$('#genres').val().length || $('#genres').val().length > 3 ){
        showError('genres','You must choose up to 3 favorite genres.')
    } else if (!$('#artists').val().length || $('#artists').val().length > 3) {
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
    $('#myForm').trigger("reset");
})
