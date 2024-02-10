-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local _remo = TS.import(script, TS.getModule(script, "@rbxts", "remo").src)
local createRemotes = _remo.createRemotes
local remote = _remo.remote
local t = TS.import(script, TS.getModule(script, "@rbxts", "t").lib.ts).t
local remotes = createRemotes({
	_dispatch = remote(t.array(t.interface({
		name = t.string,
		arguments = t.array(t.any),
	}))),
	_start = remote(),
	_requestSkill = remote(t.string, t.string, t.literal("End", "Start"), t.optional(t.any)),
	_messageToServer = remote(t.string, t.string, t.optional(t.any)),
	_messageToClient = remote(t.string, t.string, t.optional(t.any)),
	_damageTaken = remote(t.string, t.number),
})
return {
	remotes = remotes,
}
