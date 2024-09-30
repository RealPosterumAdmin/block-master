
function saveBlock(){
    const blockData = {
        name: $('#name').val(),
        index: html.getValue(),
        css: css.getValue(),
        js: js.getValue(),
        nonce: block_master_ajax.nonce
    };
    $.ajax({
        url: block_master_ajax.ajax_url,
        type: 'POST',
        data: {
            action: 'create_block',  // bu erda action nomini ko'rsating
            ...blockData
        },
        success: function(response) {
            if (response.success) {
                console.log('Block successfully saved:', response.data);
                // console.log(blockData)
            } else {
                console.error('Error:', response.data.message);
            }},
        error: function(xhr, status, error) {
            console.error('AJAX Error:', {
                status: status,
                error: error,
                response: xhr.responseText
            });
        }
    });
}
function saveTheme(){
    const blockData = {
        header: header.getValue(),
        footer: footer.getValue(),
        css: css.getValue(),
        js: js.getValue(),
        nonce: block_master_ajax.nonce
    };
    $.ajax({
        url: block_master_ajax.ajax_url,
        type: 'POST',
        data: {
            action: 'setThemeFiles',  // bu erda action nomini ko'rsating
            ...blockData
        },
        success: function(response) {
            if (response.success) {
                console.log('Block successfully saved:', response.data);
                // console.log(blockData)
            } else {
                console.error('Error:', response.data.message);
            }},
        error: function(xhr, status, error) {
            console.error('AJAX Error:', {
                status: status,
                error: error,
                response: xhr.responseText
            });
        }
    });
}
console.log('jasur')
