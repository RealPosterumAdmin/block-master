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
const { useState, useEffect, RawHTML } = wp.element;
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
            $childBlocks = []; // Yaratilgan bloklarni saqlash uchun massiv
            $innerBlocksTemplate = []; // InnerBlocks uchun shablon

            // Har bir ichki blok uchun
            for ($i = 0; $i < count($blockChilds); $i++) {
                $childStart = $blockChilds[$i]['startPos'];
                $childEnd = $blockChilds[$i]['endPos'];
                $childContent = $blockChilds[$i]['content'];
                $childName = $name . '-' . ($i + 1);

                // Markaziy blokni ro'yxatdan o'tkazish
                $centralBlockName = "{$childName}-central";
                $centralBlockJS = sprintf(
                    "registerBlockType('block-master/%s', { title: '%s', category: 'block-master', parent: ['block-master/{$name}'], attributes: {}, edit: ({ attributes, setAttributes }) => { return ( <InnerBlocks allowedBlocks={['block-master/{$childName}']} template={[['block-master/{$childName}', {}]]} /> ); }, save: () => { return ( <InnerBlocks.Content /> ); } });",
                    strtolower($centralBlockName),
                    ucfirst($centralBlockName)
                );
                $this->blocks[] = [
                    'name' => $centralBlockName,
                    'parent' => $name,
                    'code' => $centralBlockJS
                ];

                // Ichki bloklar uchun qayta chaqirish
                $this->createBlockData($childName, $childContent, $centralBlockName);

                // Yaratilgan bloklarni saqlash
                $childBlocks[] = $centralBlockName;
                $innerBlocksTemplate[] = ['block-master/' . $childName, []];

                // Agar bu oxirgi blok bo'lmasa, bloklar o'rtasida yangi blok yaratish
                if ($i < count($blockChilds) - 1) {
                    $betweenBlockName = "not-using-{$parentName}";
                    $betweenBlockJS = $this->findAtt($betweenBlockName, '', $parentName); // Bo'sh kontent bilan
                    $this->blocks[] = [
                        'name' => $betweenBlockName,
                        'parent' => $parentName,
                        'code' => $betweenBlockJS
                    ];
                    $innerBlocksTemplate[] = ['block-master/' . $betweenBlockName, []]; // O'rtadagi blokni qo'shish
                }
            }

            // HTML ni yangilash va innerTag ni yaratish
            $innerTag = <<<JS
<InnerBlocks allowedBlocks={['block-master/{$childName}']} template={%s} templateLock="all" />
JS;

            // Template ichiga barcha yaratilgan bloklarni qo'shish
            $innerTag = sprintf($innerTag, json_encode($innerBlocksTemplate));

            // Eng birinchi blok startdan eng oxirgi blok endgacha bo'lgan qismni inner block bilan yaratish
            $html = substr_replace($html, $innerTag, $blockChilds[0]['startPos'], $blockChilds[count($blockChilds) - 1]['endPos'] - $blockChilds[0]['startPos']);
            $blockJS = $this->findAtt($name, $html, $parentName);
        }

        // Asosiy blokni qo'shish
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
//        $html = htmlspecialchars($html);
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
        $blockCode = sprintf(
            " registerBlockType('block-master/%s', { 
        title: '%s', 
        category: 'block-master', 
        %s 
        attributes: { %s }, 
        edit: ({ attributes, setAttributes }) => { 
            return ( 
                <RawHTML> 
                    {%s} 
                </RawHTML> 
            ); 
        }, 
        save: ({ attributes }) => { 
            return ( 
                <RawHTML> 
                    {%s} 
                </RawHTML> 
            ); 
        } 
    }); ",
            strtolower($blockName),
            ucfirst($blockName),
            $parentName ? "parent: ['block-master/{$parentName}']," : '',
            $attributesCode,
            $inspectorControls, // HTML kodini qochirish
            $editHtml, // HTML kodini qochirish
            $saveHtml // HTML kodini qochirish
        );
    
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
<section class="page__services mlrp-b0101">
                <div class="services">
                    <div class="services__body">
                        <div class="services__item el-item-1">
                            <div class="services__column">
                                <div class="services__title"><h1 class="services__text t-h1">{{text: Студия графического&nbsp;дизайна и&nbsp;веб&nbsp;-&nbsp;разработки }}</h1>
                                    <div class="services__teammates">
                                        {{InnerBlock}}
                                            <div class="services__image">
                                                <picture>
                                                    {{img: <img alt="фото" src="./img/teammates/team-1.png">}}
                                                </picture>
                                            </div>
                                        {{/InnerBlock}}
                                    </div>
                                    <button class="services__button button" type="submit"><span>Оставить заявку</span>
                                        <div class="services__icon icon"><i class="icon-arrow-right _icon"></i></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="services__item el-item">
                            <div class="card">
                                <div class="card__header"><h3>Мы на связи</h3>
                                    <div class="card__icons"><a class="card__icon icon" href="{{url:}}" target="_blank"><i
                                            class="icon-telegram-fly _icon"></i></a><a class="card__icon icon" href="{{url:}}"
                                                                                       target="_blank"> <i
                                            class="icon-whatsapp _icon"></i></a></div>
                                </div>
                            </div>
                            <a class="card" href="{{url:}}">
                                <div class="card__header"><h3>{{text:Графический дизайн}}</h3>
                                    <div class="card__icon icon"><i class="icon-arrow-up _icon"></i></div>
                                </div>
                                <div class="card__content">
                                    <ul class="card__list">
                                        {{InnerBlock}}
                                        <li class="card__item">{{text:Логотип}}</li>
                                        {{/InnerBlock}}
                                    </ul>
                                </div>
                            </a></div>
                        {{InnerBlock}}
                        <div class="services__item el-item"><a class="card" href="{{url:}}">
                            <div class="card__header"><h3>{{text:Веб-дизайн}}</h3>
                                <div class="card__icon icon"><i class="icon-arrow-up _icon"></i></div>
                            </div>
                            <div class="card__content">
                                <ul class="card__list">
                                    {{InnerBlock}}
                                    <li class="card__item">{{text:Дизайн сайта}}</li>
                                    {{/InnerBlock}}
                                </ul>
                            </div>
                        </a></div>
                        {{/InnerBlock}}
                    </div>
                </div>
            </section>
HTML;
// $test = new CodeControl("test block",$html);
// print_r($test->orderedBlocks);
// print_r($test->resultJS);
