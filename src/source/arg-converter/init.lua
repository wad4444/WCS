local module = {}

function module.ConvertArgs(args)
    args[0] = "__WCS_HOLD" -- need to include index 0, so roblox will treat it as a map and won't mess up the order
    return args
end

function module.RestoreArgs(args)
    if args[0] then
        args[0] = nil
    end
    return args
end

return module