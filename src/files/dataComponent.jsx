export const subjectData = [
    { id: 1, subjectName: "Mathematics" },
    { id: 2, subjectName: "Science" },
    { id: 3, subjectName: "English" },
    { id: 4, subjectName: "History" },
    { id: 5, subjectName: "Hindi" }
];

export const classData = [
    {
        id: 1,
        className: 1,
        subjectsId: [1, 2, 3],
    },
    {
        id: 2,
        className: 2,
        subjectsId: [1, 2, 3],
    },
    {
        id: 3,
        className: 3,
        subjectsId: [1, 2, 3],
    },
    {
        id: 4,
        className: 4,
        subjectsId: [1, 2, 3, 4, 5],
    },
    {
        id: 5,
        className: 5,
        subjectsId: [1, 2, 3, 4, 5],
    }
]

export const chapterData = [
    { // change this id to dynamic id
        id: Math.random(),
        classId: 1,
        subjectId: 1,
        title: "Addition",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about the basics of addition."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will learn about the properties of addition."
            },
            {
                id: 3,
                name: "Section-3",
                content: "In this section, we will learn about the applications of addition."
            },
            {
                id: 4,
                name: "Section-4",
                content: "In this section, we will learn about the advanced concepts of addition."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 1,
        subjectId: 1,
        title: "Subtraction",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about the basics of subtraction."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will learn about the properties of subtraction."
            },
            {
                id: 3,
                name: "Section-3",
                content: "In this section, we will learn about the applications of subtraction."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 1,
        subjectId: 1,
        title: "Multiply",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about the basics of multiplication."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will learn about the properties of multiplication."
            },
            {
                id: 3,
                name: "Section-3",
                content: "In this section, we will learn about the applications of multiplication."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 1,
        subjectId: 2,
        title: "Food",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about food."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will learn about the importance of food."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 1,
        subjectId: 2,
        title: "Plants",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about plants."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will learn about the importance of plants."
            },
            {
                id: 3,
                name: "Section-3",
                content: "In this section, we will learn about the different types of plants."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 1,
        subjectId: 2,
        title: "Animals",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about animals."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will learn about the importance of animals."
            },
            {
                id: 3,
                name: "Section-3",
                content: "In this section, we will learn about the different types of animals."
            },
            {
                id: 4,
                name: "Section-4",
                content: "In this section, we will learn about the habitats of animals."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 1,
        subjectId: 3,
        title: "Lamp",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about lamps."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will learn about the different types of lamps."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 1,
        subjectId: 3,
        title: "Tree",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about trees."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will learn about the different types of trees."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 2,
        subjectId: 1,
        title: "Data",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about data."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will learn about the different types of data."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 2,
        subjectId: 2,
        title: "Photosynthesis",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about photosynthesis."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will learn about the process of photosynthesis."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 2,
        subjectId: 3,
        title: "Wind",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about wind."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will learn about the different types of wind."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 3,
        subjectId: 1,
        title: "Geometery",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about geometry."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will learn about the different types of geometry."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 3,
        subjectId: 2,
        title: "Food Chain",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about food chains."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will learn about the different types of food chains."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 3,
        subjectId: 3,
        title: "The idea",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about the idea."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will read story named the ideas."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 4,
        subjectId: 1,
        title: "Arithmetics",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about arithmetics."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will learn about the different types of arithmetics."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 4,
        subjectId: 2,
        title: "Reflection",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about reflection."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will learn about the different types of reflection."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 4,
        subjectId: 3,
        title: "Aries",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about Aries."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will read about Aries story."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 4,
        subjectId: 4,
        title: "Akbar",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about Akbar."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will learn about the life of Akbar."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 4,
        subjectId: 5,
        title: "Aazad",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about Aazad."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will learn about the life of Aazad."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 5,
        subjectId: 1,
        title: "Statics",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about statics."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will learn about the different types of statics."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 5,
        subjectId: 2,
        title: "Light",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about light."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will learn about the different types of light."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 5,
        subjectId: 3,
        title: "Parents",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about parents."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will talk about parents."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 5,
        subjectId: 4,
        title: "Panipat",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about Panipat."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will talk about the war of Panipat."
            }
        ]
    },
    {
        id: Math.random(),
        classId: 5,
        subjectId: 5,
        title: "TulsiDas",
        section: [
            {
                id: 1,
                name: "Section-1",
                content: "In this section, we will learn about TulsiDas."
            },
            {
                id: 2,
                name: "Section-2",
                content: "In this section, we will talk about the works of TulsiDas."
            }
        ]
    }
]
