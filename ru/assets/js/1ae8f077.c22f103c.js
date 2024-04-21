"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[392],{3912:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>h,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>x});var n=r(7624),t=r(2172),c=r(1268),d=r(5388),l=r(1552);const i={sidebar_position:4},a="Character",o={id:"api/character",title:"Character",description:"[Moveset]: ../tutorial/extras/movesets.md",source:"@site/i18n/ru/docusaurus-plugin-content-docs/current/api/character.md",sourceDirName:"api",slug:"/api/character",permalink:"/WCS/ru/docs/api/character",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"apiSidebar",previous:{title:"Client",permalink:"/WCS/ru/docs/api/client"},next:{title:"Skill",permalink:"/WCS/ru/docs/api/skill"}},h={},x=[{value:"Static Events / Methods",id:"static-events--methods",level:2},{value:"<code>CharacterCreated</code>",id:"charactercreated",level:3},{value:"<code>CharacterDestroyed</code>",id:"characterdestroyed",level:3},{value:"<code>GetCharacterMap()</code>",id:"getcharactermap",level:3},{value:"<code>GetCharacterFromInstance(instance)</code>",id:"getcharacterfrominstanceinstance",level:3},{value:"Fields",id:"fields",level:2},{value:"<code>Instance</code> <strong>@readonly</strong>",id:"instance-readonly",level:3},{value:"<code>Humanoid</code> <strong>@readonly</strong>",id:"humanoid-readonly",level:3},{value:"<code>Player?</code> <strong>@readonly</strong>",id:"player-readonly",level:3},{value:"Events",id:"events",level:2},{value:"<code>SkillAdded</code>",id:"skilladded",level:3},{value:"<code>SkillRemoved</code>",id:"skillremoved",level:3},{value:"<code>StatusEffectAdded</code>",id:"statuseffectadded",level:3},{value:"<code>StatusEffectRemoved</code>",id:"statuseffectremoved",level:3},{value:"<code>HumanoidPropertiesUpdated</code>",id:"humanoidpropertiesupdated",level:3},{value:"<code>DamageTaken</code>",id:"damagetaken",level:3},{value:"<code>DamageDealt</code>",id:"damagedealt",level:3},{value:"<code>Destroyed</code>",id:"destroyed",level:3},{value:"<code>MovesetChanged</code>",id:"movesetchanged",level:3},{value:"Constructors",id:"constructors",level:2},{value:"constructor(instance) -&gt; Character",id:"constructorinstance---character",level:3},{value:"Methods",id:"methods",level:2},{value:"<code>Destroy()</code>",id:"destroy",level:3},{value:"<code>TakeDamage(container)</code>",id:"takedamagecontainer",level:3},{value:"<code>PredictDamage(container)</code>",id:"predictdamagecontainer",level:3},{value:"<code>SetDefaultProps(props)</code>",id:"setdefaultpropsprops",level:3},{value:"<code>GetDefaultProps()</code>",id:"getdefaultprops",level:3},{value:"<code>GetAllStatusEffect()</code>",id:"getallstatuseffect",level:3},{value:"<code>GetAllActiveStatusEffect()</code>",id:"getallactivestatuseffect",level:3},{value:"<code>GetAllStatusEffectsOfType(constructor)</code>",id:"getallstatuseffectsoftypeconstructor",level:3},{value:"<code>GetAllActiveStatusEffectsOfType(constructor)</code>",id:"getallactivestatuseffectsoftypeconstructor",level:3},{value:"<code>HasStatusEffects(statuses)</code>",id:"hasstatuseffectsstatuses",level:3},{value:"<code>GetSkills()</code>",id:"getskills",level:3},{value:"<code>GetAllActiveSkills()</code>",id:"getallactiveskills",level:3},{value:"<code>GetSkillFromString(name)</code>",id:"getskillfromstringname",level:3},{value:"<code>GetSkillFromConstructor(constructor)</code>",id:"getskillfromconstructorconstructor",level:3},{value:"<code>ApplyMoveset(moveset)</code>",id:"applymovesetmoveset",level:3},{value:"<code>GetMoveset()</code>",id:"getmoveset",level:3},{value:"<code>GetMovesetSkills(name?)</code>",id:"getmovesetskillsname",level:3},{value:"<code>ClearMoveset()</code>",id:"clearmoveset",level:3},{value:"<code>ApplySkillsFromMoveset(moveset)</code>",id:"applyskillsfrommovesetmoveset",level:3}];function j(e){const s={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.M)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"character",children:"Character"}),"\n",(0,n.jsx)(l.c,{toc:x}),"\n",(0,n.jsx)(s.h2,{id:"static-events--methods",children:"Static Events / Methods"}),"\n",(0,n.jsx)(s.h3,{id:"charactercreated",children:(0,n.jsx)(s.code,{children:"CharacterCreated"})}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"An event."})," Fires whenever a character gets created."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Character: ",(0,n.jsx)(s.code,{children:"Character"})," - a character that gets created."]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"characterdestroyed",children:(0,n.jsx)(s.code,{children:"CharacterDestroyed"})}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"An event."})," Fires whenever a character gets destroyed."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Character: ",(0,n.jsx)(s.code,{children:"Character"})," - a character that gets destroyed."]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"getcharactermap",children:(0,n.jsx)(s.code,{children:"GetCharacterMap()"})}),"\n",(0,n.jsx)(s.p,{children:"Starts the handler."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Returns:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["CharacterMap: ",(0,n.jsx)(s.code,{children:"Map"}),". A map where key is ",(0,n.jsx)(s.code,{children:"Instance"})," and the value is ",(0,n.jsx)(s.code,{children:"Character"})," attached to it."]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"getcharacterfrominstanceinstance",children:(0,n.jsx)(s.code,{children:"GetCharacterFromInstance(instance)"})}),"\n",(0,n.jsx)(s.p,{children:"Retrieves the character associated with the given instance."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Instance: ",(0,n.jsx)(s.code,{children:"Instance"})]}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Returns:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Character: ",(0,n.jsx)(s.code,{children:"Character?"}),". A character associated with the provided instance."]}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"fields",children:"Fields"}),"\n",(0,n.jsxs)(s.h3,{id:"instance-readonly",children:[(0,n.jsx)(s.code,{children:"Instance"})," ",(0,n.jsx)(s.strong,{children:"@readonly"})]}),"\n",(0,n.jsxs)(s.p,{children:["An instance ",(0,n.jsx)(s.em,{children:"Character"})," object is attached to."]}),"\n",(0,n.jsxs)(s.h3,{id:"humanoid-readonly",children:[(0,n.jsx)(s.code,{children:"Humanoid"})," ",(0,n.jsx)(s.strong,{children:"@readonly"})]}),"\n",(0,n.jsxs)(s.p,{children:["A ",(0,n.jsx)(s.a,{href:"https://create.roblox.com/docs/reference/engine/classes/Humanoid",children:"Humanoid"})," associated with character's ",(0,n.jsx)(s.em,{children:"instance"}),"."]}),"\n",(0,n.jsxs)(s.h3,{id:"player-readonly",children:[(0,n.jsx)(s.code,{children:"Player?"})," ",(0,n.jsx)(s.strong,{children:"@readonly"})]}),"\n",(0,n.jsxs)(s.p,{children:["A ",(0,n.jsx)(s.a,{href:"https://create.roblox.com/docs/reference/engine/classes/Player",children:"Player"})," associated with the character.\nRetrieved internally by ",(0,n.jsx)(s.code,{children:"Players:GetPlayerFromCharacter(self.Instance)"}),"."]}),"\n",(0,n.jsx)(s.h2,{id:"events",children:"Events"}),"\n",(0,n.jsx)(s.h3,{id:"skilladded",children:(0,n.jsx)(s.code,{children:"SkillAdded"})}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"An event"}),". Gets fired when ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/api/skill",children:"a skill"})," gets added to the character."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Skill: ",(0,n.jsx)(s.code,{children:"Skill"})," - ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/api/skill",children:"A skill"})," that got added."]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"skillremoved",children:(0,n.jsx)(s.code,{children:"SkillRemoved"})}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"An event"}),". Gets fired when ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/api/skill",children:"a skill"})," gets removed from the character."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Skill: ",(0,n.jsx)(s.code,{children:"Skill"})," - ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/api/skill",children:"A skill"})," that got removed."]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"statuseffectadded",children:(0,n.jsx)(s.code,{children:"StatusEffectAdded"})}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.strong,{children:"An event"}),". Gets fired when ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/api/statusEffect",children:"a status effect"})," gets added to the character."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Status: ",(0,n.jsx)(s.code,{children:"StatusEffect"})," - ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/api/skill",children:"A status effect"})," that got removed."]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"statuseffectremoved",children:(0,n.jsx)(s.code,{children:"StatusEffectRemoved"})}),"\n",(0,n.jsxs)(s.p,{children:["Gets fired when ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/api/statusEffect",children:"a status effect"})," gets removed from the character."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Status: ",(0,n.jsx)(s.code,{children:"StatusEffect"})," - ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/api/skill",children:"A status effect"})," that got removed."]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"humanoidpropertiesupdated",children:(0,n.jsx)(s.code,{children:"HumanoidPropertiesUpdated"})}),"\n",(0,n.jsxs)(s.p,{children:["Gets fired when character's ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/tutorial/statuses/humanoid-data",children:"humanoid data"})," gets updated."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Props: ",(0,n.jsx)(s.code,{children:"AffectableHumanoidProps"})," - a map of ",(0,n.jsx)(s.code,{children:"propertyName"})," and it's new ",(0,n.jsx)(s.code,{children:"value"}),"."]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"damagetaken",children:(0,n.jsx)(s.code,{children:"DamageTaken"})}),"\n",(0,n.jsxs)(s.p,{children:["Gets fired when character takes damage from any ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/api/skill",children:"skill"})," / ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/api/statusEffect",children:"status effect"}),".\nContainer's source will always be ",(0,n.jsx)(s.code,{children:"nil"})," on client"]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Container: ",(0,n.jsx)(s.code,{children:"DamageContainer"}),"."]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"damagedealt",children:(0,n.jsx)(s.code,{children:"DamageDealt"})}),"\n",(0,n.jsxs)(s.p,{children:["Gets fired when any ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/api/skill",children:"skill"})," or ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/api/statusEffect",children:"status effect"})," that belongs to this character damage another character."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Container: ",(0,n.jsx)(s.code,{children:"DamageContainer"}),"."]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"destroyed",children:(0,n.jsx)(s.code,{children:"Destroyed"})}),"\n",(0,n.jsx)(s.p,{children:"Gets fired when character gets destroyed."}),"\n",(0,n.jsx)(s.h3,{id:"movesetchanged",children:(0,n.jsx)(s.code,{children:"MovesetChanged"})}),"\n",(0,n.jsxs)(s.p,{children:["Gets fired when character's current ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/tutorial/extras/movesets",children:"Moveset"})," changed."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["NewMoveset: ",(0,n.jsx)(s.code,{children:"string?"})," - a name of the new moveset."]}),"\n",(0,n.jsxs)(s.li,{children:["OldMoveset: ",(0,n.jsx)(s.code,{children:"string?"})," - a name of the old moveset."]}),"\n"]}),"\n",(0,n.jsx)(s.admonition,{type:"note",children:(0,n.jsxs)(s.p,{children:["Moveset object can get retrieved using ",(0,n.jsx)(s.code,{children:":GetMovesetObjectByName()"})]})}),"\n",(0,n.jsx)(s.h2,{id:"constructors",children:"Constructors"}),"\n",(0,n.jsx)(s.h3,{id:"constructorinstance---character",children:"constructor(instance) -> Character"}),"\n",(0,n.jsxs)(s.p,{children:["Accepts the instance and returns a new WCS Character.\nInstance must contain a ",(0,n.jsx)(s.a,{href:"https://create.roblox.com/docs/reference/engine/classes/Humanoid",children:"Humanoid"}),"."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Instance"}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"methods",children:"Methods"}),"\n",(0,n.jsx)(s.h3,{id:"destroy",children:(0,n.jsx)(s.code,{children:"Destroy()"})}),"\n",(0,n.jsxs)(s.p,{children:["Destroys the object and performs necessary cleanup tasks.\nYou usually suppost to fire this manually when your ",(0,n.jsx)(s.a,{href:"https://create.roblox.com/docs/reference/engine/classes/Humanoid",children:"humanoid"})," dies."]}),"\n",(0,n.jsx)(s.h3,{id:"takedamagecontainer",children:(0,n.jsx)(s.code,{children:"TakeDamage(container)"})}),"\n",(0,n.jsxs)(s.p,{children:["Calculates the damage based on ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/api/statusEffect",children:"status effects"})," and fires a ",(0,n.jsx)(s.code,{children:"DamageTaken"})," event.\nReturns the calculated damage."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Container: ",(0,n.jsx)(s.code,{children:"DamageContainer"})]}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Returns"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Container: ",(0,n.jsx)(s.code,{children:"DamageContainer"})," - a container with calculated damage after ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/api/statusEffect",children:"status effect"})," affection."]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"predictdamagecontainer",children:(0,n.jsx)(s.code,{children:"PredictDamage(container)"})}),"\n",(0,n.jsxs)(s.p,{children:["Calculates the damage based on ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/api/statusEffect",children:"status effects"}),".\nReturns the calculated damage."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Container: ",(0,n.jsx)(s.code,{children:"DamageContainer"})]}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Returns"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Container: ",(0,n.jsx)(s.code,{children:"DamageContainer"})," - a container with calculated damage after ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/api/statusEffect",children:"status effect"})," affection."]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"setdefaultpropsprops",children:(0,n.jsx)(s.code,{children:"SetDefaultProps(props)"})}),"\n",(0,n.jsx)(s.p,{children:"Sets default humanoid properties of the character."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Properties: ",(0,n.jsx)(s.code,{children:"AffectableHumanoidProps"})," - A map of a ",(0,n.jsx)(s.code,{children:"PropertyName"})," and it's ",(0,n.jsx)(s.code,{children:"Value"}),"."]}),"\n"]}),"\n",(0,n.jsxs)(c.c,{groupId:"languages",children:[(0,n.jsx)(d.c,{value:"TypeScript",default:!0,children:(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"Char.SetDefaultProps({\n    WalkSpeed: 32,\n})\n"})})}),(0,n.jsx)(d.c,{value:"Luau",children:(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-lua",children:"Char:SetDefaultProps({\n    WalkSpeed = 32,\n})\n"})})})]}),"\n",(0,n.jsx)(s.h3,{id:"getdefaultprops",children:(0,n.jsx)(s.code,{children:"GetDefaultProps()"})}),"\n",(0,n.jsx)(s.p,{children:"Retrieves the default humanoid properties of the character."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Returns"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Properties: ",(0,n.jsx)(s.code,{children:"AffectableHumanoidProps"})," - A map of a ",(0,n.jsx)(s.code,{children:"PropertyName"})," and it's ",(0,n.jsx)(s.code,{children:"Value"}),"."]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"getallstatuseffect",children:(0,n.jsx)(s.code,{children:"GetAllStatusEffect()"})}),"\n",(0,n.jsx)(s.p,{children:"Retrieves all status effects."}),"\n",(0,n.jsx)(s.h3,{id:"getallactivestatuseffect",children:(0,n.jsx)(s.code,{children:"GetAllActiveStatusEffect()"})}),"\n",(0,n.jsx)(s.p,{children:"Retrieves all active status effects."}),"\n",(0,n.jsx)(s.h3,{id:"getallstatuseffectsoftypeconstructor",children:(0,n.jsx)(s.code,{children:"GetAllStatusEffectsOfType(constructor)"})}),"\n",(0,n.jsx)(s.p,{children:"Retrieves all status effects of a given type."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Constructor: ",(0,n.jsx)(s.code,{children:"Constructor<AnyStatus>"})," - A status effect class to check."]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"getallactivestatuseffectsoftypeconstructor",children:(0,n.jsx)(s.code,{children:"GetAllActiveStatusEffectsOfType(constructor)"})}),"\n",(0,n.jsx)(s.p,{children:"Retrieves all active status effects of a specific type."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Constructor: ",(0,n.jsx)(s.code,{children:"Constructor<AnyStatus>"})," - A status effect class to check."]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"hasstatuseffectsstatuses",children:(0,n.jsx)(s.code,{children:"HasStatusEffects(statuses)"})}),"\n",(0,n.jsx)(s.p,{children:"Checks if character has any active status effects of the specified type."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Statuses: ",(0,n.jsx)(s.code,{children:"Constructor<AnyStatus>[]"})," - A list of status effect classes to check."]}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Returns"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"boolean"}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"getskills",children:(0,n.jsx)(s.code,{children:"GetSkills()"})}),"\n",(0,n.jsx)(s.p,{children:"Retrieves the skills stored in the skills object and returns them as an array."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Returns"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Skills: ",(0,n.jsx)(s.code,{children:"Constructor<AnySkill>[]"})]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"getallactiveskills",children:(0,n.jsx)(s.code,{children:"GetAllActiveSkills()"})}),"\n",(0,n.jsx)(s.p,{children:"Retrieves all active skills and returns them as an array."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Returns"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Skills: ",(0,n.jsx)(s.code,{children:"Constructor<AnySkill>[]"})]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"getskillfromstringname",children:(0,n.jsx)(s.code,{children:"GetSkillFromString(name)"})}),"\n",(0,n.jsx)(s.p,{children:"Retrieves the skill instance by its name."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Name: ",(0,n.jsx)(s.code,{children:"string"})," - a name of the skill."]}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Returns"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Skill: ",(0,n.jsx)(s.code,{children:"Skill?"})]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"getskillfromconstructorconstructor",children:(0,n.jsx)(s.code,{children:"GetSkillFromConstructor(constructor)"})}),"\n",(0,n.jsx)(s.p,{children:"Retrieves a skill instance based on the provided constructor."}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Constructor: ",(0,n.jsx)(s.code,{children:"Constructor<AnySkill>"})," - A constructor of the skill class."]}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Returns"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Skill: ",(0,n.jsx)(s.code,{children:"Skill?"})]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"applymovesetmoveset",children:(0,n.jsx)(s.code,{children:"ApplyMoveset(moveset)"})}),"\n",(0,n.jsxs)(s.p,{children:["Applies a ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/tutorial/extras/movesets",children:"Moveset"})," to the character."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Moveset: ",(0,n.jsx)(s.code,{children:"Moveset | string"})," - A ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/tutorial/extras/movesets",children:"Moveset"})," object or it's name."]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"getmoveset",children:(0,n.jsx)(s.code,{children:"GetMoveset()"})}),"\n",(0,n.jsxs)(s.p,{children:["Returns the current ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/tutorial/extras/movesets",children:"Moveset"}),"'s name."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Returns"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Moveset: ",(0,n.jsx)(s.code,{children:"string?"})]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"getmovesetskillsname",children:(0,n.jsx)(s.code,{children:"GetMovesetSkills(name?)"})}),"\n",(0,n.jsxs)(s.p,{children:["Gets the skills that belong to a provided ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/tutorial/extras/movesets",children:"Moveset"}),"."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["MovesetName: ",(0,n.jsx)(s.code,{children:"string?"})," - A name of the ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/tutorial/extras/movesets",children:"Moveset"})," to get skills from. ",(0,n.jsx)(s.code,{children:"@defaults"})," to the currently applied ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/tutorial/extras/movesets",children:"Moveset"}),"."]}),"\n"]}),"\n",(0,n.jsx)(s.h3,{id:"clearmoveset",children:(0,n.jsx)(s.code,{children:"ClearMoveset()"})}),"\n",(0,n.jsxs)(s.p,{children:["Clears the ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/tutorial/extras/movesets",children:"Moveset"})," and destroys all skills that belong to it."]}),"\n",(0,n.jsx)(s.h3,{id:"applyskillsfrommovesetmoveset",children:(0,n.jsx)(s.code,{children:"ApplySkillsFromMoveset(moveset)"})}),"\n",(0,n.jsxs)(s.p,{children:["Adds the skills from a given ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/tutorial/extras/movesets",children:"Moveset"}),".\nDoes not set the ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/tutorial/extras/movesets",children:"Moveset"}),"."]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.strong,{children:(0,n.jsx)(s.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["MovesetName: ",(0,n.jsx)(s.code,{children:"Moveset"})," - The ",(0,n.jsx)(s.a,{href:"/WCS/ru/docs/tutorial/extras/movesets",children:"Moveset"})," to apply from."]}),"\n"]})]})}function u(e={}){const{wrapper:s}={...(0,t.M)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(j,{...e})}):j(e)}}}]);