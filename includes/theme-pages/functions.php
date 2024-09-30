<?php
function remove_all_styles_and_scripts() {
    global $wp_styles, $wp_scripts;

    foreach ($wp_styles->registered as $style) {
        wp_dequeue_style($style->handle);
    }

    foreach ($wp_scripts->registered as $script) {
        wp_dequeue_script($script->handle);
    }
}
add_action('wp_enqueue_scripts', 'remove_all_styles_and_scripts', 100);
function BlockMaster_enqueue_styles() {
    wp_enqueue_style('BlockMaster-main-style', get_template_directory_uri() . '/assets/css/main.css');
    wp_enqueue_script('BlockMaster-main-script', get_template_directory_uri() . '/assets/js/main.js', array(), null, false);
}

add_action('wp_enqueue_scripts', 'BlockMaster_enqueue_styles');
