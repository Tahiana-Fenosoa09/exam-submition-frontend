import api from "../api/axiosConfig";


export async function fetchMyAttemptForExam(examId) {
    const res = await api.get(`/exams/${examId}/my-attempt`);
    return res.data; 
}


export async function startAttempt(examId) {
    const res = await api.post(`/exams/${examId}/attempts`);
    return res.data; 
}


export async function saveAnswer(attemptId, { questionId, choiceId }) {
    await api.put(`/attempts/${attemptId}/answers`, { questionId, choiceId });
}


export async function submitAttempt(attemptId) {
    const res = await api.post(`/attempts/${attemptId}/submit`);
    return res.data; 
}


export async function fetchMyAttempts() {
    const res = await api.get("/attempts/mine");
    return res.data;
}
