export const storageToken = {
    setItem: (name: string, item: string) => {
        localStorage.setItem(name, item);
    },
    getItem: (name: string) => {
        const item = localStorage.getItem(name);

        if (item) {
            return item;
        }
    },
};

export function isUserAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
}
