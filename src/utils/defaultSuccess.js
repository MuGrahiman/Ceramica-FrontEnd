export const createDefaultState = (fields, defaultValue = false) => 
	fields.reduce((acc, field) => ({ ...acc, [field]: defaultValue }), {});
