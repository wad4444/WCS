"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[621],{2012:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>b,frontMatter:()=>s,metadata:()=>c,toc:()=>d});var l=n(7624),r=n(2172),a=n(1268),o=n(5388);const s={sidebar_position:7},i="Holdable Abilities",c={id:"tutorial/skills/holdable",title:"Holdable Abilities",description:"Sometimes, you want to create an ability that you can use for an unknown amount of time, depending on user input.",source:"@site/docs/tutorial/skills/holdable.md",sourceDirName:"tutorial/skills",slug:"/tutorial/skills/holdable",permalink:"/WCS/ru/docs/tutorial/skills/holdable",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"tutorialSidebar",previous:{title:"Start an ability",permalink:"/WCS/ru/docs/tutorial/skills/start-an-ability"},next:{title:"Messages",permalink:"/WCS/ru/docs/tutorial/skills/messages"}},u={},d=[];function h(e){const t={admonition:"admonition",code:"code",em:"em",h1:"h1",p:"p",pre:"pre",strong:"strong",...(0,r.M)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h1,{id:"holdable-abilities",children:"Holdable Abilities"}),"\n",(0,l.jsxs)(t.p,{children:["Sometimes, you want to ",(0,l.jsx)(t.em,{children:"create an"})," ",(0,l.jsx)(t.strong,{children:"ability"})," that you can use for ",(0,l.jsx)(t.em,{children:"an"})," ",(0,l.jsx)(t.strong,{children:"unknown"})," ",(0,l.jsx)(t.em,{children:"amount"})," of time, depending on ",(0,l.jsx)(t.em,{children:"user input"}),"."]}),"\n",(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:"WCS"})," introduces a whole new ability type for this case: ",(0,l.jsx)(t.code,{children:"HoldableSkill"}),", which you can specify the max hold time of and run the callbacks\nwhenever it ends like on a regular ability."]}),"\n",(0,l.jsxs)(t.p,{children:["Let's make a file called ",(0,l.jsx)(t.code,{children:"block"})," and register a holdable ability:"]}),"\n","\n","\n",(0,l.jsxs)(a.c,{groupId:"languages",children:[(0,l.jsx)(o.c,{value:"TypeScript",default:!0,children:(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-ts",metastring:'title="block.ts" showLineNumbers',children:'import { HoldableSkill, SkillDecorator } from "@rbxts/wcs";\n\n@SkillDecorator\nexport class Block extends HoldableSkill {}\n'})})}),(0,l.jsx)(o.c,{value:"Luau",children:(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-lua",metastring:'title="block.lua" showLineNumbers',children:'local ReplicatedStorage = game:GetService("ReplicatedStorage")\nlocal WCS = require(ReplicatedStorage.WCS)\n\nlocal Block = WCS.RegisterHoldableSkill("Block")\n\nreturn Block\n'})})})]}),"\n",(0,l.jsxs)(t.p,{children:["Then set the ",(0,l.jsx)(t.em,{children:"max hold duration"})," to ",(0,l.jsx)(t.em,{children:"undefined"}),", so we could ",(0,l.jsx)(t.em,{children:"hold the block"})," indefinitely."]}),"\n",(0,l.jsxs)(a.c,{groupId:"languages",children:[(0,l.jsx)(o.c,{value:"TypeScript",default:!0,children:(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-ts",metastring:'title="block.ts" showLineNumbers {5-7}',children:'import { HoldableSkill, SkillDecorator } from "@rbxts/wcs";\n\n@SkillDecorator\nexport class Block extends HoldableSkill {\n\tpublic OnConstructServer() {\n\t\tthis.SetMaxHoldTime(undefined);\n\t}\n}\n'})})}),(0,l.jsx)(o.c,{value:"Luau",children:(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-lua",metastring:'title="block.lua" showLineNumbers {6-8}',children:'local ReplicatedStorage = game:GetService("ReplicatedStorage")\nlocal WCS = require(ReplicatedStorage.WCS)\n\nlocal Block = WCS.RegisterHoldableSkill("Block")\n\nfunction Block:OnConstructServer()\n\tself:SetMaxHoldTime(nil)\nend\n\nreturn Block\n'})})})]}),"\n",(0,l.jsx)(t.admonition,{type:"note",children:(0,l.jsxs)(t.p,{children:["You can determine if the ability is holdable or not by calling ",(0,l.jsx)(t.code,{children:"GetSkillType()"}),"."]})})]})}function b(e={}){const{wrapper:t}={...(0,r.M)(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(h,{...e})}):h(e)}},5388:(e,t,n)=>{n.d(t,{c:()=>o});n(1504);var l=n(5456);const r={tabItem:"tabItem_Ymn6"};var a=n(7624);function o(e){let{children:t,hidden:n,className:o}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,l.c)(r.tabItem,o),hidden:n,children:t})}},1268:(e,t,n)=>{n.d(t,{c:()=>y});var l=n(1504),r=n(5456),a=n(3943),o=n(5592),s=n(5288),i=n(632),c=n(7128),u=n(1148);function d(e){return l.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,l.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:n}=e;return(0,l.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:l,default:r}}=e;return{value:t,label:n,attributes:l,default:r}}))}(n);return function(e){const t=(0,c.w)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function b(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:n}=e;const r=(0,o.Uz)(),a=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i._M)(a),(0,l.useCallback)((e=>{if(!a)return;const t=new URLSearchParams(r.location.search);t.set(a,e),r.replace({...r.location,search:t.toString()})}),[a,r])]}function p(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,a=h(e),[o,i]=(0,l.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!b({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const l=n.find((e=>e.default))??n[0];if(!l)throw new Error("Unexpected error: 0 tabValues");return l.value}({defaultValue:t,tabValues:a}))),[c,d]=m({queryString:n,groupId:r}),[p,f]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,a]=(0,u.IN)(n);return[r,(0,l.useCallback)((e=>{n&&a.set(e)}),[n,a])]}({groupId:r}),g=(()=>{const e=c??p;return b({value:e,tabValues:a})?e:null})();(0,s.c)((()=>{g&&i(g)}),[g]);return{selectedValue:o,selectValue:(0,l.useCallback)((e=>{if(!b({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);i(e),d(e),f(e)}),[d,f,a]),tabValues:a}}var f=n(3664);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var x=n(7624);function k(e){let{className:t,block:n,selectedValue:l,selectValue:o,tabValues:s}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.MV)(),u=e=>{const t=e.currentTarget,n=i.indexOf(t),r=s[n].value;r!==l&&(c(t),o(r))},d=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=i.indexOf(e.currentTarget)+1;t=i[n]??i[0];break}case"ArrowLeft":{const n=i.indexOf(e.currentTarget)-1;t=i[n]??i[i.length-1];break}}t?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.c)("tabs",{"tabs--block":n},t),children:s.map((e=>{let{value:t,label:n,attributes:a}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:l===t?0:-1,"aria-selected":l===t,ref:e=>i.push(e),onKeyDown:d,onClick:u,...a,className:(0,r.c)("tabs__item",g.tabItem,a?.className,{"tabs__item--active":l===t}),children:n??t},t)}))})}function v(e){let{lazy:t,children:n,selectedValue:r}=e;const a=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=a.find((e=>e.props.value===r));return e?(0,l.cloneElement)(e,{className:"margin-top--md"}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:a.map(((e,t)=>(0,l.cloneElement)(e,{key:t,hidden:e.props.value!==r})))})}function S(e){const t=p(e);return(0,x.jsxs)("div",{className:(0,r.c)("tabs-container",g.tabList),children:[(0,x.jsx)(k,{...e,...t}),(0,x.jsx)(v,{...e,...t})]})}function y(e){const t=(0,f.c)();return(0,x.jsx)(S,{...e,children:d(e.children)},String(t))}},2172:(e,t,n)=>{n.d(t,{I:()=>s,M:()=>o});var l=n(1504);const r={},a=l.createContext(r);function o(e){const t=l.useContext(a);return l.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),l.createElement(a.Provider,{value:t},e.children)}}}]);