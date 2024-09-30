<?php
spl_autoload_register(
    function ( $class ) {
        // Namespace ni ajratish
        $namespace = explode( '\\', $class );
        $root      = array_shift( $namespace );

        // Agar klass `BlockMaster` namespace'ida bo'lmasa, funksiyadan chiqamiz
        if ( 'BlockMaster' !== $root ) {
            return;
        }

        // Klass nomi oxirgi qism sifatida
        $class_name = array_pop( $namespace );

        // Namespace ni tayyorlash
        $namespace_path = trim( implode( DIRECTORY_SEPARATOR, $namespace ) );

        // Papka nomi
        $directory = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'classes';

        // Fayl yo'lini yig'ish
        $file = $directory . DIRECTORY_SEPARATOR . $class_name . '.php';

        // Agar fayl mavjud bo'lsa, uni yuklaymiz
        if ( file_exists( $file ) ) {
            require_once $file;
        }
    }
);