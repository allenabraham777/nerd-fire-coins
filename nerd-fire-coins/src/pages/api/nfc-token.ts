// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { sendTokens } from '@/utils/token';

type Data = {
  message: string;
  url?: string;
};

interface Payload extends NextApiRequest {
  body: {
    walletAddress: string;
    amount: number;
  };
}

export default async function handler(
  req: Payload,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const body = req.body;
    if (!body.walletAddress || !body.amount) res.status(400).json({ message: "Not allowed" });
    const explorerUrl = await sendTokens(body.amount, body.walletAddress);
    res.status(200).json({ message: "Token sent successfully", url: explorerUrl });
  } else {
    res.status(400).json({ message: "Not allowed" });
  }
}
