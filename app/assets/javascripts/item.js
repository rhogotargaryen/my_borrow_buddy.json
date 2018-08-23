class Item {
    constructor(json) {
        this.id = json.id
        this.desc = json.desc
        this.value = json.value
        this.name = json.name
        this.new_item_template = Handlebars.compile($('#item_template').html())
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
            $('#link-text-del').text('')
            $('#link-wrap').prepend(data)
            var a = $('#create_item').detach()
            $('#main-content').prepend('<a href="#/" class="navlink" id="detach_item_form">detach new item form</a>')
            $('form#new_item').submit(function(e) {
                e.preventDefault()
                var template = Handlebars.compile($('#item_template').html())
                $.post('/items', $('form#new_item').serialize(), (data) => {
                    var a = new Item(data)
                    var added_item = a.new_item_template(a)
                    $('#index-item-container').prepend(added_item)
                }, 'json')
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
})


