"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[316],{4888:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>u,toc:()=>d});var a=r(7624),n=r(2172),l=r(1268),s=r(5388);const i={sidebar_position:1},o="Create an ability",u={id:"tutorial/skills/create-a-skill",title:"Create an ability",description:"A WCS ability/skill is a class that, when instantiated, gets bound to a character. To define the behavior of your ability you override the default methods.",source:"@site/docs/tutorial/skills/create-a-skill.md",sourceDirName:"tutorial/skills",slug:"/tutorial/skills/create-a-skill",permalink:"/WCS/docs/tutorial/skills/create-a-skill",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Abilities",permalink:"/WCS/docs/category/abilities"},next:{title:"Applying abilities",permalink:"/WCS/docs/tutorial/skills/applying"}},c={},d=[];function h(e){const t={a:"a",code:"code",em:"em",h1:"h1",p:"p",pre:"pre",strong:"strong",...(0,n.M)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"create-an-ability",children:"Create an ability"}),"\n","\n",(0,a.jsxs)(t.p,{children:["A ",(0,a.jsx)(t.strong,{children:"WCS"})," ability/skill is a ",(0,a.jsx)(t.em,{children:"class"})," that, when instantiated, gets bound to a ",(0,a.jsx)(t.em,{children:"character"}),". To define the behavior of your ability you override the default methods.\nLet's make a file/script ",(0,a.jsx)(t.code,{children:"attack"})," and register our ",(0,a.jsx)(t.em,{children:"first ability"}),":"]}),"\n",(0,a.jsxs)(l.c,{groupId:"languages",children:[(0,a.jsx)(s.c,{value:"TypeScript",default:!0,children:(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-ts",metastring:'title="attack.ts" showLineNumbers',children:'import { Skill, SkillDecorator } from "@rbxts/wcs";\n\n@SkillDecorator\nexport class Attack extends Skill {}\n'})})}),(0,a.jsx)(s.c,{value:"Luau",children:(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-lua",metastring:'title="attack.lua" showLineNumbers',children:'local ReplicatedStorage = game:GetService("ReplicatedStorage")\nlocal WCS = require(ReplicatedStorage.WCS)\n\nlocal Attack = WCS.RegisterSkill("Attack")\n\nreturn Attack\n'})})})]}),"\n",(0,a.jsxs)(t.p,{children:["Here is how ",(0,a.jsx)(t.em,{children:"simple"})," it is to create a whole new ability! Worth to mention, this is where you get first ",(0,a.jsx)(t.em,{children:"syntactical difference"})," between\ntypescript and luau. ",(0,a.jsx)(t.em,{children:"Here"})," is where you can view all ",(0,a.jsx)(t.a,{href:"../extras/differences",children:(0,a.jsx)(t.em,{children:"syntactical differences"})}),"."]})]})}function p(e={}){const{wrapper:t}={...(0,n.M)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},5388:(e,t,r)=>{r.d(t,{c:()=>s});r(1504);var a=r(5456);const n={tabItem:"tabItem_Ymn6"};var l=r(7624);function s(e){let{children:t,hidden:r,className:s}=e;return(0,l.jsx)("div",{role:"tabpanel",className:(0,a.c)(n.tabItem,s),hidden:r,children:t})}},1268:(e,t,r)=>{r.d(t,{c:()=>w});var a=r(1504),n=r(5456),l=r(3943),s=r(5592),i=r(5288),o=r(632),u=r(7128),c=r(3216);function d(e){return a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:r}=e;return(0,a.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:r,attributes:a,default:n}}=e;return{value:t,label:r,attributes:a,default:n}}))}(r);return function(e){const t=(0,u.w)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function p(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function b(e){let{queryString:t=!1,groupId:r}=e;const n=(0,s.Uz)(),l=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:t,groupId:r});return[(0,o._M)(l),(0,a.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(n.location.search);t.set(l,e),n.replace({...n.location,search:t.toString()})}),[l,n])]}function f(e){const{defaultValue:t,queryString:r=!1,groupId:n}=e,l=h(e),[s,o]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=r.find((e=>e.default))??r[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:l}))),[u,d]=b({queryString:r,groupId:n}),[f,m]=function(e){let{groupId:t}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,l]=(0,c.IN)(r);return[n,(0,a.useCallback)((e=>{r&&l.set(e)}),[r,l])]}({groupId:n}),g=(()=>{const e=u??f;return p({value:e,tabValues:l})?e:null})();(0,i.c)((()=>{g&&o(g)}),[g]);return{selectedValue:s,selectValue:(0,a.useCallback)((e=>{if(!p({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);o(e),d(e),m(e)}),[d,m,l]),tabValues:l}}var m=r(3664);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var v=r(7624);function y(e){let{className:t,block:r,selectedValue:a,selectValue:s,tabValues:i}=e;const o=[],{blockElementScrollPositionUntilNextRender:u}=(0,l.MV)(),c=e=>{const t=e.currentTarget,r=o.indexOf(t),n=i[r].value;n!==a&&(u(t),s(n))},d=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const r=o.indexOf(e.currentTarget)+1;t=o[r]??o[0];break}case"ArrowLeft":{const r=o.indexOf(e.currentTarget)-1;t=o[r]??o[o.length-1];break}}t?.focus()};return(0,v.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,n.c)("tabs",{"tabs--block":r},t),children:i.map((e=>{let{value:t,label:r,attributes:l}=e;return(0,v.jsx)("li",{role:"tab",tabIndex:a===t?0:-1,"aria-selected":a===t,ref:e=>o.push(e),onKeyDown:d,onClick:c,...l,className:(0,n.c)("tabs__item",g.tabItem,l?.className,{"tabs__item--active":a===t}),children:r??t},t)}))})}function x(e){let{lazy:t,children:r,selectedValue:n}=e;const l=(Array.isArray(r)?r:[r]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===n));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return(0,v.jsx)("div",{className:"margin-top--md",children:l.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==n})))})}function k(e){const t=f(e);return(0,v.jsxs)("div",{className:(0,n.c)("tabs-container",g.tabList),children:[(0,v.jsx)(y,{...t,...e}),(0,v.jsx)(x,{...t,...e})]})}function w(e){const t=(0,m.c)();return(0,v.jsx)(k,{...e,children:d(e.children)},String(t))}},2172:(e,t,r)=>{r.d(t,{I:()=>i,M:()=>s});var a=r(1504);const n={},l=a.createContext(n);function s(e){const t=a.useContext(l);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:s(e.components),a.createElement(l.Provider,{value:t},e.children)}}}]);