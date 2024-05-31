local module = {}
local HOLD_STR = "__WCS_HOLD"

function module.ConvertArgs(args)
    local newArgs = {}
    local lastIndex
    for i,v in args do
        lastIndex = i
    end

    if lastIndex then
        for i = 1, lastIndex do
            newArgs[i] = args[i] or HOLD_STR
        end
    end
    return newArgs
end

function module.RestoreArgs(args)
    local newArgs = table.clone(args)
    for i,v in newArgs do
        if v == HOLD_STR then
            newArgs[i] = nil
        end
    end
    return newArgs
end

return module