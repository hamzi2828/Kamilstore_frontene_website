const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("ks_token") || "";
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

// ── Profile ──

export async function getProfile() {
  const res = await fetch(`${API}/api/auth/me`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Failed to load profile");
  return json.data;
}

export async function updateProfile(userId: string, data: { name?: string; email?: string; phone?: string }) {
  const res = await fetch(`${API}/api/users/${userId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Update failed");
  return json.data;
}

// ── Password ──

export async function updatePassword(currentPassword: string, newPassword: string) {
  const res = await fetch(`${API}/api/auth/updatepassword`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Update failed");
  // Save new token if returned
  if (json.token) localStorage.setItem("ks_token", json.token);
  return json;
}
