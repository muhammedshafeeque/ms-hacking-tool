import express from 'express'
import { scriptRouter } from './scriptRouter.js'
import { executeRouter } from './executeRouter.js'
const router =express.Router()
router.use('/script',scriptRouter)
router.use('/ex',executeRouter)
export  default router