import { Router } from 'express'
import { HelloWorldController } from '../controllers/HelloWorldController'

const router: Router = Router()

router.get('/', HelloWorldController)

export default router
