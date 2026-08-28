const EXAMS_KEY = "exam-submission-exams";
const SUBMISSIONS_KEY = "exam-submissions";

export function getExams() {
    try {
        const data = localStorage.getItem(EXAMS_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export function saveExams(exams) {
    localStorage.setItem(
        EXAMS_KEY,
        JSON.stringify(exams)
    );
}

export function getSubmissions() {
    try {
        const data = localStorage.getItem(SUBMISSIONS_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export function saveSubmissions(submissions) {
    localStorage.setItem(
        SUBMISSIONS_KEY,
        JSON.stringify(submissions)
    );
}

export function getSubmission(examId, studentId) {
    const submissions = getSubmissions();

    return submissions.find(
        submission =>
            submission.examId === examId &&
            submission.studentId === studentId
    );
}

export function saveSubmission(submission) {
    const submissions = getSubmissions();

    const existingIndex = submissions.findIndex(
        item =>
            item.examId === submission.examId &&
            item.studentId === submission.studentId
    );

    if (existingIndex >= 0) {
        submissions[existingIndex] = submission;
    } else {
        submissions.push(submission);
    }

    saveSubmissions(submissions);
}
