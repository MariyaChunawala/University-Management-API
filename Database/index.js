const colleges = [
    {
        id : 1, 
        name : "ABC College, Pune",
        dep_name : ["Engineering", "Management"],
        instructors : 300,
        courses : [1],
    },
    {
        id : 2, 
        name : "XYZ College, Mumbai",
        dep_name : ["Pharmacy", "Applied Science"],
        instructors : 125,
        courses : [3],
    }
]

const departments = [
    {
        id : 1,
        name : "Engineering",
        colleges_id : [1],
    },
    {
        id : 2,
        name : "Pharmacy",
        colleges_id : [2]
    },
    {
        id : 3,
        name : "Applied Science",
        colleges_id : [2]
    }
];

const courses = [
    {
        id : 1,
        name : "Computer science and engineering",
        departments_id : [1],
    },
    {
        id : 2,
        name : "Mechanical Engineering",
        departments_id : [1],
    },
    {
        id : 3,
        name : "Physics",
        departments_id : [3],
    }
];

export default {colleges, departments, courses};