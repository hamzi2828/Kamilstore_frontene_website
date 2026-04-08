const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || "Login failed");
  }
  return json as { success: true; message: string; data: { _id: string; name: string; email: string; role: string }; token: string };
}

export async function registerUser(data: { name: string; email: string; password: string; phone?: string }) {
  const res = await fetch(`${API}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || "Registration failed");
  }
  return json as { success: true; message: string; data: { _id: string; name: string; email: string; role: string }; token: string };
}

export async function getMe(token: string) {
  const res = await fetch(`${API}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Invalid token");
  const json = await res.json();
  return json.data;
}

export async function logoutUser(token: string) {
  await fetch(`${API}/api/auth/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  }).catch(() => {});
}
