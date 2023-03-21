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
    console.log(body);
    //TODO: Add a payload validator middleware
    if (!body.walletAddress || !body.amount || !Number.isInteger(body.amount) || body.amount < 0) {
      return res.status(400).json({ message: "Check payload" });
    }
    try {
      const explorerUrl = await sendTokens(body.amount, body.walletAddress);
      res.status(200).json({ message: "Token sent successfully", url: explorerUrl });
    } catch (error: any) {
      res.status(500).json({ message: error?.message as string || "Something went wrong" });
    }
  } else {
    res.status(400).json({ message: "Not allowed" });
  }
}
