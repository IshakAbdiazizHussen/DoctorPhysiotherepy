"use client";

function getApiBaseUrl() {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (!configuredBaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not set. Start the frontend with NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8012."
    );
  }

  return configuredBaseUrl.replace(/\/$/, "");
}

export function getApiUrl(path) {
  const apiBaseUrl = getApiBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${apiBaseUrl}${normalizedPath}`;
}

function buildApiUrl(path) {
  return getApiUrl(path);
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
  const requestUrl = buildApiUrl(path);

  if (body !== undefined) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  let response;

  try {
    response = await fetch(requestUrl, {
      method,
      headers: requestHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown network error";

    throw new Error(
      `Failed to reach ${requestUrl}. Confirm the backend is running and NEXT_PUBLIC_API_BASE_URL is correct. Original error: ${message}`
    );
  }

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
