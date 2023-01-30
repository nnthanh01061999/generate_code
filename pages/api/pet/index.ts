import dbConnect from '@/mongo/lib/dbConnect';
import Pet from '@/mongo/models/Pet';
import { getErrorMessage, getPageSizeFromQuery } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query, method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const { page = 1, size = 20 } = getPageSizeFromQuery(query);
                const { name } = query;
                var _query: { [key: string]: any } = {};
                name ? (_query.name = { $regex: name, $options: 'i' }) : '';

                const pets_total = await Pet.find({});

                const pets = await Pet.find(_query)
                    .sort({ _id: -1 })
                    .skip(size * page - size)
                    .limit(size);

                res.status(200).json({ success: true, data: { data: pets, total: pets_total.length } });
            } catch (error) {
                const errorMessage = getErrorMessage(error);
                res.status(400).json({ success: false, message: errorMessage });
            }
            break;
        case 'POST':
            try {
                const pet = await Pet.create(req.body); /* create a new model in the database */
                res.status(201).json({ success: true, data: pet });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
