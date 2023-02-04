import { GorseException } from "../error";
export function getFeedback(axios, { type, userId, itemId, cursorOptions }) {
    return axios
        .get(`/feedback/${type}/${userId}/${itemId}`, {})
        .then(({ data }) => {
        return data;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function deleteFeedback(axios, { type, userId, itemId }) {
    return axios
        .delete(`/feedback/${type}/${userId}/${itemId}`, {})
        .then(({ data }) => {
        return data;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function getFeedbacksByType(axios, { type, cursorOptions }) {
    return axios
        .get(`/feedback/${type}`, {})
        .then(({ data }) => {
        return data;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function getFeedbacks(axios, options) {
    return axios
        .get(`/feedback`, {})
        .then(({ data }) => {
        return data;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function insertFeedbacks(axios, feedbacksList) {
    return axios
        .post("/feedback", feedbacksList, {})
        .then(({ data }) => {
        return data.RowAffected;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
export function upsertFeedbacks(axios, feedbacksList) {
    return axios
        .put("/feedback", feedbacksList, {})
        .then(({ data }) => {
        return data.RowAffected;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
//# sourceMappingURL=feedback.js.map