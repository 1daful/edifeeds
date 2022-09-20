import { AxiosInstance, AxiosResponse } from "axios";
import { GorseException } from "../error";
import { LatestOutput, PopularOptions, RecommendOptions } from "../interfaces";

export function getPopular(
  axios: AxiosInstance,
  { category = "", cursorOptions }: PopularOptions
) {
  return axios
    .get<string[], AxiosResponse<string[]>>("", {
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

export function getLatest(
  axios: AxiosInstance,
  { category = "", cursorOptions }: PopularOptions
) {
  return axios
    .get<LatestOutput[], AxiosResponse<LatestOutput[]>>("", {
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

export function getRecommend(
  axios: AxiosInstance,
  {
    userId,
    category = "",
    cursorOptions,
    writeBackType,
    writeBackDelay,
  }: RecommendOptions
) {
  let baseUrl = "http://127.0.0.1:8088/api/recommend"
  if (userId) {
    baseUrl = `http://127.0.0.1:8088/recommend/${userId}/${category}`
  }
  return axios
    .get<string[], AxiosResponse<string[]>>("", {
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
