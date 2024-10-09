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
        $gutenbergJS = $this->createBlock();
        file_put_contents($directory . '/block.html', $this->html);
        file_put_contents($directory . '/style.css', $this->css);
        file_put_contents($directory . '/script.js', $this->js);
        file_put_contents($directory . '/gutenberg.js', $gutenbergJS);
        $this->result['gutenbergJS'] = $gutenbergJS;
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