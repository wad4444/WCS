"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[324],{3884:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>d});var n=r(7624),a=r(2172),s=r(1268),l=r(5388);const i={sidebar_position:2},c="Syntactical Differences",o={id:"extras/differences",title:"Syntactical Differences",description:"There are several syntactical differences in WCS between Luau version and TypeScript version.",source:"@site/docs/extras/differences.md",sourceDirName:"extras",slug:"/extras/differences",permalink:"/WCS/docs/extras/differences",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Concept of Metadata",permalink:"/WCS/docs/extras/metadata"},next:{title:"Movesets",permalink:"/WCS/docs/extras/movesets"}},u={},d=[];function f(e){const t={code:"code",em:"em",h1:"h1",p:"p",pre:"pre",strong:"strong",...(0,a.M)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"syntactical-differences",children:"Syntactical Differences"}),"\n","\n","\n",(0,n.jsxs)(t.p,{children:["There are several ",(0,n.jsx)(t.em,{children:"syntactical differences"})," in ",(0,n.jsx)(t.strong,{children:"WCS"})," between ",(0,n.jsx)(t.em,{children:"Luau"})," version and ",(0,n.jsx)(t.em,{children:"TypeScript"})," version."]}),"\n",(0,n.jsxs)(t.p,{children:["One of ",(0,n.jsx)(t.em,{children:"the most big"})," being how ",(0,n.jsx)(t.em,{children:"classes"})," are exported.\nClasses in ",(0,n.jsx)(t.strong,{children:"WCS"})," are used to define your ",(0,n.jsx)(t.em,{children:"status effect"})," or ",(0,n.jsx)(t.em,{children:"an ability"}),".\nIn TypeScript ",(0,n.jsx)(t.em,{children:"package version"})," ",(0,n.jsx)(t.strong,{children:"WCS"})," explicitly exports classes ",(0,n.jsx)(t.code,{children:"Skill"}),", ",(0,n.jsx)(t.code,{children:"StatusEffect"})," and ",(0,n.jsx)(t.code,{children:"HoldableSkill"}),"\nthat you should decorate and ",(0,n.jsx)(t.em,{children:"extend"})," from."]}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.em,{children:"However"}),", due to the ",(0,n.jsx)(t.em,{children:"funky emit syntax"})," in Luau ",(0,n.jsx)(t.strong,{children:"WCS"}),' exports special "wrapper" methods that\ndefine ',(0,n.jsx)(t.em,{children:"a new class"})," and ",(0,n.jsx)(t.em,{children:"apply the decorator"})," internally: ",(0,n.jsx)(t.code,{children:"RegisterSkill()"}),", ",(0,n.jsx)(t.code,{children:"RegisterStatusEffect()"}),", ",(0,n.jsx)(t.code,{children:"RegisterHoldableSkill()"}),"."]}),"\n",(0,n.jsxs)(s.c,{groupId:"languages",children:[(0,n.jsx)(l.c,{value:"TypeScript",default:!0,children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-ts",metastring:'title="attack.ts" showLineNumbers',children:'import { Skill, SkillDecorator } from "@rbxts/wcs";\n\n@SkillDecorator\nexport class Attack extends Skill {}\n'})})}),(0,n.jsx)(l.c,{value:"Luau",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-lua",metastring:'title="attack.lua" showLineNumbers',children:'local ReplicatedStorage = game:GetService("ReplicatedStorage")\nlocal WCS = require(ReplicatedStorage.WCS)\n\nlocal Attack = WCS.RegisterSkill("Attack")\n\nreturn Attack\n'})})})]})]})}function h(e={}){const{wrapper:t}={...(0,a.M)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(f,{...e})}):f(e)}},5388:(e,t,r)=>{r.d(t,{c:()=>l});r(1504);var n=r(5456);const a={tabItem:"tabItem_Ymn6"};var s=r(7624);function l(e){let{children:t,hidden:r,className:l}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,n.c)(a.tabItem,l),hidden:r,children:t})}},1268:(e,t,r)=>{r.d(t,{c:()=>S});var n=r(1504),a=r(5456),s=r(3943),l=r(5592),i=r(5288),c=r(632),o=r(7128),u=r(1148);function d(e){return n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function f(e){const{values:t,children:r}=e;return(0,n.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:r,attributes:n,default:a}}=e;return{value:t,label:r,attributes:n,default:a}}))}(r);return function(e){const t=(0,o.w)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function h(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function p(e){let{queryString:t=!1,groupId:r}=e;const a=(0,l.Uz)(),s=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:t,groupId:r});return[(0,c._M)(s),(0,n.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(a.location.search);t.set(s,e),a.replace({...a.location,search:t.toString()})}),[s,a])]}function m(e){const{defaultValue:t,queryString:r=!1,groupId:a}=e,s=f(e),[l,c]=(0,n.useState)((()=>function(e){let{defaultValue:t,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=r.find((e=>e.default))??r[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:s}))),[o,d]=p({queryString:r,groupId:a}),[m,b]=function(e){let{groupId:t}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,s]=(0,u.IN)(r);return[a,(0,n.useCallback)((e=>{r&&s.set(e)}),[r,s])]}({groupId:a}),x=(()=>{const e=o??m;return h({value:e,tabValues:s})?e:null})();(0,i.c)((()=>{x&&c(x)}),[x]);return{selectedValue:l,selectValue:(0,n.useCallback)((e=>{if(!h({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);c(e),d(e),b(e)}),[d,b,s]),tabValues:s}}var b=r(3664);const x={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var v=r(7624);function g(e){let{className:t,block:r,selectedValue:n,selectValue:l,tabValues:i}=e;const c=[],{blockElementScrollPositionUntilNextRender:o}=(0,s.MV)(),u=e=>{const t=e.currentTarget,r=c.indexOf(t),a=i[r].value;a!==n&&(o(t),l(a))},d=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const r=c.indexOf(e.currentTarget)+1;t=c[r]??c[0];break}case"ArrowLeft":{const r=c.indexOf(e.currentTarget)-1;t=c[r]??c[c.length-1];break}}t?.focus()};return(0,v.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.c)("tabs",{"tabs--block":r},t),children:i.map((e=>{let{value:t,label:r,attributes:s}=e;return(0,v.jsx)("li",{role:"tab",tabIndex:n===t?0:-1,"aria-selected":n===t,ref:e=>c.push(e),onKeyDown:d,onClick:u,...s,className:(0,a.c)("tabs__item",x.tabItem,s?.className,{"tabs__item--active":n===t}),children:r??t},t)}))})}function j(e){let{lazy:t,children:r,selectedValue:a}=e;const s=(Array.isArray(r)?r:[r]).filter(Boolean);if(t){const e=s.find((e=>e.props.value===a));return e?(0,n.cloneElement)(e,{className:"margin-top--md"}):null}return(0,v.jsx)("div",{className:"margin-top--md",children:s.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function y(e){const t=m(e);return(0,v.jsxs)("div",{className:(0,a.c)("tabs-container",x.tabList),children:[(0,v.jsx)(g,{...e,...t}),(0,v.jsx)(j,{...e,...t})]})}function S(e){const t=(0,b.c)();return(0,v.jsx)(y,{...e,children:d(e.children)},String(t))}},2172:(e,t,r)=>{r.d(t,{I:()=>i,M:()=>l});var n=r(1504);const a={},s=n.createContext(a);function l(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:l(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);