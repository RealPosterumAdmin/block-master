<?php

namespace BlockMaster;

class BlockControl {
    private $blockName;
    private $html;
    private $css;
    private $js;

    private $result = [];

    public function __construct($blockName, $html, $css, $js) {
        $this->blockName = $this->sanitizeBlockName($blockName);
        $this->html = $html;
        $this->css = $css;
        $this->js = $js;

        $this->saveFiles();
        $this->createBlock();
        // $this->runGulpBuild(); // Add this line to run the build process
    }

    private function sanitizeBlockName($blockName) {
        $blockName = str_replace(['_', ' '], '-', $blockName);
        return strtolower($blockName);
    }

    private function saveFiles() {
        $directory = plugin_dir_path(__DIR__) . '../blocks/' . $this->blockName;
        $this->result['dir'] = $directory;
        if (!file_exists($directory)) {
            mkdir($directory, 0755, true);
        }

        file_put_contents($directory . '/block.html', $this->html);
        file_put_contents($directory . '/style.css', $this->css);
        file_put_contents($directory . '/block.js', $this->js);
        file_put_contents($directory . '/gutenberg.js', $this->createBlock());
        $this->runGulpBuild($directory);
    }

    private function runGulpBuild($folderName) {
        // Fayl yo'lini to'g'ri formatlash
        $folderNameEscaped = escapeshellarg($folderName);
    
        // Gulp vazifasini ishga tushirish uchun buyruq
        $command = "gulp --folderName $folderNameEscaped";
    
        // Shell orqali buyruqni ishga tushirish
        $output = shell_exec($command);
    
        if ($output === null) {
            $this->result['Gulp RUN: '] = "Gulp vazifasini ishga tushirishda xatolik yuz berdi.\n";
            $this->result['gulp Command: '] = $command;
        } else {
            $this->result['Gulp RUN: '] = "Gulp vazifasi muvaffaqiyatli bajarildi:\n";
        }
        $this->result['gulp result: '] = $output;
    }

    public function getHtml() {
        return $this->html;
    }

    public function createBlock() {
        $codeControl = new CodeControl($this->blockName, $this->html);
        return $codeControl->resultJS;
    }

    public function getResult() {
        return $this->result;
    }
}