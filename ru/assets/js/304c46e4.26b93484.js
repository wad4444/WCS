"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[824],{4088:(e,r,s)=>{s.r(r),s.d(r,{assets:()=>a,contentTitle:()=>i,default:()=>x,frontMatter:()=>c,metadata:()=>t,toc:()=>o});var n=s(7624),d=s(2172),l=(s(1268),s(5388),s(1552));const c={sidebar_position:5},i="Skill",t={id:"api/skill",title:"Skill",description:"[Timer]//www.npmjs.com/package/@rbxts/timer",source:"@site/i18n/ru/docusaurus-plugin-content-docs/current/api/skill.md",sourceDirName:"api",slug:"/api/skill",permalink:"/WCS/ru/docs/api/skill",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"apiSidebar",previous:{title:"Character",permalink:"/WCS/ru/docs/api/character"},next:{title:"StatusEffect",permalink:"/WCS/ru/docs/api/statusEffect"}},a={},o=[{value:"Fields",id:"fields",level:2},{value:"<code>CooldownTimer</code> @readonly",id:"cooldowntimer-readonly",level:3},{value:"<code>Character</code> @readonly",id:"character-readonly",level:3},{value:"<code>Player</code> @readonly",id:"player-readonly",level:3},{value:"<code>Name</code> @readonly",id:"name-readonly",level:3},{value:"<code>ConstructorArguments</code> @readonly",id:"constructorarguments-readonly",level:3},{value:"<code>CheckOthersActive</code>",id:"checkothersactive",level:3},{value:"<code>MutualExclusives</code>",id:"mutualexclusives",level:3},{value:"<code>Requirements</code>",id:"requirements",level:3},{value:"<code>CheckClientState</code>",id:"checkclientstate",level:3},{value:"Events",id:"events",level:2},{value:"<code>Started</code>",id:"started",level:3},{value:"<code>Ended</code>",id:"ended",level:3},{value:"<code>StateChanged</code>",id:"statechanged",level:3},{value:"<code>Destroyed</code>",id:"destroyed",level:3},{value:"<code>MetadataChanged</code>",id:"metadatachanged",level:3},{value:"Constructors",id:"constructors",level:2},{value:"constructor(character) -&gt; Skill",id:"constructorcharacter---skill",level:3},{value:"Methods",id:"methods",level:2},{value:"<code>Start(params)</code>",id:"startparams",level:3},{value:"<code>IsDestroyed()</code>",id:"isdestroyed",level:3},{value:"<code>End()</code>",id:"end",level:3},{value:"<code>GetSkillType()</code>",id:"getskilltype",level:3},{value:"<code>Destroy()</code>",id:"destroy",level:3},{value:"<code>GetState()</code>",id:"getstate",level:3},{value:"<code>GetName()</code>",id:"getname",level:3},{value:"<code>ClearMetadata()</code>",id:"clearmetadata",level:3},{value:"<code>SetMetadata(meta)</code>",id:"setmetadatameta",level:3},{value:"<code>GetMetadata()</code>",id:"getmetadata",level:3},{value:"<code>CreateDamageContainer(dmg)</code>",id:"createdamagecontainerdmg",level:3},{value:"<code>ApplyCooldown(cd)</code>",id:"applycooldowncd",level:3},{value:"<code>SendMessageToClient(message)</code>",id:"sendmessagetoclientmessage",level:3},{value:"<code>SendMessageToServer(message)</code>",id:"sendmessagetoservermessage",level:3},{value:"<code>OnConstruct(...args)</code> @override",id:"onconstructargs-override",level:3},{value:"<code>OnConstructServer(...args)</code> @override",id:"onconstructserverargs-override",level:3},{value:"<code>OnConstructClient(...args)</code> @override",id:"onconstructclientargs-override",level:3},{value:"<code>ShouldStart()</code> @override",id:"shouldstart-override",level:3},{value:"<code>OnStartServer(params)</code> @override",id:"onstartserverparams-override",level:3},{value:"<code>OnStartClient(params)</code> @override",id:"onstartclientparams-override",level:3},{value:"<code>OnEndServer()</code> @override",id:"onendserver-override",level:3},{value:"<code>OnEndClient()</code> @override",id:"onendclient-override",level:3},{value:"<code>HandleClientMessage(message)</code> @override",id:"handleclientmessagemessage-override",level:3},{value:"<code>HandleServerMessage(message)</code> @override",id:"handleservermessagemessage-override",level:3}];function h(e){const r={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...(0,d.M)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{id:"skill",children:"Skill"}),"\n",(0,n.jsx)(l.c,{toc:o}),"\n",(0,n.jsx)(r.h2,{id:"fields",children:"Fields"}),"\n",(0,n.jsxs)(r.h3,{id:"cooldowntimer-readonly",children:[(0,n.jsx)(r.code,{children:"CooldownTimer"})," @readonly"]}),"\n",(0,n.jsxs)(r.p,{children:["A ",(0,n.jsx)(r.a,{href:"https://www.npmjs.com/package/@rbxts/timer",children:"Timer"})," object. Starts, when ",(0,n.jsx)(r.code,{children:"ApplyCooldown()"})," gets invoked on server. Does not sync to client."]}),"\n",(0,n.jsxs)(r.h3,{id:"character-readonly",children:[(0,n.jsx)(r.code,{children:"Character"})," @readonly"]}),"\n",(0,n.jsxs)(r.p,{children:["A ",(0,n.jsx)(r.a,{href:"/WCS/ru/docs/api/character",children:"Character"})," object this skill is tied with."]}),"\n",(0,n.jsxs)(r.h3,{id:"player-readonly",children:[(0,n.jsx)(r.code,{children:"Player"})," @readonly"]}),"\n",(0,n.jsxs)(r.p,{children:["A ",(0,n.jsx)(r.a,{href:"https://create.roblox.com/docs/reference/engine/classes/Player",children:"Player"})," object the skill is associated with.\nRetrieved internally by ",(0,n.jsx)(r.code,{children:"Players:GetPlayerFromCharacter(self.Character.Instance)"}),"."]}),"\n",(0,n.jsxs)(r.h3,{id:"name-readonly",children:[(0,n.jsx)(r.code,{children:"Name"})," @readonly"]}),"\n",(0,n.jsx)(r.p,{children:"A string value."}),"\n",(0,n.jsxs)(r.h3,{id:"constructorarguments-readonly",children:[(0,n.jsx)(r.code,{children:"ConstructorArguments"})," @readonly"]}),"\n",(0,n.jsxs)(r.p,{children:["A table of arguments provided after the ",(0,n.jsx)(r.a,{href:"/WCS/ru/docs/api/character",children:"Character"})," in ",(0,n.jsx)(r.code,{children:".new()"}),"."]}),"\n",(0,n.jsx)(r.h3,{id:"checkothersactive",children:(0,n.jsx)(r.code,{children:"CheckOthersActive"})}),"\n",(0,n.jsxs)(r.p,{children:["A boolean value. Checks whenever other skills should be non active for ",":Start","() to proceed."]}),"\n",(0,n.jsx)(r.h3,{id:"mutualexclusives",children:(0,n.jsx)(r.code,{children:"MutualExclusives"})}),"\n",(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:"Constructor<AnyStatus>[]"}),". An array of ",(0,n.jsx)(r.a,{href:"/WCS/ru/docs/api/statusEffect",children:"Status Effect"})," constructors. If any of them is applied to ",(0,n.jsx)(r.a,{href:"/WCS/ru/docs/api/character",children:"Character"})," object whenever ",(0,n.jsx)(r.code,{children:"Start()"})," is called,\nit will not proceed further and skill will not be started."]}),"\n",(0,n.jsx)(r.h3,{id:"requirements",children:(0,n.jsx)(r.code,{children:"Requirements"})}),"\n",(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:"Constructor<AnyStatus>[]"}),". An array of ",(0,n.jsx)(r.a,{href:"/WCS/ru/docs/api/statusEffect",children:"Status Effect"})," constructors. Checks ",(0,n.jsx)(r.a,{href:"/WCS/ru/docs/api/character",children:"Character"})," for the following\neffects to be applied before starting the skill."]}),"\n",(0,n.jsx)(r.h3,{id:"checkclientstate",children:(0,n.jsx)(r.code,{children:"CheckClientState"})}),"\n",(0,n.jsx)(r.p,{children:"A boolean value. Checks whenever the start function should check if the skill is active/on cooldown on client side before firing a remote."}),"\n",(0,n.jsx)(r.h2,{id:"events",children:"Events"}),"\n",(0,n.jsx)(r.h3,{id:"started",children:(0,n.jsx)(r.code,{children:"Started"})}),"\n",(0,n.jsx)(r.p,{children:"Fires whenever skill starts. Works on client and server."}),"\n",(0,n.jsx)(r.h3,{id:"ended",children:(0,n.jsx)(r.code,{children:"Ended"})}),"\n",(0,n.jsx)(r.p,{children:"Fires whenever skill ends. Works on client and server."}),"\n",(0,n.jsx)(r.h3,{id:"statechanged",children:(0,n.jsx)(r.code,{children:"StateChanged"})}),"\n",(0,n.jsxs)(r.p,{children:["Fires whenever current ",(0,n.jsx)(r.a,{href:"/WCS/ru/docs/tutorial/skills/state",children:"skill state"})," changes."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["NewState: ",(0,n.jsx)(r.code,{children:"SkillState"})]}),"\n",(0,n.jsxs)(r.li,{children:["OldState: ",(0,n.jsx)(r.code,{children:"SkillState"})]}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"destroyed",children:(0,n.jsx)(r.code,{children:"Destroyed"})}),"\n",(0,n.jsx)(r.p,{children:"Fires whenever skill gets destroyed (removed from the character)."}),"\n",(0,n.jsx)(r.h3,{id:"metadatachanged",children:(0,n.jsx)(r.code,{children:"MetadataChanged"})}),"\n",(0,n.jsxs)(r.p,{children:["Fires whenever skill ",(0,n.jsx)(r.a,{href:"/WCS/ru/docs/tutorial/extras/metadata",children:"metadata"})," changes."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["NewMeta: ",(0,n.jsx)(r.code,{children:"Metadata?"})," - a generic type."]}),"\n",(0,n.jsxs)(r.li,{children:["OldMeta: ",(0,n.jsx)(r.code,{children:"Metadata?"})," - a generic type."]}),"\n"]}),"\n",(0,n.jsx)(r.h2,{id:"constructors",children:"Constructors"}),"\n",(0,n.jsx)(r.h3,{id:"constructorcharacter---skill",children:"constructor(character) -> Skill"}),"\n",(0,n.jsxs)(r.p,{children:["Accepts the ",(0,n.jsx)(r.a,{href:"/WCS/ru/docs/api/character",children:"Character"})," and returns a new skill."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:"/WCS/ru/docs/api/character",children:"Character"})}),"\n"]}),"\n",(0,n.jsx)(r.h2,{id:"methods",children:"Methods"}),"\n",(0,n.jsx)(r.h3,{id:"startparams",children:(0,n.jsx)(r.code,{children:"Start(params)"})}),"\n",(0,n.jsxs)(r.p,{children:["Server: Starts the skill.\nClient: Sends a request to server that will call ",":Start","() on server."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["Parameters: ",(0,n.jsx)(r.code,{children:"StarterParams"})," - a generic type."]}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"isdestroyed",children:(0,n.jsx)(r.code,{children:"IsDestroyed()"})}),"\n",(0,n.jsxs)(r.p,{children:["Returns true if the skill is destroyed / removed from the ",(0,n.jsx)(r.a,{href:"/WCS/ru/docs/api/character",children:"Character"}),"."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Returns:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsx)(r.li,{children:"boolean"}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"end",children:(0,n.jsx)(r.code,{children:"End()"})}),"\n",(0,n.jsx)(r.p,{children:"Force end the skill. This is automatically called after OnStartServer() is completed."}),"\n",(0,n.jsx)(r.h3,{id:"getskilltype",children:(0,n.jsx)(r.code,{children:"GetSkillType()"})}),"\n",(0,n.jsx)(r.p,{children:"Retrieves the skill type."}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Returns:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["Type: ",(0,n.jsx)(r.code,{children:"SkillType"})]}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"destroy",children:(0,n.jsx)(r.code,{children:"Destroy()"})}),"\n",(0,n.jsx)(r.p,{children:"Destroys the skill and removes it from the character."}),"\n",(0,n.jsx)(r.h3,{id:"getstate",children:(0,n.jsx)(r.code,{children:"GetState()"})}),"\n",(0,n.jsx)(r.p,{children:"Retrieves the current skill state."}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Returns:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["State: ",(0,n.jsx)(r.code,{children:"SkillState"})," - ",(0,n.jsx)(r.a,{href:"/WCS/ru/docs/tutorial/skills/state",children:"reference"})]}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"getname",children:(0,n.jsx)(r.code,{children:"GetName()"})}),"\n",(0,n.jsx)(r.p,{children:"Retrieves the skill name."}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Returns:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsx)(r.li,{children:"string"}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"clearmetadata",children:(0,n.jsx)(r.code,{children:"ClearMetadata()"})}),"\n",(0,n.jsxs)(r.p,{children:["Clears the current ",(0,n.jsx)(r.a,{href:"/WCS/ru/docs/tutorial/extras/metadata",children:"Metadata"}),". Only works on server."]}),"\n",(0,n.jsx)(r.h3,{id:"setmetadatameta",children:(0,n.jsx)(r.code,{children:"SetMetadata(meta)"})}),"\n",(0,n.jsxs)(r.p,{children:["Sets the current ",(0,n.jsx)(r.a,{href:"/WCS/ru/docs/tutorial/extras/metadata",children:"Metadata"}),"."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["Metadata: ",(0,n.jsx)(r.code,{children:"Metadata"})," - a generic type."]}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"getmetadata",children:(0,n.jsx)(r.code,{children:"GetMetadata()"})}),"\n",(0,n.jsxs)(r.p,{children:["Retrieves the current ",(0,n.jsx)(r.a,{href:"/WCS/ru/docs/tutorial/extras/metadata",children:"Metadata"}),"."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Returns:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["Metadata: ",(0,n.jsx)(r.code,{children:"Metadata"})," - a generic type."]}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"createdamagecontainerdmg",children:(0,n.jsx)(r.code,{children:"CreateDamageContainer(dmg)"})}),"\n",(0,n.jsxs)(r.p,{children:["Creates a damage container, with the current skill specified in ",(0,n.jsx)(r.code,{children:"Source"}),"."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["Damage: ",(0,n.jsx)(r.code,{children:"number"})]}),"\n"]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Returns:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["Container: ",(0,n.jsx)(r.code,{children:"DamageContainer"})]}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"applycooldowncd",children:(0,n.jsx)(r.code,{children:"ApplyCooldown(cd)"})}),"\n",(0,n.jsx)(r.p,{children:"Applies a cooldown to the skill. Works only on server."}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["Cooldown: ",(0,n.jsx)(r.code,{children:"number"})]}),"\n"]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Returns:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsx)(r.li,{children:"boolean"}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"sendmessagetoclientmessage",children:(0,n.jsx)(r.code,{children:"SendMessageToClient(message)"})}),"\n",(0,n.jsxs)(r.p,{children:["Sends a ",(0,n.jsx)(r.a,{href:"/WCS/ru/docs/tutorial/skills/messages",children:"Message"})," from server to client."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["Message: ",(0,n.jsx)(r.code,{children:"ServerToClientMessage"})," - a generic type."]}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"sendmessagetoservermessage",children:(0,n.jsx)(r.code,{children:"SendMessageToServer(message)"})}),"\n",(0,n.jsxs)(r.p,{children:["Sends a ",(0,n.jsx)(r.a,{href:"/WCS/ru/docs/tutorial/skills/messages",children:"Message"})," from client to server."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["Message: ",(0,n.jsx)(r.code,{children:"ClientToServerMessage"})," - a generic type."]}),"\n"]}),"\n",(0,n.jsxs)(r.h3,{id:"onconstructargs-override",children:[(0,n.jsx)(r.code,{children:"OnConstruct(...args)"})," @override"]}),"\n",(0,n.jsx)(r.p,{children:"Called after class gets instantiated (both client and server)."}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["...args: ",(0,n.jsx)(r.code,{children:"...ConstructorArguments"})," A tuple of arguments that was provided to ",(0,n.jsx)(r.code,{children:".new"})," after ",(0,n.jsx)(r.code,{children:"Character"}),"."]}),"\n"]}),"\n",(0,n.jsxs)(r.h3,{id:"onconstructserverargs-override",children:[(0,n.jsx)(r.code,{children:"OnConstructServer(...args)"})," @override"]}),"\n",(0,n.jsx)(r.p,{children:"Called after class gets instantiated on server."}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["...args: ",(0,n.jsx)(r.code,{children:"...ConstructorArguments"})," A tuple of arguments that was provided to ",(0,n.jsx)(r.code,{children:".new"})," after ",(0,n.jsx)(r.code,{children:"Character"}),"."]}),"\n"]}),"\n",(0,n.jsxs)(r.h3,{id:"onconstructclientargs-override",children:[(0,n.jsx)(r.code,{children:"OnConstructClient(...args)"})," @override"]}),"\n",(0,n.jsx)(r.p,{children:"Called after class gets instantiated on client."}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["...args: ",(0,n.jsx)(r.code,{children:"...ConstructorArguments"})," A tuple of arguments that was provided to ",(0,n.jsx)(r.code,{children:".new"})," after ",(0,n.jsx)(r.code,{children:"Character"}),"."]}),"\n"]}),"\n",(0,n.jsxs)(r.h3,{id:"shouldstart-override",children:[(0,n.jsx)(r.code,{children:"ShouldStart()"})," @override"]}),"\n",(0,n.jsxs)(r.p,{children:["Determines if the skill should start, when ",(0,n.jsx)(r.code,{children:"Start()"})," is called."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Returns:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsx)(r.li,{children:"boolean"}),"\n"]}),"\n",(0,n.jsxs)(r.h3,{id:"onstartserverparams-override",children:[(0,n.jsx)(r.code,{children:"OnStartServer(params)"})," @override"]}),"\n",(0,n.jsxs)(r.p,{children:["Fires whenever skill starts on the server.\nAccepts an argument passed to ",(0,n.jsx)(r.code,{children:"Start()"}),"."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["StarterParams: ",(0,n.jsx)(r.code,{children:"StarterParams"})," - a generic type."]}),"\n"]}),"\n",(0,n.jsxs)(r.h3,{id:"onstartclientparams-override",children:[(0,n.jsx)(r.code,{children:"OnStartClient(params)"})," @override"]}),"\n",(0,n.jsxs)(r.p,{children:["Fires whenever skill starts on the client.\nAccepts an argument passed to ",(0,n.jsx)(r.code,{children:"Start()"}),"."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["StarterParams: ",(0,n.jsx)(r.code,{children:"StarterParams"})," - a generic type."]}),"\n"]}),"\n",(0,n.jsxs)(r.h3,{id:"onendserver-override",children:[(0,n.jsx)(r.code,{children:"OnEndServer()"})," @override"]}),"\n",(0,n.jsx)(r.p,{children:"Fires whenever skill ends on server."}),"\n",(0,n.jsxs)(r.h3,{id:"onendclient-override",children:[(0,n.jsx)(r.code,{children:"OnEndClient()"})," @override"]}),"\n",(0,n.jsx)(r.p,{children:"Fires whenever skill ends on client."}),"\n",(0,n.jsxs)(r.h3,{id:"handleclientmessagemessage-override",children:[(0,n.jsx)(r.code,{children:"HandleClientMessage(message)"})," @override"]}),"\n",(0,n.jsx)(r.p,{children:"Fires on server when a message from client was received."}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["Message: ",(0,n.jsx)(r.code,{children:"ClientToServerMessage"})," - a generic type."]}),"\n"]}),"\n",(0,n.jsx)(r.admonition,{type:"danger",children:(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:"Always"})," validate client messages with ",(0,n.jsx)(r.em,{children:"sensitive data"}),"."]})}),"\n",(0,n.jsxs)(r.h3,{id:"handleservermessagemessage-override",children:[(0,n.jsx)(r.code,{children:"HandleServerMessage(message)"})," @override"]}),"\n",(0,n.jsx)(r.p,{children:"Fires on client when a message from server was received."}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["Message: ",(0,n.jsx)(r.code,{children:"ServerToClientMessage"})," - a generic type."]}),"\n"]})]})}function x(e={}){const{wrapper:r}={...(0,d.M)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}}}]);