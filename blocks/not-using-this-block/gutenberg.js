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
            registerBlockType('block-master/not-using-this-block', {
                title: 'Not-using-this-block',
                category: 'block-master',
                
                attributes: {
                    abcd770f8_text_0: { type: 'string', default: 'Студия графического&nbsp;дизайна и&nbsp;веб&nbsp;-&nbsp;разработки' },
abcd770f8_text_1: { type: 'string', default: 'Графический дизайн' },
abcd770f8_url_0: { type: 'string', default: '#' },
abcd770f8_url_1: { type: 'string', default: '#' },
abcd770f8_url_2: { type: 'string', default: '#' }
                },
                edit: ({ attributes, setAttributes }) => {
                    return (
                        <>
                            <InspectorControls><PanelBody title='Image & URL Settings'><TextControl label='URL' value={attributes.abcd770f8_url_0} onChange={(value) => setAttributes({ abcd770f8_url_0: value })} /><TextControl label='URL' value={attributes.abcd770f8_url_1} onChange={(value) => setAttributes({ abcd770f8_url_1: value })} /><TextControl label='URL' value={attributes.abcd770f8_url_2} onChange={(value) => setAttributes({ abcd770f8_url_2: value })} /></PanelBody></InspectorControls>
                            <section className="page__services mlrp-b0101">
                <div className="services">
                    <div className="services__body">
                        <div className="services__item el-item-1">
                            <div className="services__column">
                                <div className="services__title"><h1 className="services__text t-h1"><RichText value={attributes.abcd770f8_text_0} onChange={(value) => setAttributes({ abcd770f8_text_0: value })} /></h1>
                                    <div className="services__teammates">
                                        <InnerBlocks
    allowedBlocks={['block-master/not-using-this-block-1-central']}
    template={[['block-master/not-using-this-block-1-central', {}]]}
    templateLock="all"
/>
                                    </div>
                                    <button className="services__button button" type="submit"><span>Оставить заявку</span>
                                        <div className="services__icon icon"><i className="icon-arrow-right _icon"></i></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="services__item el-item">
                            <div className="card">
                                <div className="card__header"><h3>Мы на связи</h3>
                                    <div className="card__icons"><a className="card__icon icon" href={attributes.abcd770f8_url_0} target="_blank"><i
                                            className="icon-telegram-fly _icon"></i></a><a className="card__icon icon" href={attributes.abcd770f8_url_1}
                                                                                       target="_blank"> <i
                                            className="icon-whatsapp _icon"></i></a></div>
                                </div>
                            </div>
                            <a className="card" href={attributes.abcd770f8_url_2}>
                                <div className="card__header"><h3><RichText value={attributes.abcd770f8_text_1} onChange={(value) => setAttributes({ abcd770f8_text_1: value })} /></h3>
                                    <div className="card__icon icon"><i className="icon-arrow-up _icon"></i></div>
                                </div>
                                <div className="card__content">
                                    <ul className="card__list">
                                        <InnerBlocks
    allowedBlocks={['block-master/not-using-this-block-2-central']}
    template={[['block-master/not-using-this-block-2-central', {}]]}
    templateLock="all"
/>
                                    </ul>
                                </div>
                            </a></div>
                        <InnerBlocks
    allowedBlocks={['block-master/not-using-this-block-3-central']}
    template={[['block-master/not-using-this-block-3-central', {}]]}
    templateLock="all"
/>
                    </div>
                </div>
            </section>
                        </>
                    );
                },
                save: ({ attributes }) => {
                    return (
                        <>
                            <section className="page__services mlrp-b0101">
                <div className="services">
                    <div className="services__body">
                        <div className="services__item el-item-1">
                            <div className="services__column">
                                <div className="services__title"><h1 className="services__text t-h1"><RichText.Content value={attributes.abcd770f8_text_0} /></h1>
                                    <div className="services__teammates">
                                        <InnerBlocks.Content />
                                    </div>
                                    <button className="services__button button" type="submit"><span>Оставить заявку</span>
                                        <div className="services__icon icon"><i className="icon-arrow-right _icon"></i></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="services__item el-item">
                            <div className="card">
                                <div className="card__header"><h3>Мы на связи</h3>
                                    <div className="card__icons"><a className="card__icon icon" href={attributes.abcd770f8_url_0} target="_blank"><i
                                            className="icon-telegram-fly _icon"></i></a><a className="card__icon icon" href={attributes.abcd770f8_url_1}
                                                                                       target="_blank"> <i
                                            className="icon-whatsapp _icon"></i></a></div>
                                </div>
                            </div>
                            <a className="card" href={attributes.abcd770f8_url_2}>
                                <div className="card__header"><h3><RichText.Content value={attributes.abcd770f8_text_1} /></h3>
                                    <div className="card__icon icon"><i className="icon-arrow-up _icon"></i></div>
                                </div>
                                <div className="card__content">
                                    <ul className="card__list">
                                        <InnerBlocks.Content />
                                    </ul>
                                </div>
                            </a></div>
                        <InnerBlocks.Content />
                    </div>
                </div>
            </section>
                        </>
                    );
                }
            });
        
