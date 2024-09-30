<?php

namespace BlockMaster;

class FileControl {

    public function createDirectory($path) {
        if (!file_exists($path)) {
            mkdir($path, 0755, true);
            return true;
        }
        return false;
    }

    public function setFile($filePath, $content = '') {
        file_put_contents($filePath, $content);
    }

    public function fileExists($filePath) {
        return file_exists($filePath);
    }

    public function get_file($file_path)
    {
       return file_get_contents($file_path);
    }
}