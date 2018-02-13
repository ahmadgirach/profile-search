$(function() {

    const $profile = $('#view_profile'),
        $user_name = $('#user_name'),
        $clear = $('#clear'),
        $progress = $('#progress');

    let enterHasBeenPressed = false;

    $user_name.focus();
    $profile.hide();
    $progress.hide();

    $user_name.on('keyup', (e) => {
        if(enterHasBeenPressed) {
            $profile.hide();
        }
        if(e.which == 13) {
            enterHasBeenPressed = true;
            $progress.show();
            setTimeout(function() {
                $progress.hide();
                $profile.show();
            }, 3000);

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
                }
            });
        }
    });

    $clear.on('click', () => {
        $profile.hide();
        $user_name.val("").focus();
    });
});
