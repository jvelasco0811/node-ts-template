import { Request, Response, NextFunction } from 'express'
import { logger } from '../../Context/Shared/utils/logger'

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
	const requestDetails = `Method: ${req.method}, Path: ${req.path}, Body: ${req.body}`
	logger.info(requestDetails)

	next()
}

export default requestLogger
