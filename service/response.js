import { CODE } from '../constants';

const success = (data) => {
  return {
    code: CODE.SUCCESS,
    result: data,
  };
};
const objectNotFound = (message) => {
  return {
    code: CODE.OBJECT_NOT_FOUND,
    result: message,
  };
};

const exception = (message, error) => {
  return {
    code: CODE.EXCEPTION_ERROR,
    result: message,
    error,
  };
};

const expired = (message, error) => {
  return {
    code: CODE.FB_VERIFY_FAIL,
    result: message,
    error,
  };
};

const error = (code, message, error) => {
  return {
    code,
    result: message,
    error: error,
  };
};

export default {
  success,
  error,
  objectNotFound,
  exception,
  expired,
};
