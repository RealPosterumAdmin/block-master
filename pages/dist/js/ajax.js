
function saveBlock() {
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
            action: 'create_block',
            ...blockData
        },
        success: function(response) {
            if (response.success) {
                console.log('Block successfully saved:', response.data);
                const gutenbergJS = response.data[0]['gutenbergJS'];
                const blockDIR = response.data[0]['dir'];
                // JSX-ni JavaScript-ga kompilyatsiya qilish
                const compiledJS = Babel.transform(gutenbergJS, {
                    presets: ['react'],
                    comments: false // Kommentariyalarni o'chirish
                }).code;
                console.log('Compiled JS:', compiledJS);
                // JavaScript-ni minimallash
                // const minifiedJS = Terser.minify(compiledJS, {
                //     compress: {
                //         pure_funcs: ['React.createElement']
                //     },
                //     output: {
                //         comments: false
                //     }
                // });
                
                // if (minifiedJS.error) {
                //     console.error('Terser Error:', minifiedJS.error);
                // } else {
                //     console.log('Minified JS:', minifiedJS.code);
                // }
                minifiedJS = compiledJS;
                // Minimallashgan JS kodni serverga qaytarib yuborish
                $.ajax({
                    url: block_master_ajax.ajax_url,
                    type: 'POST',
                    data: {
                        action: 'saveGutenbergJS',
                        minified_js: minifiedJS,
                        dir: blockDIR,
                        nonce: block_master_ajax.nonce
                    },
                    success: function(res) {
                        console.log('Minified JS sent to server:', res);
                    },
                    error: function(xhr, status, error) {
                        console.error('Error sending minified JS:', {
                            status: status,
                            error: error,
                            response: xhr.responseText
                        });
                    }
                });

            } else {
                console.error('Error:', response.data.message);
            }
        },
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
