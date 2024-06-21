"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[576],{4556:(e,t,n)=>{n.d(t,{c:()=>g});n(1504);var s=n(5456),i=n(5864),r=n(5492),a=n(3376),c=n(867),l=n(4357),o=n(964),d=n(7624);function u(e){return(0,d.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,d.jsx)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})})}const m={breadcrumbHomeIcon:"breadcrumbHomeIcon_YNFT"};function h(){const e=(0,o.cp)("/");return(0,d.jsx)("li",{className:"breadcrumbs__item",children:(0,d.jsx)(c.c,{"aria-label":(0,l.G)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e,children:(0,d.jsx)(u,{className:m.breadcrumbHomeIcon})})})}const b={breadcrumbsContainer:"breadcrumbsContainer_Z_bl"};function p(e){let{children:t,href:n,isLast:s}=e;const i="breadcrumbs__link";return s?(0,d.jsx)("span",{className:i,itemProp:"name",children:t}):n?(0,d.jsx)(c.c,{className:i,href:n,itemProp:"item",children:(0,d.jsx)("span",{itemProp:"name",children:t})}):(0,d.jsx)("span",{className:i,children:t})}function x(e){let{children:t,active:n,index:i,addMicrodata:r}=e;return(0,d.jsxs)("li",{...r&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},className:(0,s.c)("breadcrumbs__item",{"breadcrumbs__item--active":n}),children:[t,(0,d.jsx)("meta",{itemProp:"position",content:String(i+1)})]})}function g(){const e=(0,r.js)(),t=(0,a.Y5)();return e?(0,d.jsx)("nav",{className:(0,s.c)(i.W.docs.docBreadcrumbs,b.breadcrumbsContainer),"aria-label":(0,l.G)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"}),children:(0,d.jsxs)("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList",children:[t&&(0,d.jsx)(h,{}),e.map(((t,n)=>{const s=n===e.length-1,i="category"===t.type&&t.linkUnlisted?void 0:t.href;return(0,d.jsx)(x,{active:s,index:n,addMicrodata:!!i,children:(0,d.jsx)(p,{href:i,isLast:s,children:t.label})},n)}))]})}):null}},524:(e,t,n)=>{n.r(t),n.d(t,{default:()=>D});var s=n(1504),i=n(5756),r=n(5492),a=n(964),c=n(5456),l=n(867),o=n(8264);const d=["zero","one","two","few","many","other"];function u(e){return d.filter((t=>e.includes(t)))}const m={locale:"en",pluralForms:u(["one","other"]),select:e=>1===e?"one":"other"};function h(){const{i18n:{currentLocale:e}}=(0,o.c)();return(0,s.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:u(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),m}}),[e])}function b(){const e=h();return{selectMessage:(t,n)=>function(e,t,n){const s=e.split("|");if(1===s.length)return s[0];s.length>n.pluralForms.length&&console.error(`For locale=${n.locale}, a maximum of ${n.pluralForms.length} plural forms are expected (${n.pluralForms.join(",")}), but the message contains ${s.length}: ${e}`);const i=n.select(t),r=n.pluralForms.indexOf(i);return s[Math.min(r,s.length-1)]}(n,t,e)}}var p=n(8136),x=n(4357),g=n(6448);const v={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var f=n(7624);function j(e){let{href:t,children:n}=e;return(0,f.jsx)(l.c,{href:t,className:(0,c.c)("card padding--lg",v.cardContainer),children:n})}function N(e){let{href:t,icon:n,title:s,description:i}=e;return(0,f.jsxs)(j,{href:t,children:[(0,f.jsxs)(g.c,{as:"h2",className:(0,c.c)("text--truncate",v.cardTitle),title:s,children:[n," ",s]}),i&&(0,f.jsx)("p",{className:(0,c.c)("text--truncate",v.cardDescription),title:i,children:i})]})}function _(e){let{item:t}=e;const n=(0,r.Gw)(t),s=function(){const{selectMessage:e}=b();return t=>e(t,(0,x.G)({message:"1 item|{count} items",id:"theme.docs.DocCard.categoryDescription.plurals",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t}))}();return n?(0,f.jsx)(N,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??s(t.items.length)}):null}function L(e){let{item:t}=e;const n=(0,p.c)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",s=(0,r._4)(t.docId??void 0);return(0,f.jsx)(N,{href:t.href,icon:n,title:t.label,description:t.description??s?.description})}function k(e){let{item:t}=e;switch(t.type){case"link":return(0,f.jsx)(L,{item:t});case"category":return(0,f.jsx)(_,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function T(e){let{className:t}=e;const n=(0,r.wt)();return(0,f.jsx)(w,{items:n.items,className:t})}function w(e){const{items:t,className:n}=e;if(!t)return(0,f.jsx)(T,{...e});const s=(0,r.ML)(t);return(0,f.jsx)("section",{className:(0,c.c)("row",n),children:s.map(((e,t)=>(0,f.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,f.jsx)(k,{item:e})},t)))})}var y=n(9236),I=n(2136),C=n(8092),M=n(4556);const F={generatedIndexPage:"generatedIndexPage_vN6x",list:"list_eTzJ",title:"title_kItE"};function P(e){let{categoryGeneratedIndex:t}=e;return(0,f.jsx)(i.U7,{title:t.title,description:t.description,keywords:t.keywords,image:(0,a.cp)(t.image)})}function V(e){let{categoryGeneratedIndex:t}=e;const n=(0,r.wt)();return(0,f.jsxs)("div",{className:F.generatedIndexPage,children:[(0,f.jsx)(I.c,{}),(0,f.jsx)(M.c,{}),(0,f.jsx)(C.c,{}),(0,f.jsxs)("header",{children:[(0,f.jsx)(g.c,{as:"h1",className:F.title,children:t.title}),t.description&&(0,f.jsx)("p",{children:t.description})]}),(0,f.jsx)("article",{className:"margin-top--lg",children:(0,f.jsx)(w,{items:n.items,className:F.list})}),(0,f.jsx)("footer",{className:"margin-top--lg",children:(0,f.jsx)(y.c,{previous:t.navigation.previous,next:t.navigation.next})})]})}function D(e){return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(P,{...e}),(0,f.jsx)(V,{...e})]})}},9236:(e,t,n)=>{n.d(t,{c:()=>l});n(1504);var s=n(4357),i=n(5456),r=n(867),a=n(7624);function c(e){const{permalink:t,title:n,subLabel:s,isNext:c}=e;return(0,a.jsxs)(r.c,{className:(0,i.c)("pagination-nav__link",c?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[s&&(0,a.jsx)("div",{className:"pagination-nav__sublabel",children:s}),(0,a.jsx)("div",{className:"pagination-nav__label",children:n})]})}function l(e){const{previous:t,next:n}=e;return(0,a.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,s.G)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"}),children:[t&&(0,a.jsx)(c,{...t,subLabel:(0,a.jsx)(s.c,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc",children:"Previous"})}),n&&(0,a.jsx)(c,{...n,subLabel:(0,a.jsx)(s.c,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc",children:"Next"}),isNext:!0})]})}},8092:(e,t,n)=>{n.d(t,{c:()=>l});n(1504);var s=n(5456),i=n(4357),r=n(5864),a=n(9920),c=n(7624);function l(e){let{className:t}=e;const n=(0,a.E)();return n.badge?(0,c.jsx)("span",{className:(0,s.c)(t,r.W.docs.docVersionBadge,"badge badge--secondary"),children:(0,c.jsx)(i.c,{id:"theme.docs.versionBadge.label",values:{versionLabel:n.label},children:"Version: {versionLabel}"})}):null}},2136:(e,t,n)=>{n.d(t,{c:()=>x});n(1504);var s=n(5456),i=n(8264),r=n(867),a=n(4357),c=n(2840),l=n(5864),o=n(4592),d=n(9920),u=n(7624);const m={unreleased:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,u.jsx)(a.c,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:(0,u.jsx)("b",{children:n.label})},children:"This is unreleased documentation for {siteTitle} {versionLabel} version."})},unmaintained:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,u.jsx)(a.c,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:(0,u.jsx)("b",{children:n.label})},children:"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained."})}};function h(e){const t=m[e.versionMetadata.banner];return(0,u.jsx)(t,{...e})}function b(e){let{versionLabel:t,to:n,onClick:s}=e;return(0,u.jsx)(a.c,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:(0,u.jsx)("b",{children:(0,u.jsx)(r.c,{to:n,onClick:s,children:(0,u.jsx)(a.c,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label",children:"latest version"})})})},children:"For up-to-date documentation, see the {latestVersionLink} ({versionLabel})."})}function p(e){let{className:t,versionMetadata:n}=e;const{siteConfig:{title:r}}=(0,i.c)(),{pluginId:a}=(0,c.UF)({failfast:!0}),{savePreferredVersionName:d}=(0,o.iy)(a),{latestDocSuggestion:m,latestVersionSuggestion:p}=(0,c.i8)(a),x=m??(g=p).docs.find((e=>e.id===g.mainDocId));var g;return(0,u.jsxs)("div",{className:(0,s.c)(t,l.W.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert",children:[(0,u.jsx)("div",{children:(0,u.jsx)(h,{siteTitle:r,versionMetadata:n})}),(0,u.jsx)("div",{className:"margin-top--md",children:(0,u.jsx)(b,{versionLabel:p.label,to:x.path,onClick:()=>d(p.name)})})]})}function x(e){let{className:t}=e;const n=(0,d.E)();return n.banner?(0,u.jsx)(p,{className:t,versionMetadata:n}):null}}}]);