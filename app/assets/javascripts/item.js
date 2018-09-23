class Item {
    constructor(json) {
        this.id = json.id
        this.desc = json.desc
        this.value = json.value
        this.name = json.name
    }
    new_item_template() {
        var a =Handlebars.compile($('#item_template').html())
        return a(this)
    }
}

Item.display_liked_items = (e) => {
    $.get(e.target.href, (data) => {
        data.map((item) => {
            var d = new Item(item)
            $('#liked_items_container').append(`<p>you liked ${d.name}</p>`)
            e.target.remove()
        })
    }, 'json')
}

Item.detach_form_present = 
    () => {
        if($('#detach_item_form')[0]){
            $('#detach_item_form').click()
        }
    }
    

Item.get_item_and_display = 
    (e) => {
        $.get(`items/${e.target.parentElement.dataset.id}`, (data) => {
            Item.detach_form_present
            var a = $('#link-wrap')
            var b = $('a#create_item').detach()
            $('#link-text-del').remove
            $('#link-wrap').html(`</br>${data}`)
            $('#main-content').prepend(b)
        })             
    }

Item.get_items_and_mlinks = (e) => {
    $.get('/items', e.target.dataset, (data) => {
        var template = Handlebars.compile($('#item_index_template').html())
        data.reverse()  // JSON returns by ID this reverse so chronologically newly creted items are displayed first, looks best
        var added_items = template(data)
        $('#index-click').detach()
        $('#index-item-container').children().remove()
        $('#index-item-container').prepend(added_items)
    }, 'json')
}

$(function() {
    
    $('#alpha').click((e) => {
        e.preventDefault()
        $.get(`/users/${e.target.dataset.id}/items`, (data) => {
            data.sort((a, b) => {
                 var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                 var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                 if (nameA < nameB) {
                   return -1;
                 }
                 if (nameA > nameB) {
                   return 1;
                 }

                 // names must be equal
                 return 0;
                })
            var template = Handlebars.compile($('#item_index_template').html())
            var added_items = template(data)
            $('#index-click').detach()
            $('#index-item-container').children().remove()
            $('#index-item-container').prepend(added_items)
            }, 'json')
    })
    $('#index-item-container').click((e) => {
        e.preventDefault()
        if(e.target.tagName == "STRONG") {
            Item.detach_form_present()
            Item.get_item_and_display(e)
        }
    })   
    
    $("#index-click").on('click', (e) => {
        Item.get_items_and_mlinks(e)
    })
    // need to work on refractoring this method a but more also not so much protypes are being used rather than statics
    $('#create_item').on('click', (e) => {
        e.preventDefault()
        $.get('/items/new', (data) => {
            var a = $('#create_item').detach()
            $('#link-text-del').text('')
            $('#link-wrap').html(data)
            $('#main-content').prepend('<a href="#/" class="navlink" id="detach_item_form">detach new item form</a>')
            $('#new_item_form_container').on('submit', a, function(e) {
                e.preventDefault()
                $.post('/items', $('form#new_item').serialize(), (data) => {
                    var b = new Item(data)
                    var added_item = b.new_item_template()
                    $('#index-item-container').prepend(added_item)
                    $('#detach_item_form').replaceWith(e.data)
                    $('#new_item_form_container').children().remove()
                    $('#new_item_form_container').prepend("item created")
                }, 'json').fail((data) => {
                    $('#new_item_form_container').html(data.responseText)
                })
            })           
        $("#detach_item_form").on('click', (e) => {
            e.preventDefault()
            $('form#new_item').detach()
            $('#title-delete').detach()
            $('a#detach_item_form.navlink').detach()
            $('#main-content').prepend(a)
        })            
      })   
    })
    $('#view_liked_items').on('click', (e) => {
        e.preventDefault()
        Item.display_liked_items(e)
    })
})

