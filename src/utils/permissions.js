const permissions = {
    admin: {
        students: {
            create: true,
            read: true,
            update: true,
            delete: true
        },

        courses: {
            create: true,
            read: true,
            update: true,
            delete: true
        },

        exams: {
            create: true,
            read: true,
            update: true,
            delete: true
        },

        profiles: {
            readOthers: true,
            updateOwn: true
        }
    },

    student: {
        students: {
            create: false,
            read: true,
            update: false,
            delete: false
        },

        courses: {
            create: false,
            read: true,
            update: false,
            delete: false
        },

        exams: {
            create: false,
            read: true,
            update: false,
            delete: false
        },

        profiles: {
            readOthers: false,
            updateOwn: true
        }
    }
};

export function can(user, resource, action) {
    if (!user?.role) {
        return false;
    }

    return permissions[user.role]?.[resource]?.[action] ?? false;
}
