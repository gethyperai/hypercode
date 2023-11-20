import { hyper } from '@/lib/hyper';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const { query } = await req.json();

  const { data, error } = await hyper.types.string(query);

  if (data) {
    return Response.json({ data }, { status: 200 });
  }

  if (error) {
    return Response.json({ error }, { status: 500 });
  }
}
