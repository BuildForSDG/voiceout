export const asyncLocalStorage = {
	setItem: async (key, value) => {
		await null;
		return localStorage.setItem(key, JSON.stringify(value));
	},
	getItem: async (key) => {
		await null;
		return JSON.parse(localStorage.getItem(key));
	}
}

