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

$(function() {
    
    $("#index-click").click((e) => {
        $.get('/items', (data) => {
            var template = Handlebars.compile($('#item_index_template').html())
            var added_items = template(data)
            $('#index-click').detach()
            $('#index-item-container').prepend(added_items)
        }, 'json').done(() => {
            $('#index-item-container').on('click', 'a', (e) => {
                e.preventDefault()
                if(e.target.tagName == "STRONG") {
                    $.get(`items/${e.target.parentElement.dataset.id}`, (data) => {
                        if($('#detach_item_form')[0]){
                            $('#detach_item_form').click()
                        }
                        var a = $('#link-wrap')
                        var b = $('a#create_item').detach()
                        $('#link-text-del').remove
                        $('#link-wrap').html(`</br>${data}`)
                        $('#main-content').prepend(b)
                    })                    
                }
            })            
        })
    })
    
    $('#create_item').click((e) => {
        e.preventDefault()
        $.get('/items/new', (data) => {
            var a = $('#create_item').detach()    
            $('#link-text-del').text('')
            $('#link-wrap').html(data)
            $('#main-content').prepend('<a href="#/" class="navlink" id="detach_item_form">detach new item form</a>')
            $('#new_item_form_container').submit(a, function(e) {
                e.preventDefault()
                var template = Handlebars.compile($('#item_template').html())
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
        $("#detach_item_form").click((e) => {
            e.preventDefault()
            $('form#new_item').detach()
            $('#title-delete').detach()
            $('a#detach_item_form.navlink').detach()
            $('#main-content').prepend(a)
        })            
      })   
    })
    $('#view_liked_items').click((e) => {
        e.preventDefault()
        $.get(e.target.href, (data) => {
            data.map((item) => {
                var d = new Item(item)
                $('#liked_items_container').append(`<p>you liked ${d.name}</p>`)
                e.target.remove()
            })
        }, 'json')
    })
})


