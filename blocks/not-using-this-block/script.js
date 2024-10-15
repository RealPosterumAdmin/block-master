D:\ProgramFiles\OpenServer\modules\php\PHP_8.1\php.exe D:\ProgramFiles\OpenServer\domains\WpContructor\wp-content\plugins\block-master\includes\Classes\CodeControl.php
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
registerBlockType('block-master/test-block', {
    title: 'Test-block',
    category: 'block-master',

    attributes: {

    },
    edit: ({ attributes, setAttributes }) => {
        return (
            <>

                <InnerBlocks
                    allowedBlocks={['block-master/test-block-central']}
                    template={[['block-master/test-block-surrounding-0', {}], ['block-master/test-block-1', {}], ['block-master/test-block-surrounding-1', {}], ['block-master/test-block-2', {}], ['block-master/test-block-surrounding-2', {}], ['block-master/test-block-3', {}], ['block-master/test-block-surrounding-end', {}]]}
                />
            </>
        );
    },
    save: ({ attributes }) => {
        return (
            <>
                <InnerBlocks.Content />
            </>
        );
    }
});

registerBlockType('block-master/test-block-surrounding-0', {
    title: 'Test-block-surrounding-0',
    category: 'block-master',
    parent: ['block-master/test-block'],
    attributes: {
        ac70da678_text_0: { type: 'string', default: 'Студия графического&nbsp;дизайна и&nbsp;веб&nbsp;-&nbsp;разработки' }
    },
    edit: ({ attributes, setAttributes }) => {
        return (
            <>

                <section className="page__services mlrp-b0101">
                    <div className="services">
                        <div className="services__body">
                            <div className="services__item el-item-1">
                                <div className="services__column">
                                    <div className="services__title"><h1 className="services__text t-h1"><RichText value={attributes.ac70da678_text_0} onChange={(value) => setAttributes({ ac70da678_text_0: value })} /></h1>
                                        <div className="services__teammates">

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
                                            <div className="services__title"><h1 className="services__text t-h1"><RichText.Content value={attributes.ac70da678_text_0} /></h1>
                                <div className="services__teammates">

                                </>
                                );
                                }
                                });

                                registerBlockType('block-master/test-block-1', {
                                title: 'Test-block-1',
                                category: 'block-master',
                                parent: ['block-master/test-block'],
                                attributes: {
                                a773a91b4_imgSrc_0: { type: 'string', default: 'фото' },
                                a773a91b4_imgAlt_0: { type: 'string', default: './img/teammates/team-1.png' }
                            },
                                edit: ({ attributes, setAttributes }) => {
                                return (
                                <>
                                <InspectorControls><PanelBody title='Image & URL Settings'><MediaUploadCheck><MediaUpload onSelect={(media) => setAttributes({ a773a91b4_imgSrc_0: media.url })} allowedTypes={['image']} render={({ open }) => (<Button onClick={open} isPrimary>Choose Image</Button>)} /></MediaUploadCheck></PanelBody></InspectorControls>
                <div className="services__image">
                    <picture>
                        <img alt={attributes.a773a91b4_imgAlt_0} src={attributes.a773a91b4_imgSrc_0}/>
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
                            <img src={attributes.a773a91b4_imgAlt_0} alt={attributes.a773a91b4_imgSrc_0} />
                        </picture>
                    </div>
                </>
            );
        }
    });

    registerBlockType('block-master/test-block-surrounding-1', {
        title: 'Test-block-surrounding-1',
            category: 'block-master',
            parent: ['block-master/test-block'],
            attributes: {
            a0acbdc97_text_0: { type: 'string', default: 'Графический дизайн' },
            a0acbdc97_url_0: { type: 'string', default: '#' },
            a0acbdc97_url_1: { type: 'string', default: '#' },
            a0acbdc97_url_2: { type: 'string', default: '#' }
        },
        edit: ({ attributes, setAttributes }) => {
            return (
                <>
                <InspectorControls><PanelBody title='Image & URL Settings'><TextControl label='URL' value={attributes.a0acbdc97_url_0} onChange={(value) => setAttributes({ a0acbdc97_url_0: value })} /><TextControl label='URL' value={attributes.a0acbdc97_url_1} onChange={(value) => setAttributes({ a0acbdc97_url_1: value })} /><TextControl label='URL' value={attributes.a0acbdc97_url_2} onChange={(value) => setAttributes({ a0acbdc97_url_2: value })} /></PanelBody></InspectorControls>

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
                        <div className="card__icons"><a className="card__icon icon" href={attributes.a0acbdc97_url_0} target="_blank"><i
                            className="icon-telegram-fly _icon"></i></a><a className="card__icon icon" href={attributes.a0acbdc97_url_1}
                                                                           target="_blank"> <i
                            className="icon-whatsapp _icon"></i></a></div>
                    </div>
                </div>
                <a className="card" href={attributes.a0acbdc97_url_2}>
                    <div className="card__header"><h3><RichText value={attributes.a0acbdc97_text_0} onChange={(value) => setAttributes({ a0acbdc97_text_0: value })} /></h3>
                        <div className="card__icon icon"><i className="icon-arrow-up _icon"></i></div>
                    </div>
                    <div className="card__content">
                        <ul className="card__list">

                        </>
                        );
                        },
                        save: ({ attributes }) => {
                        return (
                        <>

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
                        <div className="card__icons"><a className="card__icon icon" href={attributes.a0acbdc97_url_0} target="_blank"><i
                        className="icon-telegram-fly _icon"></i></a><a className="card__icon icon" href={attributes.a0acbdc97_url_1}
                                                                       target="_blank"> <i
                className="icon-whatsapp _icon"></i></a></div>
        </div>
        </div>
            <a className="card" href={attributes.a0acbdc97_url_2}>
                <div className="card__header"><h3><RichText.Content value={attributes.a0acbdc97_text_0} /></h3>
                    <div className="card__icon icon"><i className="icon-arrow-up _icon"></i></div>
                </div>
                <div className="card__content">
                    <ul className="card__list">

                    </>
                    );
                    }
                    });

                    registerBlockType('block-master/test-block-2', {
                    title: 'Test-block-2',
                    category: 'block-master',
                    parent: ['block-master/test-block'],
                    attributes: {
                    a8097bcc2_text_0: { type: 'string', default: 'Логотип' }
                },
                    edit: ({ attributes, setAttributes }) => {
                    return (
                    <>

                    <li className="card__item"><RichText value={attributes.a8097bcc2_text_0} onChange={(value) => setAttributes({ a8097bcc2_text_0: value })} /></li>
        </>
        );
        },
            save: ({ attributes }) => {
                return (
                    <>
                        <li className="card__item"><RichText.Content value={attributes.a8097bcc2_text_0} /></li>
                    </>
                );
            }
        });

        registerBlockType('block-master/test-block-surrounding-2', {
            title: 'Test-block-surrounding-2',
                category: 'block-master',
                parent: ['block-master/test-block'],
                attributes: {

            },
            edit: ({ attributes, setAttributes }) => {
                return (
                    <>


                    </ul>
            </div>
            </a></div>

            </>
            );
            },
                save: ({ attributes }) => {
                return (
                    <>

                    </ul>
            </div>
            </a></div>

            </>
            );
            }
        });

        registerBlockType('block-master/test-block-3', {
            title: 'Test-block-3',
                category: 'block-master',
                parent: ['block-master/test-block'],
                attributes: {
                a7da72eaa_text_0: { type: 'string', default: 'Веб-дизайн' },
                a7da72eaa_text_1: { type: 'string', default: 'Дизайн сайта' },
                a7da72eaa_url_0: { type: 'string', default: '#' }
            },
            edit: ({ attributes, setAttributes }) => {
                return (
                    <>
                        <InspectorControls><PanelBody title='Image & URL Settings'><TextControl label='URL' value={attributes.a7da72eaa_url_0} onChange={(value) => setAttributes({ a7da72eaa_url_0: value })} /></PanelBody></InspectorControls>
                        <div className="services__item el-item"><a className="card" href={attributes.a7da72eaa_url_0}>
                            <div className="card__header"><h3><RichText value={attributes.a7da72eaa_text_0} onChange={(value) => setAttributes({ a7da72eaa_text_0: value })} /></h3>
                                <div className="card__icon icon"><i className="icon-arrow-up _icon"></i></div>
                            </div>
                            <div className="card__content">
                                <ul className="card__list">
                                    {{InnerBlock}}
                                    <li className="card__item"><RichText value={attributes.a7da72eaa_text_1} onChange={(value) => setAttributes({ a7da72eaa_text_1: value })} /></li>
                                    {{/InnerBlock}}
                                        </ul>
                                        </div>
                                        </a></div>
                                        </>
                                        );
                                    },
                                        save: ({ attributes }) => {
                                        return (
                                        <>
                                        <div className="services__item el-item"><a className="card" href={attributes.a7da72eaa_url_0}>
                                    <div className="card__header"><h3><RichText.Content value={attributes.a7da72eaa_text_0} /></h3>
                                        <div className="card__icon icon"><i className="icon-arrow-up _icon"></i></div>
                                    </div>
                                    <div className="card__content">
                                        <ul className="card__list">
                                            {{InnerBlock}}
                                            <li className="card__item"><RichText.Content value={attributes.a7da72eaa_text_1} /></li>
                                            {{/InnerBlock}}
                                                </ul>
                                                </div>
                                                </a></div>
                                                </>
                                                );
                                            }
                                            });

                                            registerBlockType('block-master/test-block-surrounding-end', {
                                            title: 'Test-block-surrounding-end',
                                            category: 'block-master',
                                            parent: ['block-master/test-block'],
                                            attributes: {

                                        },
                                            edit: ({ attributes, setAttributes }) => {
                                            return (
                                            <>


                                            </div>
                                            </div>
                                            </section>
                                            </>
                                            );
                                        },
                                            save: ({ attributes }) => {
                                            return (
                                            <>

                                            </div>
                                            </div>
                                            </section>
                                            </>
                                            );
                                        }
                                        });

                                            Process finished with exit code 0
