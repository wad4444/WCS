"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[72],{2316:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>u,toc:()=>d});var n=r(7624),a=r(2172),l=r(1268),s=r(5388);const o={sidebar_position:3},i="\u041d\u0430\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043b\u043e\u0433\u0438\u043a\u0438",u={id:"tutorial/skills/define-the-behaviour",title:"\u041d\u0430\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043b\u043e\u0433\u0438\u043a\u0438",description:"\u0422\u0435\u043f\u0435\u0440\u044c, \u043a\u043e\u0433\u0434\u0430 \u043c\u044b \u0441\u043e\u0437\u0434\u0430\u043b\u0438 \u043d\u0430\u0448\u0443 \u043f\u0435\u0440\u0432\u0443\u044e \u0441\u043f\u043e\u0441\u043e\u0431\u043d\u043e\u0441\u0442\u044c, \u043d\u0430\u043c \u043d\u0443\u0436\u043d\u043e \u043d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u043b\u043e\u0433\u0438\u043a\u0443 \u0434\u043b\u044f \u043d\u0435\u0451.",source:"@site/i18n/ru/docusaurus-plugin-content-docs/current/tutorial/skills/define-the-behaviour.md",sourceDirName:"tutorial/skills",slug:"/tutorial/skills/define-the-behaviour",permalink:"/WCS/ru/docs/tutorial/skills/define-the-behaviour",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"\u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0441\u043a\u0438\u043b\u043b\u043e\u0432",permalink:"/WCS/ru/docs/tutorial/skills/applying"},next:{title:"\u041f\u0440\u0438\u043d\u0446\u0438\u043f \u0440\u0430\u0431\u043e\u0442\u044b \u0440\u0435\u043f\u043b\u0438\u043a\u0430\u0446\u0438\u0438",permalink:"/WCS/ru/docs/tutorial/skills/replication-explained"}},c={},d=[];function p(e){const t={a:"a",code:"code",em:"em",h1:"h1",p:"p",pre:"pre",...(0,a.M)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"\u043d\u0430\u043f\u0438\u0441\u0430\u043d\u0438\u0435-\u043b\u043e\u0433\u0438\u043a\u0438",children:"\u041d\u0430\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043b\u043e\u0433\u0438\u043a\u0438"}),"\n","\n","\n",(0,n.jsxs)(t.p,{children:["\u0422\u0435\u043f\u0435\u0440\u044c, \u043a\u043e\u0433\u0434\u0430 \u043c\u044b ",(0,n.jsx)(t.em,{children:(0,n.jsx)(t.a,{href:"./create-a-skill",children:"\u0441\u043e\u0437\u0434\u0430\u043b\u0438 \u043d\u0430\u0448\u0443 \u043f\u0435\u0440\u0432\u0443\u044e \u0441\u043f\u043e\u0441\u043e\u0431\u043d\u043e\u0441\u0442\u044c"})}),", \u043d\u0430\u043c \u043d\u0443\u0436\u043d\u043e \u043d\u0430\u043f\u0438\u0441\u0430\u0442\u044c ",(0,n.jsx)(t.em,{children:"\u043b\u043e\u0433\u0438\u043a\u0443"})," \u0434\u043b\u044f \u043d\u0435\u0451.\n\u0414\u0430\u0432\u0430\u0439\u0442\u0435 \u043d\u0430 \u043f\u0440\u043e\u0441\u0442\u043e\u043c \u043f\u0440\u0438\u043c\u0435\u0440\u0435 ",(0,n.jsx)(t.em,{children:"\u0437\u0430\u043a\u043e\u043d\u0441\u043e\u043b\u0438\u043c \u043a\u0430\u043a\u0443\u044e-\u043d\u0438\u0431\u0443\u0434\u044c \u0441\u0442\u0440\u043e\u043a\u0443"})," \u043a\u043e\u0433\u0434\u0430 \u0438\u0433\u0440\u043e\u043a ",(0,n.jsx)(t.em,{children:"\u0430\u043a\u0442\u0438\u0432\u0438\u0440\u0443\u0435\u0442 \u0441\u043f\u043e\u0441\u043e\u0431\u043d\u043e\u0441\u0442\u044c"})," \u0438 \u0434\u043e\u0431\u0430\u0432\u0438\u043c \u043c\u0430\u043b\u0435\u043d\u044c\u043a\u0438\u0439 \u043e\u0442\u043a\u0430\u0442:"]}),"\n",(0,n.jsxs)(l.c,{groupId:"languages",children:[(0,n.jsx)(s.c,{value:"TypeScript",default:!0,children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-ts",metastring:'title="attack.ts" showLineNumbers {6-7}',children:'import { Skill, SkillDecorator } from "@rbxts/wcs";\n\n@SkillDecorator\nexport class Attack extends Skill {\n\tpublic OnStartServer() {\n\t\tprint("Hi, attack just started!");\n\t\tthis.ApplyCooldown(3) // 3 second cooldown\n\t}\n}\n'})})}),(0,n.jsx)(s.c,{value:"Luau",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-lua",metastring:'title="attack.lua" showLineNumbers {7-8}',children:'local ReplicatedStorage = game:GetService("ReplicatedStorage")\nlocal WCS = require(ReplicatedStorage.WCS)\n\nlocal Attack = WCS.RegisterSkill("Attack")\n\nfunction Attack:OnStartServer()\n\tprint("Hi, attack just started!")\n\tself:ApplyCooldown(3) -- 3 second cooldown\nend\n\nreturn Attack\n'})})})]}),"\n",(0,n.jsxs)(t.p,{children:["\u041e\u0442\u043b\u0438\u0447\u043d\u043e! \u0422\u0435\u043f\u0435\u0440\u044c \u043d\u0430\u043c \u043e\u0441\u0442\u0430\u043b\u043e\u0441\u044c ",(0,n.jsx)(t.a,{href:"./start-an-ability",children:"\u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c \u043d\u0430\u0448\u0443 \u0441\u043f\u043e\u0441\u043e\u0431\u043d\u043e\u0441\u0442\u044c"}),"!"]})]})}function h(e={}){const{wrapper:t}={...(0,a.M)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(p,{...e})}):p(e)}},5388:(e,t,r)=>{r.d(t,{c:()=>s});r(1504);var n=r(5456);const a={tabItem:"tabItem_Ymn6"};var l=r(7624);function s(e){let{children:t,hidden:r,className:s}=e;return(0,l.jsx)("div",{role:"tabpanel",className:(0,n.c)(a.tabItem,s),hidden:r,children:t})}},1268:(e,t,r)=>{r.d(t,{c:()=>y});var n=r(1504),a=r(5456),l=r(3943),s=r(5592),o=r(5288),i=r(632),u=r(7128),c=r(1148);function d(e){return n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:t,children:r}=e;return(0,n.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:r,attributes:n,default:a}}=e;return{value:t,label:r,attributes:n,default:a}}))}(r);return function(e){const t=(0,u.w)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function h(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:r}=e;const a=(0,s.Uz)(),l=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:t,groupId:r});return[(0,i._M)(l),(0,n.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(a.location.search);t.set(l,e),a.replace({...a.location,search:t.toString()})}),[l,a])]}function b(e){const{defaultValue:t,queryString:r=!1,groupId:a}=e,l=p(e),[s,i]=(0,n.useState)((()=>function(e){let{defaultValue:t,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=r.find((e=>e.default))??r[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:l}))),[u,d]=f({queryString:r,groupId:a}),[b,m]=function(e){let{groupId:t}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,l]=(0,c.IN)(r);return[a,(0,n.useCallback)((e=>{r&&l.set(e)}),[r,l])]}({groupId:a}),v=(()=>{const e=u??b;return h({value:e,tabValues:l})?e:null})();(0,o.c)((()=>{v&&i(v)}),[v]);return{selectedValue:s,selectValue:(0,n.useCallback)((e=>{if(!h({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);i(e),d(e),m(e)}),[d,m,l]),tabValues:l}}var m=r(3664);const v={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var g=r(7624);function x(e){let{className:t,block:r,selectedValue:n,selectValue:s,tabValues:o}=e;const i=[],{blockElementScrollPositionUntilNextRender:u}=(0,l.MV)(),c=e=>{const t=e.currentTarget,r=i.indexOf(t),a=o[r].value;a!==n&&(u(t),s(a))},d=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const r=i.indexOf(e.currentTarget)+1;t=i[r]??i[0];break}case"ArrowLeft":{const r=i.indexOf(e.currentTarget)-1;t=i[r]??i[i.length-1];break}}t?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.c)("tabs",{"tabs--block":r},t),children:o.map((e=>{let{value:t,label:r,attributes:l}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:n===t?0:-1,"aria-selected":n===t,ref:e=>i.push(e),onKeyDown:d,onClick:c,...l,className:(0,a.c)("tabs__item",v.tabItem,l?.className,{"tabs__item--active":n===t}),children:r??t},t)}))})}function k(e){let{lazy:t,children:r,selectedValue:a}=e;const l=(Array.isArray(r)?r:[r]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===a));return e?(0,n.cloneElement)(e,{className:"margin-top--md"}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:l.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function w(e){const t=b(e);return(0,g.jsxs)("div",{className:(0,a.c)("tabs-container",v.tabList),children:[(0,g.jsx)(x,{...e,...t}),(0,g.jsx)(k,{...e,...t})]})}function y(e){const t=(0,m.c)();return(0,g.jsx)(w,{...e,children:d(e.children)},String(t))}},2172:(e,t,r)=>{r.d(t,{I:()=>o,M:()=>s});var n=r(1504);const a={},l=n.createContext(a);function s(e){const t=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),n.createElement(l.Provider,{value:t},e.children)}}}]);