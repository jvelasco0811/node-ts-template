import express from 'express'
import helloWorld from './routes/helloWorld.route'
import cors from 'cors'

const app = express()
app.disable('x-powered-by')
app.use(express.json())
// CORS configuration
const corsOptions = {
	origin: '*', // specify the allowed origin
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // allowed methods
	credentials: true, // if your endpoint requires credentials
	optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.use('/api/v1/hello', helloWorld)

process.on('uncaughtException', (error) => {
	console.error('Uncaught Exception:', error)
})

export default app
