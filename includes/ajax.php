<?php

use BlockMaster\BlockControl;
add_action('wp_ajax_create_block', 'create_block');

function create_block() {
    // Nonce ni tekshirish
    check_ajax_referer('new_block_nonce', 'nonce');

    // Sizning kodlaringiz (blok ma'lumotlarini saqlash, x.k.)
    $name = sanitize_text_field($_POST['name']);
    $html = stripslashes_deep($_POST['index']); // Remove slashes
    $css = stripslashes_deep($_POST['css']); // Remove slashes
    $js = stripslashes_deep($_POST['js']); // Remove slashes

    $blocks_control = new BlockControl($name,$html,$css,$js);
    wp_send_json_success(array($blocks_control->getResult()));
}
add_action('wp_ajax_setThemeFiles', 'setThemeFiles');
 
function setThemeFiles() {
    // Nonce ni tekshirish
    check_ajax_referer('new_block_nonce', 'nonce');

    // Sizning kodlaringiz (blok ma'lumotlarini saqlash, x.k.)
//    $name = sanitize_text_field($_POST['name']);
    $header = stripslashes_deep($_POST['header']);
    $footer = stripslashes_deep($_POST['footer']);
    $css = stripslashes_deep($_POST['css']);
    $js = stripslashes_deep($_POST['js']);
//    $theme = new FileControl;
    $themeDir = WP_CONTENT_DIR . '/themes/BlockMaster';
    file_put_contents($themeDir.'/header.php',$header);
    file_put_contents($themeDir.'/footer.php',$footer);
    file_put_contents($themeDir.'/assets/css/main.css',$css);
    file_put_contents( $themeDir.'/assets/js/main.js',$js);
    wp_send_json_success(array('message' => 'ok'));
}

add_action('wp_ajax_saveGutenbergJS', 'saveGutenbergJS');
 
function saveGutenbergJS() {
    // Nonce ni tekshirish
    check_ajax_referer('new_block_nonce', 'nonce');

    $minified_js = stripslashes_deep($_POST['minified_js']);
    $blockDIR = $_POST['dir'];
    file_put_contents($blockDIR.'/index.js',$minified_js);
    wp_send_json_success(array('message' => 'ok'));
}