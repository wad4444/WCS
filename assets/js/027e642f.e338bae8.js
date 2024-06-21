"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[528],{3532:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>a,contentTitle:()=>d,default:()=>x,frontMatter:()=>c,metadata:()=>t,toc:()=>o});var r=n(7624),i=n(2172),l=(n(1268),n(5388),n(1552));const c={sidebar_position:1},d="WCS",t={id:"api/wcs",title:"WCS",description:"[Moveset]: ../tutorial/extras/movesets.md",source:"@site/docs/api/wcs.md",sourceDirName:"api",slug:"/api/wcs",permalink:"/WCS/docs/api/wcs",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"apiSidebar",next:{title:"Server",permalink:"/WCS/docs/api/server"}},a={},o=[{value:"<code>CreateServer()</code>",id:"createserver",level:2},{value:"<code>CreateClient()</code>",id:"createclient",level:2},{value:"<code>RegisterStatusEffect(name, extendsFrom)</code>",id:"registerstatuseffectname-extendsfrom",level:2},{value:"<code>RegisterSkill(name, extendsFrom)</code>",id:"registerskillname-extendsfrom",level:2},{value:"<code>RegisterHoldableSkill(name, extendsFrom)</code>",id:"registerholdableskillname-extendsfrom",level:2},{value:"<code>DefineMessage(fn, config)</code>",id:"definemessagefn-config",level:2},{value:"<code>Character</code> <strong>@readonly</strong>",id:"character-readonly",level:2},{value:"<code>CreateMoveset(name, skills, constructorArgs)</code>",id:"createmovesetname-skills-constructorargs",level:2},{value:"<code>GetMovesetObjectByName(name)</code>",id:"getmovesetobjectbynamename",level:2},{value:"<code>SkillType</code>",id:"skilltype",level:2}];function h(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.M)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.h1,{id:"wcs",children:"WCS"}),"\n",(0,r.jsx)(l.c,{toc:o}),"\n",(0,r.jsx)(s.h2,{id:"createserver",children:(0,r.jsx)(s.code,{children:"CreateServer()"})}),"\n",(0,r.jsxs)(s.p,{children:["Creates a ",(0,r.jsx)(s.a,{href:"/WCS/docs/api/server",children:"Server"})," object and returns it.\nIf called more than once returns the same ",(0,r.jsx)(s.a,{href:"/WCS/docs/api/server",children:"server"})," object."]}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"Returns:"})})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"/WCS/docs/api/server",children:"Server"})}),"\n"]}),"\n",(0,r.jsx)(s.h2,{id:"createclient",children:(0,r.jsx)(s.code,{children:"CreateClient()"})}),"\n",(0,r.jsxs)(s.p,{children:["Creates a ",(0,r.jsx)(s.a,{href:"/WCS/docs/api/client",children:"Client"})," object and returns it.\nIf called more than once returns the same ",(0,r.jsx)(s.a,{href:"/WCS/docs/api/client",children:"client"})," object."]}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"Returns:"})})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"/WCS/docs/api/client",children:"Client"})}),"\n"]}),"\n",(0,r.jsx)(s.h2,{id:"registerstatuseffectname-extendsfrom",children:(0,r.jsx)(s.code,{children:"RegisterStatusEffect(name, extendsFrom)"})}),"\n",(0,r.jsxs)(s.p,{children:["Registers a new ",(0,r.jsx)(s.a,{href:"/WCS/docs/api/statusEffect",children:"status effect"})," with name specified in an argument."]}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["Name: ",(0,r.jsx)(s.code,{children:"string"})]}),"\n",(0,r.jsxs)(s.li,{children:["ExtendsFrom: ",(0,r.jsx)(s.code,{children:"StatusEffectImpl"})]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"Returns:"})})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"/WCS/docs/api/statusEffect",children:"StatusEffect"})}),"\n"]}),"\n",(0,r.jsx)(s.h2,{id:"registerskillname-extendsfrom",children:(0,r.jsx)(s.code,{children:"RegisterSkill(name, extendsFrom)"})}),"\n",(0,r.jsxs)(s.p,{children:["Registers a new ",(0,r.jsx)(s.a,{href:"/WCS/docs/api/skill",children:"skill"})," with name specified in an argument."]}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["Name: ",(0,r.jsx)(s.code,{children:"string"})]}),"\n",(0,r.jsxs)(s.li,{children:["ExtendsFrom: ",(0,r.jsx)(s.code,{children:"Skill"})]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"Returns:"})})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"/WCS/docs/api/skill",children:"Skill"})}),"\n"]}),"\n",(0,r.jsx)(s.h2,{id:"registerholdableskillname-extendsfrom",children:(0,r.jsx)(s.code,{children:"RegisterHoldableSkill(name, extendsFrom)"})}),"\n",(0,r.jsxs)(s.p,{children:["Registers a new ",(0,r.jsx)(s.a,{href:"/WCS/docs/tutorial/skills/holdable",children:"holdable skill"})," with name specified in an argument."]}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["Name: ",(0,r.jsx)(s.code,{children:"string"})]}),"\n",(0,r.jsxs)(s.li,{children:["ExtendsFrom: ",(0,r.jsx)(s.code,{children:"Skill"})]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"Returns:"})})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"/WCS/docs/tutorial/skills/holdable",children:"Holdable Skill"})}),"\n"]}),"\n",(0,r.jsx)(s.h2,{id:"definemessagefn-config",children:(0,r.jsx)(s.code,{children:"DefineMessage(fn, config)"})}),"\n",(0,r.jsxs)(s.p,{children:["Registers a ",(0,r.jsx)(s.a,{href:"/WCS/docs/tutorial/messages/intro",children:"message"}),"."]}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["Function: ",(0,r.jsx)(s.code,{children:"function"})]}),"\n",(0,r.jsxs)(s.li,{children:["Config: ",(0,r.jsx)(s.code,{children:"MessageConfig"})]}),"\n"]}),"\n",(0,r.jsxs)(s.h2,{id:"character-readonly",children:[(0,r.jsx)(s.code,{children:"Character"})," ",(0,r.jsx)(s.strong,{children:"@readonly"})]}),"\n",(0,r.jsxs)(s.p,{children:["An exported ",(0,r.jsx)(s.a,{href:"/WCS/docs/api/character",children:"character"})," class."]}),"\n",(0,r.jsx)(s.h2,{id:"createmovesetname-skills-constructorargs",children:(0,r.jsx)(s.code,{children:"CreateMoveset(name, skills, constructorArgs)"})}),"\n",(0,r.jsxs)(s.p,{children:["Creates a ",(0,r.jsx)(s.a,{href:"/WCS/docs/tutorial/extras/movesets",children:"Moveset"})," object and returns it.\nAccepts the name and array of skills."]}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["Name: ",(0,r.jsx)(s.code,{children:"string"})]}),"\n",(0,r.jsxs)(s.li,{children:["Skills: ",(0,r.jsx)(s.code,{children:"{AnySkillConstructor}"})]}),"\n",(0,r.jsxs)(s.li,{children:["ConstructorArguments: ",(0,r.jsx)(s.code,{children:"{[string | SkillImpl]: any[]}"})," - an object that contains array of ",(0,r.jsx)(s.code,{children:"ConstructorArguments"})," that skill should get instantiated with."]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"Returns:"})})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"/WCS/docs/tutorial/extras/movesets",children:"Moveset"})}),"\n"]}),"\n",(0,r.jsx)(s.h2,{id:"getmovesetobjectbynamename",children:(0,r.jsx)(s.code,{children:"GetMovesetObjectByName(name)"})}),"\n",(0,r.jsxs)(s.p,{children:["Retrieves ",(0,r.jsx)(s.a,{href:"/WCS/docs/tutorial/extras/movesets",children:"Moveset"})," object by its name if registered."]}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["Name: ",(0,r.jsx)(s.code,{children:"string"})]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"Returns:"})})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["Moveset: ",(0,r.jsx)(s.a,{href:"/WCS/docs/tutorial/extras/movesets",children:(0,r.jsx)(s.code,{children:"Moveset?"})})]}),"\n"]}),"\n",(0,r.jsx)(s.h2,{id:"skilltype",children:(0,r.jsx)(s.code,{children:"SkillType"})}),"\n",(0,r.jsx)(s.p,{children:"An exported skill type enum."}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"Members:"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{children:"Default,\nHoldable\n"})})]})}function x(e={}){const{wrapper:s}={...(0,i.M)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}}}]);