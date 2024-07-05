import { Request, Response, NextFunction } from 'express'
import { logger } from '../../Context/Shared/utils/logger'

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
	const requestDetails = `${req.method} ${req.path} [${req.ip}]`
	logger.info(requestDetails)

	next()
}

export default requestLogger
