import { Request, Response } from 'express'
import { logger } from '../../Context/Shared/utils/logger'

const unknownEndpoint = (req: Request, res: Response) => {
	const requestDetails = `Method: ${req.method}, Path: ${req.path}, ${req.statusCode}`
	logger.info(requestDetails)

	res.status(404).send({ error: 'oops not found' })
}

export default unknownEndpoint
