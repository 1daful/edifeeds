import { GorseException } from "../error";
export function getPopular(axios, { category = "", cursorOptions }) {
    return axios
        .get("", {
        params: {
            cursorOptions,
            baseUrl: `http://127.0.0.1:8088/popular/${category}`,
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
export function getLatest(axios, { category = "", cursorOptions }) {
    return axios
        .get("", {
        params: {
            cursorOptions,
            baseUrl: `http://127.0.0.1:8088/latest/${category}`,
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
export function getRecommend(axios, { userId, category = "", cursorOptions, writeBackType, writeBackDelay, }) {
    let baseUrl = "http://127.0.0.1:8088/api/recommend";
    if (userId) {
        baseUrl = `http://127.0.0.1:8088/recommend/${userId}/${category}`;
    }
    return axios
        .get("", {
        params: {
            ...(writeBackType ? { "write-back-type": writeBackType } : {}),
            ...(writeBackDelay ? { "write-back-delay": writeBackDelay } : {}),
            ...cursorOptions,
            baseUrl: baseUrl,
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