import { GorseException } from "../error";
export function getPopular(axios, { category = "", cursorOptions }) {
    return axios
        .get(`/popular/${category}`, {
        params: cursorOptions,
    })
        .then(({ data }) => {
        return data;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function getLatest(axios, { category = "", cursorOptions }) {
    return axios
        .get(`/latest/${category}`, {
        params: cursorOptions,
    })
        .then(({ data }) => {
        return data;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function getRecommend(axios, { userId, category = "", cursorOptions, writeBackType, writeBackDelay, }) {
    return axios
        .get(`/recommend/${userId}/${category}`, {
        params: {
            ...(writeBackType ? { "write-back-type": writeBackType } : {}),
            ...(writeBackDelay ? { "write-back-delay": writeBackDelay } : {}),
            ...cursorOptions,
        },
    })
        .then(({ data }) => {
        return data;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
//# sourceMappingURL=recommend.js.map