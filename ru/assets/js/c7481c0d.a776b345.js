"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[936],{6432:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>c,default:()=>m,frontMatter:()=>i,metadata:()=>o,toc:()=>d});var r=t(7624),s=t(2172),a=(t(1268),t(5388),t(1964)),l=t(964);const i={sidebar_position:2},c="Humanoid Data",o={id:"tutorial/statuses/humanoid-data",title:"Humanoid Data",description:"\u0418 \u0442\u0430\u043a, \u0434\u0430\u0432\u0430\u0439\u0442\u0435 \u0434\u043e\u0431\u0430\u0432\u0438\u043c \u043d\u043e\u0432\u044b\u0439 \u0441\u0430\u0439\u0434-\u044d\u0444\u0444\u0435\u043a\u0442 \u043a \u043d\u0430\u0448\u0435\u043c\u0443 \u0441\u0442\u0430\u0442\u0443\u0441\u0443. \u041f\u043e\u043a\u0430 \u0441\u0442\u0430\u043d \u0430\u043a\u0442\u0438\u0432\u0435\u043d \u043d\u0430 \u043d\u0430\u0448\u0435\u043c \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0435, \u043d\u0430\u043c \u043d\u0443\u0436\u043d\u043e",source:"@site/i18n/ru/docusaurus-plugin-content-docs/current/tutorial/statuses/humanoid-data.md",sourceDirName:"tutorial/statuses",slug:"/tutorial/statuses/humanoid-data",permalink:"/WCS/ru/docs/tutorial/statuses/humanoid-data",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u0421\u0442\u0430\u0442\u0443\u0441 \u042d\u0444\u0444\u0435\u043a\u0442\u0430",permalink:"/WCS/ru/docs/tutorial/statuses/create-a-status"},next:{title:"\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0430 Humanoid Data",permalink:"/WCS/ru/docs/tutorial/statuses/configure-data"}},u={},d=[{value:"\u0427\u0442\u043e \u0442\u0430\u043a\u043e\u0435 Humanoid Data?",id:"\u0447\u0442\u043e-\u0442\u0430\u043a\u043e\u0435-humanoid-data",level:2},{value:"\u0427\u0442\u043e \u0442\u0430\u043a\u043e\u0435 Mode?",id:"\u0447\u0442\u043e-\u0442\u0430\u043a\u043e\u0435-mode",level:2},{value:"Increment",id:"increment",level:3},{value:"Set",id:"set",level:3}];function h(e){const n={admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.M)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"humanoid-data",children:"Humanoid Data"}),"\n","\n","\n",(0,r.jsxs)(n.p,{children:["\u0418 \u0442\u0430\u043a, \u0434\u0430\u0432\u0430\u0439\u0442\u0435 \u0434\u043e\u0431\u0430\u0432\u0438\u043c \u043d\u043e\u0432\u044b\u0439 ",(0,r.jsx)(n.em,{children:"\u0441\u0430\u0439\u0434-\u044d\u0444\u0444\u0435\u043a\u0442"})," \u043a \u043d\u0430\u0448\u0435\u043c\u0443 ",(0,r.jsx)(n.em,{children:"\u0441\u0442\u0430\u0442\u0443\u0441\u0443"}),". \u041f\u043e\u043a\u0430 ",(0,r.jsx)(n.em,{children:"\u0441\u0442\u0430\u043d"})," \u0430\u043a\u0442\u0438\u0432\u0435\u043d \u043d\u0430 \u043d\u0430\u0448\u0435\u043c ",(0,r.jsx)(n.em,{children:"\u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0435"}),", \u043d\u0430\u043c \u043d\u0443\u0436\u043d\u043e\n\u0443\u0441\u0442\u0430\u043d\u0430\u0432\u043b\u0438\u0432\u0430\u0442\u044c ",(0,r.jsx)(n.code,{children:"WalkSpeed"})," \u0438 ",(0,r.jsx)(n.code,{children:"JumpPower"})," \u043d\u0430 ",(0,r.jsx)(n.em,{children:"\u043d\u043e\u043b\u044c"}),".\n",(0,r.jsx)(n.strong,{children:"WCS"}),' \u043f\u0440\u0435\u0434\u043e\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442 \u0441\u043f\u0435\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0439 "\u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442" \u0434\u043b\u044f \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f ',(0,r.jsx)(n.em,{children:"\u0441\u0442\u0430\u0442\u0430\u043c\u0438 \u0445\u0443\u043c\u0430\u043d\u043e\u0438\u0434\u0430"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"\u0447\u0442\u043e-\u0442\u0430\u043a\u043e\u0435-humanoid-data",children:"\u0427\u0442\u043e \u0442\u0430\u043a\u043e\u0435 Humanoid Data?"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"Humanoid Data"})," \u0432 ",(0,r.jsx)(n.strong,{children:"WCS"})," \u044d\u0442\u043e ",(0,r.jsx)(n.code,{children:"\u0421\u043b\u043e\u0432\u0430\u0440\u044c"}),", \u0433\u0434\u0435:"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"\u041a\u043b\u044e\u0447"})," \u044d\u0442\u043e \u0438\u043c\u044f \u043e\u0434\u043d\u043e\u0433\u043e \u0438\u0437 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b\u0445 ",(0,r.jsx)(n.code,{children:"\u0441\u0432\u043e\u0439\u0441\u0442\u0432"})," \u0445\u0443\u043c\u0430\u043d\u043e\u0438\u0434\u0430:","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"WalkSpeed, JumpPower, JumpHeight, AutoRotate"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"\u0417\u043d\u0430\u0447\u0435\u043d\u0438\u0435"})," \u044d\u0442\u043e \u0441\u043f\u0438\u0441\u043e\u043a, \u0433\u0434\u0435:","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u041f\u0435\u0440\u0432\u044b\u0439 \u044d\u043b\u0435\u043c\u0435\u043d\u0442 \u044d\u0442\u043e \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 ",(0,r.jsx)(n.em,{children:"property"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:["\u0412\u0442\u043e\u0440\u043e\u0439 \u044d\u043b\u0435\u043c\u0435\u043d\u0442 \u044d\u0442\u043e ",(0,r.jsx)(n.code,{children:"Mode"})," (\u0440\u0435\u0436\u0438\u043c), \u0441 \u043a\u043e\u0442\u043e\u0440\u044b\u043c\u0438 ",(0,r.jsx)(n.em,{children:"property"})," \u0431\u0443\u0434\u0435\u0442 \u043d\u0430\u043b\u043e\u0436\u0435\u043d."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Priority"})," \u044d\u0442\u043e \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435, \u043a\u043e\u0442\u043e\u0440\u043e\u0435 \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0443\u043a\u0430\u0437\u0430\u0442\u044c \u043f\u0440\u0438 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u0438 ",(0,r.jsx)(n.code,{children:"Humanoid Data"}),". \u041e\u043d\u043e \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442\u0441\u044f \u0434\u043b\u044f \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u0438\u044f \u043a\u043e\u043d\u0444\u043b\u0438\u043a\u0442\u043e\u0432 \u043c\u0435\u0436\u0434\u0443 \u0440\u0430\u0437\u043d\u044b\u043c\u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u0430\u043c\u0438."]}),"\n"]}),"\n",(0,r.jsx)(n.admonition,{type:"note",children:(0,r.jsxs)(n.p,{children:["\u0415\u0441\u043b\u0438 \u043f\u0440\u0438 \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0438 ",(0,r.jsx)(n.code,{children:"Humanoid Data"})," \u0432\u044b \u043d\u0435 \u0437\u0430\u0434\u0430\u0434\u0438\u0442\u0435 \u043f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442, \u0442\u043e \u043e\u043d \u0431\u0443\u0434\u0435\u0442 \u0440\u0430\u0432\u0435\u043d  \u0435\u0434\u0438\u043d\u0438\u0446\u0435."]})}),"\n",(0,r.jsx)(n.h2,{id:"\u0447\u0442\u043e-\u0442\u0430\u043a\u043e\u0435-mode",children:"\u0427\u0442\u043e \u0442\u0430\u043a\u043e\u0435 Mode?"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"Mode"})," - \u044d\u0442\u043e \u0440\u0435\u0436\u0438\u043c \u043f\u0440\u0438\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0441\u0432\u043e\u0439\u0441\u0442\u0432 \u0445\u0443\u043c\u0430\u043d\u043e\u0438\u0434\u0430.\n\u0412 ",(0,r.jsx)(n.strong,{children:"WCS"})," \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0442\u043e\u043b\u044c\u043a\u043e 2 \u0440\u0430\u0437\u043b\u0438\u0447\u043d\u044b\u0445 \u0440\u0435\u0436\u0438\u043c\u0430 \u043f\u0440\u0438\u043c\u0435\u043d\u0435\u043d\u0438\u044f ",(0,r.jsx)(n.em,{children:"\u0441\u0432\u043e\u0439\u0441\u0442\u0432"}),": ",(0,r.jsx)(n.code,{children:"Increment"})," \u0438 ",(0,r.jsx)(n.code,{children:"Set"}),"."]}),"\n",(0,r.jsx)(n.h3,{id:"increment",children:"Increment"}),"\n",(0,r.jsxs)(n.p,{children:["\u041a \u043f\u0440\u0438\u043c\u0435\u0440\u0443, \u0443 \u043d\u0430\u0441 \u0435\u0441\u0442\u044c ",(0,r.jsx)(n.em,{children:"\u0441\u0442\u0430\u0442\u0443\u0441 \u044d\u0444\u0444\u0435\u043a\u0442"}),", \u043a\u043e\u0442\u043e\u0440\u044b\u0439 ",(0,r.jsx)(n.em,{children:"\u0437\u0430\u043c\u0435\u0434\u043b\u044f\u0435\u0442"})," \u043d\u0430\u0441 \u043d\u0430 5 \u0435\u0434\u0438\u043d\u0438\u0446 ",(0,r.jsx)(n.code,{children:"WalkSpeed"}),".\n\u0415\u0433\u043e ",(0,r.jsx)(n.code,{children:"Humanoid Data"})," \u0431\u0443\u0434\u0435\u0442 \u0432\u044b\u0433\u043b\u044f\u0434\u0438\u0442\u044c \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u043c \u043e\u0431\u0440\u0430\u0437\u043e\u043c:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-lua",children:'{ WalkSpeed = {-5, "Increment"} }\n'})}),"\n",(0,r.jsxs)(n.p,{children:["\u0415\u0441\u043b\u0438 \u0440\u0435\u0436\u0438\u043c \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d \u043d\u0430 ",(0,r.jsx)(n.code,{children:"Increment"}),", \u0442\u043e \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u0441\u0432\u043e\u0439\u0441\u0442\u0432\u0430 \u0431\u0443\u0434\u0435\u0442 \u0441\u0443\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u043e \u0441 \u0434\u0440\u0443\u0433\u0438\u043c\u0438 \u0438\u0441\u0442\u043e\u0447\u043d\u0438\u043a\u0430\u043c\u0438 \u0434\u0430\u0442\u044b:\n\u0422\u043e\u0435\u0441\u0442\u044c, \u0435\u0441\u043b\u0438 \u0443 \u043d\u0430\u0441 \u0435\u0441\u0442\u044c \u0434\u0432\u0430 \u044d\u0444\u0444\u0435\u043a\u0442\u0430 \u0437\u0430\u043c\u0435\u0434\u043b\u0435\u043d\u043d\u0438\u044f, \u0442\u043e \u0438\u0445 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f \u0431\u0443\u0434\u0443\u0442 \u043f\u0440\u043e\u0441\u0443\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b."]}),"\n",(0,r.jsx)(a.c,{alt:"Docusaurus themed image",sources:{light:(0,l.c)("/img/themed-block-schemes/slowness10-white.png"),dark:(0,l.c)("/img/themed-block-schemes/slowness10-dark.png")}}),"\n",(0,r.jsx)(n.h3,{id:"set",children:"Set"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"Set"})," \u0441\u0442\u0440\u043e\u0433\u043e \u0443\u0441\u0442\u0430\u043d\u0430\u0432\u043b\u0438\u0432\u0430\u0435\u0442 ",(0,r.jsx)(n.em,{children:"\u0441\u0432\u043e\u0439\u0441\u0442\u0432\u043e"})," \u043d\u0430 ",(0,r.jsx)(n.strong,{children:"\u043e\u0434\u043d\u043e"})," \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435, \u0438\u0433\u043d\u043e\u0440\u0438\u0440\u0443\u044f ",(0,r.jsx)(n.em,{children:"\u0441\u0443\u043c\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-lua",children:'{ WalkSpeed = {-5, "Set"} }\n'})}),"\n",(0,r.jsxs)(n.p,{children:["\u0415\u0441\u043b\u0438 \u0440\u0435\u0436\u0438\u043c \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d \u043d\u0430 ",(0,r.jsx)(n.code,{children:"Set"}),", \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u043f\u043e\u043b\u044f \u0431\u0443\u0434\u0435\u0442 \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d\u043e \u043d\u0430 ",(0,r.jsx)(n.code,{children:"-5"}),", \u0438 \u043d\u0435 \u0431\u0443\u0434\u0435\u0442 \u043f\u043e\u0434\u0432\u0435\u0440\u0436\u0435\u043d\u043e \u0441\u0443\u043c\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044e:\n\u0422\u043e-\u0435\u0441\u0442\u044c, \u0435\u0441\u043b\u0438 \u0443 \u043d\u0430\u0441 \u0435\u0441\u0442\u044c ",(0,r.jsx)(n.em,{children:"\u044d\u0444\u0444\u0435\u043a\u0442 \u0437\u0430\u043c\u0435\u0434\u043b\u0435\u043d\u0438\u044f"})," \u0438 \u044d\u0444\u0444\u0435\u043a\u0442, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 ",(0,r.jsx)(n.em,{children:"\u0441\u0442\u0440\u043e\u0433\u043e \u0443\u0441\u0442\u0430\u043d\u0430\u0432\u043b\u0438\u0432\u0430\u0435\u0442"})," \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 ",(0,r.jsx)(n.code,{children:"WalkSpeed"}),", \u0442\u043e\n\u0437\u0430\u043c\u0435\u0434\u043b\u0435\u043d\u0438\u0435 \u0431\u0443\u0434\u0435\u0442 ",(0,r.jsx)(n.em,{children:"\u043f\u0440\u043e\u0438\u0433\u043d\u043e\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u043e"}),"."]}),"\n",(0,r.jsx)(a.c,{alt:"Docusaurus themed image",sources:{light:(0,l.c)("/img/themed-block-schemes/slowness-set-0-white.png"),dark:(0,l.c)("/img/themed-block-schemes/slowness-set-0-dark.png")}}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"\u041e\u0434\u043d\u0430\u043a\u043e"}),", \u0435\u0441\u043b\u0438 \u043a \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0443 \u0431\u0443\u0434\u0443\u0442 \u043f\u0440\u0438\u043c\u0435\u043d\u0435\u043d\u044b 2 ",(0,r.jsx)(n.em,{children:"\u0440\u0430\u0437\u043d\u044b\u0445"})," \u0441\u0442\u0430\u0442\u0443\u0441 \u044d\u0444\u0444\u0435\u043a\u0442\u0430, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0443\u0441\u0442\u0430\u043d\u0430\u0432\u043b\u0438\u0432\u0430\u044e\u0442 ",(0,r.jsx)(n.em,{children:"\u0440\u0430\u0437\u043d\u044b\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f \u0434\u043b\u044f \u043e\u0434\u043d\u043e\u0433\u043e \u0441\u0432\u043e\u0439\u0441\u0442\u0432\u0430"}),", \u0442\u043e ",(0,r.jsx)(n.strong,{children:"WCS"})," \u043e\u0442\u0434\u0430\u0441\u0442 \u043f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442 \u0442\u043e\u043c\u0443, \u0443 \u043a\u043e\u0442\u043e\u0440\u043e\u0433\u043e \u0441\u0432\u043e\u0439\u0441\u0442\u0432\u043e ",(0,r.jsx)(n.code,{children:"Priority"})," \u0431\u0443\u0434\u0435\u0442 \u0432\u044b\u0448\u0435."]}),"\n",(0,r.jsx)(a.c,{alt:"Docusaurus themed image",sources:{light:(0,l.c)("/img/themed-block-schemes/double-set-white.png"),dark:(0,l.c)("/img/themed-block-schemes/double-set-dark.png")}})]})}function m(e={}){const{wrapper:n}={...(0,s.M)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},5388:(e,n,t)=>{t.d(n,{c:()=>l});t(1504);var r=t(5456);const s={tabItem:"tabItem_Ymn6"};var a=t(7624);function l(e){let{children:n,hidden:t,className:l}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,r.c)(s.tabItem,l),hidden:t,children:n})}},1268:(e,n,t)=>{t.d(n,{c:()=>w});var r=t(1504),s=t(5456),a=t(3943),l=t(5592),i=t(5288),c=t(632),o=t(7128),u=t(1148);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:s}}=e;return{value:n,label:t,attributes:r,default:s}}))}(t);return function(e){const n=(0,o.w)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function m(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function p(e){let{queryString:n=!1,groupId:t}=e;const s=(0,l.Uz)(),a=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,c._M)(a),(0,r.useCallback)((e=>{if(!a)return;const n=new URLSearchParams(s.location.search);n.set(a,e),s.replace({...s.location,search:n.toString()})}),[a,s])]}function x(e){const{defaultValue:n,queryString:t=!1,groupId:s}=e,a=h(e),[l,c]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!m({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:a}))),[o,d]=p({queryString:t,groupId:s}),[x,j]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[s,a]=(0,u.IN)(t);return[s,(0,r.useCallback)((e=>{t&&a.set(e)}),[t,a])]}({groupId:s}),b=(()=>{const e=o??x;return m({value:e,tabValues:a})?e:null})();(0,i.c)((()=>{b&&c(b)}),[b]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);c(e),d(e),j(e)}),[d,j,a]),tabValues:a}}var j=t(3664);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var f=t(7624);function g(e){let{className:n,block:t,selectedValue:r,selectValue:l,tabValues:i}=e;const c=[],{blockElementScrollPositionUntilNextRender:o}=(0,a.MV)(),u=e=>{const n=e.currentTarget,t=c.indexOf(n),s=i[t].value;s!==r&&(o(n),l(s))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=c.indexOf(e.currentTarget)+1;n=c[t]??c[0];break}case"ArrowLeft":{const t=c.indexOf(e.currentTarget)-1;n=c[t]??c[c.length-1];break}}n?.focus()};return(0,f.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.c)("tabs",{"tabs--block":t},n),children:i.map((e=>{let{value:n,label:t,attributes:a}=e;return(0,f.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>c.push(e),onKeyDown:d,onClick:u,...a,className:(0,s.c)("tabs__item",b.tabItem,a?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function v(e){let{lazy:n,children:t,selectedValue:s}=e;const a=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===s));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,f.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==s})))})}function k(e){const n=x(e);return(0,f.jsxs)("div",{className:(0,s.c)("tabs-container",b.tabList),children:[(0,f.jsx)(g,{...e,...n}),(0,f.jsx)(v,{...e,...n})]})}function w(e){const n=(0,j.c)();return(0,f.jsx)(k,{...e,children:d(e.children)},String(n))}},2172:(e,n,t)=>{t.d(n,{I:()=>i,M:()=>l});var r=t(1504);const s={},a=r.createContext(s);function l(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);