registerBlockType('block-master/not-using-this-block-3-central', {
    title: 'Not-using-this-block-3-central',
    category: 'block-master',
    parent: ['block-master/not-using-this-block'],
    attributes: {},
    edit: ({ attributes, setAttributes }) => {
        return (
               <InnerBlocks
                   allowedBlocks={['block-master/not-using-this-block-3']}
                   template={[['block-master/not-using-this-block-3', {}],]}
               />
        );
    },
    save: () => {
        return (
                <InnerBlocks.Content />
        );
    }
});
            registerBlockType('block-master/not-using-this-block-3', {
                title: 'Not-using-this-block-3',
                category: 'block-master',
                parent: ['block-master/not-using-this-block-3-central'],
                attributes: {
                    a8e20bcc1_text_0: { type: 'string', default: 'Веб-дизайн' },
a8e20bcc1_url_0: { type: 'string', default: '#' }
                },
                edit: ({ attributes, setAttributes }) => {
                    return (
                        <>
                            <InspectorControls><PanelBody title='Image & URL Settings'><TextControl label='URL' value={attributes.a8e20bcc1_url_0} onChange={(value) => setAttributes({ a8e20bcc1_url_0: value })} /></PanelBody></InspectorControls>
                            <div className="services__item el-item"><a className="card" href={attributes.a8e20bcc1_url_0}>
                            <div className="card__header"><h3><RichText value={attributes.a8e20bcc1_text_0} onChange={(value) => setAttributes({ a8e20bcc1_text_0: value })} /></h3>
                                <div className="card__icon icon"><i className="icon-arrow-up _icon"></i></div>
                            </div>
                            <div className="card__content">
                                <ul className="card__list">
                                    <InnerBlocks
    allowedBlocks={['block-master/not-using-this-block-3-1-central']}
    template={[['block-master/not-using-this-block-3-1-central', {}]]}
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
                            <div className="services__item el-item"><a className="card" href={attributes.a8e20bcc1_url_0}>
                            <div className="card__header"><h3><RichText.Content value={attributes.a8e20bcc1_text_0} /></h3>
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
        
registerBlockType('block-master/not-using-this-block-3-1-central', {
    title: 'Not-using-this-block-3-1-central',
    category: 'block-master',
    parent: ['block-master/not-using-this-block-3'],
    attributes: {},
    edit: ({ attributes, setAttributes }) => {
        return (
               <InnerBlocks
                   allowedBlocks={['block-master/not-using-this-block-3-1']}
                   template={[['block-master/not-using-this-block-3-1', {}],]}
               />
        );
    },
    save: () => {
        return (
                <InnerBlocks.Content />
        );
    }
});
            registerBlockType('block-master/not-using-this-block-3-1', {
                title: 'Not-using-this-block-3-1',
                category: 'block-master',
                parent: ['block-master/not-using-this-block-3-1-central'],
                attributes: {
                    a1c23a143_text_0: { type: 'string', default: 'Дизайн сайта' }
                },
                edit: ({ attributes, setAttributes }) => {
                    return (
                        <>
                            
                            <li className="card__item"><RichText value={attributes.a1c23a143_text_0} onChange={(value) => setAttributes({ a1c23a143_text_0: value })} /></li>
                        </>
                    );
                },
                save: ({ attributes }) => {
                    return (
                        <>
                            <li className="card__item"><RichText.Content value={attributes.a1c23a143_text_0} /></li>
                        </>
                    );
                }
            });
        
registerBlockType('block-master/not-using-this-block-2-central', {
    title: 'Not-using-this-block-2-central',
    category: 'block-master',
    parent: ['block-master/not-using-this-block'],
    attributes: {},
    edit: ({ attributes, setAttributes }) => {
        return (
               <InnerBlocks
                   allowedBlocks={['block-master/not-using-this-block-2']}
                   template={[['block-master/not-using-this-block-2', {}],]}
               />
        );
    },
    save: () => {
        return (
                <InnerBlocks.Content />
        );
    }
});
            registerBlockType('block-master/not-using-this-block-2', {
                title: 'Not-using-this-block-2',
                category: 'block-master',
                parent: ['block-master/not-using-this-block-2-central'],
                attributes: {
                    afe457ed3_text_0: { type: 'string', default: 'Логотип' }
                },
                edit: ({ attributes, setAttributes }) => {
                    return (
                        <>
                            
                            <li className="card__item"><RichText value={attributes.afe457ed3_text_0} onChange={(value) => setAttributes({ afe457ed3_text_0: value })} /></li>
                        </>
                    );
                },
                save: ({ attributes }) => {
                    return (
                        <>
                            <li className="card__item"><RichText.Content value={attributes.afe457ed3_text_0} /></li>
                        </>
                    );
                }
            });
        
registerBlockType('block-master/not-using-this-block-1-central', {
    title: 'Not-using-this-block-1-central',
    category: 'block-master',
    parent: ['block-master/not-using-this-block'],
    attributes: {},
    edit: ({ attributes, setAttributes }) => {
        return (
               <InnerBlocks
                   allowedBlocks={['block-master/not-using-this-block-1']}
                   template={[['block-master/not-using-this-block-1', {}],]}
               />
        );
    },
    save: () => {
        return (
                <InnerBlocks.Content />
        );
    }
});
            registerBlockType('block-master/not-using-this-block-1', {
                title: 'Not-using-this-block-1',
                category: 'block-master',
                parent: ['block-master/not-using-this-block-1-central'],
                attributes: {
                    a63c4e2fc_imgSrc_0: { type: 'string', default: 'фото' },
a63c4e2fc_imgAlt_0: { type: 'string', default: './img/teammates/team-1.png' }
                },
                edit: ({ attributes, setAttributes }) => {
                    return (
                        <>
                            <InspectorControls><PanelBody title='Image & URL Settings'><MediaUploadCheck><MediaUpload onSelect={(media) => setAttributes({ a63c4e2fc_imgSrc_0: media.url })} allowedTypes={['image']} render={({ open }) => (<Button onClick={open} isPrimary>Choose Image</Button>)} /></MediaUploadCheck></PanelBody></InspectorControls>
                            <div className="services__image">
                                                <picture>
                                                    <img alt={attributes.a63c4e2fc_imgAlt_0} src={attributes.a63c4e2fc_imgSrc_0}/>
                                                </picture>
                                            </div>
                        </>
                    );
                },
                save: ({ attributes }) => {
                    return (
                        <>
                            <div className="services__image">
                                                <picture>
                                                    <img src={attributes.a63c4e2fc_imgAlt_0} alt={attributes.a63c4e2fc_imgSrc_0} />
                                                </picture>
                                            </div>
                        </>
                    );
                }
            });
        