"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[984],{2540:(e,r,d)=>{d.r(r),d.d(r,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>t,metadata:()=>a,toc:()=>l});var n=d(7624),s=d(2172);d(1268),d(5388),d(1552);const t={sidebar_position:6},i="StatusEffect",a={id:"api/statusEffect",title:"StatusEffect",description:"[Humanoid Data]: ../tutorial/statuses/humanoid-data.md",source:"@site/docs/api/statusEffect.md",sourceDirName:"api",slug:"/api/statusEffect",permalink:"/WCS/docs/api/statusEffect",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"apiSidebar",previous:{title:"Skill",permalink:"/WCS/docs/api/skill"}},c={},l=[{value:"Fields",id:"fields",level:2},{value:"<code>Character</code> <strong>@readonly</strong>",id:"character-readonly",level:3},{value:"<code>Janitor</code> <strong>@readonly</strong>",id:"janitor-readonly",level:3},{value:"<code>Player</code> <strong>@readonly</strong>",id:"player-readonly",level:3},{value:"<code>Name</code> <strong>@readonly</strong>",id:"name-readonly",level:3},{value:"<code>ConstructorArguments</code> <strong>@readonly</strong>",id:"constructorarguments-readonly",level:3},{value:"<code>DestroyOnEnd</code>",id:"destroyonend",level:3},{value:"<code>DamageModificationPriority</code>",id:"damagemodificationpriority",level:3},{value:"Events",id:"events",level:2},{value:"<code>Started</code>",id:"started",level:3},{value:"<code>Ended</code>",id:"ended",level:3},{value:"<code>StateChanged</code>",id:"statechanged",level:3},{value:"<code>HumanoidDataChanged</code>",id:"humanoiddatachanged",level:3},{value:"<code>Destroyed</code>",id:"destroyed",level:3},{value:"<code>MetadataChanged</code>",id:"metadatachanged",level:3},{value:"Constructors",id:"constructors",level:2},{value:"new(character) -&gt; Skill",id:"newcharacter---skill",level:3},{value:"Methods",id:"methods",level:2},{value:"<code>Start(time?)</code>",id:"starttime",level:3},{value:"<code>End()</code>",id:"end",level:3},{value:"<code>Stop()</code> @alias",id:"stop-alias",level:3},{value:"<code>Pause()</code>",id:"pause",level:3},{value:"<code>Resume()</code>",id:"resume",level:3},{value:"<code>SetHumanoidData(data, priority?)</code>",id:"sethumanoiddatadata-priority",level:3},{value:"<code>ClearHumanoidData()</code>",id:"clearhumanoiddata",level:3},{value:"<code>ClearMetadata()</code>",id:"clearmetadata",level:3},{value:"<code>SetMetadata(meta)</code>",id:"setmetadatameta",level:3},{value:"<code>GetMetadata()</code>",id:"getmetadata",level:3},{value:"<code>GetHumanoidData()</code>",id:"gethumanoiddata",level:3},{value:"<code>GetState()</code>",id:"getstate",level:3},{value:"<code>Destroy()</code>",id:"destroy",level:3},{value:"<code>HandleDamage(modified, original)</code> @override",id:"handledamagemodified-original-override",level:3},{value:"<code>GetModificationPriority()</code>",id:"getmodificationpriority",level:3},{value:"<code>IsDestroyed()</code>",id:"isdestroyed",level:3},{value:"<code>OnConstructServer(...args)</code> @override",id:"onconstructserverargs-override",level:3},{value:"<code>OnConstructClient(...args)</code> @override",id:"onconstructclientargs-override",level:3},{value:"<code>OnStartServer()</code> @override",id:"onstartserver-override",level:3},{value:"<code>OnStartClient()</code> @override",id:"onstartclient-override",level:3},{value:"<code>OnEndServer()</code> @override",id:"onendserver-override",level:3},{value:"<code>OnEndClient()</code> @override",id:"onendclient-override",level:3}];function o(e){const r={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.M)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{id:"statuseffect",children:"StatusEffect"}),"\n",(0,n.jsx)(r.h2,{id:"fields",children:"Fields"}),"\n",(0,n.jsxs)(r.h3,{id:"character-readonly",children:[(0,n.jsx)(r.code,{children:"Character"})," ",(0,n.jsx)(r.strong,{children:"@readonly"})]}),"\n",(0,n.jsxs)(r.p,{children:["A ",(0,n.jsx)(r.a,{href:"/WCS/docs/api/character",children:"Character"})," object this status effect is tied with."]}),"\n",(0,n.jsxs)(r.h3,{id:"janitor-readonly",children:[(0,n.jsx)(r.code,{children:"Janitor"})," ",(0,n.jsx)(r.strong,{children:"@readonly"})]}),"\n",(0,n.jsxs)(r.p,{children:["A ",(0,n.jsx)(r.a,{href:"https://howmanysmall.github.io/Janitor/",children:"Janitor"})," object. Cleans up everything after skill ends."]}),"\n",(0,n.jsxs)(r.h3,{id:"player-readonly",children:[(0,n.jsx)(r.code,{children:"Player"})," ",(0,n.jsx)(r.strong,{children:"@readonly"})]}),"\n",(0,n.jsxs)(r.p,{children:["A ",(0,n.jsx)(r.a,{href:"https://create.roblox.com/docs/reference/engine/classes/Player",children:"Player"})," object the skill is associated with.\nRetrieved internally by ",(0,n.jsx)(r.code,{children:"Players:GetPlayerFromCharacter(self.Character.Instance)"}),"."]}),"\n",(0,n.jsxs)(r.h3,{id:"name-readonly",children:[(0,n.jsx)(r.code,{children:"Name"})," ",(0,n.jsx)(r.strong,{children:"@readonly"})]}),"\n",(0,n.jsx)(r.p,{children:"A string value."}),"\n",(0,n.jsxs)(r.h3,{id:"constructorarguments-readonly",children:[(0,n.jsx)(r.code,{children:"ConstructorArguments"})," ",(0,n.jsx)(r.strong,{children:"@readonly"})]}),"\n",(0,n.jsxs)(r.p,{children:["A table of arguments provided after the ",(0,n.jsx)(r.a,{href:"/WCS/docs/api/character",children:"Character"})," in ",(0,n.jsx)(r.code,{children:".new()"}),"."]}),"\n",(0,n.jsx)(r.h3,{id:"destroyonend",children:(0,n.jsx)(r.code,{children:"DestroyOnEnd"})}),"\n",(0,n.jsxs)(r.p,{children:["A boolean value. Determines if ",(0,n.jsx)(r.code,{children:"self:Destroy()"})," when ",(0,n.jsx)(r.code,{children:"End"})," is fired."]}),"\n",(0,n.jsx)(r.h3,{id:"damagemodificationpriority",children:(0,n.jsx)(r.code,{children:"DamageModificationPriority"})}),"\n",(0,n.jsxs)(r.p,{children:["A number value. Determines the position in which ",(0,n.jsx)(r.code,{children:"HandleDamage()"})," is applied.\nThe higher the value, the later it applies."]}),"\n",(0,n.jsx)(r.h2,{id:"events",children:"Events"}),"\n",(0,n.jsx)(r.h3,{id:"started",children:(0,n.jsx)(r.code,{children:"Started"})}),"\n",(0,n.jsx)(r.p,{children:"Fires whenever status effect starts. Works on client and server."}),"\n",(0,n.jsx)(r.h3,{id:"ended",children:(0,n.jsx)(r.code,{children:"Ended"})}),"\n",(0,n.jsx)(r.p,{children:"Fires whenever status effect ends. Works on client and server."}),"\n",(0,n.jsx)(r.h3,{id:"statechanged",children:(0,n.jsx)(r.code,{children:"StateChanged"})}),"\n",(0,n.jsx)(r.p,{children:"Fires whenever current status effect state changes."}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["NewState: ",(0,n.jsx)(r.code,{children:"StatusEffectState"})]}),"\n",(0,n.jsxs)(r.li,{children:["OldState: ",(0,n.jsx)(r.code,{children:"StatusEffectState"})]}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"humanoiddatachanged",children:(0,n.jsx)(r.code,{children:"HumanoidDataChanged"})}),"\n",(0,n.jsxs)(r.p,{children:["Fires whenever current ",(0,n.jsx)(r.a,{href:"/WCS/docs/tutorial/statuses/humanoid-data",children:"Humanoid Data"})," changes."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["NewData: ",(0,n.jsx)(r.code,{children:"HumanoidData?"})]}),"\n",(0,n.jsxs)(r.li,{children:["OldData: ",(0,n.jsx)(r.code,{children:"HumanoidData?"})]}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"destroyed",children:(0,n.jsx)(r.code,{children:"Destroyed"})}),"\n",(0,n.jsx)(r.p,{children:"Fires whenever status effect gets destroyed (removed from the character)."}),"\n",(0,n.jsx)(r.h3,{id:"metadatachanged",children:(0,n.jsx)(r.code,{children:"MetadataChanged"})}),"\n",(0,n.jsxs)(r.p,{children:["Fires whenever status effect ",(0,n.jsx)(r.a,{href:"/WCS/docs/tutorial/extras/metadata",children:"metadata"})," changes."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["NewMeta: ",(0,n.jsx)(r.code,{children:"Metadata?"})," - a generic type."]}),"\n",(0,n.jsxs)(r.li,{children:["OldMeta: ",(0,n.jsx)(r.code,{children:"Metadata?"})," - a generic type."]}),"\n"]}),"\n",(0,n.jsx)(r.h2,{id:"constructors",children:"Constructors"}),"\n",(0,n.jsx)(r.h3,{id:"newcharacter---skill",children:"new(character) -> Skill"}),"\n",(0,n.jsxs)(r.p,{children:["Accepts the ",(0,n.jsx)(r.a,{href:"/WCS/docs/api/character",children:"Character"})," and returns a new status effect."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:"/WCS/docs/api/character",children:"Character"})}),"\n"]}),"\n",(0,n.jsx)(r.h2,{id:"methods",children:"Methods"}),"\n",(0,n.jsx)(r.h3,{id:"starttime",children:(0,n.jsx)(r.code,{children:"Start(time?)"})}),"\n",(0,n.jsx)(r.p,{children:"Starts the status effect."}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["Time: ",(0,n.jsx)(r.code,{children:"number?"})]}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"end",children:(0,n.jsx)(r.code,{children:"End()"})}),"\n",(0,n.jsx)(r.p,{children:"Ends the status effect."}),"\n",(0,n.jsxs)(r.h3,{id:"stop-alias",children:[(0,n.jsx)(r.code,{children:"Stop()"})," @alias"]}),"\n",(0,n.jsxs)(r.p,{children:["Ends the status effect. Alias for ",(0,n.jsx)(r.code,{children:"End()"}),"."]}),"\n",(0,n.jsx)(r.h3,{id:"pause",children:(0,n.jsx)(r.code,{children:"Pause()"})}),"\n",(0,n.jsxs)(r.p,{children:["Pauses the internal status effect ",(0,n.jsx)(r.a,{href:"https://www.npmjs.com/package/@rbxts/timer",children:"Timer"}),".\nWarns if ",(0,n.jsx)(r.code,{children:"time"})," wasn't provided in ",(0,n.jsx)(r.code,{children:"Start()"}),"."]}),"\n",(0,n.jsx)(r.h3,{id:"resume",children:(0,n.jsx)(r.code,{children:"Resume()"})}),"\n",(0,n.jsxs)(r.p,{children:["Resumes the internal ",(0,n.jsx)(r.a,{href:"https://www.npmjs.com/package/@rbxts/timer",children:"Timer"}),"."]}),"\n",(0,n.jsx)(r.h3,{id:"sethumanoiddatadata-priority",children:(0,n.jsx)(r.code,{children:"SetHumanoidData(data, priority?)"})}),"\n",(0,n.jsxs)(r.p,{children:["Sets the currently applied ",(0,n.jsx)(r.a,{href:"/WCS/docs/tutorial/statuses/humanoid-data",children:"Humanoid Data"}),"."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["Data: ",(0,n.jsx)(r.code,{children:"HumanoidData"})]}),"\n",(0,n.jsxs)(r.li,{children:["Priority: ",(0,n.jsx)(r.code,{children:"number"})," - defaults to 1."]}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"clearhumanoiddata",children:(0,n.jsx)(r.code,{children:"ClearHumanoidData()"})}),"\n",(0,n.jsxs)(r.p,{children:["Clears the currently set ",(0,n.jsx)(r.a,{href:"/WCS/docs/tutorial/statuses/humanoid-data",children:"Humanoid Data"}),"."]}),"\n",(0,n.jsx)(r.h3,{id:"clearmetadata",children:(0,n.jsx)(r.code,{children:"ClearMetadata()"})}),"\n",(0,n.jsxs)(r.p,{children:["Clears the current ",(0,n.jsx)(r.a,{href:"/WCS/docs/tutorial/extras/metadata",children:"Metadata"}),". Only works on server."]}),"\n",(0,n.jsx)(r.h3,{id:"setmetadatameta",children:(0,n.jsx)(r.code,{children:"SetMetadata(meta)"})}),"\n",(0,n.jsxs)(r.p,{children:["Sets the current ",(0,n.jsx)(r.a,{href:"/WCS/docs/tutorial/extras/metadata",children:"Metadata"}),"."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["Metadata: ",(0,n.jsx)(r.code,{children:"Metadata"})," - a generic type."]}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"getmetadata",children:(0,n.jsx)(r.code,{children:"GetMetadata()"})}),"\n",(0,n.jsxs)(r.p,{children:["Retrieves the current ",(0,n.jsx)(r.a,{href:"/WCS/docs/tutorial/extras/metadata",children:"Metadata"}),"."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Returns:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["Metadata: ",(0,n.jsx)(r.code,{children:"Metadata"})," - a generic type."]}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"gethumanoiddata",children:(0,n.jsx)(r.code,{children:"GetHumanoidData()"})}),"\n",(0,n.jsxs)(r.p,{children:["Retrieves the currently set ",(0,n.jsx)(r.a,{href:"/WCS/docs/tutorial/statuses/humanoid-data",children:"Humanoid Data"}),"."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Returns:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["Data: ",(0,n.jsx)(r.code,{children:"HumanoidData"})]}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"getstate",children:(0,n.jsx)(r.code,{children:"GetState()"})}),"\n",(0,n.jsx)(r.p,{children:"Retrieves the current status effect state.\nState object looks like this:"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:"{ IsActive: boolean }\n"})}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Returns:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["State: ",(0,n.jsx)(r.code,{children:"StatusEffectState"})]}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"destroy",children:(0,n.jsx)(r.code,{children:"Destroy()"})}),"\n",(0,n.jsx)(r.p,{children:"Destroys the skill and removes it from the character."}),"\n",(0,n.jsxs)(r.h3,{id:"handledamagemodified-original-override",children:[(0,n.jsx)(r.code,{children:"HandleDamage(modified, original)"})," @override"]}),"\n",(0,n.jsx)(r.p,{children:"Accepts 2 arguments: the previously modified and original damage.\nShould return modified damage."}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["Modified: ",(0,n.jsx)(r.code,{children:"number"})," - a damage previously modified by other status effects."]}),"\n",(0,n.jsxs)(r.li,{children:["Original: ",(0,n.jsx)(r.code,{children:"number"})," - original damage value from the container."]}),"\n"]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Returns:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsx)(r.li,{children:"number"}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"getmodificationpriority",children:(0,n.jsx)(r.code,{children:"GetModificationPriority()"})}),"\n",(0,n.jsxs)(r.p,{children:["Returns the value of ",(0,n.jsx)(r.code,{children:"DamageModificationPriority"}),"."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Returns:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsx)(r.li,{children:"number"}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"isdestroyed",children:(0,n.jsx)(r.code,{children:"IsDestroyed()"})}),"\n",(0,n.jsxs)(r.p,{children:["Returns if the status effect is destroyed / removed from the ",(0,n.jsx)(r.a,{href:"/WCS/docs/api/character",children:"Character"}),"."]}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Returns:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsx)(r.li,{children:"boolean"}),"\n"]}),"\n",(0,n.jsxs)(r.h3,{id:"onconstructserverargs-override",children:[(0,n.jsx)(r.code,{children:"OnConstructServer(...args)"})," @override"]}),"\n",(0,n.jsx)(r.p,{children:"Called after class gets instantiated on server."}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["...args: ",(0,n.jsx)(r.code,{children:"...ConstructorArguments"})," A tuple of arguments that was provided to ",(0,n.jsx)(r.code,{children:".new"})," after ",(0,n.jsx)(r.code,{children:"Character"}),"."]}),"\n"]}),"\n",(0,n.jsxs)(r.h3,{id:"onconstructclientargs-override",children:[(0,n.jsx)(r.code,{children:"OnConstructClient(...args)"})," @override"]}),"\n",(0,n.jsx)(r.p,{children:"Called after class gets instantiated on client."}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["...args: ",(0,n.jsx)(r.code,{children:"...ConstructorArguments"})," A tuple of arguments that was provided to ",(0,n.jsx)(r.code,{children:".new"})," after ",(0,n.jsx)(r.code,{children:"Character"}),"."]}),"\n"]}),"\n",(0,n.jsxs)(r.h3,{id:"onstartserver-override",children:[(0,n.jsx)(r.code,{children:"OnStartServer()"})," @override"]}),"\n",(0,n.jsx)(r.p,{children:"Fires whenever status effect starts on the server."}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["StarterParams: ",(0,n.jsx)(r.code,{children:"StarterParams"})," - a generic type."]}),"\n"]}),"\n",(0,n.jsxs)(r.h3,{id:"onstartclient-override",children:[(0,n.jsx)(r.code,{children:"OnStartClient()"})," @override"]}),"\n",(0,n.jsx)(r.p,{children:"Fires whenever status effect starts on the client."}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:"Parameters:"})})}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsxs)(r.li,{children:["StarterParams: ",(0,n.jsx)(r.code,{children:"StarterParams"})," - a generic type."]}),"\n"]}),"\n",(0,n.jsxs)(r.h3,{id:"onendserver-override",children:[(0,n.jsx)(r.code,{children:"OnEndServer()"})," @override"]}),"\n",(0,n.jsx)(r.p,{children:"Fires whenever status effect ends on server."}),"\n",(0,n.jsxs)(r.h3,{id:"onendclient-override",children:[(0,n.jsx)(r.code,{children:"OnEndClient()"})," @override"]}),"\n",(0,n.jsx)(r.p,{children:"Fires whenever status effect ends on client."})]})}function h(e={}){const{wrapper:r}={...(0,s.M)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(o,{...e})}):o(e)}}}]);