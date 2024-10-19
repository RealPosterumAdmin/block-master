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
        af373d202_text_0: { type: 'string', default: 'Студия графического&nbsp;дизайна и&nbsp;веб&nbsp;-&nbsp;разработки' }
    },
    edit: ({ attributes, setAttributes }) => {
        return (
            <>

                <section className="page__services mlrp-b0101">
                    <div className="services">
                        <div className="services__body">
                            <div className="services__item el-item-1">
                                <div className="services__column">
                                    <div className="services__title">
                                        <h1 className="services__text t-h1">
                                            <RichText value={attributes.af373d202_text_0} onChange={(value) => setAttributes({ af373d202_text_0: value })} />
                                        </h1>
                                        <div className="services__teammates">
                                            <InnerBlocks allowedBlocks={['block-master/test-block-3']} template={[["block-master/test-block-1",[]],["block-master/not-using-",[]],["block-master/test-block-2",[]],["block-master/not-using-",[]],["block-master/test-block-3",[]]]} templateLock="all" />
                                        </div>
                                    </div>
                </section>
            </>
    );
    },
    save: ({ attributes }) => {
        return (
            <>
                <pre><section className="page__services mlrp-b0101">
                    <div className="services">
                        <div className="services__body">
                            <div className="services__item el-item-1">
                                <div className="services__column">
                                    <div className="services__title">
                                        <h1 className="services__text t-h1"></pre>
                                            <RichText.Content value={attributes.af373d202_text_0} />
                                        <pre></h1>
                                        <div className="services__teammates"></pre>
                                            <InnerBlocks.Content />
                                        <pre></div>
                                    </div>
                </section></pre>
            </>
    );
    }
    });
    registerBlockType('block-master/test-block-1-central', { title: 'Test-block-1-central', category: 'block-master', parent: ['block-master/test-block'], attributes: {}, edit: ({ attributes, setAttributes }) => { return ( <InnerBlocks allowedBlocks={['block-master/test-block-1']} template={[['block-master/test-block-1', {}]]} /> ); }, save: () => { return ( <InnerBlocks.Content /> ); } });
    registerBlockType('block-master/test-block-1', {
        title: 'Test-block-1',
            category: 'block-master',
            parent: ['block-master/test-block-1-central'],
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
    registerBlockType('block-master/test-block-2-central', { title: 'Test-block-2-central', category: 'block-master', parent: ['block-master/test-block'], attributes: {}, edit: ({ attributes, setAttributes }) => { return ( <InnerBlocks allowedBlocks={['block-master/test-block-2']} template={[['block-master/test-block-2', {}]]} /> ); }, save: () => { return ( <InnerBlocks.Content /> ); } });
    registerBlockType('block-master/test-block-2', {
        title: 'Test-block-2',
            category: 'block-master',
            parent: ['block-master/test-block-2-central'],
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
    registerBlockType('block-master/test-block-3-central', { title: 'Test-block-3-central', category: 'block-master', parent: ['block-master/test-block'], attributes: {}, edit: ({ attributes, setAttributes }) => { return ( <InnerBlocks allowedBlocks={['block-master/test-block-3']} template={[['block-master/test-block-3', {}]]} /> ); }, save: () => { return ( <InnerBlocks.Content /> ); } });
    registerBlockType('block-master/test-block-3', {
        title: 'Test-block-3',
            category: 'block-master',
            parent: ['block-master/test-block-3-central'],
            attributes: {
            a7da72eaa_text_0: { type: 'string', default: 'Веб-дизайн' },
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
                                <InnerBlocks allowedBlocks={['block-master/test-block-3-1']} template={[["block-master/test-block-3-1",[]]]} templateLock="all" />
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
                                <InnerBlocks.Content />
                            </ul>
                        </div>
                    </a></div>
                </>
            );
        }
    });
    registerBlockType('block-master/test-block-3-1-central', { title: 'Test-block-3-1-central', category: 'block-master', parent: ['block-master/test-block-3'], attributes: {}, edit: ({ attributes, setAttributes }) => { return ( <InnerBlocks allowedBlocks={['block-master/test-block-3-1']} template={[['block-master/test-block-3-1', {}]]} /> ); }, save: () => { return ( <InnerBlocks.Content /> ); } });
    registerBlockType('block-master/test-block-3-1', {
        title: 'Test-block-3-1',
            category: 'block-master',
            parent: ['block-master/test-block-3-1-central'],
            attributes: {
            a194c4bd9_text_0: { type: 'string', default: 'Дизайн сайта' }
        },
        edit: ({ attributes, setAttributes }) => {
            return (
                <>

                    <li className="card__item"><RichText value={attributes.a194c4bd9_text_0} onChange={(value) => setAttributes({ a194c4bd9_text_0: value })} /></li>
                </>
            );
        },
            save: ({ attributes }) => {
            return (
                <>
                    <li className="card__item"><RichText.Content value={attributes.a194c4bd9_text_0} /></li>
                </>
            );
        }
    });
