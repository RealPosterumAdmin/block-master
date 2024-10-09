<?php
/**
 * Plugin Name: BlockMaster
 * Description: !! ДЕМО !! С помощью этого плагина вы можете создавать свои собственные блоки и оформлять свой сайт с помощью этих блоков.
 * Version: 1.0
 * Author: Shodiyev Jasurbek
 */

defined('ABSPATH') || exit;
require_once 'includes/autoloder.php';
use BlockMaster\ThemeControl;
function block_master_activate()
{
    $theme = new ThemeControl;
    $theme->createTheme();
}
register_activation_hook(__FILE__, 'block_master_activate');

add_filter( 'block_categories_all', 'newGutenbergCtegory',10,1 );

function newGutenbergCtegory( $cats ) {

    // create a new array element with anything as its index
    $new = array(
        'literallyanything' => array(
            'slug'  => 'block-master',
            'title' => 'Block Master'
        )
    );

    // just decide here at what position your custom category should appear
    $position = 0; // 2 – After Text and Media, so technically it is a 3rd position

    $cats = array_slice( $cats, 0, $position, true ) + $new + array_slice( $cats, $position, null, true );

    // reset array indexes
    $cats = array_values( $cats );

    return $cats;

}




//----------------menyular-------------------
function block_master_menu() {
    // Asosiy menyu sahifasi
    add_menu_page(
        'SD Theme Constructor', // Sahifa sarlavhasi
        'Theme Constructor', // Menyu sarlavhasi
        'manage_options', // Huquq
        'block-master', // Menyu slug
        'block_master_page_index', // Sahifani ko'rsatish funksiyasi
        'dashicons-admin-generic', // Ikonka
        6 // Pozitsiya
    );

    // Submenu sahifalari
    add_submenu_page(
        'block-master',
        'Новый Блок', // Sahifaning sarlavhasi
        'Новый Блок', // Menyu sarlavhasi
        'manage_options',
        'block_master_page_index', // Ushbu merosda bu sahifa ko'rsatiladigan parametr
        'block_master_page_index' // Ushbu sahifa uchun ko'rsatish funksiyasi
    );

    add_submenu_page(
        'block-master',
        'Блоки',
        'Блоки',
        'manage_options',
        'block_master_page_blocks',
        'block_master_page_blocks' // Ikkinchi submenu
    );

    add_submenu_page(
        'block-master',
        'Настройки Шалона',
        'Настройки Шалона',
        'manage_options',
        'block_master_page_main',
        'block_master_page_main' // Uchinchi submenu
    );
}
// Alohida fayldagi sahifalarni chaqirish
function block_master_page_index() {
    include plugin_dir_path(__FILE__) . 'pages/index.php';
}
function block_master_page_blocks() {
    include plugin_dir_path(__FILE__) . 'pages/blocks.php';
}
function block_master_page_main() {
    include plugin_dir_path(__FILE__) . 'pages/main.php';
}
add_action('admin_menu', 'block_master_menu');
//--------------------------------------------
//--------------------------------------------
 function register_all_blocks() {
     wp_enqueue_style('BlockMaster-main-style', get_template_directory_uri() . '/assets/css/main.min.css');
     wp_enqueue_style('BlockMaster-index-style', get_template_directory_uri() . '/assets/css/index.min.css');
     wp_enqueue_script('BlockMaster-main-script', get_template_directory_uri() . '/assets/js/anime-vendors.min.js', array(), null, false);
     wp_enqueue_script('BlockMaster-main-script', get_template_directory_uri() . '/assets/js/index.min.js', array(), null, false);
     wp_enqueue_script('BlockMaster-main-script', get_template_directory_uri() . '/assets/js/runtime.min.js', array(), null, false);
     wp_enqueue_script('BlockMaster-main-script', get_template_directory_uri() . '/assets/js/main.min.js', array(), null, false);
     $blocks_dir = plugin_dir_path(__FILE__) . 'blocks/';
     $block_folders = array_filter(glob($blocks_dir . '*'), 'is_dir');
     foreach ($block_folders as $block_folder) {
         $block_name = basename($block_folder);
         $js_file = $block_folder . '/index.js';

         if (file_exists($js_file)) {
             wp_enqueue_script(
                 $block_name . '-editor-script',
                 plugins_url('blocks/' . $block_name . '/index.js', __FILE__),
                 ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components'],
                 filemtime($js_file)
             );
         }

         $css_file = $block_folder . '/style.css';
         if (file_exists($css_file)) {
             wp_enqueue_style(
                 $block_name . '-editor-style',
                 plugins_url('blocks/' . $block_name . '/style.css', __FILE__),
                 [],
                 filemtime($css_file)
             );
         }
     }
 }
