-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local exports = {}
for _k, _v in TS.import(script, script.Parent, "source", "character") or {} do
	exports[_k] = _v
end
for _k, _v in TS.import(script, script.Parent, "source", "server") or {} do
	exports[_k] = _v
end
for _k, _v in TS.import(script, script.Parent, "source", "statusEffect") or {} do
	exports[_k] = _v
end
for _k, _v in TS.import(script, script.Parent, "source", "client") or {} do
	exports[_k] = _v
end
for _k, _v in TS.import(script, script.Parent, "source", "moveset") or {} do
	exports[_k] = _v
end
for _k, _v in TS.import(script, script.Parent, "source", "skill") or {} do
	exports[_k] = _v
end
for _k, _v in TS.import(script, script.Parent, "source", "holdableSkill") or {} do
	exports[_k] = _v
end
for _k, _v in TS.import(script, script.Parent, "luaSpecific", "registerStatusEffect") or {} do
	exports[_k] = _v
end
for _k, _v in TS.import(script, script.Parent, "luaSpecific", "registerSkill") or {} do
	exports[_k] = _v
end
for _k, _v in TS.import(script, script.Parent, "luaSpecific", "registerHoldableSkill") or {} do
	exports[_k] = _v
end
return exports
