-- Compiled with roblox-ts v2.2.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local combineProducers = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "reflex", "src").combineProducers
local slices = TS.import(script, game:GetService("ReplicatedStorage"), "library", "state", "slices").slices
local _object = {}
for _k, _v in slices do
	_object[_k] = _v
end
local rootProducer = combineProducers(_object)
return {
	rootProducer = rootProducer,
}
