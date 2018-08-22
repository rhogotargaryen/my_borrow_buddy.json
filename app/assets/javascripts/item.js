

$(function() {
    
    $("#index-click").click((e) => {
        $.get('/items', (data) => {
            var template = Handlebars.compile($('#item_index_template').html())
            var added_items = template(data)
            $('#index-item-container').prepend(added_items)
        }, 'json')
    })
    
    $('#new_item_form_container').submit(function(e) {
        e.preventDefault()
        var template = Handlebars.compile($('#item_template').html())
        $.post('/items', $('form#new_item').serialize(), (data) => {
            var added_item = template(data)
            $('#item_container').append(added_item)
        }, 'json')
    })
    $('a#create_item').click((e) => {
        e.preventDefault()
        var wrap = $('#create_item').detach()
        $.get('/items/new', (data) => {
            $('#link-text-del').text('')
            $('#new_item_form_container').prepend(data)
            $('#create_item').detach()
            $('#main-content').prepend('<a href="#/" class="navlink" id="detach_item_form">detach new item form</a>')
        $("#detach_item_form").click((e) => {
            e.preventDefault()
            $('form#new_item').detach()
            $('#title-delete').detach()
            $('a#detach_item_form.navlink').detach()
            $('#main-content').prepend(wrap)
        })            
      })   
    })
})