// add_action('enqueue_block_editor_assets', 'register_all_blocks');
//function register_all_blocks() {
//    $blocks_dir = plugin_dir_path(__FILE__) . 'blocks/';
//    $block_folders = array_filter(glob($blocks_dir . '*'), 'is_dir');
//
//    foreach ($block_folders as $block_folder) {
//        $block_name = basename($block_folder);
//
//        // Redaktor uchun JavaScript yuklash
//        $editor_js_file = $block_folder . '/index.js';
//        if (file_exists($editor_js_file)) {
//            wp_register_script(
//                $block_name . '-editor-script',
//                plugins_url('blocks/' . $block_name . '/index.js', __FILE__),
//                ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components'],
//                filemtime($editor_js_file)
//            );
//        }
//
//        // Redaktor uchun CSS yuklash
//        $editor_css_file = $block_folder . '/editor.css';
//        if (file_exists($editor_css_file)) {
//            wp_register_style(
//                $block_name . '-editor-style',
//                plugins_url('blocks/' . $block_name . '/editor.css', __FILE__),
//                ['wp-edit-blocks'],
//                filemtime($editor_css_file)
//            );
//        }
//
//        // Old qism uchun JavaScript yuklash
//        $frontend_js_file = $block_folder . '/script.js';
//        if (file_exists($frontend_js_file)) {
//            wp_register_script(
//                $block_name . '-frontend-script',
//                plugins_url('blocks/' . $block_name . '/script.js', __FILE__),
//                ['jquery'],
//                filemtime($frontend_js_file),
//                true
//            );
//        }
//
//        // Old qism uchun CSS yuklash
//        $frontend_css_file = $block_folder . '/style.css';
//        if (file_exists($frontend_css_file)) {
//            wp_register_style(
//                $block_name . '-frontend-style',
//                plugins_url('blocks/' . $block_name . '/style.css', __FILE__),
//                [],
//                filemtime($frontend_css_file)
//            );
//        }
//
//        // Blokni ro'yxatdan o'tkazish
//        register_block_type("block-master/{$block_name}", [
//            'editor_script' => file_exists($editor_js_file) ? $block_name . '-editor-script' : null,
//            'editor_style'  => file_exists($editor_css_file) ? $block_name . '-editor-style' : null,
//            'script'        => file_exists($frontend_js_file) ? $block_name . '-frontend-script' : null,
//            'style'         => file_exists($frontend_css_file) ? $block_name . '-frontend-style' : null,
//        ]);
//    }
//}

//add_action('init', 'register_all_blocks');
add_action('enqueue_block_editor_assets', 'register_all_blocks');
function add_type_attribute($tag, $handle, $src) {
    // Shartli ravishda, agar skript handle sizning modul skriptingizga to'g'ri kelsa
    if (strpos($handle, '-editor-script') !== false) {
        $tag = '<script type="module" src="' . esc_url($src) . '"></script>';
    }
    return $tag;
}
add_filter('script_loader_tag', 'add_type_attribute', 10, 3);


//--------------------------------------------
include 'includes/designControl.php';
include 'includes/ajax.php';