<?
/**
 * Plugin Name: Gutenberg Deep Dive
 * Plugin URI: https://ronnyfreites.blog
 * Description: An plugin for learing how Gutenberg blocks work.
 * Text Domain: customgutenbergblock
 * Domain Path: /languages
 * Author: Ronny Freites
 * Author URI: https://ronnyfreites.blog
 * Version: 1.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package customgutenbergblock
 */

//  Exit if accessed directly.
defined('ABSPATH') || exit;

// Only load if Gutenberg is available.
if ( ! function_exists( 'register_block_type' ) ) {
	return;
}

/**
 * Enqueue block editor only JavaScript and CSS
 */
function customgutenbergblock_editor_scripts()
{

    // Make paths variables so we don't write em twice ;)
    $blockPath = '/assets/js/editor.blocks.js';
    $editorStylePath = '/assets/css/blocks.editor.css';

    // Enqueue the bundled block JS file
    wp_enqueue_script(
        'customgutenbergblock-blocks-js',
        plugins_url( $blockPath, __FILE__ ),
        [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ],
        filemtime( plugin_dir_path(__FILE__) . $blockPath )
    );

    // Enqueue optional editor only styles
    wp_enqueue_style(
        'customgutenbergblock-blocks-editor-css',
        plugins_url( $editorStylePath, __FILE__),
        [],
        filemtime( plugin_dir_path( __FILE__ ) . $editorStylePath )
    );

}

// Hook scripts function into block editor hook
add_action( 'enqueue_block_editor_assets', 'customgutenbergblock_editor_scripts' );


/**
 * Enqueue front end and editor JavaScript and CSS
 */
function customgutenbergblock_scripts()
{
    $blockPath = '/assets/js/frontend.blocks.js';
    // Make paths variables so we don't write em twice ;)
    $stylePath = '/assets/css/blocks.style.css';

    // Enqueue the bundled block JS file
    if ( !is_admin() ) {
      wp_enqueue_script(
          'customgutenbergblock-blocks-frontend-js',
          plugins_url( $blockPath, __FILE__ ),
          [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ],
          filemtime( plugin_dir_path(__FILE__) . $blockPath )
      );
    }

    // Enqueue frontend and editor block styles
    wp_enqueue_style(
        'customgutenbergblock-blocks-css',
        plugins_url($stylePath, __FILE__),
        null,
        filemtime(plugin_dir_path(__FILE__) . $stylePath )
    );

}

// Hook scripts function into block editor hook
add_action('enqueue_block_assets', 'customgutenbergblock_scripts');