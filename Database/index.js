const colleges = [
    {
        id : 1, 
        name : "ABC College, Pune",
        dep_name : ["Engineering", "Management"],
        instructors : 300,
    },
    {
        id : 2, 
        name : "XYZ College, Mumbai",
        dep_name : ["Pharmacy", "Applied Science"],
        instructors : 125,
    }
]

const departments = [
    {
        id : 1,
        name : "Engineering",
        colleges_id : [1],
        courses : [1, 2],
    },
    {
        id : 2,
        name : "Pharmacy",
        colleges_id : [2],
        courses : [4],
    },
    {
        id : 3,
        name : "Applied Science",
        colleges_id : [2],
        courses : [3],
    }
];

const courses = [
    {
        id : 1,
        name : "Computer science and engineering",
        department_id : 1,
    },
    {
        id : 2,
        name : "Mechanical Engineering",
        department_id : 1,
    },
    {
        id : 3,
        name : "Physics",
        department_id : 3,
    },
    {
        id : 4,
        name : "pharmaceutical",
        department_id : 2,
    }
];

export default {colleges, departments, courses};