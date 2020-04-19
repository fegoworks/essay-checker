import {
  User
} from '../../models';

const permissions = {
  async isRegistered(req, res, next) {
    const {
      id
    } = req;
    const user = await User.findByPk(id);
    if (user) {
      return next();
    }
    return res.status(403).json({
      status: 'Request failed',
      error: 'Unauthorized Access',
    });
  },
};

export default permissions;