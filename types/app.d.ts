import type { TokenPayload } from "./auth/types/types";

declare global {
	export type ExpressRequestWithUser = Request & { user?: TokenPayload };
}
