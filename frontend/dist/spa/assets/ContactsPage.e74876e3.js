import{B as _,C as v,r as m,E as b,M as h,f as e,H as o,I as c,K as p,J as s,L as f}from"./index.b0846524.js";import{Q as w,a as i}from"./QCard.783d5ef5.js";import{c as P,Q}from"./QForm.e008005b.js";import{u as k,s as x}from"./index.17631ce7.js";import{u as B}from"./vue-i18n.runtime.esm-bundler.3cfb172c.js";import"./use-dark.2c6a9be7.js";import"./axios.7331a07d.js";const C={class:"row"},q={class:"row justify-between items-center q-my-lg"},V={class:"text-h6 text-weight-bold"},D={class:"row"},N=_({__name:"ContactsPage",props:{isDesktop:{type:Boolean}},setup(E){const d=k(),g=v(),{t}=B(),a=m(""),l=m(!1),y=async()=>{try{l.value=!0;const n=await x(a.value);if(a.value="",!n.ok)throw new Error;d.notify({type:"positive",message:t("contactsPage.success"),actions:[{icon:"close",color:"white",round:!0}]})}catch{d.notify({type:"negative",message:t("contactsPage.error"),actions:[{icon:"close",color:"white",round:!0}]})}finally{l.value=!1}};return(n,r)=>(b(),h("div",C,[e(w,{flat:"",class:"q-mt-md col-12 col-md-4 offset-md-4 q-px-md"},{default:o(()=>[e(i,null,{default:o(()=>[c("div",q,[c("div",V,p(s(t)("contactsPage.title")),1),e(f,{outline:"",icon:"chevron_left","no-caps":"",label:n.isDesktop?"\u041A \u043F\u043E\u0438\u0441\u043A\u0443":"",round:!n.isDesktop,color:"secondary",onClick:r[0]||(r[0]=()=>s(g).push("/"))},null,8,["label","round"])])]),_:1}),e(i,null,{default:o(()=>[c("p",null,p(s(t)("contactsPage.text"))+":",1)]),_:1}),e(i,null,{default:o(()=>[e(P,{class:"column q-gutter-md",onSubmit:y},{default:o(()=>[e(Q,{outlined:"",modelValue:a.value,"onUpdate:modelValue":r[1]||(r[1]=u=>a.value=u),type:"textarea","lazy-rules":"",label:s(t)("contactsPage.messageLabel"),disable:l.value,rules:[u=>u&&u.length>0||s(t)("contactsPage.messageHint")]},null,8,["modelValue","label","disable","rules"]),c("div",D,[e(f,{type:"submit",label:s(t)("contactsPage.sendBtn"),"no-caps":"",unelevated:"",color:"primary",loading:l.value,class:"col-12 col-md-4 offset-md-8"},null,8,["label","loading"])])]),_:1})]),_:1})]),_:1})]))}});export{N as default};
