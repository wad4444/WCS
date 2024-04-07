"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[192],{2948:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>o,default:()=>m,frontMatter:()=>l,metadata:()=>c,toc:()=>d});var s=n(7624),r=n(2172),a=(n(1268),n(5388),n(1964)),i=n(964);const l={sidebar_position:2},o="Humanoid Data",c={id:"tutorial/statuses/humanoid-data",title:"Humanoid Data",description:"Now, let's apply a new side effect to our status. When the stun is active on our character we want to set its",source:"@site/docs/tutorial/statuses/humanoid-data.md",sourceDirName:"tutorial/statuses",slug:"/tutorial/statuses/humanoid-data",permalink:"/WCS/docs/tutorial/statuses/humanoid-data",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Create a status effect",permalink:"/WCS/docs/tutorial/statuses/create-a-status"},next:{title:"Configuring Humanoid Data",permalink:"/WCS/docs/tutorial/statuses/configure-data"}},u={},d=[{value:"What is Humanoid Data?",id:"what-is-humanoid-data",level:2},{value:"What is The Mode?",id:"what-is-the-mode",level:2},{value:"Increment",id:"increment",level:3},{value:"Set",id:"set",level:3}];function h(e){const t={admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.M)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"humanoid-data",children:"Humanoid Data"}),"\n","\n","\n",(0,s.jsxs)(t.p,{children:["Now, let's apply a new ",(0,s.jsx)(t.em,{children:"side effect"})," to our ",(0,s.jsx)(t.em,{children:"status"}),". When the ",(0,s.jsx)(t.em,{children:"stun"})," is active on our ",(0,s.jsx)(t.em,{children:"character"})," we want to set its\n",(0,s.jsx)(t.code,{children:"WalkSpeed"})," and ",(0,s.jsx)(t.code,{children:"JumpPower"})," to ",(0,s.jsx)(t.em,{children:"zero"}),". ",(0,s.jsx)(t.strong,{children:"WCS"})," provides special tooling to manage your ",(0,s.jsx)(t.em,{children:"humanoid props"}),", here is a ",(0,s.jsx)(t.em,{children:"brief explanation"})," of how it works:"]}),"\n",(0,s.jsx)(t.h2,{id:"what-is-humanoid-data",children:"What is Humanoid Data?"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:"Humanoid Data"})," in ",(0,s.jsx)(t.strong,{children:"WCS"})," is a ",(0,s.jsx)(t.code,{children:"Map"})," where:"]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"Key"})," is one of the available humanoid property names:","\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"WalkSpeed, JumpPower, JumpHeight, AutoRotate"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"Value"})," is an array, where:","\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["First element is the ",(0,s.jsx)(t.em,{children:"property"})," ",(0,s.jsx)(t.code,{children:"value"}),"."]}),"\n",(0,s.jsxs)(t.li,{children:["Second element is the ",(0,s.jsx)(t.code,{children:"Mode"})," that ",(0,s.jsx)(t.em,{children:"this specific prop"})," will get applied with."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"Priority"})," is a value that you can specify upon setting the ",(0,s.jsx)(t.code,{children:"Humanoid Data"}),", it is used to resolve conflicts between different statuses."]}),"\n"]}),"\n",(0,s.jsx)(t.admonition,{type:"note",children:(0,s.jsxs)(t.p,{children:["If you don't provide priority value when setting new ",(0,s.jsx)(t.code,{children:"Humanoid Data"}),", it will be automatically set to 1."]})}),"\n",(0,s.jsx)(t.h2,{id:"what-is-the-mode",children:"What is The Mode?"}),"\n",(0,s.jsxs)(t.p,{children:["There are only 2 different property appliement ",(0,s.jsx)(t.code,{children:"modes"})," in ",(0,s.jsx)(t.strong,{children:"WCS"}),": ",(0,s.jsx)(t.code,{children:"Increment"})," and ",(0,s.jsx)(t.code,{children:"Set"}),"."]}),"\n",(0,s.jsx)(t.h3,{id:"increment",children:"Increment"}),"\n",(0,s.jsxs)(t.p,{children:["Let's say we have ",(0,s.jsx)(t.em,{children:"a status effect"})," that ",(0,s.jsx)(t.em,{children:"slows us down"})," by 5.\nIts ",(0,s.jsx)(t.code,{children:"Humanoid Data"})," should look like this:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-lua",children:'{ WalkSpeed = {-5, "Increment"} }\n'})}),"\n",(0,s.jsxs)(t.p,{children:["If the mode is set to ",(0,s.jsx)(t.code,{children:"Increment"}),", the property value will be summarized with the other sources:\nSo, if we have 2 slowness effects applied to our character, the slowness from them will be summarized."]}),"\n",(0,s.jsx)(a.c,{alt:"Docusaurus themed image",sources:{light:(0,i.c)("/img/themed-block-schemes/slowness10-white.png"),dark:(0,i.c)("/img/themed-block-schemes/slowness10-dark.png")}}),"\n",(0,s.jsx)(t.h3,{id:"set",children:"Set"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:"Set"})," explicitly sets the property value and ignores any incrementation:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-lua",children:'{ WalkSpeed = {-5, "Set"} }\n'})}),"\n",(0,s.jsxs)(t.p,{children:["If the mode is set to ",(0,s.jsx)(t.code,{children:"Set"}),", property value will be set to ",(0,s.jsx)(t.code,{children:"-5"}),", and not get affected by any increments:\nSo, if we have ",(0,s.jsx)(t.em,{children:"a slowness effect"})," and an effect that ",(0,s.jsx)(t.em,{children:"explicitly sets"})," the ",(0,s.jsx)(t.code,{children:"WalkSpeed"})," value ",(0,s.jsx)(t.em,{children:"applied to our character"}),",\nthe slowness will be ignored."]}),"\n",(0,s.jsx)(a.c,{alt:"Docusaurus themed image",sources:{light:(0,i.c)("/img/themed-block-schemes/slowness-set-0-white.png"),dark:(0,i.c)("/img/themed-block-schemes/slowness-set-0-dark.png")}}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"However"}),", if 2 ",(0,s.jsx)(t.em,{children:"different"})," status effect that ",(0,s.jsx)(t.code,{children:"Set"})," the ",(0,s.jsx)(t.em,{children:"same property value"})," get ",(0,s.jsx)(t.em,{children:"applied to the character"}),",\n",(0,s.jsx)(t.strong,{children:"WCS"})," will prioritize the one, which ",(0,s.jsx)(t.code,{children:"Priority"})," is set higher."]}),"\n",(0,s.jsx)(a.c,{alt:"Docusaurus themed image",sources:{light:(0,i.c)("/img/themed-block-schemes/double-set-white.png"),dark:(0,i.c)("/img/themed-block-schemes/double-set-dark.png")}})]})}function m(e={}){const{wrapper:t}={...(0,r.M)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},5388:(e,t,n)=>{n.d(t,{c:()=>i});n(1504);var s=n(5456);const r={tabItem:"tabItem_Ymn6"};var a=n(7624);function i(e){let{children:t,hidden:n,className:i}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,s.c)(r.tabItem,i),hidden:n,children:t})}},1268:(e,t,n)=>{n.d(t,{c:()=>y});var s=n(1504),r=n(5456),a=n(3943),i=n(5592),l=n(5288),o=n(632),c=n(7128),u=n(1148);function d(e){return s.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,s.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:n}=e;return(0,s.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:s,default:r}}=e;return{value:t,label:n,attributes:s,default:r}}))}(n);return function(e){const t=(0,c.w)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function p(e){let{queryString:t=!1,groupId:n}=e;const r=(0,i.Uz)(),a=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,o._M)(a),(0,s.useCallback)((e=>{if(!a)return;const t=new URLSearchParams(r.location.search);t.set(a,e),r.replace({...r.location,search:t.toString()})}),[a,r])]}function f(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,a=h(e),[i,o]=(0,s.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const s=n.find((e=>e.default))??n[0];if(!s)throw new Error("Unexpected error: 0 tabValues");return s.value}({defaultValue:t,tabValues:a}))),[c,d]=p({queryString:n,groupId:r}),[f,x]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,a]=(0,u.IN)(n);return[r,(0,s.useCallback)((e=>{n&&a.set(e)}),[n,a])]}({groupId:r}),j=(()=>{const e=c??f;return m({value:e,tabValues:a})?e:null})();(0,l.c)((()=>{j&&o(j)}),[j]);return{selectedValue:i,selectValue:(0,s.useCallback)((e=>{if(!m({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);o(e),d(e),x(e)}),[d,x,a]),tabValues:a}}var x=n(3664);const j={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var b=n(7624);function g(e){let{className:t,block:n,selectedValue:s,selectValue:i,tabValues:l}=e;const o=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.MV)(),u=e=>{const t=e.currentTarget,n=o.indexOf(t),r=l[n].value;r!==s&&(c(t),i(r))},d=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=o.indexOf(e.currentTarget)+1;t=o[n]??o[0];break}case"ArrowLeft":{const n=o.indexOf(e.currentTarget)-1;t=o[n]??o[o.length-1];break}}t?.focus()};return(0,b.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.c)("tabs",{"tabs--block":n},t),children:l.map((e=>{let{value:t,label:n,attributes:a}=e;return(0,b.jsx)("li",{role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,ref:e=>o.push(e),onKeyDown:d,onClick:u,...a,className:(0,r.c)("tabs__item",j.tabItem,a?.className,{"tabs__item--active":s===t}),children:n??t},t)}))})}function w(e){let{lazy:t,children:n,selectedValue:r}=e;const a=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=a.find((e=>e.props.value===r));return e?(0,s.cloneElement)(e,{className:"margin-top--md"}):null}return(0,b.jsx)("div",{className:"margin-top--md",children:a.map(((e,t)=>(0,s.cloneElement)(e,{key:t,hidden:e.props.value!==r})))})}function v(e){const t=f(e);return(0,b.jsxs)("div",{className:(0,r.c)("tabs-container",j.tabList),children:[(0,b.jsx)(g,{...e,...t}),(0,b.jsx)(w,{...e,...t})]})}function y(e){const t=(0,x.c)();return(0,b.jsx)(v,{...e,children:d(e.children)},String(t))}},2172:(e,t,n)=>{n.d(t,{I:()=>l,M:()=>i});var s=n(1504);const r={},a=s.createContext(r);function i(e){const t=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(a.Provider,{value:t},e.children)}}}]);