import { Request, Response } from 'express'

const unknownEndpoint = (req: Request, res: Response) => {
	res.status(404).send({ error: 'oops not found' })
}

export default unknownEndpoint
