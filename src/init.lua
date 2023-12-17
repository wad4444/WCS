local Types = require(script.types)
local TS = require(script.include.RuntimeLib)

local exports = {}
for _k, _v in TS.import(script, script.Parent, "exports") or {} do
	exports[_k] = _v
end

return exports :: Types.WCS