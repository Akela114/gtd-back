export const CONSTRAINT_MESSAGES: Record<string, (property: string) => string> =
	{
		isNotEmpty: (property) => `Поле ${property} не должно быть пустым`,
		isString: (property) => `Значение поля ${property} должно быть строкой`,
		isEmail: (property) => `Некорректный адрес почты в поле ${property}`,
		matches: (property) => `Некорректный формат значения в поле ${property}`,
	};
