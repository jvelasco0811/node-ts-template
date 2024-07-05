import { Request, Response, NextFunction } from 'express'
import { logger } from '../../Context/Shared/utils/logger'

const errorHandler = (
	error: Error,
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	logger.error(
		`Internal_server_error: ${error.name} - message: ${error.message}`,
		`Stack: ${error.stack}`,
	)
	res.status(500).send({
		type: 'internal_server_error',
		message: 'Something went wrong! Please try again later.',
	})
	next()
}

export default errorHandler
