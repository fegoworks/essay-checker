/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import cloudinary from 'cloudinary';
import cloud from '../configs/cloudinary';
/**
 * @param {string} password
 * @return {string} hash
 */
export const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

/**
 * @param {string} password
 * @param {string} hashPwd
 * @return {string} hash
 */
export const comparePassword = (password, hashPwd) => bcrypt.compareSync(password, hashPwd);

/**
 * @param {object} payload
 * @param {string} tokenExpiryDate
 * @param {string} secret
 * @return {string} token
 */
export const generateToken = (
  payload,
  tokenExpiryDate = '1h',
  secret = process.env.SECRET
) => jwt.sign(
  payload,
  secret, {
    expiresIn: tokenExpiryDate
  }
);

/**
 * @param {object} res
 * @param {string} data
 * @param {integer} statusCode
 * @return {object} data
 */
export const handleSuccessResponse = (res, data, statusCode = 200) => res.status(statusCode).json({
  status: 'success',
  data,
});

/**
 * @param {object} res
 * @param {string} error
 * @param {integer} statusCode
 * @return {object} data
 */
export const handleErrorResponse = (res, error, statusCode = 400) => res.status(statusCode).json({
  status: 'Request Failed',
  error,
});

/**
 * @param {string} file
 * @return {object} url
 */
export const cloudLink = async (file) => {
  try {
    // Upload file to cloudinary
    const uploader = (path) => cloud.uploads(path, 'essay');
    const {
      path,
    } = file;
    const url = await uploader(path);
    return url;
  } catch (error) {
    return {
      status: 'Request failed',
      error,
    };
  }
};

/**
 * @param {string} fileId
 * @return {object} result
 */
export const unLink = async (fileId) => {
  await cloudinary.uploader.destroy(fileId, (error, result) => {
    if (error) {
      return {
        status: 'Request failed',
        error,
      };
    }

    return result;
  });
};

/**
 * @param {string} dir
 * @return {object} temp
 */
export const getFiles = (dir) => {
  const all = fs.readdirSync(dir);
  const temp = [];

  all.forEach((file) => {
    const filePath = `${dir}/${file}`;
    const data = fs.readFileSync(filePath, 'utf8');
    temp.push(data);
    fs.unlinkSync(filePath);
  });

  return temp;
};

/**
 * @param {Array} files
 * @return {Array} links
 */
export const getUrls = async (files) => {
  const links = [];
  for (const file of files) {
    const link = await cloudLink(file);
    links.push(link.url);
  }
  return links;
};

/**
 * @param {float} val
 * @return {integer} value
 */
export const getPercent = (val) => Math.ceil(val * 100);