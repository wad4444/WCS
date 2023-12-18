local Types = require(script.types)
local TS = script:FindFirstChild("include") and require(script:FindFirstChild("include").RuntimeLib) or _G[script]

local exports = {}
for _k, _v in TS.import(script, script, "exports") or {} do
	exports[_k] = _v
end

return exports :: Types.WCS