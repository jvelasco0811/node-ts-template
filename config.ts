import dotenv from 'dotenv'
dotenv.config()

interface Config {
	apiBaseUrl: string
	environment: 'development' | 'production' | 'staging'
	mongoUri: any
	mongoDatabase: any
	mongoCollection: any
	accessEndpoint: any
}

const developmentConfig: Config = {
	apiBaseUrl: 'http://localhost:3002',
	environment: 'development',
	mongoUri: process.env.MONGO_URI,
	mongoDatabase: process.env.MONGO_DATABASE,
	mongoCollection: process.env.MONGO_COLLECTION,
	accessEndpoint: process.env.ACCESS_ENDPOINT,
}

const productionConfig: Config = {
	apiBaseUrl: 'http://localhost:3002',
	environment: 'production',
	mongoUri: process.env.MONGO_URI,
	mongoDatabase: process.env.MONGO_DATABASE,
	mongoCollection: process.env.MONGO_COLLECTION,
	accessEndpoint: process.env.ACCESS_ENDPOINT,
}

const stagingConfig: Config = {
	apiBaseUrl: 'https://staging.api.example.com',
	environment: 'staging',
	mongoUri: process.env.MONGO_URI,
	mongoDatabase: process.env.MONGO_DATABASE,
	mongoCollection: process.env.MONGO_COLLECTION,
	accessEndpoint: process.env.ACCESS_ENDPOINT,
}

const getConfig = (): Config => {
	const env = process.env.NODE_ENV || 'development'

	switch (env) {
		case 'production':
			return productionConfig
		case 'staging':
			return stagingConfig
		default:
			return developmentConfig
	}
}

export const config = getConfig()
