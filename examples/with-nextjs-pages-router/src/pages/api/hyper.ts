// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { hyper } from '@/lib/hyper';

type Data =
  | {
      data: string;
    }
  | {
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { query } = req.body;

  const { data, error } = await hyper.types.string(query);

  if (data) {
    return res.status(200).json({ data });
  }

  if (error) return res.status(500).json({ error });
}
