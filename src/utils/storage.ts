export const storageToken = {
    setItem: (name: string, item: string) => {
        localStorage.setItem(name, item);
    },
    getItem: (name: string) => {
        const item = localStorage.getItem(name);

        if (item) {
            return item;
        }

        return null;
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

        return null;
    },
};

export function isUserAuthLocal() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get('accessToken');

    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('isAuthenticated', 'true');
    }

    return localStorage.getItem('isAuthenticated') === 'true';
}

export function isUserAuthSession() {
    return sessionStorage.getItem('isAuthenticated') === 'true';
}
