const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

// Asosiy blokni ro'yxatdan o'tkazish
registerBlockType('block-master/my-block', {
  title: 'My Block',
  category: 'layout',
  edit: function() {
    return React.createElement(
        'div',
        null,
        React.createElement(InnerBlocks, {
          allowedBlocks: [
            'block-master/inner-block-1',
            'block-master/intermediate-block',
            'block-master/inner-block-2',
          ],
          template: [
            ['block-master/inner-block-1', {}],
            ['block-master/intermediate-block', {}],
            ['block-master/inner-block-2', {}],
          ]
        })
    );
  },
  save: function() {
    return React.createElement(InnerBlocks.Content);
  },
});

// Ichki blok 1 ni ro'yxatdan o'tkazish
registerBlockType('block-master/inner-block-1', {
  title: 'Inner Block 1',
  category: 'layout',
  parent: ['block-master/my-block'],
  edit: function() {
    return React.createElement(
        'div',
        null,
        React.createElement('p', null, 'Ichki Blok 1'),
        React.createElement(InnerBlocks, {
          allowedBlocks: ['block-master/sub-inner-block-1'],
          template: [['block-master/sub-inner-block-1', {}]]
        })
    );
  },
  save: function() {
    return React.createElement(InnerBlocks.Content);
  },
});

// Oraliq blokni ro'yxatdan o'tkazish
registerBlockType('block-master/intermediate-block', {
  title: 'Intermediate Block',
  category: 'layout',
  parent: ['block-master/my-block'],
  edit: function() {
    return React.createElement('p', null, 'Oraliq Blok');
  },
  save: function() {
    return React.createElement('p', null, 'Oraliq Blok');
  },
});

// Ichki blok 2 ni ro'yxatdan o'tkazish
registerBlockType('block-master/inner-block-2', {
  title: 'Inner Block 2',
  category: 'layout',
  parent: ['block-master/my-block'],
  edit: function() {
    return React.createElement(
        'div',
        null,
        React.createElement('p', null, 'Ichki Blok 2'),
        React.createElement(InnerBlocks, {
          allowedBlocks: ['block-master/sub-inner-block-2'],
          template: [['block-master/sub-inner-block-2', {}]]
        })
    );
  },
  save: function() {
    return React.createElement(InnerBlocks.Content);
  },
});

// Ichki blok 1 ichidagi blokni ro'yxatdan o'tkazish
registerBlockType('block-master/sub-inner-block-1', {
  title: 'Sub Inner Block 1',
  category: 'layout',
  parent: ['block-master/inner-block-1'],
  edit: function() {
    return React.createElement('p', null, 'Ichki Blok 1 - Sub');
  },
  save: function() {
    return React.createElement('p', null, 'Ichki Blok 1 - Sub');
  },
});

// Ichki blok 2 ichidagi blokni ro'yxatdan o'tkazish
registerBlockType('block-master/sub-inner-block-2', {
  title: 'Sub Inner Block 2',
  category: 'layout',
  parent: ['block-master/inner-block-2'],
  edit: function() {
    return React.createElement('p', null, 'Ichki Blok 2 - Sub');
  },
  save: function() {
    return React.createElement('p', null, 'Ichki Blok 2 - Sub');
  },
});