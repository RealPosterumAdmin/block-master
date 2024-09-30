<?php

namespace BlockMaster;

use Genesis\CustomBlocks\Blocks\Controls\File;

class ThemeControl {
    private $themeName;
    private $themeDir;
    private $fileControl;

    public function __construct($themeName = "BlockMaster") {
        $this->themeName = $themeName;
        $this->themeDir = WP_CONTENT_DIR . '/themes/' . $this->themeName;
        $this->fileControl = new FileControl();
    }

    public function createTheme() {
        if ($this->fileControl->createDirectory($this->themeDir)) {
            // index.php faylini yaratish
            $this->fileControl->setFile($this->themeDir . '/index.php', "");

            // header.php faylini yaratish
            $this->fileControl->setFile($this->themeDir . '/header.php', "");

            // footer.php faylini yaratish
            $this->fileControl->setFile($this->themeDir . '/footer.php', "");
            // Manzil papkalari
            $sourceFolder = plugin_dir_path(__DIR__) . '/theme-pages/'; // Nusxa olinadigan papka
            $destinationFolder = $this->themeDir; // Nusxa joylashtiriladigan papka

// Manzil papkasini tekshirish va yaratilsa
            if (!is_dir($destinationFolder)) {
                mkdir($destinationFolder, 0755, true);
            }

// Manzil papkasida fayllarni nusxalash
            $files = scandir($sourceFolder);

            foreach ($files as $file) {
                // Faqat .php fayllarini nusxalash
                if (pathinfo($file, PATHINFO_EXTENSION) === 'php') {
                    $sourceFile = $sourceFolder . '/' . $file;
                    $destinationFile = $destinationFolder . '/' . $file;

                    if (copy($sourceFile, $destinationFile)) {
                        echo "Nusxa olindi: $file<br>";
                    } else {
                        echo "Xato yuz berdi: $file<br>";
                    }
                }
            }
            // style.css faylini yaratish va tema ma'lumotlarini kiritish
            $styleContent = "/*
Theme Name: {$this->themeName}
Author: Sizning Ismingiz
Description: Yangi WordPress temasi
Version: 1.0
*/";

            // JS fayli uchun papka va fayl yaratish
            $jsDir = $this->themeDir . '/assets/js';
            $this->fileControl->createDirectory($jsDir);
            $this->fileControl->setFile($jsDir . '/main.js', "");

            // CSS fayli uchun papka va fayl yaratish
            $cssDir = $this->themeDir . '/assets/css';
            $this->fileControl->createDirectory($cssDir);
            $this->fileControl->setFile($cssDir . '/main.css', "");
            $this->fileControl->setFile($cssDir . '/style.css', $styleContent);
        }
    }
    public function get_file($file)
    {
        return $this->fileControl->get_file($this->themeDir . '/assets/' . $file . 'main.' . $file);
    }
}
