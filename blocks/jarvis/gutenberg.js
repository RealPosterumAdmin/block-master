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
            label: `Post: ${post.title.rendered}`,
            value: post.link,
        }));

        const categoryOptions = categories.map((category) => ({
            label: `Category: ${category.name}`,
            value: category.link,
        }));

        return [...postOptions, ...categoryOptions];
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}; registerBlockType('block-master/jarvis', { 
        title: 'Jarvis', 
        category: 'block-master', 
         
        attributes: { ae3bdea4f_text_0: { type: 'string', default: 'Студия графического&nbsp;дизайна и&nbsp;веб&nbsp;-&nbsp;разработки' } }, 
        edit: ({ attributes, setAttributes }) => { 
            return ( 
                <> 
                     
                </> 
            ); 
        }, 
        save: ({ attributes }) => { 
            return ( 
                <> 
                    &lt;section className=&quot;page__services mlrp-b0101&quot;&gt;
                &lt;div className=&quot;services&quot;&gt;
                    &lt;div className=&quot;services__body&quot;&gt;
                        &lt;div className=&quot;services__item el-item-1&quot;&gt;
                            &lt;div className=&quot;services__column&quot;&gt;
                                &lt;div className=&quot;services__title&quot;&gt;&lt;h1 className=&quot;services__text t-h1&quot;&gt;&lt;RichText value={attributes.ae3bdea4f_text_0} onChange={(value) =&gt; setAttributes({ ae3bdea4f_text_0: value })} /&gt;&lt;/h1&gt;
                                    &lt;div className=&quot;services__teammates&quot;&gt;
                                        &lt;InnerBlocks allowedBlocks={[&#039;block-master/jarvis-3&#039;]} template={[[&quot;block-master/jarvis-1&quot;,[]],[&quot;block-master/not-using-&quot;,[]],[&quot;block-master/jarvis-2&quot;,[]],[&quot;block-master/not-using-&quot;,[]],[&quot;block-master/jarvis-3&quot;,[]]]} templateLock=&quot;all&quot; /&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/section&gt; 
                </> 
            ); 
        } 
    }); registerBlockType('block-master/jarvis-1-central', { title: 'Jarvis-1-central', category: 'block-master', parent: ['block-master/jarvis'], attributes: {}, edit: ({ attributes, setAttributes }) => { return ( <InnerBlocks allowedBlocks={['block-master/jarvis-1']} template={[['block-master/jarvis-1', {}]]} /> ); }, save: () => { return ( <InnerBlocks.Content /> ); } }); registerBlockType('block-master/jarvis-1', { 
        title: 'Jarvis-1', 
        category: 'block-master', 
        parent: ['block-master/jarvis-1-central'], 
        attributes: { a388cac2b_imgSrc_0: { type: 'string', default: 'фото' },
a388cac2b_imgAlt_0: { type: 'string', default: './img/teammates/team-1.png' } }, 
        edit: ({ attributes, setAttributes }) => { 
            return ( 
                <> 
                    &lt;InspectorControls&gt;&lt;PanelBody title=&#039;Image &amp; URL Settings&#039;&gt;&lt;MediaUploadCheck&gt;&lt;MediaUpload onSelect={(media) =&gt; setAttributes({ a388cac2b_imgSrc_0: media.url })} allowedTypes={[&#039;image&#039;]} render={({ open }) =&gt; (&lt;Button onClick={open} isPrimary&gt;Choose Image&lt;/Button&gt;)} /&gt;&lt;/MediaUploadCheck&gt;&lt;/PanelBody&gt;&lt;/InspectorControls&gt; 
                </> 
            ); 
        }, 
        save: ({ attributes }) => { 
            return ( 
                <> 
                    &lt;div className=&quot;services__image&quot;&gt;
                                                &lt;picture&gt;
                                                    &lt;img alt={attributes.a388cac2b_imgAlt_0} src={attributes.a388cac2b_imgSrc_0}/&gt;
                                                &lt;/picture&gt;
                                            &lt;/div&gt; 
                </> 
            ); 
        } 
    }); registerBlockType('block-master/jarvis-2-central', { title: 'Jarvis-2-central', category: 'block-master', parent: ['block-master/jarvis'], attributes: {}, edit: ({ attributes, setAttributes }) => { return ( <InnerBlocks allowedBlocks={['block-master/jarvis-2']} template={[['block-master/jarvis-2', {}]]} /> ); }, save: () => { return ( <InnerBlocks.Content /> ); } }); registerBlockType('block-master/jarvis-2', { 
        title: 'Jarvis-2', 
        category: 'block-master', 
        parent: ['block-master/jarvis-2-central'], 
        attributes: { accd32967_text_0: { type: 'string', default: 'Логотип' } }, 
        edit: ({ attributes, setAttributes }) => { 
            return ( 
                <> 
                     
                </> 
            ); 
        }, 
        save: ({ attributes }) => { 
            return ( 
                <> 
                    &lt;li className=&quot;card__item&quot;&gt;&lt;RichText value={attributes.accd32967_text_0} onChange={(value) =&gt; setAttributes({ accd32967_text_0: value })} /&gt;&lt;/li&gt; 
                </> 
            ); 
        } 
    }); registerBlockType('block-master/jarvis-3-central', { title: 'Jarvis-3-central', category: 'block-master', parent: ['block-master/jarvis'], attributes: {}, edit: ({ attributes, setAttributes }) => { return ( <InnerBlocks allowedBlocks={['block-master/jarvis-3']} template={[['block-master/jarvis-3', {}]]} /> ); }, save: () => { return ( <InnerBlocks.Content /> ); } }); registerBlockType('block-master/jarvis-3', { 
        title: 'Jarvis-3', 
        category: 'block-master', 
        parent: ['block-master/jarvis-3-central'], 
        attributes: { a1899f986_text_0: { type: 'string', default: 'Веб-дизайн' },
a1899f986_url_0: { type: 'string', default: '#' } }, 
        edit: ({ attributes, setAttributes }) => { 
            return ( 
                <> 
                    &lt;InspectorControls&gt;&lt;PanelBody title=&#039;Image &amp; URL Settings&#039;&gt;&lt;TextControl label=&#039;URL&#039; value={attributes.a1899f986_url_0} onChange={(value) =&gt; setAttributes({ a1899f986_url_0: value })} /&gt;&lt;/PanelBody&gt;&lt;/InspectorControls&gt; 
                </> 
            ); 
        }, 
        save: ({ attributes }) => { 
            return ( 
                <> 
                    &lt;div className=&quot;services__item el-item&quot;&gt;&lt;a className=&quot;card&quot; href={attributes.a1899f986_url_0}&gt;
                            &lt;div className=&quot;card__header&quot;&gt;&lt;h3&gt;&lt;RichText value={attributes.a1899f986_text_0} onChange={(value) =&gt; setAttributes({ a1899f986_text_0: value })} /&gt;&lt;/h3&gt;
                                &lt;div className=&quot;card__icon icon&quot;&gt;&lt;i className=&quot;icon-arrow-up _icon&quot;&gt;&lt;/i&gt;&lt;/div&gt;
                            &lt;/div&gt;
                            &lt;div className=&quot;card__content&quot;&gt;
                                &lt;ul className=&quot;card__list&quot;&gt;
                                    &lt;InnerBlocks allowedBlocks={[&#039;block-master/jarvis-3-1&#039;]} template={[[&quot;block-master/jarvis-3-1&quot;,[]]]} templateLock=&quot;all&quot; /&gt;
                                &lt;/ul&gt;
                            &lt;/div&gt;
                        &lt;/a&gt;&lt;/div&gt; 
                </> 
            ); 
        } 
    }); registerBlockType('block-master/jarvis-3-1-central', { title: 'Jarvis-3-1-central', category: 'block-master', parent: ['block-master/jarvis-3'], attributes: {}, edit: ({ attributes, setAttributes }) => { return ( <InnerBlocks allowedBlocks={['block-master/jarvis-3-1']} template={[['block-master/jarvis-3-1', {}]]} /> ); }, save: () => { return ( <InnerBlocks.Content /> ); } }); registerBlockType('block-master/jarvis-3-1', { 
        title: 'Jarvis-3-1', 
        category: 'block-master', 
        parent: ['block-master/jarvis-3-1-central'], 
        attributes: { afd892e8a_text_0: { type: 'string', default: 'Дизайн сайта' } }, 
        edit: ({ attributes, setAttributes }) => { 
            return ( 
                <> 
                     
                </> 
            ); 
        }, 
        save: ({ attributes }) => { 
            return ( 
                <> 
                    &lt;li className=&quot;card__item&quot;&gt;&lt;RichText value={attributes.afd892e8a_text_0} onChange={(value) =&gt; setAttributes({ afd892e8a_text_0: value })} /&gt;&lt;/li&gt; 
                </> 
            ); 
        } 
    }); 