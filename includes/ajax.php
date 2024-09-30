<?php

use BlockMaster\BlockControl;
use BlockMaster\FileControl;
add_action('wp_ajax_create_block', 'create_block');
//add_action('wp_ajax_nopriv_create_block', 'create_block'); // Foydalanuvchilar kirishi uchun

function create_block() {
    // Nonce ni tekshirish
    check_ajax_referer('new_block_nonce', 'nonce');

    // Sizning kodlaringiz (blok ma'lumotlarini saqlash, x.k.)
    $name = sanitize_text_field($_POST['name']);
    $html = stripslashes_deep($_POST['index']); // Remove slashes
    $css = stripslashes_deep($_POST['css']); // Remove slashes
    $js = stripslashes_deep($_POST['js']); // Remove slashes

    $blocks_control = new BlockControl($name,$html,$css,$js);
    wp_send_json_success(array('message' => [$blocks_control->getResult()]));
}
add_action('wp_ajax_setThemeFiles', 'setThemeFiles');
//add_action('wp_ajax_nopriv_setThemeFiles', 'setThemeFiles'); // Foydalanuvchilar kirishi uchun

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
    file_put_contents($themeDir.'/assets/js/main.js',$js);
    wp_send_json_success(array('message' => 'ok'));
}

