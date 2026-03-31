/*
Author : Sofian Hussein, Léo del Duca, Milo Soupper, Rodrigo Silva Riço
Date : 24.03.2026
Title : roleMiddleware.js
Desc : role middleware
*/

export function requireRole(roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user?.post)) {
            return res.status(403).json({ error: 'Unauthorized access' })
        }
        next()
    }
}