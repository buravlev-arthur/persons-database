import{j as ae,c as S,h as E,m as se,V as Ie,W as Oe,k as W,X as ce,Y as qe,Z as Ee,g as j,q as ne,w as U,_ as Re,o as xe,$ as R,r as P,a as Ne,a0 as Ue,a1 as We,a2 as je,a3 as Ge,a4 as x,s as T,a5 as Xe,a6 as Ye,a7 as Be,l as de,a8 as Je,a9 as Ze,B as et,C as tt,E as ot,G as lt,H as k,I as K,f as w,L as H,J as _,K as nt,aa as fe}from"./index.b0846524.js";import{r as me,a as at,b as st,Q as it,c as rt}from"./QForm.e008005b.js";import{Q as ut,a as ct}from"./QCard.783d5ef5.js";import{u as dt,a as ft}from"./use-transition.401a05f6.js";import{b as mt,a as vt,h as pt}from"./scroll.68270bc6.js";import{Q as ht}from"./QPage.22761661.js";import{F as q,i as gt,a as wt,b as yt}from"./shared.11b2290b.js";import{a as bt,b as Pt,c as _t,u as kt}from"./index.17631ce7.js";import{u as qt}from"./vue-i18n.runtime.esm-bundler.3cfb172c.js";import{u as Et}from"./store.ee215695.js";import"./use-dark.2c6a9be7.js";import"./axios.7331a07d.js";var xt=ae({name:"QBtnGroup",props:{unelevated:Boolean,outline:Boolean,flat:Boolean,rounded:Boolean,square:Boolean,push:Boolean,stretch:Boolean,glossy:Boolean,spread:Boolean},setup(e,{slots:t}){const o=S(()=>{const l=["unelevated","outline","flat","rounded","square","push","stretch","glossy"].filter(n=>e[n]===!0).map(n=>`q-btn-group--${n}`).join(" ");return`q-btn-group row no-wrap${l.length!==0?" "+l:""}`+(e.spread===!0?" q-btn-group--spread":" inline")});return()=>E("div",{class:o.value},se(t.default))}}),Bt=ae({name:"QCardActions",props:{...Ie,vertical:Boolean},setup(e,{slots:t}){const o=Oe(e),l=S(()=>`q-card__actions ${o.value} q-card__actions--${e.vertical===!0?"vert column":"horiz row"}`);return()=>E("div",{class:l.value},se(t.default))}});function Tt(e,t,o){let l;function n(){l!==void 0&&(ce.remove(l),l=void 0)}return W(()=>{e.value===!0&&n()}),{removeFromHistory:n,addToHistory(){l={condition:()=>o.value===!0,handler:t},ce.add(l)}}}function Ct(){let e=null;const t=j();function o(){e!==null&&(clearTimeout(e),e=null)}return qe(o),W(o),{removeTimeout:o,registerTimeout(l,n){o(),Ee(t)===!1&&(e=setTimeout(l,n))}}}function St(){let e;const t=j();function o(){e=void 0}return qe(o),W(o),{removeTick:o,registerTick(l){e=l,ne(()=>{e===l&&(Ee(t)===!1&&e(),e=void 0)})}}}const Vt={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},Lt=["beforeShow","show","beforeHide","hide"];function Ht({showing:e,canShow:t,hideOnRouteChange:o,handleShow:l,handleHide:n,processOnMount:m}){const i=j(),{props:r,emit:c,proxy:u}=i;let v;function g(a){e.value===!0?d(a):y(a)}function y(a){if(r.disable===!0||a!==void 0&&a.qAnchorHandled===!0||t!==void 0&&t(a)!==!0)return;const b=r["onUpdate:modelValue"]!==void 0;b===!0&&(c("update:modelValue",!0),v=a,ne(()=>{v===a&&(v=void 0)})),(r.modelValue===null||b===!1)&&B(a)}function B(a){e.value!==!0&&(e.value=!0,c("beforeShow",a),l!==void 0?l(a):c("show",a))}function d(a){if(r.disable===!0)return;const b=r["onUpdate:modelValue"]!==void 0;b===!0&&(c("update:modelValue",!1),v=a,ne(()=>{v===a&&(v=void 0)})),(r.modelValue===null||b===!1)&&f(a)}function f(a){e.value!==!1&&(e.value=!1,c("beforeHide",a),n!==void 0?n(a):c("hide",a))}function p(a){r.disable===!0&&a===!0?r["onUpdate:modelValue"]!==void 0&&c("update:modelValue",!1):a===!0!==e.value&&(a===!0?B:f)(v)}U(()=>r.modelValue,p),o!==void 0&&Re(i)===!0&&U(()=>u.$route.fullPath,()=>{o.value===!0&&e.value===!0&&d()}),m===!0&&xe(()=>{p(r.modelValue)});const D={show:y,hide:d,toggle:g};return Object.assign(u,D),D}const N=[];function Ft(e){return N.find(t=>t.contentEl!==null&&t.contentEl.contains(e))}function Dt(e,t){do{if(e.$options.name==="QMenu"){if(e.hide(t),e.$props.separateClosePopup===!0)return R(e)}else if(e.__qPortal===!0){const o=R(e);return o!==void 0&&o.$options.name==="QPopupProxy"?(e.hide(t),o):e}e=R(e)}while(e!=null)}function $t(e,t,o){for(;o!==0&&e!==void 0&&e!==null;){if(e.__qPortal===!0){if(o--,e.$options.name==="QMenu"){e=Dt(e,t);continue}e.hide(t)}e=R(e)}}function Qt(e){for(e=e.parent;e!=null;){if(e.type.name==="QGlobalDialog")return!0;if(e.type.name==="QDialog"||e.type.name==="QMenu")return!1;e=e.parent}return!1}function Mt(e,t,o,l){const n=P(!1),m=P(!1);let i=null;const r={},c=l==="dialog"&&Qt(e);function u(g){if(g===!0){me(r),m.value=!0;return}m.value=!1,n.value===!1&&(c===!1&&i===null&&(i=je(!1,l)),n.value=!0,N.push(e.proxy),at(r))}function v(g){if(m.value=!1,g!==!0)return;me(r),n.value=!1;const y=N.indexOf(e.proxy);y!==-1&&N.splice(y,1),i!==null&&(Ge(i),i=null)}return Ne(()=>{v(!0)}),e.proxy.__qPortal=!0,Ue(e.proxy,"contentEl",()=>t.value),{showPortal:u,hidePortal:v,portalIsActive:n,portalIsAccessible:m,renderPortal:()=>c===!0?o():n.value===!0?[E(We,{to:i},o())]:void 0}}let Q=0,te,oe,M,le=!1,ve,pe,he,C=null;function At(e){zt(e)&&Xe(e)}function zt(e){if(e.target===document.body||e.target.classList.contains("q-layout__backdrop"))return!0;const t=Ye(e),o=e.shiftKey&&!e.deltaX,l=!o&&Math.abs(e.deltaX)<=Math.abs(e.deltaY),n=o||l?e.deltaY:e.deltaX;for(let m=0;m<t.length;m++){const i=t[m];if(pt(i,l))return l?n<0&&i.scrollTop===0?!0:n>0&&i.scrollTop+i.clientHeight===i.scrollHeight:n<0&&i.scrollLeft===0?!0:n>0&&i.scrollLeft+i.clientWidth===i.scrollWidth}return!0}function ge(e){e.target===document&&(document.scrollingElement.scrollTop=document.scrollingElement.scrollTop)}function I(e){le!==!0&&(le=!0,requestAnimationFrame(()=>{le=!1;const{height:t}=e.target,{clientHeight:o,scrollTop:l}=document.scrollingElement;(M===void 0||t!==window.innerHeight)&&(M=o-t,document.scrollingElement.scrollTop=l),l>M&&(document.scrollingElement.scrollTop-=Math.ceil((l-M)/8))}))}function we(e){const t=document.body,o=window.visualViewport!==void 0;if(e==="add"){const{overflowY:l,overflowX:n}=window.getComputedStyle(t);te=mt(window),oe=vt(window),ve=t.style.left,pe=t.style.top,he=window.location.href,t.style.left=`-${te}px`,t.style.top=`-${oe}px`,n!=="hidden"&&(n==="scroll"||t.scrollWidth>window.innerWidth)&&t.classList.add("q-body--force-scrollbar-x"),l!=="hidden"&&(l==="scroll"||t.scrollHeight>window.innerHeight)&&t.classList.add("q-body--force-scrollbar-y"),t.classList.add("q-body--prevent-scroll"),document.qScrollPrevented=!0,x.is.ios===!0&&(o===!0?(window.scrollTo(0,0),window.visualViewport.addEventListener("resize",I,T.passiveCapture),window.visualViewport.addEventListener("scroll",I,T.passiveCapture),window.scrollTo(0,0)):window.addEventListener("scroll",ge,T.passiveCapture))}x.is.desktop===!0&&x.is.mac===!0&&window[`${e}EventListener`]("wheel",At,T.notPassive),e==="remove"&&(x.is.ios===!0&&(o===!0?(window.visualViewport.removeEventListener("resize",I,T.passiveCapture),window.visualViewport.removeEventListener("scroll",I,T.passiveCapture)):window.removeEventListener("scroll",ge,T.passiveCapture)),t.classList.remove("q-body--prevent-scroll"),t.classList.remove("q-body--force-scrollbar-x"),t.classList.remove("q-body--force-scrollbar-y"),document.qScrollPrevented=!1,t.style.left=ve,t.style.top=pe,window.location.href===he&&window.scrollTo(te,oe),M=void 0)}function Kt(e){let t="add";if(e===!0){if(Q++,C!==null){clearTimeout(C),C=null;return}if(Q>1)return}else{if(Q===0||(Q--,Q>0))return;if(t="remove",x.is.ios===!0&&x.is.nativeMobile===!0){C!==null&&clearTimeout(C),C=setTimeout(()=>{we(t),C=null},100);return}}we(t)}function It(){let e;return{preventBodyScroll(t){t!==e&&(e!==void 0||t===!0)&&(e=t,Kt(t))}}}const V=[];let F;function Ot(e){F=e.keyCode===27}function Rt(){F===!0&&(F=!1)}function Nt(e){F===!0&&(F=!1,Be(e,27)===!0&&V[V.length-1](e))}function Te(e){window[e]("keydown",Ot),window[e]("blur",Rt),window[e]("keyup",Nt),F=!1}function Ut(e){x.is.desktop===!0&&(V.push(e),V.length===1&&Te("addEventListener"))}function ye(e){const t=V.indexOf(e);t>-1&&(V.splice(t,1),V.length===0&&Te("removeEventListener"))}const L=[];function Ce(e){L[L.length-1](e)}function Wt(e){x.is.desktop===!0&&(L.push(e),L.length===1&&document.body.addEventListener("focusin",Ce))}function be(e){const t=L.indexOf(e);t>-1&&(L.splice(t,1),L.length===0&&document.body.removeEventListener("focusin",Ce))}let O=0;const jt={standard:"fixed-full flex-center",top:"fixed-top justify-center",bottom:"fixed-bottom justify-center",right:"fixed-right items-center",left:"fixed-left items-center"},Pe={standard:["scale","scale"],top:["slide-down","slide-up"],bottom:["slide-up","slide-down"],right:["slide-left","slide-right"],left:["slide-right","slide-left"]};var Gt=ae({name:"QDialog",inheritAttrs:!1,props:{...Vt,...dt,transitionShow:String,transitionHide:String,persistent:Boolean,autoClose:Boolean,allowFocusOutside:Boolean,noEscDismiss:Boolean,noBackdropDismiss:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,noShake:Boolean,seamless:Boolean,maximized:Boolean,fullWidth:Boolean,fullHeight:Boolean,square:Boolean,position:{type:String,default:"standard",validator:e=>e==="standard"||["top","bottom","left","right"].includes(e)}},emits:[...Lt,"shake","click","escapeKey"],setup(e,{slots:t,emit:o,attrs:l}){const n=j(),m=P(null),i=P(!1),r=P(!1);let c=null,u=null,v,g;const y=S(()=>e.persistent!==!0&&e.noRouteDismiss!==!0&&e.seamless!==!0),{preventBodyScroll:B}=It(),{registerTimeout:d}=Ct(),{registerTick:f,removeTick:p}=St(),{transitionProps:D,transitionStyle:a}=ft(e,()=>Pe[e.position][0],()=>Pe[e.position][1]),{showPortal:b,hidePortal:ie,portalIsAccessible:Se,renderPortal:Ve}=Mt(n,m,Ke,"dialog"),{hide:A}=Ht({showing:i,hideOnRouteChange:y,handleShow:Qe,handleHide:Me,processOnMount:!0}),{addToHistory:Le,removeFromHistory:He}=Tt(i,A,y),Fe=S(()=>`q-dialog__inner flex no-pointer-events q-dialog__inner--${e.maximized===!0?"maximized":"minimized"} q-dialog__inner--${e.position} ${jt[e.position]}`+(r.value===!0?" q-dialog__inner--animating":"")+(e.fullWidth===!0?" q-dialog__inner--fullwidth":"")+(e.fullHeight===!0?" q-dialog__inner--fullheight":"")+(e.square===!0?" q-dialog__inner--square":"")),z=S(()=>i.value===!0&&e.seamless!==!0),De=S(()=>e.autoClose===!0?{onClick:Ae}:{}),$e=S(()=>[`q-dialog fullscreen no-pointer-events q-dialog--${z.value===!0?"modal":"seamless"}`,l.class]);U(()=>e.maximized,s=>{i.value===!0&&Y(s)}),U(z,s=>{B(s),s===!0?(Wt(J),Ut(X)):(be(J),ye(X))});function Qe(s){Le(),u=e.noRefocus===!1&&document.activeElement!==null?document.activeElement:null,Y(e.maximized),b(),r.value=!0,e.noFocus!==!0?(document.activeElement!==null&&document.activeElement.blur(),f($)):p(),d(()=>{if(n.proxy.$q.platform.is.ios===!0){if(e.seamless!==!0&&document.activeElement){const{top:h,bottom:Z}=document.activeElement.getBoundingClientRect(),{innerHeight:ue}=window,ee=window.visualViewport!==void 0?window.visualViewport.height:ue;h>0&&Z>ee/2&&(document.scrollingElement.scrollTop=Math.min(document.scrollingElement.scrollHeight-ee,Z>=ue?1/0:Math.ceil(document.scrollingElement.scrollTop+Z-ee/2))),document.activeElement.scrollIntoView()}g=!0,m.value.click(),g=!1}b(!0),r.value=!1,o("show",s)},e.transitionDuration)}function Me(s){p(),He(),re(!0),r.value=!0,ie(),u!==null&&(((s&&s.type.indexOf("key")===0?u.closest('[tabindex]:not([tabindex^="-"])'):void 0)||u).focus(),u=null),d(()=>{ie(!0),r.value=!1,o("hide",s)},e.transitionDuration)}function $(s){st(()=>{let h=m.value;h===null||h.contains(document.activeElement)===!0||(h=(s!==""?h.querySelector(s):null)||h.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||h.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||h.querySelector("[autofocus], [data-autofocus]")||h,h.focus({preventScroll:!0}))})}function G(s){s&&typeof s.focus=="function"?s.focus({preventScroll:!0}):$(),o("shake");const h=m.value;h!==null&&(h.classList.remove("q-animate--scale"),h.classList.add("q-animate--scale"),c!==null&&clearTimeout(c),c=setTimeout(()=>{c=null,m.value!==null&&(h.classList.remove("q-animate--scale"),$())},170))}function X(){e.seamless!==!0&&(e.persistent===!0||e.noEscDismiss===!0?e.maximized!==!0&&e.noShake!==!0&&G():(o("escapeKey"),A()))}function re(s){c!==null&&(clearTimeout(c),c=null),(s===!0||i.value===!0)&&(Y(!1),e.seamless!==!0&&(B(!1),be(J),ye(X))),s!==!0&&(u=null)}function Y(s){s===!0?v!==!0&&(O<1&&document.body.classList.add("q-body--dialog"),O++,v=!0):v===!0&&(O<2&&document.body.classList.remove("q-body--dialog"),O--,v=!1)}function Ae(s){g!==!0&&(A(s),o("click",s))}function ze(s){e.persistent!==!0&&e.noBackdropDismiss!==!0?A(s):e.noShake!==!0&&G()}function J(s){e.allowFocusOutside!==!0&&Se.value===!0&&Je(m.value,s.target)!==!0&&$('[tabindex]:not([tabindex="-1"])')}Object.assign(n.proxy,{focus:$,shake:G,__updateRefocusTarget(s){u=s||null}}),W(re);function Ke(){return E("div",{role:"dialog","aria-modal":z.value===!0?"true":"false",...l,class:$e.value},[E(de,{name:"q-transition--fade",appear:!0},()=>z.value===!0?E("div",{class:"q-dialog__backdrop fixed-full",style:a.value,"aria-hidden":"true",tabindex:-1,onClick:ze}):null),E(de,D.value,()=>i.value===!0?E("div",{ref:m,class:Fe.value,style:a.value,tabindex:-1,...De.value},se(t.default)):null)])}return Ve}});function _e(e){if(e===!1)return 0;if(e===!0||e===void 0)return 1;const t=parseInt(e,10);return isNaN(t)?0:t}var ke=Ze({name:"close-popup",beforeMount(e,{value:t}){const o={depth:_e(t),handler(l){o.depth!==0&&setTimeout(()=>{const n=Ft(e);n!==void 0&&$t(n,l,o.depth)})},handlerKey(l){Be(l,13)===!0&&o.handler(l)}};e.__qclosepopup=o,e.addEventListener("click",o.handler),e.addEventListener("keyup",o.handlerKey)},updated(e,{value:t,oldValue:o}){t!==o&&(e.__qclosepopup.depth=_e(t))},beforeUnmount(e){const t=e.__qclosepopup;e.removeEventListener("click",t.handler),e.removeEventListener("keyup",t.handlerKey),delete e.__qclosepopup}});const Xt={id:"search_block"},Yt={class:"row justify-center q-mt-sm"},Jt={class:"q-ml-sm"},fo=et({__name:"SearchPage",setup(e){const{t}=qt(),o={[q.Phone]:{mask:"+7 (###) ###-##-##",placeholder:"+7 (___) ___-__-__",rules:[d=>d&&gt(d)||t("searchPage.phoneHint")],action:bt},[q.VK]:{mask:void 0,placeholder:t("searchPage.vkPlaceholder"),rules:[d=>d&&wt(d)||t("searchPage.vkHint")],action:Pt},[q.Name]:{mask:void 0,placeholder:t("searchPage.namePlaceholder"),rules:[d=>d&&yt(d)||t("searchPage.nameHint")],action:_t}},l=kt(),n=tt(),m=Et(),i=P(!1),r=P(null),c=P(null),u=P(q.Phone),v=P(!1),g=d=>{var f,p;u.value=d,(f=r.value)==null||f.reset(),(p=r.value)==null||p.focus(),setTimeout(()=>{c.value=null},0)},y=async()=>{var d,f,p;if(r.value&&await((d=r.value)==null?void 0:d.validate()))try{v.value=!0;const a=await o[u.value].action(c.value);m.foundPersonData=a,n.push("/results")}catch(a){if(((p=(f=a.response)==null?void 0:f.status)!=null?p:0)===404){i.value=!0;return}l.notify({type:"negative",message:t("searchPage.searchError"),actions:[{icon:"close",color:"white",round:!0}]})}finally{v.value=!1}},B=()=>{n.push({path:"/add-person",query:{field:u.value,value:c.value}})};return xe(()=>{g(q.Phone)}),(d,f)=>(ot(),lt(ht,{class:"row items-center justify-center"},{default:k(()=>[K("div",Xt,[K("div",null,[w(rt,{ref_key:"formEl",ref:r,class:"q-gutter-md"},{default:k(()=>[w(it,{outlined:"",modelValue:c.value,"onUpdate:modelValue":f[0]||(f[0]=p=>c.value=p),mask:o[u.value].mask,placeholder:o[u.value].placeholder,rules:o[u.value].rules,disable:v.value,"lazy-rules":""},{append:k(()=>[w(H,{flat:"",round:"",icon:"search",type:"submit",loading:v.value,onClick:y},null,8,["loading"])]),_:1},8,["modelValue","mask","placeholder","rules","disable"])]),_:1},512)]),K("div",Yt,[w(xt,{flat:""},{default:k(()=>[w(H,{"no-caps":"",ripple:!1,label:_(t)("searchPage.phone"),color:u.value==="phone"?"primary":"white","text-color":u.value==="phone"?"white":"secondary",onClick:f[1]||(f[1]=p=>g(_(q).Phone))},null,8,["label","color","text-color"]),w(H,{"no-caps":"",ripple:!1,label:_(t)("searchPage.vk"),color:u.value==="vk"?"primary":"white","text-color":u.value==="vk"?"white":"secondary",onClick:f[2]||(f[2]=p=>g(_(q).VK))},null,8,["label","color","text-color"]),w(H,{"no-caps":"",ripple:!1,label:_(t)("searchPage.name"),color:u.value==="name"?"primary":"white","text-color":u.value==="name"?"white":"secondary",onClick:f[3]||(f[3]=p=>g(_(q).Name))},null,8,["label","color","text-color"])]),_:1})])]),w(Gt,{modelValue:i.value,"onUpdate:modelValue":f[4]||(f[4]=p=>i.value=p),persistent:""},{default:k(()=>[w(ut,null,{default:k(()=>[w(ct,{class:"row items-center"},{default:k(()=>[K("span",Jt,nt(_(t)("searchPage.dialog.text")),1)]),_:1}),w(Bt,{align:"right",class:"q-pa-md"},{default:k(()=>[fe(w(H,{unelevated:"","no-caps":"",label:_(t)("searchPage.dialog.cancelBtn"),color:"secondary"},null,8,["label"]),[[ke]]),fe(w(H,{unelevated:"","no-caps":"",label:_(t)("searchPage.dialog.confirmBtn"),color:"primary",onClick:B},null,8,["label"]),[[ke]])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}))}});export{fo as default};