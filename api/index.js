
import { startVercel } from '../src';

export default async function handle(req, res) {
    try {
        await startVercel(req, res);
    } catch (event) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
        console.error(event.message);
    }
}