import { Injectable } from "@nestjs/common";
import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

@Injectable()
export class PasswordService {
	createPasswordSalt() {
		return randomBytes(16).toString("hex");
	}

	async getPasswordHash(password: string, salt: string) {
		const hash = (await scryptAsync(password, salt, 32)) as Buffer;

		return hash.toString("hex");
	}
}
