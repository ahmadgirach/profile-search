$(function() {
    const $profile = $('#view_profile'),
        $user_name = $('#user_name'),
        $clear = $('#clear');

    $profile.hide();
    $user_name.focus();

    $user_name.on('keyup', (e) => {
        if(e.which == 13) {
            $.ajax({
                'url': 'https://api.github.com/users/' + $user_name.val(),
                'method': 'GET',
                'type': 'http'
            })
            .then(result => {
                if(result) {
                    $('#avatar').attr('src', result.avatar_url);
                    $('#url').attr('href', result.html_url);
                    $('#bio').text(result.bio);
                    $('#location').text(result.location);
                    $('#repos').text("Public Repos: " + result.public_repos);
                    $('#followers').text("Followers: " + result.followers);
                    $('#following').text("Following: " + result.following);
                    $profile.show();
                }
            });
        }
    });

    $clear.on('click', () => {
        $profile.hide();
        $user_name.val("").focus();
    });
});
