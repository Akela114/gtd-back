export const CONSTRAINT_MESSAGES: Record<string, (property: string) => string> =
	{
		isNotEmpty: (property) => `Поле ${property} не должно быть пустым`,
		isString: (property) => `Поле ${property} должно быть строкой`,
	};
