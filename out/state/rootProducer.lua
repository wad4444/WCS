-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local combineProducers = TS.import(script, TS.getModule(script, "@rbxts", "reflex").src).combineProducers
local slices = TS.import(script, script.Parent, "slices").slices
local _object = {}
for _k, _v in slices do
	_object[_k] = _v
end
local rootProducer = combineProducers(_object)
return {
	rootProducer = rootProducer,
}
