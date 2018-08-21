

$(function() {
    
    $('#new_item_form_container').submit(function(e) {
        e.preventDefault()
        let template = Handlebars.compile($('#item_template').html())
        $.post('/items', $('form#new_item').serialize(), (data) => {
            let added_item = template(data)
            $('#item_container').append(added_item)
        }, 'json')
    })
    $('a#create_item').click((e) => {
        e.preventDefault()
        $.get('/items/new', (data) => {
            $('#new_item_form_container').append(data)
            $('#create_item').html('<a href="#/" class="navlink" id="detach_item_form">detach new item form</a>')
        }).then(()=> {    
            $("#detach_item_form").click((e) => {
            e.preventDefault()
            $('#new_item_form_container').html('<a id="create_item" class="navlink" href="/items/new">create an item?</a>')
            })
        })
    })
})



$(e)[0].target.detach()