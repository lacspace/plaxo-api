// jwtTokenGen.ts
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Replace this with the email you want to embed in the token
const email = process.env.GMAIL_USER || 'your-email@example.com';

// Load the secret key
const secret = process.env.JWT_SECRET || 'fallback-secret-key';

const token = jwt.sign({ email }, secret, { expiresIn: '1h' });

console.log('✅ Generated JWT Token:\n');
console.log(token);
