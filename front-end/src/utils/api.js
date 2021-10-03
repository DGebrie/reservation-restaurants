/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Creates a new order
 * @returns {Promise<[order]>}
 *  a promise that resolves to the newly created order.
 */
export async function createReservation(reservation, signal) {
  const url = `${API_BASE_URL}/reservations`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(reservation),
    signal,
  };
  return await fetchJson(url, options);
}

/**
 * Retrieves the order with the specified `orderId`
 * @param orderId
 *  the `id` property matching the desired order.
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<order>}
 *  a promise that resolves to the saved order.
 */
export async function readOrder(orderId, signal) {
  const url = `${API_BASE_URL}/orders/${orderId}`;
  return await fetchJson(url, { signal });
}

/**
 * Retrieves all existing orders.
 * @returns {Promise<[order]>}
 *  a promise that resolves to a possibly empty array of orders saved in the database.
 */
export async function listOrders(signal) {
  const url = `${API_BASE_URL}/orders`;
  return await fetchJson(url, { signal });
}

/**
 * Updates a existing order
 * @returns {Promise<[order]>}
 *  a promise that resolves to the update order.
 */
export async function updateOrder(order, signal) {
  const url = `${API_BASE_URL}/orders/${order.id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: order }),
    signal,
  };
  return await fetchJson(url, options);
}

/**
 * Deletes the order with the specified `orderId`.
 * @param orderId
 *  the id of the order to delete
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<null|String>}
 *  a promise that resolves to null or an error message.
 */
export async function deleteOrder(orderId, signal) {
  const url = `${API_BASE_URL}/orders/${orderId}`;
  const options = { method: "DELETE", signal };
  return await fetchJson(url, options);
}

/**
 * Creates a new dish
 * @returns {Promise<[dish]>}
 *  a promise that resolves to the newly created dish.
 */
export async function createDish(dish, signal) {
  const url = `${API_BASE_URL}/dishes`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: dish }),
    signal,
  };
  return await fetchJson(url, options);
}

/**
 * Retrieves the order with the specified `dishId`
 * @param dishId
 *  the `id` property matching the desired dish.
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<dish>}
 *  a promise that resolves to the saved dish.
 */
export async function readDish(dishId, signal) {
  const url = `${API_BASE_URL}/dishes/${dishId}`;
  return await fetchJson(url, { signal });
}

/**
 * Updates a existing dish
 * @returns {Promise<[dish]>}
 *  a promise that resolves to the updated dish.
 */
export async function updateDish(dish, signal) {
  const url = `${API_BASE_URL}/dishes/${dish.id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: dish }),
    signal,
  };
  return await fetchJson(url, options);
}

/**
 * Deletes the order with the specified `dishId`.
 * @param dishId
 *  the id of the order to delete
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<null|String>}
 *  a promise that resolves to null or an error message.
 */
export async function deleteDish(dishId, signal) {
  const url = `${API_BASE_URL}/dishes/${dishId}`;
  const options = { method: "DELETE", signal };
  return await fetchJson(url, options);
}
