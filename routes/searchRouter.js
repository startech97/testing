const Router = require('express')
const {Op} = require("sequelize");
const sequelize = require('../connect.js')
const router = Router()
const initModels = require('../models/init-models');
const teachers = require('../models/teachers.js');

const models = initModels(sequelize)
router.get('/', async (req,res)=> {
    let {date, status, teacherIds, studentsCount,page,lessonsPerPage} = req.body
        page = page || 1
        limit = lessonsPerPage || 5
        let offset = page * limit - limit
        let lessons;
        if (!date && !status && !teacherIds && !studentsCount) {
            lessons = await models.lessons.findAndCountAll({
                include:[
                    {
                        model: models.lesson_teachers,
                        as:'teachers'
                    },
                    {
                        model: models.lesson_students,
                        as:'students'
                    }
                    ],
                    limit,
                    offset})
        }
        if (date && !status && !teacherIds && !studentsCount) {
            if(Array.isArray(date)) {
                const [start, end] = date
                console.log(start, end)
                lessons = await models.lessons.findAndCountAll(
                    {
                        where:{
                            date:{
                                [Op.between]:[start,end]
                            }
                        },
                        include:[
                            {
                                model: models.lesson_teachers,
                                 as:'teachers'
                            },
                            {
                                model: models.lesson_students,
                                as:'students'
                            }
                        ],
                        limit,
                        offset
                    })
            }else {
                lessons = await models.lessons.findAndCountAll({where:{date},include:[{model: models.lesson_teachers, as:'teachers'},{model: models.lesson_students, as:'students'}],limit, offset})
            }
        }
        if (!date && status && !teacherIds && !studentsCount) {
            lessons = await models.lessons.findAndCountAll({
                where:{status},
                include:[
                    {
                        model: models.lesson_teachers,
                        as:'teachers'
                    },
                    {
                        model: models.lesson_students,
                        as:'students'
                    }
                ]
                ,limit,
                offset
            })
        }
        if (!date && !status && teacherIds && !studentsCount) {
            lessons = await models.lessons.findAndCountAll({
                include:[
                    {
                        model: models.lesson_teachers,
                        as:'teachers',
                        where: {
                            teacher_id:{
                                [Op.in]: teacherIds}
                            }
                    },
                    {
                        model: models.lesson_students,
                        as:'students'
                    }
                ],
                limit,
                offset})
        }
        if (!date && !status && !teacherIds && studentsCount) {
            const data = await models.lessons.findAndCountAll({
                include:[
                    {
                        model: models.lesson_teachers,
                         as:'teachers',
                    },
                    {   model: models.lesson_students,
                        as:'students'
                    }
                ],
                limit,
                offset
            })
            lessons = data['rows'].filter(item => {
                if(Array.isArray(studentsCount)){
                    const [start,end] = studentsCount
                    if(item["students"].length >= start && item["students"].length <= end) {
                        return item
                    }

                    return item["students"].length
                }else {
                    if(item["students"].length == studentsCount) {
                        return item
                    }
                }
            })
        }
         res.json(lessons)
})

module.exports = router