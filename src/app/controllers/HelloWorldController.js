'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.HelloWorldController = void 0
var HelloWorldController = function (_req, res) {
	try {
		res.status(200).json({ message: 'Hello World!' })
	} catch (error) {
		var errorMessage = 'Unexpected error occurred'
		if (error instanceof Error) {
			res.status(500).json({ error: error.message })
		}
		res.status(500).json({ error: errorMessage, details: error })
	}
}
exports.HelloWorldController = HelloWorldController
