"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[792],{2708:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>h,frontMatter:()=>l,metadata:()=>c,toc:()=>d});var a=n(7624),r=n(2172),s=n(1268),o=n(5388);const l={sidebar_position:4},i="Applying a status",c={id:"tutorial/statuses/applying",title:"Applying a status",description:"Applying statuses to characters is very similar to applying abilities.",source:"@site/docs/tutorial/statuses/applying.md",sourceDirName:"tutorial/statuses",slug:"/tutorial/statuses/applying",permalink:"/WCS/docs/tutorial/statuses/applying",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Configuring Humanoid Data",permalink:"/WCS/docs/tutorial/statuses/configure-data"},next:{title:"Extras",permalink:"/WCS/docs/category/extras"}},u={},d=[];function p(e){const t={admonition:"admonition",code:"code",em:"em",h1:"h1",p:"p",pre:"pre",strong:"strong",...(0,r.M)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"applying-a-status",children:"Applying a status"}),"\n","\n","\n",(0,a.jsxs)(t.p,{children:["Applying statuses to ",(0,a.jsx)(t.em,{children:"characters"})," is very similar to ",(0,a.jsx)(t.em,{children:"applying abilities"}),".\nTo apply your ",(0,a.jsx)(t.em,{children:"status"})," to a character in ",(0,a.jsx)(t.strong,{children:"WCS"})," you need to instantiate ",(0,a.jsx)(t.em,{children:"the status class"})," providing a ",(0,a.jsx)(t.code,{children:"Character Class Instance"}),"."]}),"\n",(0,a.jsx)(t.admonition,{type:"note",children:(0,a.jsxs)(t.p,{children:["If you want to get the ",(0,a.jsx)(t.code,{children:"Character Class Instance"})," from ",(0,a.jsx)(t.em,{children:"a model its applied to"})," you can use a ",(0,a.jsx)(t.em,{children:"special static method"})," provided by ",(0,a.jsx)(t.strong,{children:"WCS"}),":\n",(0,a.jsx)(t.code,{children:"Character.GetCharacterFromInstance()"}),"."]})}),"\n",(0,a.jsx)(t.p,{children:"Let's make some ability give us a speed boost upon using:"}),"\n",(0,a.jsxs)(s.c,{groupId:"languages",children:[(0,a.jsx)(o.c,{value:"TypeScript",default:!0,children:(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-ts",metastring:'title="dash.ts" showLineNumbers',children:'import { Skill, SkillDecorator } from "@rbxts/wcs";\nimport { SpeedBoost } from "shared/statusEffects/speedBoost";\n\n@SkillDecorator\nexport class Dash extends Skill {\n\tpublic OnStartServer() {\n\t\tconst speedBoost = new SpeedBoost(this.Character);\n\t\tspeedBoost.Start(5);\n\t}\n}\n'})})}),(0,a.jsx)(o.c,{value:"Luau",children:(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-lua",metastring:'title="dash.lua" showLineNumbers',children:'local ReplicatedStorage = game:GetService("ReplicatedStorage")\nlocal WCS = require(ReplicatedStorage.WCS)\n\nlocal SpeedBoost = require(ReplicatedStorage.StatusEffects.SpeedBoost)\nlocal Dash = WCS.RegisterSkill("Dash")\n\nfunction Dash:OnStartServer()\n\tlocal speedBoost = SpeedBoost.new(self.Character)\n\tspeedBoost:Start(5)\nend\n\nreturn Dash\n'})})})]}),"\n",(0,a.jsx)(t.admonition,{type:"info",children:(0,a.jsxs)(t.p,{children:["You can ",(0,a.jsx)(t.em,{children:"safely"})," instantiate ",(0,a.jsx)(t.em,{children:"status effects on client"}),", but they will ",(0,a.jsx)(t.em,{children:"not be replicated"})," and will ",(0,a.jsx)(t.em,{children:"only be visible"})," to client character ",(0,a.jsx)(t.em,{children:"apis"}),"."]})}),"\n",(0,a.jsx)(t.admonition,{type:"note",children:(0,a.jsxs)(t.p,{children:["You can invoke ",(0,a.jsx)(t.code,{children:"Start()"})," without providing a time limit, but you will have to call ",(0,a.jsx)(t.code,{children:"Stop()"})," manually."]})}),"\n",(0,a.jsx)(t.admonition,{type:"warning",children:(0,a.jsxs)(t.p,{children:["To prevent ",(0,a.jsx)(t.em,{children:"memory leaks"})," ",(0,a.jsx)(t.strong,{children:"WCS"})," calls ",(0,a.jsx)(t.code,{children:"Destroy()"})," on a ",(0,a.jsx)(t.em,{children:"status effects"})," automatically when it ends.\nYou can set ",(0,a.jsx)(t.code,{children:"DestroyOnEnd"})," to false inside ",(0,a.jsx)(t.code,{children:"OnConstructServer()"})," to change that behavior, but you will have to\ncall ",(0,a.jsx)(t.code,{children:"Destroy()"})," manually."]})})]})}function h(e={}){const{wrapper:t}={...(0,r.M)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},5388:(e,t,n)=>{n.d(t,{c:()=>o});n(1504);var a=n(5456);const r={tabItem:"tabItem_Ymn6"};var s=n(7624);function o(e){let{children:t,hidden:n,className:o}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,a.c)(r.tabItem,o),hidden:n,children:t})}},1268:(e,t,n)=>{n.d(t,{c:()=>S});var a=n(1504),r=n(5456),s=n(3943),o=n(5592),l=n(5288),i=n(632),c=n(7128),u=n(1148);function d(e){return a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}(n);return function(e){const t=(0,c.w)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function h(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:n}=e;const r=(0,o.Uz)(),s=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i._M)(s),(0,a.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(r.location.search);t.set(s,e),r.replace({...r.location,search:t.toString()})}),[s,r])]}function f(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,s=p(e),[o,i]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:s}))),[c,d]=m({queryString:n,groupId:r}),[f,b]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,s]=(0,u.IN)(n);return[r,(0,a.useCallback)((e=>{n&&s.set(e)}),[n,s])]}({groupId:r}),g=(()=>{const e=c??f;return h({value:e,tabValues:s})?e:null})();(0,l.c)((()=>{g&&i(g)}),[g]);return{selectedValue:o,selectValue:(0,a.useCallback)((e=>{if(!h({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);i(e),d(e),b(e)}),[d,b,s]),tabValues:s}}var b=n(3664);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var x=n(7624);function y(e){let{className:t,block:n,selectedValue:a,selectValue:o,tabValues:l}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,s.MV)(),u=e=>{const t=e.currentTarget,n=i.indexOf(t),r=l[n].value;r!==a&&(c(t),o(r))},d=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=i.indexOf(e.currentTarget)+1;t=i[n]??i[0];break}case"ArrowLeft":{const n=i.indexOf(e.currentTarget)-1;t=i[n]??i[i.length-1];break}}t?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.c)("tabs",{"tabs--block":n},t),children:l.map((e=>{let{value:t,label:n,attributes:s}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:a===t?0:-1,"aria-selected":a===t,ref:e=>i.push(e),onKeyDown:d,onClick:u,...s,className:(0,r.c)("tabs__item",g.tabItem,s?.className,{"tabs__item--active":a===t}),children:n??t},t)}))})}function v(e){let{lazy:t,children:n,selectedValue:r}=e;const s=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=s.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:s.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r})))})}function j(e){const t=f(e);return(0,x.jsxs)("div",{className:(0,r.c)("tabs-container",g.tabList),children:[(0,x.jsx)(y,{...e,...t}),(0,x.jsx)(v,{...e,...t})]})}function S(e){const t=(0,b.c)();return(0,x.jsx)(j,{...e,children:d(e.children)},String(t))}},2172:(e,t,n)=>{n.d(t,{I:()=>l,M:()=>o});var a=n(1504);const r={},s=a.createContext(r);function o(e){const t=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),a.createElement(s.Provider,{value:t},e.children)}}}]);