import { AxiosInstance, AxiosResponse } from "axios";
import { GorseException } from "../error";
import {
  CursorOptions,
  Feedback,
  FeedbackCursor,
  FeedbackFilter,
  FeedbackOptions,
  FeedbackTypeFilter,
  Success,
} from "../interfaces";

export function getFeedback<T extends string>(
  axios: AxiosInstance,
  { type, userId, itemId, cursorOptions }: FeedbackOptions<T>
) {
  return axios
    .get<Feedback<T>, AxiosResponse<Feedback<T>>>(
      ``,
      {
        params: {
          baseUrl: `http://127.0.0.1:8088/api/feedback/${type}/${userId}/${itemId}`,
          cursorOptions,
        }
      }
    )
    .then(({ data }) => {
      return data;
    })
    .catch((exception) => {
      const { response } = exception;
      return Promise.reject(new GorseException(response.status, response.data));
    });
}

export function deleteFeedback<T extends string>(
  axios: AxiosInstance,
  { type, userId, itemId }: FeedbackFilter<T>
) {
  return axios
    .delete<Feedback<T>, AxiosResponse<Feedback<T>>>(
      ``,
      {
        params: {
          baseUrl: `http://127.0.0.1:8088/api/feedback/${type}/${userId}/${itemId}`,
        }
      }
    )
    .then(({ data }) => {
      return data;
    })
    .catch((exception) => {
      const { response } = exception;
      return Promise.reject(new GorseException(response.status, response.data));
    });
}

export function getFeedbacksByType<T extends string>(
  axios: AxiosInstance,
  { type, cursorOptions }: FeedbackTypeFilter<T>
) {
  return axios
    .get<FeedbackCursor<T>, AxiosResponse<FeedbackCursor<T>>>(
      ``,
      {
        params: {
          baseUrl: `http://127.0.0.1:8088/api/feedback/${type}`,
          cursorOptions,
        }
      }
    )
    .then(({ data }) => {
      return data;
    })
    .catch((exception) => {
      const { response } = exception;
      return Promise.reject(new GorseException(response.status, response.data));
    });
}

export function getFeedbacks<T extends string>(
  axios: AxiosInstance,
  options?: CursorOptions
) {
  return axios
    .get<FeedbackCursor<T>, AxiosResponse<FeedbackCursor<T>>>(``, {
      params: {
        baseUrl: `http://127.0.0.1:8088/api/feedback`,
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

export function insertFeedbacks<T extends string>(
  axios: AxiosInstance,
  feedbacksList: Feedback<T>[]
) {
  return axios
    .post<Success, AxiosResponse<Success>>("", feedbacksList, {
      params: {
        baseUrl: `http://127.0.0.1:8088/api/feedback`,
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

export function upsertFeedbacks<T extends string>(
  axios: AxiosInstance,
  feedbacksList: Feedback<T>[]
) {
  return axios
    .put<Success, AxiosResponse<Success>>("", feedbacksList, {
      params: {
        baseUrl: `http://127.0.0.1:8088/api/feedback`,
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

// TODO - Item Feedbacks

// TODO - User Feedbacks
