<?php
/**
 * ----Markers-----
 * Inner Block = {{InnerBlock}}  block-kode {{/InnerBlock}}
 * TEXT        = {{text:some-text}}
 * URl         = {{url:some-url}}
 * IMG         = {{img: <img src="this-img-url" alt="this-img-alt">}}
 */
namespace BlockMaster;
require_once dirname(__DIR__, 5) . '/wp-load.php';
class CodeControl
{
    public $resultJS;
    public $analiz=[];
    public $blocks=[];
    public $orderedBlocks=[];
    public function __construct($blockName,$html)
    {
        $this->resultJS = <<<JS
const { registerBlockType } = wp.blocks;
const { useBlockProps, RichText, MediaUpload, MediaUploadCheck, InspectorControls, InnerBlocks } = wp.blockEditor;
const { PanelBody, Button, SelectControl, TextControl } = wp.components;
const { useState, useEffect } = wp.element;
const apiFetch = wp.apiFetch;


const fetchOptions = async () => {
    try {
        const posts = await apiFetch({ path: '/wp/v2/posts?per_page=100' });
        const categories = await apiFetch({ path: '/wp/v2/categories?per_page=100' });

        const postOptions = posts.map((post) => ({
            label: `Post: \${post.title.rendered}`,
            value: post.link,
        }));

        const categoryOptions = categories.map((category) => ({
            label: `Category: \${category.name}`,
            value: category.link,
        }));

        return [...postOptions, ...categoryOptions];
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};
JS;

        $blockName =  strtolower(str_replace(' ', '-', trim($blockName)));

        $this->createBlockData($blockName, $html);

        $blocks = $this->blocks;
        $blocksCount = count($blocks);
        $parentBlock = $blocks[$blocksCount-1];
        $this->orderedBlocks[] = $parentBlock;
        unset($this->blocks[$blocksCount-1]);
        $this->findChilds($parentBlock['name']);
        foreach ($this->orderedBlocks as $block){
            $this->resultJS .= $block['code'];
        }
    }

    private function createBlockData($name, $html, $parentName = '') {
        $this->analiz['blockName'] = $name;
        $blockChilds = $this->findInnerBlock($html);

        $this->analiz['blockChild'] = $blockChilds;

        if (empty($blockChilds)) {
            $blockJS = $this->findAtt($name, $html, $parentName);
        } else {
            for ($i = count($blockChilds) - 1; $i >= 0; $i--) {
                $childStart = $blockChilds[$i]['startPos'];
                $childEnd = $blockChilds[$i]['endPos'];
                $childContent = $blockChilds[$i]['content'];
                $childName = $name . '-' . ($i + 1);

                // Markaziy blokni yaratish
                $centralBlockName = "{$childName}-central";
                $innerTag = <<<JS
<InnerBlocks
    allowedBlocks={['block-master/{$centralBlockName}']}
    template={[['block-master/{$centralBlockName}', {}]]}
    templateLock="all"
/>
JS;

                // Markaziy blokni ro'yxatdan o'tkazish
                $centralBlockJS = sprintf("
registerBlockType('block-master/%s', {
    title: '%s',
    category: 'block-master',
    parent: ['block-master/{$name}'],
    attributes: {},
    edit: ({ attributes, setAttributes }) => {
        return (
               <InnerBlocks
                   allowedBlocks={['block-master/{$childName}']}
                   template={[['block-master/{$childName}', {}],]}
               />
        );
    },
    save: () => {
        return (
                <InnerBlocks.Content />
        );
    }
});", strtolower($centralBlockName), ucfirst($centralBlockName));
                $this->blocks[] = [
                    'name' => $centralBlockName,
                    'parent' => $name,
                    'code' => $centralBlockJS
                ];

                // HTML ni markaziy blok bilan almashtirish
                $html = substr_replace($html, $innerTag, $childStart, $childEnd - $childStart);

                // Ichki bloklar uchun qayta chaqirish
                $this->createBlockData($childName, $childContent, $centralBlockName);
            }

            $blockJS = $this->findAtt($name, $html, $parentName);
        }
        $this->blocks[] = [
            'name' => $name,
            'parent' => $parentName,
            'code' => $blockJS
        ];
    }
    private function findInnerBlock($html)
    {
        $blocks = [];
        if (!is_string($html) || empty($html)) {
            return $blocks; // Agar $html bo'sh yoki null bo'lsa, false qaytarish
        }

        $pattern = '/{{InnerBlock}}|{{\/InnerBlock}}/s';
        preg_match_all($pattern, $html, $matches, PREG_OFFSET_CAPTURE);

        if (empty($matches[0])) {
            return $blocks; // Ichki bloklar topilmasa, false qaytarish
        }

        $stack = [];
        $lastPos = 0;

        foreach ($matches[0] as $match) {
            $tag = $match[0];
            $pos = $match[1];

            if ($tag === '{{InnerBlock}}') {
                if (empty($stack)) {
                    $lastPos = $pos;
                }
                $stack[] = $pos;
            } elseif ($tag === '{{/InnerBlock}}') {
                array_pop($stack);
                if (empty($stack)) {
                    $start = $lastPos + strlen('{{InnerBlock}}');
                    $end = $pos;
                    $content = trim(substr($html, $start, $end - $start));

                    $blocks[] = [
                        'content' => $content,
                        'startPos' => $lastPos,
                        'endPos' => $end + strlen('{{/InnerBlock}}')
                    ];
                }
            }
        }
        return $blocks;
    }
    private function replaceInnerBlocksWithContent($html) {
            // Yaxshilangan regex andozasi
        $pattern = '/<InnerBlocks\b[^>]*?\s*\/>/';

        // Mos naqshlarni <InnerBlocks.Content /> bilan almashtirish
        $result = preg_replace($pattern, '<InnerBlocks.Content />', $html);

        return $result;
    }
    private function findAtt($blockName, $html, $parentName = '')
    {
        $patterns = [
            'text' => '/{{text:\s*((?:.|\n)*?)\s*}}/',
            'img' => '/{{img:\s*<img alt="(.*?)" src="(.*?)"\s*>\s*}}/',
            'url' => '/"{{url:(.*?)}}"/'
        ];
        $hash = "a".substr(md5($blockName), 0, 8);
        $attributes = [];
        $attributeNames = [];
    
        $editHtml = $html;
        $saveHtml = $html;
    
        $editHtml = preg_replace_callback($patterns['text'], function ($matches) use ($hash, &$attributes, &$attributeNames) {
            static $index = 0;
            $attributeName = "{$hash}_text_$index";
            $defaultText = esc_html($matches[1]);
            $attributes[$attributeName] = "{ type: 'string', default: '$defaultText' }";
            $attributeNames[] = $attributeName;
            $index++;
            return sprintf('<RichText value={attributes.%s} onChange={(value) => setAttributes({ %s: value })} />', $attributeName, $attributeName);
        }, $editHtml);
    
        $saveHtml = preg_replace_callback($patterns['text'], function ($matches) use ($hash, &$attributeNames) {
            static $index = 0;
            $attributeName = "{$hash}_text_$index";
            $index++;
            return sprintf('<RichText.Content value={attributes.%s} />', $attributeName);
        }, $saveHtml);
    
        $editHtml = preg_replace_callback($patterns['img'], function ($matches) use ($hash, &$attributes, &$attributeNames) {
            static $index = 0;
            $attributeSrc = "{$hash}_imgSrc_$index";
            $attributeAlt = "{$hash}_imgAlt_$index";
            $defaultSrc = esc_attr($matches[1]);
            $defaultAlt = esc_attr($matches[2]);
            $attributes[$attributeSrc] = "{ type: 'string', default: '$defaultSrc' }";
            $attributes[$attributeAlt] = "{ type: 'string', default: '$defaultAlt' }";
            $attributeNames[] = $attributeSrc;
            $attributeNames[] = $attributeAlt;
            $index++;
            return sprintf('<img alt={attributes.%s} src={attributes.%s}/>', $attributeAlt, $attributeSrc);
        }, $editHtml);
    
        $saveHtml = preg_replace_callback($patterns['img'], function ($matches) use ($hash, &$attributeNames) {
            static $index = 0;
            $attributeSrc = "{$hash}_imgSrc_$index";
            $attributeAlt = "{$hash}_imgAlt_$index";
            $index++;
            return sprintf('<img src={attributes.%s} alt={attributes.%s} />', $attributeAlt, $attributeSrc);
        }, $saveHtml);
    
        $editHtml = preg_replace_callback($patterns['url'], function ($matches) use ($hash, &$attributes, &$attributeNames) {
            static $index = 0;
            $attributeName = "{$hash}_url_$index";
            $defaultUrl = esc_url($matches[1]);
            $attributes[$attributeName] = "{ type: 'string', default: '#' }";
            $attributeNames[] = $attributeName;
            $index++;
            return sprintf('{attributes.%s}', $attributeName);
        }, $editHtml);
    
        $saveHtml = preg_replace_callback($patterns['url'], function ($matches) use ($hash, &$attributeNames) {
            static $index = 0;
            $attributeName = "{$hash}_url_$index";
            $index++;
            return sprintf('{attributes.%s}', $attributeName);
        }, $saveHtml);
        
        $saveHtml = $this->replaceInnerBlocksWithContent($saveHtml);

        $attributesCode = implode(",\n", array_map(function ($key, $value) use ($hash) {
            return "$key: $value";
        }, array_keys($attributes), $attributes));
    
        $inspectorControls = implode("", array_map(function ($key) use ($hash) {
            if (strpos($key, "{$hash}_imgSrc_") === 0) {
                return sprintf("<MediaUploadCheck><MediaUpload onSelect={(media) => setAttributes({ %s: media.url })} allowedTypes={['image']} render={({ open }) => (<Button onClick={open} isPrimary>Choose Image</Button>)} /></MediaUploadCheck>", $key);
            } elseif (strpos($key, "{$hash}_url_") === 0) {
                return sprintf("<TextControl label='URL' value={attributes.%s} onChange={(value) => setAttributes({ %s: value })} />", $key, $key);
            }
            return '';
        }, $attributeNames));
    
        if (!empty(trim($inspectorControls))) {
            $inspectorControls = sprintf("<InspectorControls><PanelBody title='Image & URL Settings'>%s</PanelBody></InspectorControls>", $inspectorControls);
        } else {
            $inspectorControls = '';
        }
        $editHtml = str_replace('class="', 'className="', $editHtml);
        $saveHtml = str_replace('class="', 'className="', $saveHtml);
        $blockCode = sprintf("
            registerBlockType('block-master/%s', {
                title: '%s',
                category: 'block-master',
                %s
                attributes: {
                    %s
                },
                edit: ({ attributes, setAttributes }) => {
                    return (
                        <>
                            %s
                            %s
                        </>
                    );
                },
                save: ({ attributes }) => {
                    return (
                        <>
                            %s
                        </>
                    );
                }
            });
        ", strtolower($blockName), 
        ucfirst($blockName), 
        $parentName ? "parent: ['block-master/{$parentName}']," : '', 
        $attributesCode, 
        $inspectorControls, 
        $editHtml, 
        $saveHtml);
    
        return stripslashes_deep($blockCode);
    }
    private function findChildID($name)
    {
        foreach ($this->blocks as $key => $block) {
            if ($block['parent'] === $name) {
                return $key;
            };
        };
        return false; // Agar hech qanday moslik topilmasa, null qaytadi
    }
    private function findChilds($name)
    {
        while (true) {
            $childID = $this->findChildID($name);
            if ($childID !== false) {
                $child = $this->blocks[$childID];
                $this->orderedBlocks[] = $child;
                $this->findChilds($child['name']);
                // Blokni bo'sh qilish o'rniga, uni o'chirib tashlash uchun unset ishlatamiz
                unset($this->blocks[$childID]);
            } else {
                break; // Agar hech qanday moslik topilmasa, tsikldan chiqish
            }
        }
    }

}
$html = <<<HTML
<div class="div">
    <h1>{{text: hayvonlar}}</h1>
    <a href="{{url:test.php}}" > some tag </a>
    {{InnerBlock}}
    <div class="card">
        <h4>{{text: yagear }}</h4>
        {{img: <img src="/sdasd/sd/ad/" alt="rasm-uchun-text">}}
        <div class="descriptions">
            {{text: asdjlkajdlkjslf kfjslkmflskf slfks ekcs}}
        </div><ul>
        {{InnerBlock}}
            <li>{{text: 123}}</li>
        {{/InnerBlock}}
        </ul>
    </div>
    <div class="ds">
        <span>{{text: dlkjslf kfjslkmflskf slfks ekcs}}</span>
    </div>
    {{/InnerBlock}}
    {{InnerBlock}}
    <div class="card">
        <h4>{{text: yagear }}</h4>
        {{img: <img src="/sdasd/sd/ad/" alt="rasm-uchun-text">}}
        <div class="descriptions">
            {{text: asdjlkajdlkjslf kfjslkmflskf slfks ekcs}}
        </div><ul>
        {{InnerBlock}}
            <li>{{text: 123}}</li>
        {{/InnerBlock}}
        </ul>
    </div>
    <div class="ds">
        <span>{{text: dlkjslf kfjslkmflskf slfks ekcs}}</span>
    </div>
    {{/InnerBlock}}
</div>
HTML;
// $test = new CodeControl("test block",$html);
// print_r($test->orderedBlocks);
// print_r($test->resultJS);
