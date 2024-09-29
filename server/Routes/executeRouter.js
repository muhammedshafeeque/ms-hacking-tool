import express from 'express'
import { executeScript } from '../Controller/exicuteController.js'
const router =express.Router()
router.post('/execute',executeScript)
export const executeRouter=router