


$(function() {
    $('form').submit(function(e) {
        e.preventDefault()
        $.post('/items', $(this).serialize(), 'json').done(
            function() {
            console.log('it worked')
            }
        )
    })
})