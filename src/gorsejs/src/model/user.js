import { GorseException } from "../error";
export function insertUser(axios, userData) {
    return axios
        .post("/user", userData, {})
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
        .get(`/user/${userId}`, {})
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
        .delete(`/user/${userId}`, {})
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
        .patch(`/user/${userId}`, userData, {})
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
        .get(`/users`, {})
        .then(({ data }) => {
        return data;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function insertUsers(axios, users) {
    return axios
        .post(`/users`, users, {})
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
        .get(`/user/${userId}/neighbors}`, {})
        .then(({ data }) => {
        return data;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
//# sourceMappingURL=user.js.map