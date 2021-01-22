window.lodge||(window.lodge=function e(){const e={embedded:!1,eventlist:{},get:{},lightbox:!1,loaded:!1,id:"",options:"",parent:"",path:"",scripts:[],storage:{},templates:{},_constructor(){const a=window.lodge,t=document.querySelector("script[src$=\"lodge.js\"]");if(t){a.path=t.src.substr(0,t.src.length-9);try{e.options=JSON.parse(`{"${t.getAttribute("data-options").replace(/&/g,"\",\"").replace(/=/g,"\":\"")}"}`)}catch(t){e.options="error"}}if(a._findEmbeds(),a.get.qs=window.location.search.substring(1),a.get.params=!1,a.get.qs){a.get.params={};let e;const t=a.get.qs.split("&");for(let s=0;s<t.length;s++)e=t[s].split("="),a.get.params[e[0]]=decodeURIComponent(e[1])}if(a.get.params.debug&&(a.debug.show=!0),self!==top){if(a.options.noembed)return!1;a.styles.addClass({el:document.documentElement,className:"lodge__embed"}),a._initEmbed()}else a.id="lodge main";a.get.params.overlay&&a.styles.addClass({el:document.documentElement,className:"lodge__embed--overlay"});const s=document.querySelectorAll("a.lodge.gallery,div.lodge.gallery");(a.options.lightboxvideo||0<s.length)&&a.getScript({url:`${a.path}/lightbox/lightbox.js`}),window.addEventListener("message",function(t){-1!==a.embeds.allowed.indexOf(t.origin)&&a._handleMessage(t)}),a.embeds.allowed+=window.location.href.split("/").slice(0,3).join("/"),a.get.params.location&&(a.embeds.allowed+=a.get.params.location.split("/").slice(0,3).join("/")),a.embedded||a.overlay.create(),a.loaded=Date.now(),a._drawQueuedEmbeds(),a.debug.out({message:"finished initializing",obj:a}),a.events.fire({obj:a,type:"ready",data:a.loaded})},_findEmbeds(){const a=document.querySelectorAll("embed.lodge");if("object"==typeof a){const s=Array.prototype.slice.call(a);s.forEach(function(t){t.style.height="1px",t.style.visibility="hidden";const a=t.getAttribute("src"),s=t.getAttribute("title"),l=t.getAttribute("data-css"),n=t.getAttribute("id"),d=e.styles.hasClass({el:t,className:"overlay"}),o=e.styles.hasClass({el:t,className:"forwardquery"});a&&e.embeds.create({src:a,alt:s,target:t,css:l,id:n,overlay:d,forwardquery:o})})}},_drawQueuedEmbeds(){const e=window.lodge;"object"==typeof e.storage.elementQueue&&e.storage.elementQueue.forEach(function(t){e.embeds.create(t)})},_initEmbed(){const e=window.lodge;e.embedded=!0,e.get.params.lodgelocation&&(e.parent=e.get.params.lodgelocation,e.embeds.allowed=`${e.embeds.allowed},${e.parent}`),e.id=e.get.params.id?e.get.params.id:window.location.href,e.get.params.cssoverride&&e.styles.injectCSS({css:e.get.params.cssoverride,important:!0}),e.get.params.fixedsize||(e.storage.embedheight=e.measure.scrollheight(),e.events.fire({obj:e,type:"resize",data:{height:e.storage.embedheight}}),window.setInterval(function(){const t=e.measure.scrollheight();t!==e.storage.embedheight&&(e.storage.embedheight=t,e.events.fire({obj:e,type:"resize",data:{height:t}}))},125))},_handleMessage(e){const t=window.lodge,a=JSON.parse(e.data),s={addclass:{handler:"styles.addClass"},begincheckout:{handler:"checkout.begin",require:"checkout/checkout.js"},injectcss:{handler:"styles.injectCSS"},overlayhide:{handler:"overlay.hide"},overlayreveal:{handler:"overlay.reveal"},overlaysetloading:{handler:"overlay.setLoading"},removeclass:{handler:"styles.removeClass"},resize:{handler:"embeds.resize"},swapclasses:{handler:"styles.swapClasses"}};let l=!1;if(t.embedded&&window.parent===e.source)l=!0;else for(let s=0;s<t.embeds.all.length;s++)if(t.embeds.all[s].el.contentWindow===e.source){l=!0,t.embeds.all[s].el.source||(t.embeds.all[s].source=e.source),a.data._source=t.embeds.all[s];break}if(l)if(s[a.type]){const e=s[a.type].handler.split("."),l=e.pop();let n=t;e.length&&(n=t[e[0]]),s[a.type].require?t.getScript({url:`${t.path}/${s[a.type].require}`,callback:function(){n[l](a.data)}}):n[l](a.data)}else"ready"!==a.type&&t.events.fire({obj:t,type:a.type,data:a.data,target:!1,localonly:!0})},getTemplate({templateName:e,successCallback:t,loadCSS:a=!0}){const s=window.lodge,{templates:l}=s;if(void 0!==l[e])t(l[e]);else if(this.ajax.jsonp({url:`${s.path}/templates/${e}.js`,callback:function(a){l[e]=a.template,t(a.template)},remoteCallback:`_${e}Callback`}),a){const t=document.querySelectorAll(`link[href="${s.path}/templates/${e}.css"]`);t.length||s.styles.injectCSS({css:`${s.path}/templates/${e}.css`})}},getScript({url:e,callback:t}){const a=window.lodge;if(-1<a.scripts.indexOf(e))"function"==typeof t&&t();else{a.scripts.push(e);const s=document.getElementsByTagName("head")[0]||document.documentElement,l=document.createElement("script");l.src=e;let n=!1;l.onload=l.onreadystatechange=function(){n||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(n=!0,"function"==typeof t&&t(),l.onload=l.onreadystatechange=null,s&&l.parentNode&&s.removeChild(l))},s.insertBefore(l,s.firstChild)}a.debug.out({message:`loaded script: ${e}`})},embeds:{allowed:"",all:[],create({src:e,alt:l="open",target:t,css:a,id:s,overlay:n=!1,forwardquery:d=!1}){const o=window.lodge;let r;if(!o.loaded)"object"!=typeof o.storage.elementQueue&&(o.storage.elementQueue=[]),o.storage.elementQueue.push({src:e,alt:l,target:t,css:a,id:s,overlay:n,forwardquery:d});else if(r="string"==typeof targetNode?document.querySelector(t):t,r){const t={src:e,css:a,overlay:n,id:s,forwardquery:d};if(n){const e=document.createElement("span");e.className="lodge__overlay-open",o.overlay.create(function(){const s=document.createElement("a");s.href="",s.target="_blank",s.innerHTML=l,e.appendChild(s),r.parentNode.insertBefore(e,r),function(){s.addEventListener("click",function(a){o.overlay.reveal({innerContent:t,embedRequest:!0}),a.preventDefault()})}()})}else{const e=o.embeds.buildIframe(t);r.parentNode.insertBefore(e,r)}"EMBED"===r.tagName&&r.parentNode.removeChild(r)}},buildIframe({src:e,css:t,overlay:a,id:s,forwardquery:l=!1}){const n=window.lodge,d=document.createElement("iframe");let o=e;const r=encodeURIComponent(`${location.protocol}//${location.hostname}${location.port?`:${location.port}`:""}`);s||(s=`lodge__${new Date().getTime()}`),o+=`?lodgelocation=${r}&id=${s}`,t&&(o+=`&cssoverride=${encodeURIComponent(t)}`),l&&(o+=`&${n.get.qs}`),a&&(o+="&overlay=1"),n.debug.show&&(o+=`&debug=true`),d.src=o,d.id=s,d.className="lodge__embed",d.style.width="100%",d.style.height="0",d.style.border="0",d.style.overflow="hidden",d.style.display="block",d.scrolling="no";let i=window.location;return o.includes("://")&&(i=o.split("/").slice(0,3).join("/"),-1===n.embeds.allowed.indexOf(i)&&(n.embeds.allowed+=`,${i}`)),n.embeds.all.push({id:s,el:d,src:e,source:null,origin:i}),n.debug.out({message:`building iframe for ${s}`}),d},resize({_source:e,height:t}){const a=e.el;a.height=t,a.style.height=`${t}px`},getById(e){const t=window.lodge;let a=!1;for(let s=0;s<t.embeds.all.length;s++)if(t.embeds.all[s].id===e){a=t.embeds.all[s];break}return a}},debug:{show:!1,store({message:e,obj:t}){const a=window.lodge;a.storage.debug||(a.storage.debug=[]),a.storage.debug.push({message:e,obj:t})},out({message:e,obj:t}){const a=window.lodge;if(a.debug.show){if(!a.loaded)return void a.debug.store({message:e,obj:t});const s={main:{logo:"color:#093;font-weight:bold;",name:"color:#093;font-weight:bold;",message:"font-weight:normal;"},embed:{logo:"color:#69f;font-weight:bold;",name:"color:#69f;font-weight:bold;",message:"font-weight:normal;"}};let l="main",n="\u25B3\u25B3";a.embedded&&(l="embed",n="\u25BD\u25BD"),a.storage.debug?(console.groupCollapsed(`%c${n}%c ${a.id}:%c\n   ${e}`,s[l].logo,s[l].name,s[l].message),t&&console.log("   attachment: %O",t),a.storage.debug.forEach(function(e){e.o?console.log(`   ${e.message} %O`,e.obj):console.log(`   ${e.message}`)}),console.groupEnd(),delete a.storage.debug):t?console.log(`%c${n}%c ${a.id}:%c\n   ${e} %O`,s[l].logo,s[l].name,s[l].message,t):console.log(`%c${n}%c ${a.id}:%c\n   ${e}`,s[l].logo,s[l].name,s[l].message)}}},ajax:{send({url:e,postString:a=null,callback:t}){let s="POST";a||(s="GET");const l=new XMLHttpRequest;l&&(l.open(s,e,!0),l.setRequestHeader("X-Requested-With","XMLHttpRequest"),"POST"===s&&l.setRequestHeader("Content-type","application/x-www-form-urlencoded"),"function"==typeof t&&(l.onreadystatechange=function(){4===l.readyState&&(200<=l.status&&299>=l.status?t(null,l.responseText):t({error:l.responseText},null))}),l.send(a))},jsonp({url:e,callback:t,remoteCallback:a="callback"}){window[a]=function(e){t(e),delete window[a]};const l=document.createElement("script");l.setAttribute("src",e),document.getElementsByTagName("head")[0].appendChild(l)},encodeForm(e){if("object"!=typeof e)return!1;let t="";e=e.elements||e;for(let a=0;a<e.length;a++){if("checkbox"===e[a].type||"radio"===e[a].type){e[a].checked&&(t+=`${(t.length?"&":"")+e[a].name}=${e[a].value}`);continue}t+=`${(t.length?"&":"")+e[a].name}=${e[a].value}`}return encodeURI(t)}},addEventListener(e,t){const a=window.lodge;a.events.addListener(e,t)},removeEventListener(e,t){const a=window.lodge;a.events.removeListener(e,t)},dispatchEvent(t){const e=window.lodge;e.events.dispatch(t)},events:{fire({obj:t,type:a,data:l="",target:s,echoTarget:n=!1,localonly:d=!1}){const o=window.lodge;let r=!0;if(s&&("string"==typeof s?s=o.embeds.getById(s):(!s.source||!s.origin)&&(s=!1),s&&s.source.postMessage(JSON.stringify({type:a,data:l}),s.origin),o.debug.out({message:`targeted ${s.id} with ${a} event.`,obj:l}),r=!1),!s||s&&n){let s=null;s=document.createEvent("CustomEvent"),s.initCustomEvent(a,!1,!1,l),o.embedded&&!d&&(s.relay=r,s.source=window,s.origin=window.location.origin),t.dispatchEvent(s),s.relay&&o.events.relay({type:a,data:l});let e="firing ";s.relay&&(e="relaying "),o.debug.out({message:`${e+a} event.`,obj:l})}},relay({type:e,data:t}){const a=window.lodge;let s="*";a.parent&&(s=a.parent),window.parent.postMessage(JSON.stringify({relay:!0,type:e,data:t}),s)},addListener(e,t){const a=window.lodge;a.eventlist.hasOwnProperty(e)||(a.eventlist[e]=[]),a.eventlist[e].push(t)},removeListener(e,t){const a=window.lodge;if(a.eventlist.hasOwnProperty(e)){const s=a.eventlist[e].indexOf(t);-1!==s&&a.eventlist[e].splice(s,1)}},dispatch(t){const e=window.lodge;if(e.eventlist.hasOwnProperty(t.type)){let a;for(a=0;a<e.eventlist[t.type].length;a++)e.eventlist[t.type][a]&&e.eventlist[t.type][a](t)}}},measure:{viewport(){return{x:window.innerWidth||document.body.offsetWidth||0,y:window.innerHeight||document.body.offsetHeight||0}},scrollheight(){var e=Math.max;const t=document.body,a=document.documentElement;return e(t.scrollHeight,t.offsetHeight,a.offsetHeight,t.clientHeight)}},validate:{email(e){return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test((e+"").toLowerCase())}},overlay:{content:!1,close:!1,loadingContent:!1,callbacks:[],setLoading({loadString:e}){const t=window.lodge;t.overlay.loadingContent=e.toString(),t.embedded&&t.events.fire({obj:t,type:"overlaysetloading",data:{loadString:t.overlay.loadingContent}})},showLoading(){const e=window.lodge;e.overlay.loadingContent&&e.overlay.reveal({innerContent:e.overlay.loadingContent})},create(e){const t=window.lodge,a=t.overlay;t.styles.injectCSS({css:`${t.path}/templates/overlay.css`}),a.content=document.createElement("div"),a.content.className="lodge__overlay",document.addEventListener("keyup",function(t){"Escape"===t.key&&a.content.parentNode===document.body&&a.hide()}),a.close=document.createElement("div"),a.close.className="lodge__close",a.close.addEventListener("click",function(){a.content.parentNode===document.body&&a.hide()}),a.buttons=document.createElement("div"),a.buttons.className="lodge__buttons",a.buttonTrue=document.createElement("button"),a.buttonTrue.style.display="none",a.buttonFalse=document.createElement("button"),a.buttonFalse.style.display="none",a.buttons.dataset.queryName="",a.buttons.dataset.srcEmbed="",a.buttonTrue.addEventListener("click",function(s){s.preventDefault(),t.events.fire({obj:t,type:"modalchoice",data:{modal:1,queryName:a.buttons.dataset.queryName,buttonText:a.buttonTrue.textContent},target:a.buttons.dataset.srcEmbed,echoTarget:!0}),window.lodge.overlay.hide()}),a.buttonFalse.addEventListener("click",function(s){s.preventDefault(),t.events.fire({obj:t,type:"modalchoice",data:{modal:0,queryName:a.buttons.dataset.queryName,buttonText:a.buttonFalse.textContent},target:a.buttons.dataset.srcEmbed,echoTarget:!0}),window.lodge.overlay.hide()}),a.buttons.appendChild(a.buttonTrue),a.buttons.appendChild(a.buttonFalse),"function"==typeof e&&e()},hide(){const e=window.lodge,a=e.overlay,s=document.body;if(e.embedded)e.events.fire({obj:e,type:"overlayhide"});else{for(e.events.fire({obj:e,type:"overlayhidden"});a.content.firstChild;)a.content.removeChild(a.content.firstChild);a.close.parentNode===s&&s.removeChild(a.close),s.removeChild(a.content);const l=document.querySelectorAll(".lodge__overlaytrigger");if(0<l.length)for(let e=0,t=l.length;e<t;e++)l[e].style.visibility="visible";a.buttonTrue.style.display="none",a.buttonFalse.style.display="none",a.buttons.dataset.queryName="",a.buttons.dataset.srcEmbed="",e.styles.removeClass({el:document.documentElement,className:"lodge__noscroll"})}},reveal({innerContent:e,wrapClass:t="lodge__component",modal:a=!1,buttons:s=!1,embedRequest:l=!1}){const n=window.lodge,d=n.overlay,o=document.body,r=document.createElement("div"),i=document.createElement("div");if(n.embedded)n.events.fire({obj:n,type:"overlayreveal",data:{innerContent:e,wrapClass:t,modal:a,buttons:s,embedRequest:l}});else{for(;d.content.firstChild;)d.content.removeChild(d.content.firstChild);if(r.className="lodge__position",i.className=t,l){const t=e;e=n.embeds.buildIframe(t)}"string"==typeof e?i.innerHTML=e:i.appendChild(e),r.appendChild(i),d.content.appendChild(r),n.styles.hasClass({el:document.documentElement,className:"lodge__noscroll"})||n.styles.addClass({el:document.documentElement,className:"lodge__noscroll"}),a||o.appendChild(d.close),s&&(s.modal0&&(d.buttonFalse.textContent=s.modal0,d.buttonFalse.style.display="inline-block"),s.modal1&&(d.buttonTrue.textContent=s.modal1,d.buttonTrue.style.display="inline-block"),s.queryName&&(d.buttons.dataset.queryName=s.queryName),s.srcEmbed&&(d.buttons.dataset.srcEmbed=s.srcEmbed),i.appendChild(d.buttons)),d.content.parentNode!==o&&(d.content.style.opacity=0,o.appendChild(d.content),window.getComputedStyle(d.content).opacity),d.content.style.opacity=1,n.events.fire({obj:n,type:"overlayrevealed"})}}},styles:{resolveElement(e){return"string"==typeof e?"storage:"===e.substr(0,8)?window.lodge.storage[e.substr(8)]:document.querySelector(e):e},addClass({el:e,className:t,top:a=!1}){const s=window.lodge;a&&s.embedded?s.events.fire({obj:s,type:"addclass",data:{el:e,className:t}}):(e=s.styles.resolveElement(e),e&&!s.styles.hasClass({el:e,className:t})&&(e.className=`${e.className} ${t}`))},hasClass({el:e,className:t}){const a=window.lodge;return e=a.styles.resolveElement(e),-1<` ${e.className} `.indexOf(` ${t} `)},injectCSS({css:e,important:t=!1,top:a=!1}){const s=window.lodge;let l;if(a&&s.embedded)s.events.fire({obj:s,type:"injectcss",data:{css:e,important:t}});else{const a=document.getElementsByTagName("head")[0]||document.documentElement;"http"===e.substr(0,4)?(l=document.createElement("link"),l.rel="stylesheet",l.href=e):(l=document.createElement("style"),l.innerHTML=e),l.type="text/css",t?a.appendChild(l):a.insertBefore(l,a.firstChild)}},removeClass({el:e,className:t,top:a=!1}){const s=window.lodge;a&&s.embedded?s.events.fire({obj:s,type:"removeclass",data:{el:e,className:t}}):(e=s.styles.resolveElement(e),e&&(e.className=` ${e.className} `.replace(` ${t} `," ").replace(/^\s+/,"").replace(/\s+$/,"")))},swapClasses({el:e,oldClass:t,newClass:a,top:s=!1}){const l=window.lodge;s&&l.embedded?l.events.fire({obj:l,type:"swapclasses",data:{el:e,oldClass:t,newClass:a}}):(e=l.styles.resolveElement(e),e&&(e.className=` ${e.className} `.replace(` ${t} `,` ${a} `).replace(/^\s+/,"").replace(/\s+$/,"")))}},prompt:{message({message:e,context:t=!1,button:a="Close"}){const s=window.lodge;let l=`<h2>${e}</h2>`,n=!1;t&&(l+=`<p>${t}</p>`),a&&(n={modal0:a,modal1:!1}),s.overlay.reveal({innerContent:l,buttons:n})},modal({message:e,context:t,buttons:a={modal0:"Cancel",modal1:"OK"},queryName:s=""}){const l=window.lodge;a.queryName=s,a.srcEmbed=l.id;let n=`<h2>${e}</h2>`;t&&(n+=`<p>${t}</p>`),l.overlay.reveal({innerContent:n,modal:!0,buttons:a})}}};return"loading"===document.readyState?document.addEventListener("DOMContentLoaded",e._constructor):e._constructor(),e}());
//# sourceMappingURL=lodge.js.map