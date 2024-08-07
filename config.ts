import dotenv from 'dotenv'
dotenv.config()

interface Config {
	apiBaseUrl: string
	environment: 'development' | 'production' | 'staging' | 'test'
	mongoUri: string | undefined
	mongoDatabase: string | undefined
	mongoCollection: string | undefined
	accessEndpoint: string | undefined
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

const testConfig: Config = {
	apiBaseUrl: 'http://localhost:3002',
	environment: 'test',
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
		case 'test':
			return testConfig
		default:
			return developmentConfig
	}
}

export const config = getConfig()
