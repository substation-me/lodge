window.lodge||(window.lodge=function a(){const a={embedded:!1,eventlist:{},get:{},lightbox:!1,loaded:!1,name:"",options:"",parent:"",path:"",scripts:[],storage:{},templates:{},_constructor(){const b=window.lodge,c=document.querySelector("script[src$=\"lodge.js\"]");if(c){b.path=c.src.substr(0,c.src.length-9);try{a.options=JSON.parse(`{"${c.getAttribute("data-options").replace(/&/g,"\",\"").replace(/=/g,"\":\"")}"}`)}catch(b){a.options="error"}}if(b._findEmbeds(),b.get.qs=window.location.search.substring(1),b.get.params=!1,b.get.qs){b.get.params={};let a;const c=b.get.qs.split("&");for(let d=0;d<c.length;d++)a=c[d].split("="),b.get.params[a[0]]=decodeURIComponent(a[1])}if(b.get.params.debug&&(b.debug.show=!0),self!==top){if(b.options.noembed)return!1;b.styles.addClass({el:document.documentElement,className:"vv-embed"}),b._initEmbed()}else b.name="main window";b.get.params.modal&&b.styles.addClass({el:document.documentElement,className:"vv-modal"});const d=document.querySelectorAll("a.lodge.gallery,div.lodge.gallery");(b.options.lightboxvideo||0<d.length)&&b.getScript({url:`${b.path}/lightbox/lightbox.js`}),window.addEventListener("message",function(a){-1!==b.embeds.allowed.indexOf(a.origin)&&b._handleMessage(a)}),b.embeds.allowed+=window.location.href.split("/").slice(0,3).join("/"),b.get.params.location&&(b.embeds.allowed+=b.get.params.location.split("/").slice(0,3).join("/")),b.embedded||b.overlay.create(),b.loaded=Date.now(),b._drawQueuedEmbeds(),b.debug.out({message:"finished initializing",obj:b}),b.events.fire({obj:b,type:"ready",data:b.loaded})},_findEmbeds(){const b=document.querySelectorAll("embed.lodge");if("object"==typeof b){const c=Array.prototype.slice.call(b);c.forEach(function(b){b.style.height="1px",b.style.visibility="hidden";const c=b.getAttribute("src"),d=b.getAttribute("title"),e=b.getAttribute("data-css"),f=b.getAttribute("id"),g=a.styles.hasClass({el:b,className:"modal"}),h=a.styles.hasClass({el:b,className:"forwardquery"});c&&a.embeds.create({src:c,alt:d,target:b,css:e,id:f,modal:g,forwardquery:h})})}},_drawQueuedEmbeds(){const a=window.lodge;"object"==typeof a.storage.elementQueue&&a.storage.elementQueue.forEach(function(b){a.embeds.create(b)})},_initEmbed(){const a=window.lodge;a.embedded=!0,a.get.params.lodgelocation&&(a.parent=a.get.params.lodgelocation,a.embeds.allowed=`${a.embeds.allowed},${a.parent}`),a.name=a.get.params.name?a.get.params.name:window.location,a.get.params.cssoverride&&a.styles.injectCSS({css:a.get.params.cssoverride,important:!0}),a.get.params.fixedsize||(a.storage.embedheight=a.measure.scrollheight(),a.events.fire({obj:a,type:"resize",data:{height:a.storage.embedheight}}),window.setInterval(function(){const b=a.measure.scrollheight();b!==a.storage.embedheight&&(a.storage.embedheight=b,a.events.fire({obj:a,type:"resize",data:{height:b}}))},250))},_handleMessage(a){const b=window.lodge,c=JSON.parse(a.data),d={addclass:{handler:"styles.addClass"},begincheckout:{handler:"checkout.begin",require:"checkout/checkout.js"},injectcss:{handler:"styles.injectCSS"},overlayhide:{handler:"overlay.hide"},overlayreveal:{handler:"overlay.reveal"},overlaysetloading:{handler:"overlay.setLoading"},removeclass:{handler:"styles.removeClass"},resize:{handler:"embeds.resize"},swapclasses:{handler:"styles.swapClasses"}};let e=!1;if(b.embedded&&window.parent===a.source)e=!0;else for(let d=0;d<b.embeds.all.length;d++)if(b.embeds.all[d].el.contentWindow===a.source){e=!0,b.embeds.all[d].el.source||(b.embeds.all[d].source=a.source),c.data._source=b.embeds.all[d];break}if(e)if(d[c.type]){const a=d[c.type].handler.split("."),e=a.pop();let f=b;a.length&&(f=b[a[0]]),d[c.type].require?b.getScript({url:`${b.path}/${d[c.type].require}`,callback:function(){f[e](c.data)}}):f[e](c.data)}else"ready"!==c.type&&b.events.fire({obj:b,type:c.type,data:c.data,target:!1,localonly:!0})},getTemplate({templateName:a,successCallback:b,loadCSS:c=!0}){const d=window.lodge,{templates:e}=d;if(void 0!==e[a])b(e[a]);else if(this.ajax.jsonp({url:`${d.path}/templates/${a}.js`,callback:function(c){e[a]=c.template,b(c.template)},remoteCallback:`_${a}Callback`}),c){const b=document.querySelectorAll(`link[href="${d.path}/templates/${a}.css"]`);b.length||d.styles.injectCSS({css:`${d.path}/templates/${a}.css`})}},getScript({url:a,callback:b}){const c=window.lodge;if(-1<c.scripts.indexOf(a))"function"==typeof b&&b();else{c.scripts.push(a);const d=document.getElementsByTagName("head")[0]||document.documentElement,e=document.createElement("script");e.src=a;let f=!1;e.onload=e.onreadystatechange=function(){f||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(f=!0,"function"==typeof b&&b(),e.onload=e.onreadystatechange=null,d&&e.parentNode&&d.removeChild(e))},d.insertBefore(e,d.firstChild)}c.debug.out({message:`loaded script: ${a}`})},embeds:{allowed:"",all:[],create({src:a,alt:e="open",target:b,css:c,id:d,modal:f=!1,forwardquery:g=!1}){const h=window.lodge;let i;if(!h.loaded)"object"!=typeof h.storage.elementQueue&&(h.storage.elementQueue=[]),h.storage.elementQueue.push({src:a,alt:e,target:b,css:c,id:d,modal:f,forwardquery:g});else{i="string"==typeof targetNode?document.querySelector(b):b;const j=h.embeds.buildIframe({src:a,css:c,modal:f,id:d,forwardquery:g});if(i){if(f){const b=document.createElement("span");b.className="vv-modalopen",h.overlay.create(function(){const c=document.createElement("a");c.href="",c.target="_blank",c.innerHTML=e,b.appendChild(c),i.parentNode.insertBefore(b,i),function(){c.addEventListener("click",function(a){h.overlay.reveal({innerContent:j}),a.preventDefault()})}()})}else i.parentNode.insertBefore(j,i);"EMBED"===i.tagName&&i.parentNode.removeChild(i)}}},buildIframe({src:a,css:b,modal:c,id:d,forwardquery:e=!1}){const f=window.lodge,g=document.createElement("iframe");let h=a;const i=encodeURIComponent(`${location.protocol}//${location.hostname}${location.port?`:${location.port}`:""}`);d||(d=`vv-${new Date().getTime()}`),h+=`?lodgelocation=${i}`,b&&(h+=`&cssoverride=${encodeURIComponent(b)}`),e&&(h+=`&${f.get.qs}`),c&&(h+="&modal=1"),f.debug.show&&(h+=`&name=${d}`),h+=`&${f.get.qs}`,g.src=h,g.id=d,g.className="vv-embed",g.style.width="100%",g.style.height="0",g.style.border="0",g.style.overflow="hidden",g.scrolling="no";let j=window.location;return h.includes("://")&&(j=h.split("/").slice(0,3).join("/"),-1===f.embeds.allowed.indexOf(j)&&(f.embeds.allowed+=`,${j}`)),f.embeds.all.push({id:d,el:g,src:a,source:null,origin:j}),f.debug.out({message:`building iframe for ${d}`}),g},resize({_source:a,height:b}){const c=a.el;c.height=b,c.style.height=`${b}px`},getById(a){const b=window.lodge;let c=!1;for(let d=0;d<b.embeds.all.length;d++)if(b.embeds.all[d].id===a){c=b.embeds.all[d];break}return c}},debug:{show:!1,store({message:a,obj:b}){const c=window.lodge;c.storage.debug||(c.storage.debug=[]),c.storage.debug.push({message:a,obj:b})},out({message:a,obj:b}){const c=window.lodge;if(c.debug.show){if(!c.loaded)return void c.debug.store({message:a,obj:b});const d={main:{logo:"color:#093;font-weight:bold;",name:"color:#093;font-weight:bold;",message:"font-weight:normal;"},embed:{logo:"color:#69f;font-weight:bold;",name:"color:#69f;font-weight:bold;",message:"font-weight:normal;"}};let e="main",f="\u25B3\u25B3";c.embedded&&(e="embed",f="\u25BD\u25BD"),c.storage.debug?(console.groupCollapsed(`%c${f}%c ${c.name}:%c\n   ${a}`,d[e].logo,d[e].name,d[e].message),b&&console.log("   attachment: %O",b),c.storage.debug.forEach(function(a){a.o?console.log(`   ${a.message} %O`,a.obj):console.log(`   ${a.message}`)}),console.groupEnd(),delete c.storage.debug):b?console.log(`%c${f}%c ${c.name}:%c\n   ${a} %O`,d[e].logo,d[e].name,d[e].message,b):console.log(`%c${f}%c ${c.name}:%c\n   ${a}`,d[e].logo,d[e].name,d[e].message)}}},ajax:{send({url:a,postString:c=null,callback:b}){let d="POST";c||(d="GET");const e=new XMLHttpRequest;e&&(e.open(d,a,!0),e.setRequestHeader("X-Requested-With","XMLHttpRequest"),"POST"===d&&e.setRequestHeader("Content-type","application/x-www-form-urlencoded"),"function"==typeof b&&(e.onreadystatechange=function(){4===e.readyState&&(200<=e.status&&299>=e.status?b(null,e.responseText):b({error:e.responseText},null))}),e.send(c))},jsonp({url:a,callback:b,remoteCallback:c="callback"}){window[c]=function(a){b(a),delete window[c]};const d=document.createElement("script");d.setAttribute("src",a),document.getElementsByTagName("head")[0].appendChild(d)},encodeForm(a){if("object"!=typeof a)return!1;let b="";a=a.elements||a;for(let c=0;c<a.length;c++){if("checkbox"===a[c].type||"radio"===a[c].type){a[c].checked&&(b+=`${(b.length?"&":"")+a[c].name}=${a[c].value}`);continue}b+=`${(b.length?"&":"")+a[c].name}=${a[c].value}`}return encodeURI(b)}},addEventListener(a,b){const c=window.lodge;c.events.addListener(a,b)},removeEventListener(a,b){const c=window.lodge;c.events.removeListener(a,b)},dispatchEvent(a){const b=window.lodge;b.events.dispatch(a)},events:{fire({obj:a,type:b,data:d="",target:c,localonly:f=!1}){const g=window.lodge;if(c)"string"==typeof c?c=g.embeds.getById(c):(!c.source||!c.origin)&&(c=!1),c&&c.source.postMessage(JSON.stringify({type:b,data:d}),c.origin),g.debug.out({message:`targeted ${c.id} with ${b} event.`,obj:d});else{let c=null;c=document.createEvent("CustomEvent"),c.initCustomEvent(b,!1,!1,d),g.embedded&&!f&&(c.relay=!0,c.source=window,c.origin=window.location.origin),a.dispatchEvent(c),c.relay&&g.events.relay({type:b,data:d});let e="firing ";c.relay&&(e="relaying "),g.debug.out({message:`${e+b} event.`,obj:d})}},relay({type:a,data:b}){const c=window.lodge;let d="*";c.parent&&(d=c.parent),window.parent.postMessage(JSON.stringify({relay:!0,type:a,data:b}),d)},addListener(a,b){const c=window.lodge;c.eventlist.hasOwnProperty(a)||(c.eventlist[a]=[]),c.eventlist[a].push(b)},removeListener(a,b){const c=window.lodge;if(c.eventlist.hasOwnProperty(a)){const d=c.eventlist[a].indexOf(b);-1!==d&&c.eventlist[a].splice(d,1)}},dispatch(a){const b=window.lodge;if(b.eventlist.hasOwnProperty(a.type)){let c;for(c=0;c<b.eventlist[a.type].length;c++)b.eventlist[a.type][c]&&b.eventlist[a.type][c](a)}}},measure:{viewport(){return{x:window.innerWidth||document.body.offsetWidth||0,y:window.innerHeight||document.body.offsetHeight||0}},scrollheight(){var a=Math.max;const b=document.body,c=document.documentElement;return a(b.scrollHeight,c.scrollHeight,b.offsetHeight,c.offsetHeight,b.clientHeight,c.clientHeight)}},validate:{email(a){return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test((a+"").toLowerCase())}},overlay:{content:!1,close:!1,loadingContent:!1,callbacks:[],setLoading({loadString:a}){const b=window.lodge;b.overlay.loadingContent=a.toString(),b.embedded&&b.events.fire({obj:b,type:"overlaysetloading",data:{loadString:b.overlay.loadingContent}})},showLoading(){const a=window.lodge;a.overlay.loadingContent&&a.overlay.reveal({innerContent:a.overlay.loadingContent})},create(a){const b=window.lodge,c=b.overlay;b.styles.injectCSS({css:`${b.path}/templates/overlay.css`}),c.content=document.createElement("div"),c.content.className="vv-overlay",document.addEventListener("keyup",function(a){"Escape"===a.key&&c.content.parentNode===document.body&&c.hide()}),c.close=document.createElement("div"),c.close.className="vv-close",c.close.addEventListener("click",function(){c.content.parentNode===document.body&&c.hide()}),c.buttonTrue=document.createElement("button"),c.buttonTrue.style.display="none",c.buttonFalse=document.createElement("button"),c.buttonFalse.style.display="none",c.buttonTrue.addEventListener("click",function(){if(c.content.parentNode===document.body){window.lodge.overlay.hide({returnData:!1,returnTarget:null})}}),c.buttonFalse.addEventListener("click",function(){if(c.content.parentNode===document.body){window.lodge.overlay.hide({returnData:!0,returnTarget:null})}}),c.buttons=document.createElement("div"),c.buttons.className="vv-buttons",c.buttons.appendChild(c.buttonTrue),c.buttons.appendChild(c.buttonFalse),"function"==typeof a&&a()},hide(){const a=window.lodge,b=a.overlay,c=document.body;if(a.embedded)a.events.fire({obj:a,type:"overlayhide"});else{for(a.events.fire({obj:a,type:"overlayhidden"});b.content.firstChild;)b.content.removeChild(b.content.firstChild);c.removeChild(b.close),c.removeChild(b.content);const d=document.querySelectorAll(".vv-overlaytrigger");if(0<d.length)for(let a=0,b=d.length;a<b;a++)d[a].style.visibility="visible";a.styles.removeClass({el:document.documentElement,className:"vv-noscroll"})}},reveal({innerContent:a,wrapClass:b="vv-component",modal:c=!1}){const d=window.lodge,e=d.overlay,f=document.body,g=document.createElement("div"),h=document.createElement("div");if(d.embedded)d.events.fire({obj:d,type:"overlayreveal",data:{innerContent:a,wrapClass:b}});else{for(;e.content.firstChild;)e.content.removeChild(e.content.firstChild);g.className="vv-position",h.className=b,"string"==typeof a?h.innerHTML=a:h.appendChild(a),g.appendChild(h),e.content.appendChild(g),d.styles.hasClass({el:document.documentElement,className:"vv-noscroll"})||d.styles.addClass({el:document.documentElement,className:"vv-noscroll"}),e.content.parentNode!==f&&(e.content.style.opacity=0,f.appendChild(e.content),c?(d.overlay.buttonFalse.style.display="inline-block",d.overlay.buttonTrue.style.display="inline-block"):f.appendChild(e.close),window.getComputedStyle(e.content).opacity),e.content.style.opacity=1,d.events.fire({obj:d,type:"overlayrevealed"})}}},styles:{resolveElement(a){return"string"==typeof a?"storage:"===a.substr(0,8)?window.lodge.storage[a.substr(8)]:document.querySelector(a):a},addClass({el:a,className:b,top:c=!1}){const d=window.lodge;c&&d.embedded?d.events.fire({obj:d,type:"addclass",data:{el:a,className:b}}):(a=d.styles.resolveElement(a),a&&!d.styles.hasClass({el:a,className:b})&&(a.className=`${a.className} ${b}`))},hasClass({el:a,className:b}){const c=window.lodge;return a=c.styles.resolveElement(a),-1<` ${a.className} `.indexOf(` ${b} `)},injectCSS({css:a,important:b=!1,top:c=!1}){const d=window.lodge;let e;if(c&&d.embedded)d.events.fire({obj:d,type:"injectcss",data:{css:a,important:b}});else{const c=document.getElementsByTagName("head")[0]||document.documentElement;"http"===a.substr(0,4)?(e=document.createElement("link"),e.rel="stylesheet",e.href=a):(e=document.createElement("style"),e.innerHTML=a),e.type="text/css",b?c.appendChild(e):c.insertBefore(e,c.firstChild)}},removeClass({el:a,className:b,top:c=!1}){const d=window.lodge;c&&d.embedded?d.events.fire({obj:d,type:"removeclass",data:{el:a,className:b}}):(a=d.styles.resolveElement(a),a&&(a.className=` ${a.className} `.replace(` ${b} `," ").replace(/^\s+/,"").replace(/\s+$/,"")))},swapClasses({el:a,oldClass:b,newClass:c,top:d=!1}){const e=window.lodge;d&&e.embedded?e.events.fire({obj:e,type:"swapclasses",data:{el:a,oldClass:b,newClass:c}}):(a=e.styles.resolveElement(a),a&&(a.className=` ${a.className} `.replace(` ${b} `,` ${c} `).replace(/^\s+/,"").replace(/\s+$/,"")))}},prompt:{message({message:a,context:b=!1,button:c="Close"}){const d=window.lodge;let e=`<h2>${a}</h2>`;b&&(e+=`<p>${b}</p>`),c,d.overlay.reveal({innerContent:e})},modal({message:a,context:b,buttons:c={modal0:"Cancel",modal1:"OK"}}){const d=window.lodge;let e=`<h2>${a}</h2>`;b&&(e+=`<p>${b}</p>`),d.overlay.reveal({innerContent:e,modal:!0})}}};return"loading"===document.readyState?document.addEventListener("DOMContentLoaded",a._constructor):a._constructor(),a}());