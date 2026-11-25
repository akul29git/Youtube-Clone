import { rateLimit } from 'express-rate-limit'
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, "..", "..");
const logStream = fs.createWriteStream(
  path.join(publicDir, "public", "access.log"),
  { flags: "a" }
);

export const requestLogger = (req, res, next)=>{
  res.on("finish", () => {
    logStream.write(
        JSON.stringify({
            time: new Date().toISOString(),
            ip: req.ip,
            method: req.method,
            path: req.originalUrl,
            status: res.statusCode,
            ua: req.get("user-agent"),
        }) + "\n"
    )
  })
  next()
} 

export const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});


export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});