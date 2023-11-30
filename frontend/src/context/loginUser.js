import axios from "axios";

export async function loginUser(username, password, role) {
  try {
    const response = await axios.get("http://localhost:3001/api/login", {
      params: { username, password, role },
    });

    if (response.status === 200 && response.data.role === role) {
      return { success: true, role: response.data.role };
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false };
  }
}
