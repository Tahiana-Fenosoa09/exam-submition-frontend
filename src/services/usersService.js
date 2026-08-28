import api from "../api/axiosConfig";

export async function fetchOwnProfile() {
    const res = await api.get("/users/me");
    return res.data;
}

export async function fetchStudents() {
    const res = await api.get("/users", { params: { role: "student" } });
    return res.data;
}

export async function fetchUserById(id) {
    const res = await api.get(`/users/${id}`);
    return res.data;
}

export async function createStudent({ fullName, email, password }) {
    const res = await api.post("/users", { fullName, email, password, role: "student" });
    return res.data;
}

export async function updateStudent(id, { fullName, email, isActive }) {
    const res = await api.put(`/users/${id}`, { fullName, email, isActive });
    return res.data;
}

export async function deleteStudent(id) {
    await api.delete(`/users/${id}`);
}

export async function fetchUserAttempts(id) {
    const res = await api.get(`/users/${id}/attempts`);
    return res.data;
}

export async function changePassword({ currentPassword, newPassword }) {
    await api.put("/auth/password", { currentPassword, newPassword });
}
