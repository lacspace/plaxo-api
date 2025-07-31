// src/server.ts
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`🚀 Lacspace Backend running on port ${PORT}`);
});
