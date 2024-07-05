import { Request, Response, NextFunction } from 'express'
import { logger } from '../../Context/Shared/utils/logger'
import onFinished from 'on-finished'
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
	const start = Date.now()
	const requestDetails = `${req.method} ${req.path} [${req.ip}]`

	onFinished(res, (_err, res) => {
		const duration = Date.now() - start
		const contentLength = (res.getHeader('Content-Length') || 0) as string
		const statusCode = res.statusCode
		const logMessage = `${requestDetails} - ${statusCode} - ${contentLength} bytes - ${duration} ms`
		logger.info(logMessage)
	})

	next()
}

export default requestLogger
