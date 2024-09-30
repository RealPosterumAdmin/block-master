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
};
            registerBlockType('block-master/test-1-1-0', {
                title: 'Test-1-1-0',
                category: 'block-master',
                parent: ['block-master/test-1-1'],
                attributes: {
                    text_0: { type: 'string', default: '123' }
                },
                edit: ({ attributes, setAttributes }) => {
                    return (
                        <>
                            
                            <li><RichText value={attributes.text_0} onChange={(value) => setAttributes({ text_0: value })} /></li>
                        </>
                    );
                },
                save: ({ attributes }) => {
                    return (
                        <>
                            <li><RichText.Content value={attributes.text_0} /></li>
                        </>
                    );
                }
            });
        
            registerBlockType('block-master/test-1-1', {
                title: 'Test-1-1',
                category: 'block-master',
                parent: ['block-master/test-1'],
                attributes: {
                    text_0: { type: 'string', default: 'yagear' },
text_1: { type: 'string', default: 'asdjlkajdlkjslf kfjslkmflskf slfks ekcs' },
text_2: { type: 'string', default: 'dlkjslf kfjslkmflskf slfks ekcs' },
imgSrc_0: { type: 'string', default: '/sdasd/sd/ad/' },
imgAlt_0: { type: 'string', default: 'rasm-uchun-text' }
                },
                edit: ({ attributes, setAttributes }) => {
                    return (
                        <>
                            <InspectorControls><PanelBody title='Image & URL Settings'><MediaUploadCheck><MediaUpload onSelect={(media) => setAttributes({ imgSrc_0: media.url })} allowedTypes={['image']} render={({ open }) => (<Button onClick={open} isPrimary>Choose Image</Button>)} /></MediaUploadCheck></PanelBody></InspectorControls>
                            <div class="card">
        <h4><RichText value={attributes.text_0} onChange={(value) => setAttributes({ text_0: value })} /></h4>
        <img src={attributes.imgSrc_0} alt={attributes.imgAlt_0} />
        <div class="descriptions">
            <RichText value={attributes.text_1} onChange={(value) => setAttributes({ text_1: value })} />
        </div><ul>
        <InnerBlocks
    allowedBlocks={['block-master/test-1-1-0']}
    template={[
        ['block-master/test-1-1-0', {}],
    ]}/>
        </ul>
    </div>
    <div class="ds">
        <span><RichText value={attributes.text_2} onChange={(value) => setAttributes({ text_2: value })} /></span>
    </div>
                        </>
                    );
                },
                save: ({ attributes }) => {
                    return (
                        <>
                            <div class="card">
        <h4><RichText.Content value={attributes.text_0} /></h4>
        <img src={attributes.imgSrc_0} alt={attributes.imgAlt_0} />
        <div class="descriptions">
            <RichText.Content value={attributes.text_1} />
        </div><ul>
        <InnerBlocks.Content />
        </ul>
    </div>
    <div class="ds">
        <span><RichText.Content value={attributes.text_2} /></span>
    </div>
                        </>
                    );
                }
            });
        
            registerBlockType('block-master/test-1-0-0', {
                title: 'Test-1-0-0',
                category: 'block-master',
                parent: ['block-master/test-1-0'],
                attributes: {
                    text_0: { type: 'string', default: '123' }
                },
                edit: ({ attributes, setAttributes }) => {
                    return (
                        <>
                            
                            <li><RichText value={attributes.text_0} onChange={(value) => setAttributes({ text_0: value })} /></li>
                        </>
                    );
                },
                save: ({ attributes }) => {
                    return (
                        <>
                            <li><RichText.Content value={attributes.text_0} /></li>
                        </>
                    );
                }
            });
        
            registerBlockType('block-master/test-1-0', {
                title: 'Test-1-0',
                category: 'block-master',
                parent: ['block-master/test-1'],
                attributes: {
                    text_0: { type: 'string', default: 'yagear' },
text_1: { type: 'string', default: 'asdjlkajdlkjslf kfjslkmflskf slfks ekcs' },
text_2: { type: 'string', default: 'dlkjslf kfjslkmflskf slfks ekcs' },
imgSrc_0: { type: 'string', default: '/sdasd/sd/ad/' },
imgAlt_0: { type: 'string', default: 'rasm-uchun-text' }
                },
                edit: ({ attributes, setAttributes }) => {
                    return (
                        <>
                            <InspectorControls><PanelBody title='Image & URL Settings'><MediaUploadCheck><MediaUpload onSelect={(media) => setAttributes({ imgSrc_0: media.url })} allowedTypes={['image']} render={({ open }) => (<Button onClick={open} isPrimary>Choose Image</Button>)} /></MediaUploadCheck></PanelBody></InspectorControls>
                            <div class="card">
        <h4><RichText value={attributes.text_0} onChange={(value) => setAttributes({ text_0: value })} /></h4>
        <img src={attributes.imgSrc_0} alt={attributes.imgAlt_0} />
        <div class="descriptions">
            <RichText value={attributes.text_1} onChange={(value) => setAttributes({ text_1: value })} />
        </div><ul>
        <InnerBlocks
    allowedBlocks={['block-master/test-1-0-0']}
    template={[
        ['block-master/test-1-0-0', {}],
    ]}/>
        </ul>
    </div>
    <div class="ds">
        <span><RichText value={attributes.text_2} onChange={(value) => setAttributes({ text_2: value })} /></span>
    </div>
                        </>
                    );
                },
                save: ({ attributes }) => {
                    return (
                        <>
                            <div class="card">
        <h4><RichText.Content value={attributes.text_0} /></h4>
        <img src={attributes.imgSrc_0} alt={attributes.imgAlt_0} />
        <div class="descriptions">
            <RichText.Content value={attributes.text_1} />
        </div><ul>
        <InnerBlocks.Content />
        </ul>
    </div>
    <div class="ds">
        <span><RichText.Content value={attributes.text_2} /></span>
    </div>
                        </>
                    );
                }
            });
        
            registerBlockType('block-master/test-1', {
                title: 'Test-1',
                category: 'block-master',
                
                attributes: {
                    text_0: { type: 'string', default: 'hayvonlar' },
url_0: { type: 'string', default: 'test.php' }
                },
                edit: ({ attributes, setAttributes }) => {
                    return (
                        <>
                            <InspectorControls><PanelBody title='Image & URL Settings'><TextControl label='URL' value={attributes.url_0} onChange={(value) => setAttributes({ url_0: value })} /></PanelBody></InspectorControls>
                            <div class="div">
    <h1><RichText value={attributes.text_0} onChange={(value) => setAttributes({ text_0: value })} /></h1>
    <a href={attributes.url_0} > some tag </a>
    <InnerBlocks
    allowedBlocks={['block-master/test-1-0']}
    template={[
        ['block-master/test-1-0', {}],
    ]}/>
    <InnerBlocks
    allowedBlocks={['block-master/test-1-1']}
    template={[
        ['block-master/test-1-1', {}],
    ]}/>
</div>
                        </>
                    );
                },
                save: ({ attributes }) => {
                    return (
                        <>
                            <div class="div">
    <h1><RichText.Content value={attributes.text_0} /></h1>
    <a href={attributes.url_0} > some tag </a>
    <InnerBlocks.Content />
    <InnerBlocks.Content />
</div>
                        </>
                    );
                }
            });
        