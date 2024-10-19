const {
  registerBlockType
} = wp.blocks;
const {
  useBlockProps,
  RichText,
  MediaUpload,
  MediaUploadCheck,
  InspectorControls,
  InnerBlocks
} = wp.blockEditor;
const {
  PanelBody,
  Button,
  SelectControl,
  TextControl
} = wp.components;
const {
  useState,
  useEffect,
  RawHTML
} = wp.element;
const apiFetch = wp.apiFetch;
const fetchOptions = async () => {
  try {
    const posts = await apiFetch({
      path: '/wp/v2/posts?per_page=100'
    });
    const categories = await apiFetch({
      path: '/wp/v2/categories?per_page=100'
    });
    const postOptions = posts.map(post => ({
      label: `Post: ${post.title.rendered}`,
      value: post.link
    }));
    const categoryOptions = categories.map(category => ({
      label: `Category: ${category.name}`,
      value: category.link
    }));
    return [...postOptions, ...categoryOptions];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
registerBlockType('block-master/new-block1-1-central', {
  title: 'New-block1-1-central',
  category: 'block-master',
  parent: ['block-master/new-block1'],
  attributes: {},
  edit: ({
    attributes,
    setAttributes
  }) => {
    return React.createElement(InnerBlocks, {
      allowedBlocks: ['block-master/new-block1-1'],
      template: [['block-master/new-block1-1', {}]]
    });
  },
  save: () => {
    return React.createElement(InnerBlocks.Content, null);
  }
});
registerBlockType('block-master/new-block1-1', {
  title: 'New-block1-1',
  category: 'block-master',
  parent: ['block-master/new-block1-1-central'],
  attributes: {
    a16758a40_imgSrc_0: {
      type: 'string',
      default: 'фото'
    },
    a16758a40_imgAlt_0: {
      type: 'string',
      default: './img/teammates/team-1.png'
    }
  },
  edit: ({
    attributes,
    setAttributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement(InspectorControls, null, React.createElement(PanelBody, {
      title: "Image & URL Settings"
    }, React.createElement(MediaUploadCheck, null, React.createElement(MediaUpload, {
      onSelect: media => setAttributes({
        a16758a40_imgSrc_0: media.url
      }),
      allowedTypes: ['image'],
      render: ({
        open
      }) => React.createElement(Button, {
        onClick: open,
        isPrimary: true
      }, "Choose Image")
    })))), React.createElement(RawHTML, null, '<div class="services__image"> <picture> '), React.createElement("img", {
      alt: attributes.a16758a40_imgAlt_0,
      src: attributes.a16758a40_imgSrc_0
    }), React.createElement(RawHTML, null, ' </picture> </div>'));
  },
  save: ({
    attributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement(RawHTML, null, '<div class="services__image"> <picture> '), React.createElement("img", {
      src: attributes.a16758a40_imgAlt_0,
      alt: attributes.a16758a40_imgSrc_0
    }), React.createElement(RawHTML, null, ' </picture> </div>'));
  }
});
registerBlockType('block-master/between-new-block1', {
  title: 'Between-new-block1',
  category: 'block-master',
  parent: ['block-master/new-block1'],
  attributes: {
    a045169f8_text_0: {
      type: 'string',
      default: 'Графический дизайн'
    },
    a045169f8_url_0: {
      type: 'string',
      default: '#'
    },
    a045169f8_url_1: {
      type: 'string',
      default: '#'
    },
    a045169f8_url_2: {
      type: 'string',
      default: '#'
    }
  },
  edit: ({
    attributes,
    setAttributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement(InspectorControls, null, React.createElement(PanelBody, {
      title: "Image & URL Settings"
    }, React.createElement(TextControl, {
      label: "URL",
      value: attributes.a045169f8_url_0,
      onChange: value => setAttributes({
        a045169f8_url_0: value
      })
    }), React.createElement(TextControl, {
      label: "URL",
      value: attributes.a045169f8_url_1,
      onChange: value => setAttributes({
        a045169f8_url_1: value
      })
    }), React.createElement(TextControl, {
      label: "URL",
      value: attributes.a045169f8_url_2,
      onChange: value => setAttributes({
        a045169f8_url_2: value
      })
    }))), React.createElement(RawHTML, null, '</div> <button class="services__button button" type="submit"><span>Оставить заявку</span> <div class="services__icon icon"><i class="icon-arrow-right _icon"></i></div> </button> </div> </div> </div> <div class="services__item el-item"> <div class="card"> <div class="card__header"><h3>Мы на связи</h3> <div class="card__icons"><a class="card__icon icon" href='), "\"", attributes.a045169f8_url_0, "\"", React.createElement(RawHTML, null, ' target="_blank"><i class="icon-telegram-fly _icon"></i></a><a class="card__icon icon" href='), "\"", attributes.a045169f8_url_1, "\"", React.createElement(RawHTML, null, ' target="_blank"> <i class="icon-whatsapp _icon"></i></a></div> </div> </div> <a class="card" href='), "\"", attributes.a045169f8_url_2, "\"", React.createElement(RawHTML, null, '> <div class="card__header"><h3>'), React.createElement(RichText, {
      value: attributes.a045169f8_text_0,
      onChange: value => setAttributes({
        a045169f8_text_0: value
      })
    }), React.createElement(RawHTML, null, '</h3> <div class="card__icon icon"><i class="icon-arrow-up _icon"></i></div> </div> <div class="card__content"> <ul class="card__list">'));
  },
  save: ({
    attributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement(RawHTML, null, '</div> <button class="services__button button" type="submit"><span>Оставить заявку</span> <div class="services__icon icon"><i class="icon-arrow-right _icon"></i></div> </button> </div> </div> </div> <div class="services__item el-item"> <div class="card"> <div class="card__header"><h3>Мы на связи</h3> <div class="card__icons"><a class="card__icon icon" href='), "\"", attributes.a045169f8_url_0, "\"", React.createElement(RawHTML, null, ' target="_blank"><i class="icon-telegram-fly _icon"></i></a><a class="card__icon icon" href='), "\"", attributes.a045169f8_url_1, "\"", React.createElement(RawHTML, null, ' target="_blank"> <i class="icon-whatsapp _icon"></i></a></div> </div> </div> <a class="card" href='), "\"", attributes.a045169f8_url_2, "\"", React.createElement(RawHTML, null, '> <div class="card__header"><h3>'), React.createElement(RichText.Content, {
      value: attributes.a045169f8_text_0
    }), React.createElement(RawHTML, null, '</h3> <div class="card__icon icon"><i class="icon-arrow-up _icon"></i></div> </div> <div class="card__content"> <ul class="card__list">'));
  }
});
registerBlockType('block-master/new-block1-2-central', {
  title: 'New-block1-2-central',
  category: 'block-master',
  parent: ['block-master/new-block1'],
  attributes: {},
  edit: ({
    attributes,
    setAttributes
  }) => {
    return React.createElement(InnerBlocks, {
      allowedBlocks: ['block-master/new-block1-2'],
      template: [['block-master/new-block1-2', {}]]
    });
  },
  save: () => {
    return React.createElement(InnerBlocks.Content, null);
  }
});
registerBlockType('block-master/new-block1-2', {
  title: 'New-block1-2',
  category: 'block-master',
  parent: ['block-master/new-block1-2-central'],
  attributes: {
    adbaa8774_text_0: {
      type: 'string',
      default: 'Логотип'
    }
  },
  edit: ({
    attributes,
    setAttributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement(RawHTML, null, '<li class="card__item">'), React.createElement(RichText, {
      value: attributes.adbaa8774_text_0,
      onChange: value => setAttributes({
        adbaa8774_text_0: value
      })
    }), React.createElement(RawHTML, null, '</li>'));
  },
  save: ({
    attributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement(RawHTML, null, '<li class="card__item">'), React.createElement(RichText.Content, {
      value: attributes.adbaa8774_text_0
    }), React.createElement(RawHTML, null, '</li>'));
  }
});
registerBlockType('block-master/between-new-block1', {
  title: 'Between-new-block1',
  category: 'block-master',
  parent: ['block-master/new-block1'],
  attributes: {},
  edit: ({
    attributes,
    setAttributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement(RawHTML, null, '</ul> </div> </a></div>'));
  },
  save: ({
    attributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement(RawHTML, null, '</ul> </div> </a></div>'));
  }
});
registerBlockType('block-master/new-block1-3-central', {
  title: 'New-block1-3-central',
  category: 'block-master',
  parent: ['block-master/new-block1'],
  attributes: {},
  edit: ({
    attributes,
    setAttributes
  }) => {
    return React.createElement(InnerBlocks, {
      allowedBlocks: ['block-master/new-block1-3'],
      template: [['block-master/new-block1-3', {}]]
    });
  },
  save: () => {
    return React.createElement(InnerBlocks.Content, null);
  }
});
registerBlockType('block-master/new-block1-3-1-central', {
  title: 'New-block1-3-1-central',
  category: 'block-master',
  parent: ['block-master/new-block1-3'],
  attributes: {},
  edit: ({
    attributes,
    setAttributes
  }) => {
    return React.createElement(InnerBlocks, {
      allowedBlocks: ['block-master/new-block1-3-1'],
      template: [['block-master/new-block1-3-1', {}]]
    });
  },
  save: () => {
    return React.createElement(InnerBlocks.Content, null);
  }
});
registerBlockType('block-master/new-block1-3-1', {
  title: 'New-block1-3-1',
  category: 'block-master',
  parent: ['block-master/new-block1-3-1-central'],
  attributes: {
    afbc9bcc0_text_0: {
      type: 'string',
      default: 'Дизайн сайта'
    }
  },
  edit: ({
    attributes,
    setAttributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement(RawHTML, null, '<li class="card__item">'), React.createElement(RichText, {
      value: attributes.afbc9bcc0_text_0,
      onChange: value => setAttributes({
        afbc9bcc0_text_0: value
      })
    }), React.createElement(RawHTML, null, '</li>'));
  },
  save: ({
    attributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement(RawHTML, null, '<li class="card__item">'), React.createElement(RichText.Content, {
      value: attributes.afbc9bcc0_text_0
    }), React.createElement(RawHTML, null, '</li>'));
  }
});
registerBlockType('block-master/new-block1-3', {
  title: 'New-block1-3',
  category: 'block-master',
  parent: ['block-master/new-block1-3-central'],
  attributes: {
    a886208ce_text_0: {
      type: 'string',
      default: 'Веб-дизайн'
    },
    a886208ce_url_0: {
      type: 'string',
      default: '#'
    }
  },
  edit: ({
    attributes,
    setAttributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement(InspectorControls, null, React.createElement(PanelBody, {
      title: "Image & URL Settings"
    }, React.createElement(TextControl, {
      label: "URL",
      value: attributes.a886208ce_url_0,
      onChange: value => setAttributes({
        a886208ce_url_0: value
      })
    }))), React.createElement(RawHTML, null, '<div class="services__item el-item"><a class="card" href='), "\"", attributes.a886208ce_url_0, "\"", React.createElement(RawHTML, null, '> <div class="card__header"><h3>'), React.createElement(RichText, {
      value: attributes.a886208ce_text_0,
      onChange: value => setAttributes({
        a886208ce_text_0: value
      })
    }), React.createElement(RawHTML, null, '</h3> <div class="card__icon icon"><i class="icon-arrow-up _icon"></i></div> </div> <div class="card__content"> <ul class="card__list"> '), React.createElement(InnerBlocks, {
      allowedBlocks: ['block-master/new-block1-3-1'],
      template: [["block-master/new-block1-3-1", []]],
      templateLock: "all"
    }), React.createElement(RawHTML, null, ' </ul> </div> </a></div>'));
  },
  save: ({
    attributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement(RawHTML, null, '<div class="services__item el-item"><a class="card" href='), "\"", attributes.a886208ce_url_0, "\"", React.createElement(RawHTML, null, '> <div class="card__header"><h3>'), React.createElement(RichText.Content, {
      value: attributes.a886208ce_text_0
    }), React.createElement(RawHTML, null, '</h3> <div class="card__icon icon"><i class="icon-arrow-up _icon"></i></div> </div> <div class="card__content"> <ul class="card__list"> '), React.createElement(InnerBlocks.Content, null), React.createElement(RawHTML, null, ' </ul> </div> </a></div>'));
  }
});
registerBlockType('block-master/new-block1', {
  title: 'New-block1',
  category: 'block-master',
  attributes: {
    a1e6f0d73_text_0: {
      type: 'string',
      default: 'Студия графического&nbsp;дизайна и&nbsp;веб&nbsp;-&nbsp;разработки'
    }
  },
  edit: ({
    attributes,
    setAttributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement(RawHTML, null, '<section class="page__services mlrp-b0101"> <div class="services"> <div class="services__body"> <div class="services__item el-item-1"> <div class="services__column"> <div class="services__title"><h1 class="services__text t-h1">'), React.createElement(RichText, {
      value: attributes.a1e6f0d73_text_0,
      onChange: value => setAttributes({
        a1e6f0d73_text_0: value
      })
    }), React.createElement(RawHTML, null, '</h1> <div class="services__teammates"> '), React.createElement(InnerBlocks, {
      allowedBlocks: ['block-master/new-block1-3'],
      template: [["block-master/new-block1-1", []], ["block-master/between-new-block1", []], ["block-master/new-block1-2", []], ["block-master/between-new-block1", []], ["block-master/new-block1-3", []]],
      templateLock: "all"
    }), React.createElement(RawHTML, null, ' </div> </div> </section>'));
  },
  save: ({
    attributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement(RawHTML, null, '<section class="page__services mlrp-b0101"> <div class="services"> <div class="services__body"> <div class="services__item el-item-1"> <div class="services__column"> <div class="services__title"><h1 class="services__text t-h1">'), React.createElement(RichText.Content, {
      value: attributes.a1e6f0d73_text_0
    }), React.createElement(RawHTML, null, '</h1> <div class="services__teammates"> '), React.createElement(InnerBlocks.Content, null), React.createElement(RawHTML, null, ' </div> </div> </section>'));
  }
});