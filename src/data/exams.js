export const initialExams = [
    {
        id: 1,
        courseId: 1,
        title: "Encapsulation",
        description:
            "A simple QCM about encapsulation.",
        startsAt: "2026-08-28T20:50",
        endsAt: "2026-08-28T21:00",
        numberOfQuestion: 3,
        allowedStudents: [2],
        questions: [
            {
                id: 1,
                question:
                    "What is encapsulation?",
                answers: [
                    {
                        id: "a",
                        text: "A way to hide internal data",
                        correct: true,
                        score: 2
                    },
                    {
                        id: "b",
                        text: "A database",
                        correct: false,
                        score: 0
                    },
                    {
                        id: "c",
                        text: "A programming language",
                        correct: false,
                        score: 0
                    }
                ]
            },
            {
                id: 2,
                question:
                    "Which keyword is commonly used to restrict access to a class member?",
                answers: [
                    {
                        id: "a",
                        text: "public",
                        correct: false,
                        score: 0
                    },
                    {
                        id: "b",
                        text: "private",
                        correct: true,
                        score: 2
                    },
                    {
                        id: "c",
                        text: "static",
                        correct: false,
                        score: 0
                    }
                ]
            },
            {
                id: 3,
                question:
                    "Why is encapsulation useful?",
                answers: [
                    {
                        id: "a",
                        text: "To protect internal state",
                        correct: true,
                        score: 1
                    },
                    {
                        id: "b",
                        text: "To delete classes",
                        correct: false,
                        score: 0
                    },
                    {
                        id: "c",
                        text: "To create databases",
                        correct: false,
                        score: 0
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        courseId: 3,
        title: "Data organisation",
        description:
            "A test about data organisation.",
        startsAt: "2026-09-03T10:00",
        endsAt: "2026-09-03T12:00",
        numberOfQuestion: 2,
        allowedStudents: [2],
        questions: [
            {
                id: 1,
                question:
                    "What is a data structure?",
                answers: [
                    {
                        id: "a",
                        text: "A way to organise data",
                        correct: true,
                        score: 2
                    },
                    {
                        id: "b",
                        text: "A web browser",
                        correct: false,
                        score: 0
                    },
                    {
                        id: "c",
                        text: "An operating system",
                        correct: false,
                        score: 0
                    }
                ]
            },
            {
                id: 2,
                question:
                    "Which structure follows FIFO?",
                answers: [
                    {
                        id: "a",
                        text: "Stack",
                        correct: false,
                        score: 0
                    },
                    {
                        id: "b",
                        text: "Queue",
                        correct: true,
                        score: 2
                    },
                    {
                        id: "c",
                        text: "Tree",
                        correct: false,
                        score: 0
                    }
                ]
            }
        ]
    }
];
