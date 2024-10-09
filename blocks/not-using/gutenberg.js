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
            registerBlockType('block-master/not-using', {
                title: 'Not-using',
                category: 'block-master',
                
                attributes: {
                    aa216cdf5_text_0: { type: 'string', default: 'Веб-дизайн' },
aa216cdf5_url_0: { type: 'string', default: '#' }
                },
                edit: ({ attributes, setAttributes }) => {
                    return (
                        <>
                            <InspectorControls><PanelBody title='Image & URL Settings'><TextControl label='URL' value={attributes.aa216cdf5_url_0} onChange={(value) => setAttributes({ aa216cdf5_url_0: value })} /></PanelBody></InspectorControls>
                            <div className="services__item el-item"><a className="card" href={attributes.aa216cdf5_url_0}>
                            <div className="card__header"><h3><RichText value={attributes.aa216cdf5_text_0} onChange={(value) => setAttributes({ aa216cdf5_text_0: value })} /></h3>
                                <div className="card__icon icon"><i className="icon-arrow-up _icon"></i></div>
                            </div>
                            <div className="card__content">
                                <ul className="card__list">
                                    <InnerBlocks
    allowedBlocks={['block-master/not-using-1-central']}
    template={[['block-master/not-using-1-central', {}]]}
    templateLock="all"
/>
                                </ul>
                            </div>
                        </a></div>
                        </>
                    );
                },
                save: ({ attributes }) => {
                    return (
                        <>
                            <div className="services__item el-item"><a className="card" href={attributes.aa216cdf5_url_0}>
                            <div className="card__header"><h3><RichText.Content value={attributes.aa216cdf5_text_0} /></h3>
                                <div className="card__icon icon"><i className="icon-arrow-up _icon"></i></div>
                            </div>
                            <div className="card__content">
                                <ul className="card__list">
                                    <InnerBlocks.Content />
                                </ul>
                            </div>
                        </a></div>
                        </>
                    );
                }
            });
        
registerBlockType('block-master/not-using-1-central', {
    title: 'Not-using-1-central',
    category: 'block-master',
    parent: ['block-master/not-using'],
    attributes: {},
    edit: ({ attributes, setAttributes }) => {
        return (
               <InnerBlocks
                   allowedBlocks={['block-master/not-using-1']}
                   template={[['block-master/not-using-1', {}],]}
               />
        );
    },
    save: () => {
        return (
                <InnerBlocks.Content />
        );
    }
});
            registerBlockType('block-master/not-using-1', {
                title: 'Not-using-1',
                category: 'block-master',
                parent: ['block-master/not-using-1-central'],
                attributes: {
                    ab56be0f1_text_0: { type: 'string', default: 'Дизайн сайта' }
                },
                edit: ({ attributes, setAttributes }) => {
                    return (
                        <>
                            
                            <li className="card__item"><RichText value={attributes.ab56be0f1_text_0} onChange={(value) => setAttributes({ ab56be0f1_text_0: value })} /></li>
                        </>
                    );
                },
                save: ({ attributes }) => {
                    return (
                        <>
                            <li className="card__item"><RichText.Content value={attributes.ab56be0f1_text_0} /></li>
                        </>
                    );
                }
            });
        