<?php
namespace BlockMaster;

require_once dirname(__DIR__, 5) . '/wp-load.php';

class CodeControl
{
    public $resultJS;
    public $analiz = [];

    public function __construct($blockName, $html)
    {
        $this->resultJS = $this->initializeScript();
        $blockName = $this->sanitizeBlockName($blockName);
        $this->createBlockData($blockName, $html);
    }

    private function initializeScript()
    {
        return <<<JS
const { registerBlockType } = wp.blocks;
const { useBlockProps, RichText, MediaUpload, MediaUploadCheck, InspectorControls, InnerBlocks } = wp.blockEditor;
const { PanelBody, Button, SelectControl, TextControl } = wp.components;
const { useState, useEffect } = wp.element;
const apiFetch = wp.apiFetch;

const fetchOptions = async () => {
    try {
        const posts = await apiFetch({ path: '/wp/v2/posts?per_page=100' });
        const categories = await apiFetch({ path: '/wp/v2/categories?per_page=100' });

        const postOptions = posts.map(post => ({
            label: `Post: \${post.title.rendered}`,
            value: post.link,
        }));

        const categoryOptions = categories.map(category => ({
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
    }

    private function sanitizeBlockName($blockName)
    {
        return strtolower(str_replace(' ', '-', trim($blockName)));
    }

    private function createBlockData($name, $html, $parentName = '')
    {
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
                $childName = $name . '-' . $i;
                $innerTag = <<<HTML
                <InnerBlocks
    allowedBlocks={['block-master/$childName']}
    template={[
        ['block-master/$childName', {}],
    ]}
/>
HTML;
                $html = substr_replace($html, $innerTag, $childStart, $childEnd - $childStart);
                $this->createBlockData($childName, $childContent, $name);
            }
            $blockJS = $this->findAtt($name, $html, $parentName);
        }

        $this->resultJS .= $blockJS;
    }

    private function findInnerBlock($html)
    {
        $blocks = [];
        if (!is_string($html) || empty($html)) {
            return $blocks;
        }

        $pattern = '/{{InnerBlock}}|{{\/InnerBlock}}/s';
        preg_match_all($pattern, $html, $matches, PREG_OFFSET_CAPTURE);

        if (empty($matches[0])) {
            return $blocks;
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
                    $blocks[]= [
                        'content' => $content,
                        'startPos' => $lastPos,
                        'endPos' => $end + strlen('{{/InnerBlock}}')
                    ];
                }
            }
        }

        return $blocks;
    }

    function findAtt($blockName, $html, $parentName = '')
{
    $patterns = [
        'text' => '/{{text:\s*(.*?)\s*}}/',
        'img' => '/{{img:\s*<img src="(.*?)" alt="(.*?)"\s*>\s*}}/',
        'url' => '/href="{{url:(.*?)}}"/'
    ];

    $attributes = [];
    $attributeNames = [];

    $editHtml = $html;
    $saveHtml = $html;

    $editHtml = preg_replace_callback($patterns['text'], function ($matches) use (&$attributes, &$attributeNames) {
        static $index = 0;
        $attributeName = "text_$index";
        $defaultText = esc_html($matches[1]);
        $attributes[$attributeName] = "{ type: 'string', default: '$defaultText' }";
        $attributeNames[] = $attributeName;
        $index++;
        return sprintf('<RichText value={attributes.%s} onChange={(value) => setAttributes({ %s: value })} />', $attributeName, $attributeName);
    }, $editHtml);

    $saveHtml = preg_replace_callback($patterns['text'], function ($matches) use (&$attributeNames) {
        static $index = 0;
        $attributeName = "text_$index";
        $index++;
        return sprintf('<RichText.Content value={attributes.%s} />', $attributeName);
    }, $saveHtml);

    $editHtml = preg_replace_callback($patterns['img'], function ($matches) use (&$attributes, &$attributeNames) {
        static $index = 0;
        $attributeSrc = "imgSrc_$index";
        $attributeAlt = "imgAlt_$index";
        $defaultSrc = esc_attr($matches[1]);
        $defaultAlt = esc_attr($matches[2]);
        $attributes[$attributeSrc] = "{ type: 'string', default: '$defaultSrc' }";
        $attributes[$attributeAlt] = "{ type: 'string', default: '$defaultAlt' }";
        $attributeNames[] = $attributeSrc;
        $attributeNames[] = $attributeAlt;
        $index++;
        return sprintf('<img src={attributes.%s} alt={attributes.%s} />', $attributeSrc, $attributeAlt);
    }, $editHtml);

    $saveHtml = preg_replace_callback($patterns['img'], function ($matches) use (&$attributeNames) {
        static $index = 0;
        $attributeSrc = "imgSrc_$index";
        $attributeAlt = "imgAlt_$index";
        $index++;
        return sprintf('<img src={attributes.%s} alt={attributes.%s} />', $attributeSrc, $attributeAlt);
    }, $saveHtml);

    $editHtml = preg_replace_callback($patterns['url'], function ($matches) use (&$attributes, &$attributeNames) {
        static $index = 0;
        $attributeName = "url_$index";
        $defaultUrl = esc_url($matches[1]);
        $attributes[$attributeName] = "{ type: 'string', default: '$defaultUrl' }";
        $attributeNames[] = $attributeName;
        $index++;
        return sprintf('href={attributes.%s}', $attributeName);
    }, $editHtml);

    $saveHtml = preg_replace_callback($patterns['url'], function ($matches) use (&$attributeNames) {
        static $index = 0;
        $attributeName = "url_$index";
        $index++;
        return sprintf('href={attributes.%s}', $attributeName);
    }, $saveHtml);

    $attributesCode = implode(",\n", array_map(function ($key, $value) {
        return "$key: $value";
    }, array_keys($attributes), $attributes));

    $inspectorControls = implode("", array_map(function ($key) {
        if (strpos($key, 'imgSrc_') === 0) {
            return sprintf("<MediaUploadCheck><MediaUpload onSelect={(media) => setAttributes({ %s: media.url })} allowedTypes={['image']} render={({ open }) => (<Button onClick={open} isPrimary>Choose Image</Button>)} /></MediaUploadCheck>", $key);
        } elseif (strpos($key, 'url_') === 0) {
            return sprintf("<TextControl label='URL' value={attributes.%s} onChange={(value) => setAttributes({ %s: value })} />", $key, $key);
        }
        return '';
    }, $attributeNames));

    if (!empty(trim($inspectorControls))) {
        $inspectorControls = sprintf("<InspectorControls><PanelBody title='Image & URL Settings'>%s</PanelBody></InspectorControls>", $inspectorControls);
    } else {
        $inspectorControls = '';
    }

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
}

$html = <<<S
<div class="div">
    <h1>{{text: hayvonlar}}</h1>
    <a href="{{url:test.php}}" > some tag </a>
    {{InnerBlock}}
    <div class="card">
        <h4>{{text: yagear }}</h4>
        {{img: <img src="/sdasd/sd/ad/" alt="rasm-uchun-text">}}
        <div class="descriptions">
            {{text: asdjlkajdlkjslf kfjslkmflskf slfks ekcs}}
        </div>
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
        </div>
    </div>
    <div class="ds">
        <span>{{text: dlkjslf kfjslkmflskf slfks ekcs}}</span>
    </div>
    {{/InnerBlock}}
</div>
S;

$test = new CodeControl("test block", $html);
print_r($test->resultJS);