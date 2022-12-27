import { AxiosInstance, AxiosResponse } from "axios";
import { GorseException } from "../error";
import {
  CursorOptions,
  Success,
  Item,
  ItemCursor,
  ItemNeighborsOptions,
} from "../interfaces";

export function upsertItem(axios: AxiosInstance, itemData: Item) {
  return axios
    .post<Success, AxiosResponse<Success>>("/item", itemData, {
      /*params: {
        baseUrl: `http://127.0.0.1:8088/item`,
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

export function getItem(axios: AxiosInstance, itemId: string) {
  return axios
    .get<Item, AxiosResponse<Item>>(`/item/${itemId}`,
    {
      /*params: {
        baseUrl: `http://127.0.0.1:8088/item/${itemId}`
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

export function deleteItem(axios: AxiosInstance, itemId: string) {
  return axios
    .delete<Success, AxiosResponse<Success>>(`/item/${itemId}`,
    {
      /*params: {
        baseUrl: `http://127.0.0.1:8088/item/${itemId}`
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

export function updateItem(
  axios: AxiosInstance,
  itemId: string,
  itemData: Item
) {
  return axios
    .patch<Success, AxiosResponse<Success>>(`/item/${itemId}`, itemData,
    {
      /*params: {
        baseUrl: `http://127.0.0.1:8088/item/${itemId}`
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

export function insertItemCategory(
  axios: AxiosInstance,
  itemId: string,
  category: string
) {
  return axios
    .put<Success, AxiosResponse<Success>>(
      `/item/${itemId}/category/${category}`,
      {
        /*params: {
          baseUrl: `http://127.0.0.1:8088/item/${itemId}/category/${category}`
        }*/
      }
    )
    .then(({ data }) => {
      return data.RowAffected;
    })
    .catch((exception) => {
      const { response } = exception;
      return Promise.reject(new GorseException(response.status, response.data));
    });
}

export function deleteItemCategory(
  axios: AxiosInstance,
  itemId: string,
  category: string
) {
  return axios
    .delete<Success, AxiosResponse<Success>>(
      `/item/${itemId}/category/${category}`,
      {
        /*params: {
          baseUrl: `http://127.0.0.1:8088/item/${itemId}/category/${category}`
        }*/
      }
    )
    .then(({ data }) => {
      return data.RowAffected;
    })
    .catch((exception) => {
      const { response } = exception;
      return Promise.reject(new GorseException(response.status, response.data));
    });
}

export function getItems(axios: AxiosInstance, options?: CursorOptions) {
  return axios
    .get<ItemCursor, AxiosResponse<ItemCursor>>(`/items`, {
      /*params: {
        baseUrl: `http://127.0.0.1:8088/items`,
        options
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

export function upsertItems(axios: AxiosInstance, items: Item[]) {
  return axios
    .post<Success, AxiosResponse<Success>>(`/items`, items,
    {
      /*params: {
        baseUrl: `http://127.0.0.1:8088/items`
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

export function getItemNeighbors(
  axios: AxiosInstance,
  { itemId, category = "", cursorOptions }: ItemNeighborsOptions
) {
  return axios
    .get<string[], AxiosResponse<string[]>>(
      `/item/${itemId}/neighbors/${category}`,
      {
        /*params: {
          baseUrl: `http://127.0.0.1:8088/item/${itemId}/neighbors/${category}`,
          cursorOptions
        }*/
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
