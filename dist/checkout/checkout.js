(function(){const a=window.lodge;a.braintree={eventAttached:!1,generateToken(b){a.embedded||a.getTemplate({templateName:"checkout",loadCSS:!1,successCallback:function(c){const d=document.createElement("div");d.innerHTML=c,d.className="ccform-wrapper",a.overlay.reveal({innerContent:d});const e=document.querySelector("#braintree-token-form"),f=document.querySelector("#button-pay"),g=document.querySelectorAll("#braintree-token-form input"),h=g.length;for(let b=0;b<h;b++)g[b].addEventListener("focus",function(b){a.styles.addClass({el:b.target.parentNode,className:"braintree-hosted-fields-focused"})}),g[b].addEventListener("blur",function(b){a.styles.removeClass({el:b.target.parentNode,className:"braintree-hosted-fields-focused"})});f.disabled=!0,braintree.client.create({authorization:b.braintree},function(c,g){if(c)return void console.error(c);const h=new Date;braintree.hostedFields.create({client:g,styles:{input:{color:"#282c37","font-size":"16px",transition:"color 0.1s","line-height":"3"},"input.invalid":{color:"#E53A40"},"::-webkit-input-placeholder":{color:"rgba(0,0,0,0.4)"},":-moz-placeholder":{color:"rgba(0,0,0,0.4)"},"::-moz-placeholder":{color:"rgba(0,0,0,0.4)"},":-ms-input-placeholder":{color:"rgba(0,0,0,0.4)"}},fields:{number:{selector:"#card-number",placeholder:"0000 0000 0000 0000"},cvv:{selector:"#cvv",placeholder:"123"},expirationDate:{selector:"#expiration-date",placeholder:`${h.getMonth()} / ${h.getFullYear()+1}`}}},function(c,d){return c?void console.error(c):void(d.on("validityChange",function(b){const c=Object.keys(b.fields).every(function(a){return b.fields[a].isValid});c?(a.styles.addClass({el:f,className:"show-button"}),f.disabled=!1):(a.styles.removeClass({el:f,className:"show-button"}),f.disabled=!0)}),d.on("empty",function(){document.querySelector("#card-image").className="",e.className=""}),d.on("cardTypeChange",function(b){1===b.cards.length?(e.className="",a.styles.addClass({el:e,className:b.cards[0].type}),document.querySelector("#card-image").className="",a.styles.addClass({el:document.querySelector("#card-image"),className:b.cards[0].type}),4===b.cards[0].code.size&&d.setAttribute({field:"cvv",attribute:"placeholder",value:"1234"})):d.setAttribute({field:"cvv",attribute:"placeholder",value:"123"})}),f.addEventListener("click",function(c){c.preventDefault(),d.tokenize(function(c,d){if(c)a.debug.out(c);else{const c=`email=${document.querySelector("#email").value}&firstName=${document.querySelector("#first-name").value}&lastName=${document.querySelector("#last-name").value}&amount=${b.amount}&nonce=${d.nonce}`;a.overlay.showLoading(),a.ajax.send({url:b.endpoint,postString:c,callback:function(c){c?a.overlay.reveal({innerContent:`<h2 class="vv__checkout-error">${b.errorMsg}</h2>`}):a.overlay.reveal({innerContent:`<h2 class="vv__checkout-success">${b.successMsg}</h2>`})}})}})},!1))})})}})}},a.checkout={prepped:!1,prep(){a.checkout.prepped||a.getScript({url:"https://js.braintreegateway.com/web/3.46.0/js/client.min.js",callback:function(){a.getScript({url:"https://js.braintreegateway.com/web/3.46.0/js/hosted-fields.min.js",callback:function(){a.styles.injectCSS({css:`${a.path}/templates/checkout.css`,top:!0}),a.checkout.prepped=!0}})}})},begin(b,c){if(a.embedded)a.events.fire({obj:a,type:"begincheckout",data:b});else{a.checkout.prep();const d=Object.assign({braintree:!1,paypal:!1,currency:!1,firstName:!1,lastName:!1,email:!1,recurring:!1,amount:!1,endpoint:"",successMsg:"Success.",errorMsg:"There was a problem."},b);a.checkout.initiatepayment(d,c)}},initiatepayment(b,c){if(b.braintree&&!b.paypal)a.braintree.generateToken(b,c);else if(!b.braintree&&b.paypal)a.events.fire({obj:a,type:"checkoutdata",data:b,target:c}),a.overlay.reveal({innerContent:"<div class=\"vv__loading\"></div>"});else if(b.braintree&&b.paypal){const d=document.createElement("div");d.className="vv__checkout-choose";const e=document.createElement("span"),f=document.createElement("span");e.innerHTML="Pay with PayPal",e.className="pay-pp",f.innerHTML="Pay with a credit card",f.className="pay-cc",e.addEventListener("click",function(d){d.preventDefault(),d.stopPropagation(),a.events.fire({obj:a,type:"checkoutdata",data:b,target:c}),a.overlay.showLoading()}),f.addEventListener("click",function(d){d.preventDefault(),d.stopPropagation(),a.braintree.generateToken(b.braintree,c)}),d.appendChild(e),d.appendChild(f),a.overlay.reveal({innerContent:d})}else a.checkout.showerror()},showerror(){a.overlay.reveal({innerContent:"<div class=\"vv__checkout-error\">There are no valid payment types. Please add a payment connection. Check to make sure your site supports SSL (https) if you are using Braintree.</div>"})}}})();