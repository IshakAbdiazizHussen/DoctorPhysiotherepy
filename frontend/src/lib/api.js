"use client";

const DEFAULT_API_BASE_URL = "http://localhost:8000";

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL
).replace(/\/$/, "");

function buildApiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

async function parseResponse(response) {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function buildRequestError(response, payload) {
  const detail =
    payload && typeof payload === "object" && "detail" in payload
      ? payload.detail
      : `Request failed with status ${response.status}`;

  const error = new Error(String(detail));
  error.status = response.status;
  error.payload = payload;
  return error;
}

async function apiRequest(path, options = {}) {
  const { method = "GET", body, token, headers = {}, cache = "no-store" } = options;
  const requestHeaders = new Headers(headers);

  if (body !== undefined) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(buildApiUrl(path), {
    method,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache,
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    throw buildRequestError(response, payload);
  }

  return payload;
}

export function fetchDoctors() {
  return apiRequest("/api/v1/doctors");
}

export function fetchServices() {
  return apiRequest("/api/v1/services");
}

export function registerUser(payload) {
  return apiRequest("/api/v1/auth/register", {
    method: "POST",
    body: payload,
  });
}

export function loginUser(payload) {
  return apiRequest("/api/v1/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function fetchCurrentUser(token) {
  return apiRequest("/api/v1/auth/me", { token });
}

export function fetchCurrentPatient(token) {
  return apiRequest("/api/v1/patients/me", { token });
}

export function createAppointment(token, payload) {
  return apiRequest("/api/v1/appointments", {
    method: "POST",
    token,
    body: payload,
  });
}

export function fetchMyAppointments(token) {
  return apiRequest("/api/v1/appointments", { token });
}
