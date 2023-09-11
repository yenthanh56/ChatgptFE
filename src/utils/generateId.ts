export const generateUID = () => {
	const timestamp = Date.now();
	const hexadecimalString = Math.random().toString(16);
	return `id-${timestamp}-${hexadecimalString}`;
};
