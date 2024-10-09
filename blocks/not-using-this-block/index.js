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
  useEffect
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
registerBlockType('block-master/not-using-this-block', {
  title: 'Not-using-this-block',
  category: 'block-master',
  attributes: {
    abcd770f8_text_0: {
      type: 'string',
      default: 'Студия графического&nbsp;дизайна и&nbsp;веб&nbsp;-&nbsp;разработки'
    },
    abcd770f8_text_1: {
      type: 'string',
      default: 'Графический дизайн'
    },
    abcd770f8_url_0: {
      type: 'string',
      default: '#'
    },
    abcd770f8_url_1: {
      type: 'string',
      default: '#'
    },
    abcd770f8_url_2: {
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
      value: attributes.abcd770f8_url_0,
      onChange: value => setAttributes({
        abcd770f8_url_0: value
      })
    }), React.createElement(TextControl, {
      label: "URL",
      value: attributes.abcd770f8_url_1,
      onChange: value => setAttributes({
        abcd770f8_url_1: value
      })
    }), React.createElement(TextControl, {
      label: "URL",
      value: attributes.abcd770f8_url_2,
      onChange: value => setAttributes({
        abcd770f8_url_2: value
      })
    }))), React.createElement("section", {
      className: "page__services mlrp-b0101"
    }, React.createElement("div", {
      className: "services"
    }, React.createElement("div", {
      className: "services__body"
    }, React.createElement("div", {
      className: "services__item el-item-1"
    }, React.createElement("div", {
      className: "services__column"
    }, React.createElement("div", {
      className: "services__title"
    }, React.createElement("h1", {
      className: "services__text t-h1"
    }, React.createElement(RichText, {
      value: attributes.abcd770f8_text_0,
      onChange: value => setAttributes({
        abcd770f8_text_0: value
      })
    })), React.createElement("div", {
      className: "services__teammates"
    }, React.createElement(InnerBlocks, {
      allowedBlocks: ['block-master/not-using-this-block-1-central'],
      template: [['block-master/not-using-this-block-1-central', {}]],
      templateLock: "all"
    })), React.createElement("button", {
      className: "services__button button",
      type: "submit"
    }, React.createElement("span", null, "\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443"), React.createElement("div", {
      className: "services__icon icon"
    }, React.createElement("i", {
      className: "icon-arrow-right _icon"
    })))))), React.createElement("div", {
      className: "services__item el-item"
    }, React.createElement("div", {
      className: "card"
    }, React.createElement("div", {
      className: "card__header"
    }, React.createElement("h3", null, "\u041C\u044B \u043D\u0430 \u0441\u0432\u044F\u0437\u0438"), React.createElement("div", {
      className: "card__icons"
    }, React.createElement("a", {
      className: "card__icon icon",
      href: attributes.abcd770f8_url_0,
      target: "_blank"
    }, React.createElement("i", {
      className: "icon-telegram-fly _icon"
    })), React.createElement("a", {
      className: "card__icon icon",
      href: attributes.abcd770f8_url_1,
      target: "_blank"
    }, " ", React.createElement("i", {
      className: "icon-whatsapp _icon"
    }))))), React.createElement("a", {
      className: "card",
      href: attributes.abcd770f8_url_2
    }, React.createElement("div", {
      className: "card__header"
    }, React.createElement("h3", null, React.createElement(RichText, {
      value: attributes.abcd770f8_text_1,
      onChange: value => setAttributes({
        abcd770f8_text_1: value
      })
    })), React.createElement("div", {
      className: "card__icon icon"
    }, React.createElement("i", {
      className: "icon-arrow-up _icon"
    }))), React.createElement("div", {
      className: "card__content"
    }, React.createElement("ul", {
      className: "card__list"
    }, React.createElement(InnerBlocks, {
      allowedBlocks: ['block-master/not-using-this-block-2-central'],
      template: [['block-master/not-using-this-block-2-central', {}]],
      templateLock: "all"
    }))))), React.createElement(InnerBlocks, {
      allowedBlocks: ['block-master/not-using-this-block-3-central'],
      template: [['block-master/not-using-this-block-3-central', {}]],
      templateLock: "all"
    })))));
  },
  save: ({
    attributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement("section", {
      className: "page__services mlrp-b0101"
    }, React.createElement("div", {
      className: "services"
    }, React.createElement("div", {
      className: "services__body"
    }, React.createElement("div", {
      className: "services__item el-item-1"
    }, React.createElement("div", {
      className: "services__column"
    }, React.createElement("div", {
      className: "services__title"
    }, React.createElement("h1", {
      className: "services__text t-h1"
    }, React.createElement(RichText.Content, {
      value: attributes.abcd770f8_text_0
    })), React.createElement("div", {
      className: "services__teammates"
    }, React.createElement(InnerBlocks.Content, null)), React.createElement("button", {
      className: "services__button button",
      type: "submit"
    }, React.createElement("span", null, "\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443"), React.createElement("div", {
      className: "services__icon icon"
    }, React.createElement("i", {
      className: "icon-arrow-right _icon"
    })))))), React.createElement("div", {
      className: "services__item el-item"
    }, React.createElement("div", {
      className: "card"
    }, React.createElement("div", {
      className: "card__header"
    }, React.createElement("h3", null, "\u041C\u044B \u043D\u0430 \u0441\u0432\u044F\u0437\u0438"), React.createElement("div", {
      className: "card__icons"
    }, React.createElement("a", {
      className: "card__icon icon",
      href: attributes.abcd770f8_url_0,
      target: "_blank"
    }, React.createElement("i", {
      className: "icon-telegram-fly _icon"
    })), React.createElement("a", {
      className: "card__icon icon",
      href: attributes.abcd770f8_url_1,
      target: "_blank"
    }, " ", React.createElement("i", {
      className: "icon-whatsapp _icon"
    }))))), React.createElement("a", {
      className: "card",
      href: attributes.abcd770f8_url_2
    }, React.createElement("div", {
      className: "card__header"
    }, React.createElement("h3", null, React.createElement(RichText.Content, {
      value: attributes.abcd770f8_text_1
    })), React.createElement("div", {
      className: "card__icon icon"
    }, React.createElement("i", {
      className: "icon-arrow-up _icon"
    }))), React.createElement("div", {
      className: "card__content"
    }, React.createElement("ul", {
      className: "card__list"
    }, React.createElement(InnerBlocks.Content, null))))), React.createElement(InnerBlocks.Content, null)))));
  }
});
registerBlockType('block-master/not-using-this-block-3-central', {
  title: 'Not-using-this-block-3-central',
  category: 'block-master',
  parent: ['block-master/not-using-this-block'],
  attributes: {},
  edit: ({
    attributes,
    setAttributes
  }) => {
    return React.createElement(InnerBlocks, {
      allowedBlocks: ['block-master/not-using-this-block-3'],
      template: [['block-master/not-using-this-block-3', {}]]
    });
  },
  save: () => {
    return React.createElement(InnerBlocks.Content, null);
  }
});
registerBlockType('block-master/not-using-this-block-3', {
  title: 'Not-using-this-block-3',
  category: 'block-master',
  parent: ['block-master/not-using-this-block-3-central'],
  attributes: {
    a8e20bcc1_text_0: {
      type: 'string',
      default: 'Веб-дизайн'
    },
    a8e20bcc1_url_0: {
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
      value: attributes.a8e20bcc1_url_0,
      onChange: value => setAttributes({
        a8e20bcc1_url_0: value
      })
    }))), React.createElement("div", {
      className: "services__item el-item"
    }, React.createElement("a", {
      className: "card",
      href: attributes.a8e20bcc1_url_0
    }, React.createElement("div", {
      className: "card__header"
    }, React.createElement("h3", null, React.createElement(RichText, {
      value: attributes.a8e20bcc1_text_0,
      onChange: value => setAttributes({
        a8e20bcc1_text_0: value
      })
    })), React.createElement("div", {
      className: "card__icon icon"
    }, React.createElement("i", {
      className: "icon-arrow-up _icon"
    }))), React.createElement("div", {
      className: "card__content"
    }, React.createElement("ul", {
      className: "card__list"
    }, React.createElement(InnerBlocks, {
      allowedBlocks: ['block-master/not-using-this-block-3-1-central'],
      template: [['block-master/not-using-this-block-3-1-central', {}]],
      templateLock: "all"
    }))))));
  },
  save: ({
    attributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: "services__item el-item"
    }, React.createElement("a", {
      className: "card",
      href: attributes.a8e20bcc1_url_0
    }, React.createElement("div", {
      className: "card__header"
    }, React.createElement("h3", null, React.createElement(RichText.Content, {
      value: attributes.a8e20bcc1_text_0
    })), React.createElement("div", {
      className: "card__icon icon"
    }, React.createElement("i", {
      className: "icon-arrow-up _icon"
    }))), React.createElement("div", {
      className: "card__content"
    }, React.createElement("ul", {
      className: "card__list"
    }, React.createElement(InnerBlocks.Content, null))))));
  }
});
registerBlockType('block-master/not-using-this-block-3-1-central', {
  title: 'Not-using-this-block-3-1-central',
  category: 'block-master',
  parent: ['block-master/not-using-this-block-3'],
  attributes: {},
  edit: ({
    attributes,
    setAttributes
  }) => {
    return React.createElement(InnerBlocks, {
      allowedBlocks: ['block-master/not-using-this-block-3-1'],
      template: [['block-master/not-using-this-block-3-1', {}]]
    });
  },
  save: () => {
    return React.createElement(InnerBlocks.Content, null);
  }
});
registerBlockType('block-master/not-using-this-block-3-1', {
  title: 'Not-using-this-block-3-1',
  category: 'block-master',
  parent: ['block-master/not-using-this-block-3-1-central'],
  attributes: {
    a1c23a143_text_0: {
      type: 'string',
      default: 'Дизайн сайта'
    }
  },
  edit: ({
    attributes,
    setAttributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement("li", {
      className: "card__item"
    }, React.createElement(RichText, {
      value: attributes.a1c23a143_text_0,
      onChange: value => setAttributes({
        a1c23a143_text_0: value
      })
    })));
  },
  save: ({
    attributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement("li", {
      className: "card__item"
    }, React.createElement(RichText.Content, {
      value: attributes.a1c23a143_text_0
    })));
  }
});
registerBlockType('block-master/not-using-this-block-2-central', {
  title: 'Not-using-this-block-2-central',
  category: 'block-master',
  parent: ['block-master/not-using-this-block'],
  attributes: {},
  edit: ({
    attributes,
    setAttributes
  }) => {
    return React.createElement(InnerBlocks, {
      allowedBlocks: ['block-master/not-using-this-block-2'],
      template: [['block-master/not-using-this-block-2', {}]]
    });
  },
  save: () => {
    return React.createElement(InnerBlocks.Content, null);
  }
});
registerBlockType('block-master/not-using-this-block-2', {
  title: 'Not-using-this-block-2',
  category: 'block-master',
  parent: ['block-master/not-using-this-block-2-central'],
  attributes: {
    afe457ed3_text_0: {
      type: 'string',
      default: 'Логотип'
    }
  },
  edit: ({
    attributes,
    setAttributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement("li", {
      className: "card__item"
    }, React.createElement(RichText, {
      value: attributes.afe457ed3_text_0,
      onChange: value => setAttributes({
        afe457ed3_text_0: value
      })
    })));
  },
  save: ({
    attributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement("li", {
      className: "card__item"
    }, React.createElement(RichText.Content, {
      value: attributes.afe457ed3_text_0
    })));
  }
});
registerBlockType('block-master/not-using-this-block-1-central', {
  title: 'Not-using-this-block-1-central',
  category: 'block-master',
  parent: ['block-master/not-using-this-block'],
  attributes: {},
  edit: ({
    attributes,
    setAttributes
  }) => {
    return React.createElement(InnerBlocks, {
      allowedBlocks: ['block-master/not-using-this-block-1'],
      template: [['block-master/not-using-this-block-1', {}]]
    });
  },
  save: () => {
    return React.createElement(InnerBlocks.Content, null);
  }
});
registerBlockType('block-master/not-using-this-block-1', {
  title: 'Not-using-this-block-1',
  category: 'block-master',
  parent: ['block-master/not-using-this-block-1-central'],
  attributes: {
    a63c4e2fc_imgSrc_0: {
      type: 'string',
      default: 'фото'
    },
    a63c4e2fc_imgAlt_0: {
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
        a63c4e2fc_imgSrc_0: media.url
      }),
      allowedTypes: ['image'],
      render: ({
        open
      }) => React.createElement(Button, {
        onClick: open,
        isPrimary: true
      }, "Choose Image")
    })))), React.createElement("div", {
      className: "services__image"
    }, React.createElement("picture", null, React.createElement("img", {
      alt: attributes.a63c4e2fc_imgAlt_0,
      src: attributes.a63c4e2fc_imgSrc_0
    }))));
  },
  save: ({
    attributes
  }) => {
    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: "services__image"
    }, React.createElement("picture", null, React.createElement("img", {
      src: attributes.a63c4e2fc_imgAlt_0,
      alt: attributes.a63c4e2fc_imgSrc_0
    }))));
  }
});