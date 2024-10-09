<?php
function my_custom_plugin_enqueue_scripts($hook) {

    // CodeMirror CSS
    wp_enqueue_style('codemirror-css', 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.12/codemirror.min.css');

    // CodeMirror JS
    wp_enqueue_script('codemirror-js', 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.12/codemirror.min.js', array(), null, true);
    wp_enqueue_script('babel-js', 'https://unpkg.com/@babel/standalone/babel.min.js', array(), null, true);
    wp_enqueue_script('bundle-js', 'https://unpkg.com/terser/dist/bundle.min.js', array(), null, true);


    // Custom JS
//    wp_enqueue_script('my_custom_plugin_js', plugins_url('/js/my-custom-plugin.js', __FILE__), array('jquery', 'codemirror-js'), null, true);
}
add_action('admin_enqueue_scripts', 'my_custom_plugin_enqueue_scripts');

function my_plugin_enqueue_scripts() {
    wp_enqueue_script('my-plugin-script', plugins_url('/block-master/pages/dist/js/ajax.js'), array('jquery'), null, true);
    wp_localize_script('my-plugin-script', 'block_master_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('new_block_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'my_plugin_enqueue_scripts');
