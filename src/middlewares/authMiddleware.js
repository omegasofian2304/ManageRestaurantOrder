/*
Author : Sofian Hussein, Léo del Duca, Milo Soupper, Rodrigo Silva Riço
Date : 24.03.2026
Title : authMiddleware.js
Desc : Auth Middleware
*/

import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    if (!token) return res.status(401).json({ error: 'missing token' })

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch {
        return res.status(401).json({ error: 'invalid or expired token' })
    }
}