import app from './app'
import { logger } from '../Context/Shared/utils/logger'

const PORT = 5000

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

process.on('uncaughtException', (error: Error) => {
	logger.error(
		`Caught exception: ${error.name} - message: ${error.message}`,
		`Stack: ${error.stack}`,
	)
})

process.on('unhandledRejection', (reason: string, p: Promise<unknown>) => {
	logger.error('Unhandled Rejection at:', p, 'reason:', reason)
})
