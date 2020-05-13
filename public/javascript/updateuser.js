$('#updateForm').submit((event) => {
    if($('#password').val().length < 6 || $('#password').val().length > 15){
        showError('password','Password length must be between 6 to 15')
    } else {
        $('#error').hide(); 
        $.ajax({
            url: "http://localhost:3000/users/profileUpdate",
            type: "POST",
            dataType: "json",
            data : {
                password:  $('[name="password"]').val(),
                emailAddress: $('[name="emailAddress"]').val(),
                full_name: $('[name="full_name"]').val(),
                genres_ids: $('[name="genres_ids[]"]').val(),
                artist_ids: $('[name="artist_ids[]"]').val(),
                contact: $('[name="contact"]').val()
            },
            cache: false,
            success: function (response) {
                $('#success').show();
            },
            error: function (e) {
                console.log(e)
                alert("Sorry, it seems something went wrong. Please try again later!");
            },
        });
    }
});

function deleteuser(){
    let x = confirm("Are you sure you want to delete your balanalab?")
    if(x){
        console.log("Hi");
        
        $.ajax({
            url: "http://localhost:3000/users/deleteAccount",
            type: "GET",
            dataType: "json",
            cache: false,
            success: function (response) {
               window.location.reload()
            },
            error: function (e) {
                console.log(e)
                alert("Sorry, it seems something went wrong. Please try again later!");
            },
        })
    } 
}