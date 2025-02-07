import dotenv from 'dotenv';
import { __dirname } from './dirname.js';
import path from 'path';
dotenv.config({path: path.join(__dirname, '.env')})