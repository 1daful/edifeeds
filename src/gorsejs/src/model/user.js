import { GorseException } from "../error";
// FIXME: is this an upsert endpoint?
export function insertUser(axios, userData) {
    return axios
        .post("", userData, {
        /*headers: {
          'Content-Type' : 'application/x-www-form-urlencoded'
        },*/
        params: {
            baseUrl: `http://127.0.0.1:8088/api/user`,
        }
    })
        .then(({ data }) => {
        return data.RowAffected;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function getUser(axios, userId) {
    return axios
        .get(``, {
        params: {
            baseUrl: `http://127.0.0.1:8088/api/user/${userId}`,
        }
    })
        .then(({ data }) => {
        return data;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function deleteUser(axios, userId) {
    return axios
        .delete(``, {
        params: {
            baseUrl: `http://127.0.0.1:8088/api/user/${userId}`,
        }
    })
        .then(({ data }) => {
        return data.RowAffected;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function updateUser(axios, userId, userData) {
    return axios
        .patch(``, userData, {
        params: {
            baseUrl: `http://127.0.0.1:8088/api/user/${userId}`,
        }
    })
        .then(({ data }) => {
        return data.RowAffected;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function getUsers(axios, options) {
    return axios
        .get(``, {
        params: {
            baseUrl: `http://127.0.0.1:8088/api/users`,
            options,
        }
    })
        .then(({ data }) => {
        return data;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
// FIXME: is this an endpoint?
export function insertUsers(axios, users) {
    return axios
        .post(``, users, {
        params: {
            baseUrl: `http://127.0.0.1:8088/api/users}`,
        }
    })
        .then(({ data }) => {
        return data.RowAffected;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function getUserNeighbors(axios, { userId, cursorOptions }) {
    return axios
        .get(``, {
        params: {
            baseUrl: `http://127.0.0.1:8088/api/user/${userId}/neighbors}`,
            cursorOptions,
        }
    })
        .then(({ data }) => {
        return data;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
//# sourceMappingURL=user.js.map