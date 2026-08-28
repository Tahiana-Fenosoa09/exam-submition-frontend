import api from "../api/axiosConfig";

export async function fetchExams() {
    const res = await api.get("/exams");
    return res.data;
}

export async function fetchExamById(id) {
    const res = await api.get(`/exams/${id}`);
    return res.data;
}

export async function createExam({ courseId, title, description, startsAt, endsAt, questions }) {
    const res = await api.post("/exams", { courseId, title, description, startsAt, endsAt, questions });
    return res.data;
}

export async function updateExam(id, { courseId, title, description, startsAt, endsAt, questions }) {
    const res = await api.put(`/exams/${id}`, { courseId, title, description, startsAt, endsAt, questions });
    return res.data;
}

export async function deleteExam(id) {
    await api.delete(`/exams/${id}`);
}
