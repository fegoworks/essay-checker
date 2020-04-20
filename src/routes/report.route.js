import express from 'express';
import ReportController from '../controllers/report.controller';
import upload from '../middlewares/multer';
import verifyToken from '../middlewares/auth/auth.middleware';

const router = express.Router();

router.post('/reports/',
  verifyToken.verify,
  upload.array('essay'),
  ReportController.addReport);

router.get('/reports/',
  verifyToken.verify,
  ReportController.getReports);

router.get('/reports/:reportId/',
  verifyToken.verify,
  ReportController.getReportsById);

router.delete('/reports/:reportId/',
  verifyToken.verify,
  ReportController.deleteReport);

export default router;