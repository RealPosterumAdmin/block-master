function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _regeneratorRuntime(){_regeneratorRuntime=function(){return c};var i,c={},e=Object.prototype,u=e.hasOwnProperty,s=Object.defineProperty||function(e,t,r){e[t]=r.value},t="function"==typeof Symbol?Symbol:{},n=t.iterator||"@@iterator",r=t.asyncIterator||"@@asyncIterator",a=t.toStringTag||"@@toStringTag";function o(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{o({},"")}catch(i){o=function(e,t,r){return e[t]=r}}function l(e,t,r,n){var a,o,c,l,t=t&&t.prototype instanceof g?t:g,t=Object.create(t.prototype),n=new T(n||[]);return s(t,"_invoke",{value:(a=e,o=r,c=n,l=f,function(e,t){if(l===h)throw Error("Generator is already running");if(l===d){if("throw"===e)throw t;return{value:i,done:!0}}for(c.method=e,c.arg=t;;){var r=c.delegate;if(r){r=function e(t,r){var n=r.method,a=t.iterator[n];if(a===i)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=i,e(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),y;n=m(a,t.iterator,r.arg);if("throw"===n.type)return r.method="throw",r.arg=n.arg,r.delegate=null,y;a=n.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=i),r.delegate=null,y):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)}(r,c);if(r){if(r===y)continue;return r}}if("next"===c.method)c.sent=c._sent=c.arg;else if("throw"===c.method){if(l===f)throw l=d,c.arg;c.dispatchException(c.arg)}else"return"===c.method&&c.abrupt("return",c.arg);l=h;r=m(a,o,c);if("normal"===r.type){if(l=c.done?d:p,r.arg===y)continue;return{value:r.arg,done:c.done}}"throw"===r.type&&(l=d,c.method="throw",c.arg=r.arg)}})}),t}function m(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}c.wrap=l;var f="suspendedStart",p="suspendedYield",h="executing",d="completed",y={};function g(){}function v(){}function R(){}var t={},E=(o(t,n,function(){return this}),Object.getPrototypeOf),E=E&&E(E(C([]))),_=(E&&E!==e&&u.call(E,n)&&(t=E),R.prototype=g.prototype=Object.create(t));function b(e){["next","throw","return"].forEach(function(t){o(e,t,function(e){return this._invoke(t,e)})})}function k(c,l){var t;s(this,"_invoke",{value:function(r,n){function e(){return new l(function(e,t){!function t(e,r,n,a){var o,e=m(c[e],c,r);if("throw"!==e.type)return(r=(o=e.arg).value)&&"object"==_typeof(r)&&u.call(r,"__await")?l.resolve(r.__await).then(function(e){t("next",e,n,a)},function(e){t("throw",e,n,a)}):l.resolve(r).then(function(e){o.value=e,n(o)},function(e){return t("throw",e,n,a)});a(e.arg)}(r,n,e,t)})}return t=t?t.then(e,e):e()}})}function x(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function w(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function T(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(x,this),this.reset(!0)}function C(t){if(t||""===t){var r,e=t[n];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length))return r=-1,(e=function e(){for(;++r<t.length;)if(u.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=i,e.done=!0,e}).next=e}throw new TypeError(_typeof(t)+" is not iterable")}return s(_,"constructor",{value:v.prototype=R,configurable:!0}),s(R,"constructor",{value:v,configurable:!0}),v.displayName=o(R,a,"GeneratorFunction"),c.isGeneratorFunction=function(e){e="function"==typeof e&&e.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},c.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,R):(e.__proto__=R,o(e,a,"GeneratorFunction")),e.prototype=Object.create(_),e},c.awrap=function(e){return{__await:e}},b(k.prototype),o(k.prototype,r,function(){return this}),c.AsyncIterator=k,c.async=function(e,t,r,n,a){void 0===a&&(a=Promise);var o=new k(l(e,t,r,n),a);return c.isGeneratorFunction(t)?o:o.next().then(function(e){return e.done?e.value:o.next()})},b(_),o(_,a,"Generator"),o(_,n,function(){return this}),o(_,"toString",function(){return"[object Generator]"}),c.keys=function(e){var t,r=Object(e),n=[];for(t in r)n.push(t);return n.reverse(),function e(){for(;n.length;){var t=n.pop();if(t in r)return e.value=t,e.done=!1,e}return e.done=!0,e}},c.values=C,T.prototype={constructor:T,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=i,this.done=!1,this.delegate=null,this.method="next",this.arg=i,this.tryEntries.forEach(w),!e)for(var t in this)"t"===t.charAt(0)&&u.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=i)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var n=this;function e(e,t){return o.type="throw",o.arg=r,n.next=e,t&&(n.method="next",n.arg=i),!!t}for(var t=this.tryEntries.length-1;0<=t;--t){var a=this.tryEntries[t],o=a.completion;if("root"===a.tryLoc)return e("end");if(a.tryLoc<=this.prev){var c=u.call(a,"catchLoc"),l=u.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return e(a.catchLoc,!0);if(this.prev<a.finallyLoc)return e(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return e(a.catchLoc,!0)}else{if(!l)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return e(a.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;0<=r;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&u.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}var o=(a=a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc?null:a)?a.completion:{};return o.type=e,o.arg=t,a?(this.method="next",this.next=a.finallyLoc,y):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),y},finish:function(e){for(var t=this.tryEntries.length-1;0<=t;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),w(r),y}},catch:function(e){for(var t=this.tryEntries.length-1;0<=t;--t){var r,n,a=this.tryEntries[t];if(a.tryLoc===e)return"throw"===(r=a.completion).type&&(n=r.arg,w(a)),n}throw Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:C(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=i),y}},c}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){var r;if(e)return"string"==typeof e?_arrayLikeToArray(e,t):"Map"===(r="Object"===(r={}.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function asyncGeneratorStep(e,t,r,n,a,o,c){try{var l=e[o](c),i=l.value}catch(e){return void r(e)}l.done?t(i):Promise.resolve(i).then(n,a)}function _asyncToGenerator(l){return function(){var e=this,c=arguments;return new Promise(function(t,r){var n=l.apply(e,c);function a(e){asyncGeneratorStep(n,t,r,a,o,"next",e)}function o(e){asyncGeneratorStep(n,t,r,a,o,"throw",e)}a(void 0)})}}var registerBlockType=wp.blocks.registerBlockType,_wp$blockEditor=wp.blockEditor,useBlockProps=_wp$blockEditor.useBlockProps,RichText=_wp$blockEditor.RichText,MediaUpload=_wp$blockEditor.MediaUpload,MediaUploadCheck=_wp$blockEditor.MediaUploadCheck,InspectorControls=_wp$blockEditor.InspectorControls,InnerBlocks=_wp$blockEditor.InnerBlocks,_wp$components=wp.components,PanelBody=_wp$components.PanelBody,Button=_wp$components.Button,SelectControl=_wp$components.SelectControl,TextControl=_wp$components.TextControl,_wp$element=wp.element,useState=_wp$element.useState,useEffect=_wp$element.useEffect,apiFetch=wp.apiFetch,fetchOptions=(()=>{var e=_asyncToGenerator(_regeneratorRuntime().mark(function e(){var t,r,n;return _regeneratorRuntime().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,apiFetch({path:"/wp/v2/posts?per_page=100"});case 3:return t=e.sent,e.next=6,apiFetch({path:"/wp/v2/categories?per_page=100"});case 6:return n=e.sent,r=t.map(function(e){return{label:"Post: ".concat(e.title.rendered),value:e.link}}),n=n.map(function(e){return{label:"Category: ".concat(e.name),value:e.link}}),e.abrupt("return",[].concat(_toConsumableArray(r),_toConsumableArray(n)));case 12:return e.prev=12,e.t0=e.catch(0),console.error("Error fetching data:",e.t0),e.abrupt("return",[]);case 16:case"end":return e.stop()}},e,null,[[0,12]])}));return function(){return e.apply(this,arguments)}})();registerBlockType("block-master/test-1-1-0",{title:"Test-1-1-0",category:"block-master",parent:["block-master/test-1-1"],attributes:{text_0:{type:"string",default:"123"}},edit:function(e){var t=e.attributes,r=e.setAttributes;return React.createElement(React.Fragment,null,React.createElement("li",null,React.createElement(RichText,{value:t.text_0,onChange:function(e){return r({text_0:e})}})))},save:function(e){e=e.attributes;return React.createElement(React.Fragment,null,React.createElement("li",null,React.createElement(RichText.Content,{value:e.text_0})))}}),registerBlockType("block-master/test-1-1",{title:"Test-1-1",category:"block-master",parent:["block-master/test-1"],attributes:{text_0:{type:"string",default:"yagear"},text_1:{type:"string",default:"asdjlkajdlkjslf kfjslkmflskf slfks ekcs"},text_2:{type:"string",default:"dlkjslf kfjslkmflskf slfks ekcs"},imgSrc_0:{type:"string",default:"/sdasd/sd/ad/"},imgAlt_0:{type:"string",default:"rasm-uchun-text"}},edit:function(e){var t=e.attributes,r=e.setAttributes;return React.createElement(React.Fragment,null,React.createElement(InspectorControls,null,React.createElement(PanelBody,{title:"Image & URL Settings"},React.createElement(MediaUploadCheck,null,React.createElement(MediaUpload,{onSelect:function(e){return r({imgSrc_0:e.url})},allowedTypes:["image"],render:function(e){e=e.open;return React.createElement(Button,{onClick:e,isPrimary:!0},"Choose Image")}})))),React.createElement("div",{class:"card"},React.createElement("h4",null,React.createElement(RichText,{value:t.text_0,onChange:function(e){return r({text_0:e})}})),React.createElement("img",{src:t.imgSrc_0,alt:t.imgAlt_0}),React.createElement("div",{class:"descriptions"},React.createElement(RichText,{value:t.text_1,onChange:function(e){return r({text_1:e})}})),React.createElement("ul",null,React.createElement(InnerBlocks,{allowedBlocks:["block-master/test-1-1-0"],template:[["block-master/test-1-1-0",{}]]}))),React.createElement("div",{class:"ds"},React.createElement("span",null,React.createElement(RichText,{value:t.text_2,onChange:function(e){return r({text_2:e})}}))))},save:function(e){e=e.attributes;return React.createElement(React.Fragment,null,React.createElement("div",{class:"card"},React.createElement("h4",null,React.createElement(RichText.Content,{value:e.text_0})),React.createElement("img",{src:e.imgSrc_0,alt:e.imgAlt_0}),React.createElement("div",{class:"descriptions"},React.createElement(RichText.Content,{value:e.text_1})),React.createElement("ul",null,React.createElement(InnerBlocks.Content,null))),React.createElement("div",{class:"ds"},React.createElement("span",null,React.createElement(RichText.Content,{value:e.text_2}))))}}),registerBlockType("block-master/test-1-0-0",{title:"Test-1-0-0",category:"block-master",parent:["block-master/test-1-0"],attributes:{text_0:{type:"string",default:"123"}},edit:function(e){var t=e.attributes,r=e.setAttributes;return React.createElement(React.Fragment,null,React.createElement("li",null,React.createElement(RichText,{value:t.text_0,onChange:function(e){return r({text_0:e})}})))},save:function(e){e=e.attributes;return React.createElement(React.Fragment,null,React.createElement("li",null,React.createElement(RichText.Content,{value:e.text_0})))}}),registerBlockType("block-master/test-1-0",{title:"Test-1-0",category:"block-master",parent:["block-master/test-1"],attributes:{text_0:{type:"string",default:"yagear"},text_1:{type:"string",default:"asdjlkajdlkjslf kfjslkmflskf slfks ekcs"},text_2:{type:"string",default:"dlkjslf kfjslkmflskf slfks ekcs"},imgSrc_0:{type:"string",default:"/sdasd/sd/ad/"},imgAlt_0:{type:"string",default:"rasm-uchun-text"}},edit:function(e){var t=e.attributes,r=e.setAttributes;return React.createElement(React.Fragment,null,React.createElement(InspectorControls,null,React.createElement(PanelBody,{title:"Image & URL Settings"},React.createElement(MediaUploadCheck,null,React.createElement(MediaUpload,{onSelect:function(e){return r({imgSrc_0:e.url})},allowedTypes:["image"],render:function(e){e=e.open;return React.createElement(Button,{onClick:e,isPrimary:!0},"Choose Image")}})))),React.createElement("div",{class:"card"},React.createElement("h4",null,React.createElement(RichText,{value:t.text_0,onChange:function(e){return r({text_0:e})}})),React.createElement("img",{src:t.imgSrc_0,alt:t.imgAlt_0}),React.createElement("div",{class:"descriptions"},React.createElement(RichText,{value:t.text_1,onChange:function(e){return r({text_1:e})}})),React.createElement("ul",null,React.createElement(InnerBlocks,{allowedBlocks:["block-master/test-1-0-0"],template:[["block-master/test-1-0-0",{}]]}))),React.createElement("div",{class:"ds"},React.createElement("span",null,React.createElement(RichText,{value:t.text_2,onChange:function(e){return r({text_2:e})}}))))},save:function(e){e=e.attributes;return React.createElement(React.Fragment,null,React.createElement("div",{class:"card"},React.createElement("h4",null,React.createElement(RichText.Content,{value:e.text_0})),React.createElement("img",{src:e.imgSrc_0,alt:e.imgAlt_0}),React.createElement("div",{class:"descriptions"},React.createElement(RichText.Content,{value:e.text_1})),React.createElement("ul",null,React.createElement(InnerBlocks.Content,null))),React.createElement("div",{class:"ds"},React.createElement("span",null,React.createElement(RichText.Content,{value:e.text_2}))))}}),registerBlockType("block-master/test-1",{title:"Test-1",category:"block-master",attributes:{text_0:{type:"string",default:"hayvonlar"},url_0:{type:"string",default:"test.php"}},edit:function(e){var t=e.attributes,r=e.setAttributes;return React.createElement(React.Fragment,null,React.createElement(InspectorControls,null,React.createElement(PanelBody,{title:"Image & URL Settings"},React.createElement(TextControl,{label:"URL",value:t.url_0,onChange:function(e){return r({url_0:e})}}))),React.createElement("div",{class:"div"},React.createElement("h1",null,React.createElement(RichText,{value:t.text_0,onChange:function(e){return r({text_0:e})}})),React.createElement("a",{href:t.url_0}," some tag "),React.createElement(InnerBlocks,{allowedBlocks:["block-master/test-1-0"],template:[["block-master/test-1-0",{}]]}),React.createElement(InnerBlocks,{allowedBlocks:["block-master/test-1-1"],template:[["block-master/test-1-1",{}]]})))},save:function(e){e=e.attributes;return React.createElement(React.Fragment,null,React.createElement("div",{class:"div"},React.createElement("h1",null,React.createElement(RichText.Content,{value:e.text_0})),React.createElement("a",{href:e.url_0}," some tag "),React.createElement(InnerBlocks.Content,null),React.createElement(InnerBlocks.Content,null)))}});
//# sourceMappingURL=bundle.js.map
