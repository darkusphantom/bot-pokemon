
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
import { configEnvironment } from './config/enviroment';
import { bot } from './bot';

const { environment: ENVIRONMENT } = configEnvironment();

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
