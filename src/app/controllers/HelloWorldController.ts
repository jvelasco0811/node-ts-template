import { Request, Response } from 'express'

export const HelloWorldController = (req: Request, res: Response) => {
	try {
		res.status(200).json({ message: 'Hello World!' })
	} catch (error: unknown) {
		const errorMessage = 'Unexpected error occurred'
		if (error instanceof Error) {
			res.status(500).json({ error: error.message })
		}

		res.status(500).json({ error: errorMessage, details: error })
	}
}
