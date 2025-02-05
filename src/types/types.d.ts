import type { TokenPayload } from "./auth/types/types";

declare module "express" {
	export interface Request {
		user?: TokenPayload;
	}
}
