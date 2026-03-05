/*
Author : Sofian Hussein
Date : 04.03.2026
Title : errorMiddleware.js
Desc : Centralized error handling middleware
*/
function errorMiddleware(err, req, res, next) {
    const status = err.status ?? 500
    const message = err.message ?? 'Internal server error'

    return res.status(status).json({ error: message })
}

export default errorMiddleware