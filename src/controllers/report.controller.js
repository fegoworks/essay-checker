import path from 'path';
import str from 'string-similarity';
import {
  getFiles,
  getPercent,
  handleErrorResponse,
  handleSuccessResponse,
  getUrls,
} from '../helpers/utils';
import {
  Report
} from '../models';

/**
 * @description Report Controller
 * @class ReportController
 */
class ReportController {
  /**
   * @description Add Report method
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Report
   * @member ReportController
   */
  static async addReport(req, res) {
    try {
      const {
        studentOne,
        studentTwo
      } = req.body;

      const userId = req.id;

      if (req.files === undefined) {
        return handleErrorResponse(res, 'Err: No file selected', 500);
      }
      if (req.files.length < 2) {
        return handleErrorResponse(res, 'Err: Second Essay missing', 500);
      }
      const urls = await getUrls(req.files);

      const filePath = path.join(__dirname, '../uploads');
      const files = getFiles(filePath);
      const similarity = getPercent(str.compareTwoStrings(files[0], files[1]));

      const report = await Report.create({
        userId,
        studentOne,
        studentTwo,
        textFileOne: urls[0],
        textFileTwo: urls[1],
        similarity,
      });
      return handleSuccessResponse(res, report, 201);
    } catch (error) {
      return handleErrorResponse(res, error.message, 403);
    }
  }

  /**
   * @description Get all reports
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} reports
   * @member ReportController
   */
  static async getReports(req, res) {
    try {
      const userId = req.id;
      const reports = await Report.findAll({
        where: {
          userId
        }
      });
      return handleSuccessResponse(res, reports);
    } catch (error) {
      return handleErrorResponse(res, error.message, 500);
    }
  }

  /**
   * @description Get report by Id
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} report
   * @member ReportController
   */
  static async getReportsById(req, res) {
    try {
      const userId = req.id;
      const {
        reportId: id
      } = req.params;

      const report = await Report.findByPk(id);
      if (!report) {
        return handleErrorResponse(res, 'Report not found', 404);
      }
      if (report.userId !== userId) {
        return handleErrorResponse(res, 'Unauthorized access', 403);
      }
      return handleSuccessResponse(res, report);
    } catch (error) {
      return handleErrorResponse(res, error.message, 500);
    }
  }

  /**
   * @description Delete report
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {null} void
   * @member ReportController
   */
  static async deleteReport(req, res) {
    try {
      const {
        reportId: id
      } = req.params;

      const report = await Report.findByPk(id);
      if (!report) {
        return handleErrorResponse(res, 'Report not found', 404);
      }
      if (report.userId !== req.id) {
        return handleErrorResponse(res, 'Unauthorized access', 403);
      }

      await Report.destroy({
        where: {
          id
        }
      });
      return res.status(204).json({
        status: 'success',
        message: 'Report deleted successfully',
      });
    } catch (error) {
      return handleErrorResponse(res, error.message, 500);
    }
  }
}

export default ReportController;