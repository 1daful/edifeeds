import { GorseException } from "../error";
export function upsertItem(axios, itemData) {
    return axios
        .post(`/item`, itemData)
        .then(({ data }) => {
        return data.RowAffected;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function getItem(axios, itemId) {
    return axios
        .get(`/item/${itemId}`)
        .then(({ data }) => {
        return data;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function deleteItem(axios, itemId) {
    return axios
        .delete(`/item/${itemId}`)
        .then(({ data }) => {
        return data.RowAffected;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function updateItem(axios, itemId, itemData) {
    return axios
        .patch(`/item/${itemId}`, itemData)
        .then(({ data }) => {
        return data.RowAffected;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function insertItemCategory(axios, itemId, category) {
    return axios
        .put(`/item/${itemId}/category/${category}`)
        .then(({ data }) => {
        return data.RowAffected;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function deleteItemCategory(axios, itemId, category) {
    return axios
        .delete(`/item/${itemId}/category/${category}`)
        .then(({ data }) => {
        return data.RowAffected;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function getItems(axios, options) {
    return axios
        .get(`/items`, {
        params: options,
    })
        .then(({ data }) => {
        return data;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function upsertItems(axios, items) {
    return axios
        .post(`/items`, items)
        .then(({ data }) => {
        return data.RowAffected;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function getItemNeighbors(axios, { itemId, category = "", cursorOptions }) {
    return axios
        .get(`/item/${itemId}/neighbors/${category}`, {
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
//# sourceMappingURL=item.js.map