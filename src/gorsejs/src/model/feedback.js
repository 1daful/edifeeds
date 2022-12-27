import { GorseException } from "../error";
export function getFeedback(axios, { type, userId, itemId, cursorOptions }) {
    return axios
        .get(`/feedback/${type}/${userId}/${itemId}`, {
    /*params: {
      baseUrl: `http://127.0.0.1:8088/api/feedback/${type}/${userId}/${itemId}`,
      cursorOptions,
    }*/
    })
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
        .delete(`/feedback/${type}/${userId}/${itemId}`, {
    /*params: {
      baseUrl: `http://127.0.0.1:8088/api/feedback/${type}/${userId}/${itemId}`,
    }*/
    })
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
        .get(`/feedback/${type}`, {
    /*params: {
      baseUrl: `http://127.0.0.1:8088/api/feedback/${type}`,
      cursorOptions,
    }*/
    })
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
        .get(`/feedback`, {
    /*params: {
      baseUrl: `http://127.0.0.1:8088/api/feedback`,
      options,
    }*/
    })
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
        .post("/feedback", feedbacksList, {
    /*params: {
      baseUrl: `http://127.0.0.1:8088/api/feedback`,
    }*/
    })
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
        .put("/feedback", feedbacksList, {
    /*params: {
      baseUrl: `http://127.0.0.1:8088/api/feedback`,
    }*/
    })
        .then(({ data }) => {
        return data.RowAffected;
    })
        .catch((exception) => {
        const { response } = exception;
        return Promise.reject(new GorseException(response.status, response.data));
    });
}
// TODO - Item Feedbacks
// TODO - User Feedbacks
//# sourceMappingURL=feedback.js.map