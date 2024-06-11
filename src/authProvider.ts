import { AuthProvider } from 'react-admin';

export const authProvider: AuthProvider = {
    login: ({ username,password }: { username,password: string }) => {
        const API = process.env.REACT_APP_ENDPOINT + '/auth/login';
        const request = new Request(API, {
            method: 'POST',
            body: JSON.stringify({ username,password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                localStorage.setItem('token', token);
                return Promise.resolve();
            })
            .catch(() => {
                return Promise.reject();
            });


    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }: { status: number }) => {
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: async () => {

        if (!localStorage.getItem('token')) {
            return Promise.reject();}

        const API = process.env.REACT_APP_ENDPOINT + '/user/me';
        const token = localStorage.getItem('token');
        const request = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        await fetch(API,request)
            .then(response => {
                return response.json();
            })
            .then(async (res) => {
                console.log(res);
                if (res.roleId===2)
                return Promise.resolve();
                else
                {
                    localStorage.removeItem('token');
                    return Promise.reject();
                }
                
            })
            .catch(() => {
                localStorage.removeItem('token');
                return Promise.reject();
            });
        


    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};
