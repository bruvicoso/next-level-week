import { Request, Response } from 'express';

import db from '../database/connection';
import convertHtoM from '../utils/converHtoM';

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string
}

export default class ClassesController {
    async index(req: Request, res: Response) {
        const filters = req.query;

        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;

        if(!week_day || !subject || !time) {
            return res.status(400).json({
                error: 'Missing filters to search classes'
            });
        }

        const timeMinutes = convertHtoM(time);

        const classes = await db('classes')
            .whereExists(function() {
                this.select('classe_schedule.*')
                    .from('classe_schedule')
                    .whereRaw('`classe_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`classe_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`classe_schedule`.`from` <= ?? AND `classe_schedule`.`to` > ??', [timeMinutes, timeMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'user_id')
            .select(['classes.*', 'users.*']);

        return res.json(classes);
    }

    async create(req: Request, res: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;
    
        const trx = await db.transaction();
    
        try {
            // ADD Users
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
            const user_id = insertedUsersIds[0];
    
            // ADD Classes
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            });
            const class_id = insertedClassesIds[0];
            
            // ADD Schedule
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHtoM(scheduleItem.from),
                    to: convertHtoM(scheduleItem.to)
                };
            });
    
            await trx('classe_schedule').insert(classSchedule);
    
            await trx.commit();
    
            return res.status(201).send();
        } catch (err) {
            
            await trx.rollback();
    
            return res.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }
}