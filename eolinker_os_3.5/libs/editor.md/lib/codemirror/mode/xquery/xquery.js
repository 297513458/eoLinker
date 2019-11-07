!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("xquery",function(){function e(e,t,n){return b=e,k=n,t}function t(e,t,n){return t.tokenize=n,n(e,t)}function n(n,c){var m=n.next(),p=!1,y=g(n);if("<"==m){if(n.match("!--",!0))return t(n,c,u);if(n.match("![CDATA",!1))return c.tokenize=s,e("tag","tag");if(n.match("?",!1))return t(n,c,f);var b=n.eat("/");n.eatSpace();for(var k,z="";k=n.eat(/[^\s\u00a0=<>\"\'\/?]/);)z+=k;return t(n,c,o(z,b))}if("{"==m)return h(c,{type:"codeblock"}),e("",null);if("}"==m)return x(c),e("",null);if(l(c))return">"==m?e("tag","tag"):"/"==m&&n.eat(">")?(x(c),e("tag","tag")):e("word","variable");if(/\d/.test(m))return n.match(/^\d*(?:\.\d*)?(?:E[+\-]?\d+)?/),e("number","atom");if("("===m&&n.eat(":"))return h(c,{type:"comment"}),t(n,c,r);if(y||'"'!==m&&"'"!==m){if("$"===m)return t(n,c,i);if(":"===m&&n.eat("="))return e("operator","keyword");if("("===m)return h(c,{type:"paren"}),e("",null);if(")"===m)return x(c),e("",null);if("["===m)return h(c,{type:"bracket"}),e("",null);if("]"===m)return x(c),e("",null);var w=v.propertyIsEnumerable(m)&&v[m];if(y&&'"'===m)for(;'"'!==n.next(););if(y&&"'"===m)for(;"'"!==n.next(););w||n.eatWhile(/[\w\$_-]/);var q=n.eat(":");!n.eat(":")&&q&&n.eatWhile(/[\w\$_-]/),n.match(/^[ \t]*\(/,!1)&&(p=!0);var _=n.current();return w=v.propertyIsEnumerable(_)&&v[_],p&&!w&&(w={type:"function_call",style:"variable def"}),d(c)?(x(c),e("word","variable",_)):("element"!=_&&"attribute"!=_&&"axis_specifier"!=w.type||h(c,{type:"xmlconstructor"}),w?e(w.type,w.style,_):e("word","variable",_))}return t(n,c,a(m))}function r(t,n){for(var r,a=!1,i=!1,o=0;r=t.next();){if(")"==r&&a){if(!(o>0)){x(n);break}o--}else":"==r&&i&&o++;a=":"==r,i="("==r}return e("comment","comment")}function a(t,r){return function(i,o){var c;if(p(o)&&i.current()==t)return x(o),r&&(o.tokenize=r),e("string","string");if(h(o,{type:"string",name:t,tokenize:a(t,r)}),i.match("{",!1)&&m(o))return o.tokenize=n,e("string","string");for(;c=i.next();){if(c==t){x(o),r&&(o.tokenize=r);break}if(i.match("{",!1)&&m(o))return o.tokenize=n,e("string","string")}return e("string","string")}}function i(t,r){var a=/[\w\$_-]/;if(t.eat('"')){for(;'"'!==t.next(););t.eat(":")}else t.eatWhile(a),t.match(":=",!1)||t.eat(":");return t.eatWhile(a),r.tokenize=n,e("variable","variable")}function o(t,r){return function(a,i){return a.eatSpace(),r&&a.eat(">")?(x(i),i.tokenize=n,e("tag","tag")):(a.eat("/")||h(i,{type:"tag",name:t,tokenize:n}),a.eat(">")?(i.tokenize=n,e("tag","tag")):(i.tokenize=c,e("tag","tag")))}}function c(r,i){var o=r.next();return"/"==o&&r.eat(">")?(m(i)&&x(i),l(i)&&x(i),e("tag","tag")):">"==o?(m(i)&&x(i),e("tag","tag")):"="==o?e("",null):'"'==o||"'"==o?t(r,i,a(o,c)):(m(i)||h(i,{type:"attribute",tokenize:c}),r.eat(/[a-zA-Z_:]/),r.eatWhile(/[-a-zA-Z0-9_:.]/),r.eatSpace(),(r.match(">",!1)||r.match("/",!1))&&(x(i),i.tokenize=n),e("attribute","attribute"))}function u(t,r){for(var a;a=t.next();)if("-"==a&&t.match("->",!0))return r.tokenize=n,e("comment","comment")}function s(t,r){for(var a;a=t.next();)if("]"==a&&t.match("]",!0))return r.tokenize=n,e("comment","comment")}function f(t,r){for(var a;a=t.next();)if("?"==a&&t.match(">",!0))return r.tokenize=n,e("comment","comment meta")}function l(e){return y(e,"tag")}function m(e){return y(e,"attribute")}function d(e){return y(e,"xmlconstructor")}function p(e){return y(e,"string")}function g(e){return'"'===e.current()?e.match(/^[^\"]+\"\:/,!1):"'"===e.current()&&e.match(/^[^\"]+\'\:/,!1)}function y(e,t){return e.stack.length&&e.stack[e.stack.length-1].type==t}function h(e,t){e.stack.push(t)}function x(e){e.stack.pop();var t=e.stack.length&&e.stack[e.stack.length-1].tokenize;e.tokenize=t||n}var b,k,v=function(){function e(e){return{type:e,style:"keyword"}}for(var t=e("keyword a"),n=e("keyword b"),r=e("keyword c"),a=e("operator"),i={type:"atom",style:"atom"},o={type:"punctuation",style:null},c={type:"axis_specifier",style:"qualifier"},u={"if":t,"switch":t,"while":t,"for":t,"else":n,then:n,"try":n,"finally":n,"catch":n,element:r,attribute:r,"let":r,"implements":r,"import":r,module:r,namespace:r,"return":r,"super":r,"this":r,"throws":r,where:r,"private":r,",":o,"null":i,"fn:false()":i,"fn:true()":i},s=["after","ancestor","ancestor-or-self","and","as","ascending","assert","attribute","before","by","case","cast","child","comment","declare","default","define","descendant","descendant-or-self","descending","document","document-node","element","else","eq","every","except","external","following","following-sibling","follows","for","function","if","import","in","instance","intersect","item","let","module","namespace","node","node","of","only","or","order","parent","precedes","preceding","preceding-sibling","processing-instruction","ref","return","returns","satisfies","schema","schema-element","self","some","sortby","stable","text","then","to","treat","typeswitch","union","variable","version","where","xquery","empty-sequence"],f=0,l=s.length;f<l;f++)u[s[f]]=e(s[f]);for(var m=["xs:string","xs:float","xs:decimal","xs:double","xs:integer","xs:boolean","xs:date","xs:dateTime","xs:time","xs:duration","xs:dayTimeDuration","xs:time","xs:yearMonthDuration","numeric","xs:hexBinary","xs:base64Binary","xs:anyURI","xs:QName","xs:byte","xs:boolean","xs:anyURI","xf:yearMonthDuration"],f=0,l=m.length;f<l;f++)u[m[f]]=i;for(var d=["eq","ne","lt","le","gt","ge",":=","=",">",">=","<","<=",".","|","?","and","or","div","idiv","mod","*","/","+","-"],f=0,l=d.length;f<l;f++)u[d[f]]=a;for(var p=["self::","attribute::","child::","descendant::","descendant-or-self::","parent::","ancestor::","ancestor-or-self::","following::","preceding::","following-sibling::","preceding-sibling::"],f=0,l=p.length;f<l;f++)u[p[f]]=c;return u}();return{startState:function(){return{tokenize:n,cc:[],stack:[]}},token:function(e,t){if(e.eatSpace())return null;var n=t.tokenize(e,t);return n},blockCommentStart:"(:",blockCommentEnd:":)"}}),e.defineMIME("application/xquery","xquery")});