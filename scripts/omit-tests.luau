local process = require("@lune/process")
local fs = require("@lune/fs")
local roblox = require("@lune/roblox")

local args = process.args
local fileName = args[1]
assert(fileName, "Missing filename!")

local modelFile = fs.readFile(fileName)
local instances = roblox.deserializeModel(modelFile)

for i, instance in instances do
	for k, descendant in instance:GetDescendants() do
		if string.find(descendant.Name, ".spec") then
			print(`Omitting {descendant.Name}`)
			descendant:Destroy()
		end
	end
end

local newFile = roblox.serializeModel(instances)
fs.writeFile(fileName, newFile)
