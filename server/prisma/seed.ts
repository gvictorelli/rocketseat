import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const firstHabitId = '64a16464-9ceb-11ed-a8fc-0242ac120002'
const firstHabitCreationDate = new Date('2022-12-31T03:00:00.000')

const secondHabitId = '8ba106d2-9ceb-11ed-a8fc-0242ac120002'
const secondHabitCreationDate = new Date('2023-01-03T03:00:00.000')

const thirdHabitId = 'b6c2ff6e-9ceb-11ed-a8fc-0242ac120002'
const thirdHabitCreationDate = new Date('2023-01-08T03:00:00.000')

async function main() {

    await prisma.habit.deleteMany()
    await prisma.habit.create({
        data:{
            title: 'Beber 2L de água',
            created_at: new Date('2023-01-10T00:00:00.000z')
        }
    })

    /** 
     * Create habits
     */
    await Promise.all([
        prisma.habit.create({
            data:{
                id: firstHabitId,
                title: 'Beber 2L água',
                created_at: firstHabitCreationDate,
                weekDays:{
                    create: [
                        {week_day: 1},
                        {week_day: 2},
                        {week_day: 3},
                    ]
                }
            }
        }),

        prisma.habit.create({
            data:{
                id: secondHabitId,
                title: 'Exercitar',
                created_at: secondHabitCreationDate,
                weekDays:{
                    create: [
                        {week_day: 3},
                        {week_day: 4},
                        {week_day: 5},
                    ]
                }
            }
        }),

        prisma.habit.create({
            data:{
                id: thirdHabitId,
                title: 'Dormir 8h',
                created_at: thirdHabitCreationDate,
                weekDays:{
                    create: [
                        {week_day: 1},
                        {week_day: 2},
                        {week_day: 3},
                        {week_day: 4},
                        {week_day: 5},
                    ]
                }
            }
        })
    ])

    await Promise.all([

        /**
         * Habits (Complete/Available): 1/1
         */

        prisma.day.create({
            /** Monday */
            data: {
                date: new Date('2023-01-02T03:00:00.000z'),
                dayHabits: {
                    create: {
                        habit_id: firstHabitId
                    }
                }
            }
        }),

        /**
         * Habits (Complete/Available): 1/1
         */

         prisma.day.create({
            /** Friday */
            data: {
                date: new Date('2023-01-06T03:00:00.000z'),
                dayHabits: {
                    create: {
                        habit_id: firstHabitId
                    }
                }
            }
        }),

        /**
         * Habits (Complete/Available): 2/2
         */

         prisma.day.create({
            /** Wednesday */
            data: {
                date: new Date('2023-01-04T03:00:00.000z'),
                dayHabits: {
                    create: [
                        { habit_id: firstHabitId },
                        { habit_id: secondHabitId },
                    ]
                }
            }
        })
    ])
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })