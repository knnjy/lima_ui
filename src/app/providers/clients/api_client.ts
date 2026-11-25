import { supabase } from '../supabase_client';

export class ApiError extends Error {
  public readonly status: number;

  constructor(
    message: string,
    status: number,
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

interface ApiRequestOptions extends RequestInit {
  auth?: boolean;
}

const baseUrl = (import.meta.env.VITE_API_URL ?? '/api').replace(/\/$/, '');

async function request<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { auth = true, headers, ...requestOptions } = options;
  const requestHeaders = new Headers(headers);

  if (!requestHeaders.has('Accept')) {
    requestHeaders.set('Accept', 'application/json');
  }

  if (requestOptions.body && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  if (auth) {
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;

    if (accessToken) {
      requestHeaders.set('Authorization', `Bearer ${accessToken}`);
    }
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...requestOptions,
    headers: requestHeaders,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const body = await response.json() as
        | { message?: string; detail?: string; error?: string }
        | undefined;
      message =
        body?.message ??
        body?.detail ??
        body?.error ??
        message;
    } catch {
      // Keep the HTTP status message when the response has no JSON body.
    }

    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get<T>(path: string, options?: ApiRequestOptions) {
    return request<T>(path, { ...options, method: 'GET' });
  },
  post<T>(path: string, body?: unknown, options?: ApiRequestOptions) {
    return request<T>(path, {
      ...options,
      method: 'POST',
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  },
  put<T>(path: string, body?: unknown, options?: ApiRequestOptions) {
    return request<T>(path, {
      ...options,
      method: 'PUT',
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  },
  patch<T>(path: string, body?: unknown, options?: ApiRequestOptions) {
    return request<T>(path, {
      ...options,
      method: 'PATCH',
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  },
  delete<T>(path: string, options?: ApiRequestOptions) {
    return request<T>(path, { ...options, method: 'DELETE' });
  },
};