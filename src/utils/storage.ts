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

export const sessionToken = {
    setItem: (name: string, item: string) => {
        sessionStorage.setItem(name, item);
    },
    getItem: (name: string) => {
        const item = sessionStorage.getItem(name);

        if (item) {
            return item;
        }
    },
};

export function isUserAuthLocal() {
    return localStorage.getItem('isAuthenticated') === 'true';
}

export function isUserAuthSession() {
    return sessionStorage.getItem('isAuthenticated') === 'true';
}
