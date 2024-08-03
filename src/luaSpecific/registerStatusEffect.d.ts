import type { AnyStatus } from "exports";
import type { Constructor } from "source/utility";

/**
 * @internal Reserved for LuaU usage
 * @hidden
 */
export declare function RegisterStatusEffect(
	Name: string,
): Constructor<AnyStatus>;
