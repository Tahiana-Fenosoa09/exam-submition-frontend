import api from "../api/axiosConfig";

export async function fetchCourses() {
    const res = await api.get("/courses");
    return res.data;
}

export async function createCourse({ code, name, description }) {
    const res = await api.post("/courses", { code, name, description });
    return res.data;
}

export async function updateCourse(id, { code, name, description }) {
    const res = await api.put(`/courses/${id}`, { code, name, description });
    return res.data;
}

export async function deleteCourse(id) {
    await api.delete(`/courses/${id}`);
}
