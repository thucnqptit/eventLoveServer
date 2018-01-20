/* eslint-disable camelcase */
/* eslint-disable max-len */

import request from 'request';
import { CODE } from '../constants';
const options = (method, url, qs, body) => {
  return {
    method,
    url,
    qs,
    headers: {
      'Content-type': 'application/json',
    },
    body,
    json: true,
  };
};
const requestApi = (options) => {
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      const data = body;
      console.log(data);
      if (response && response.statusCode === 200) {
        if ((data.success || data.result === 'success') && !data.error) {
          resolve(CODE.SUCCESS);
        } else {
          reject(CODE.OBJECT_NOT_FOUND);
        }
      } else {
        reject(CODE.FB_VERIFY_FAIL, data.error);
      }
    }
    );
  });
};
const exchangeToken = (appId, appSecret, accessToken) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      url: 'https://graph.facebook.com/v2.6/oauth/access_token',
      qs:
      {
        grant_type: 'fb_exchange_token',
        client_id: appId,
        client_secret: appSecret,
        fb_exchange_token: accessToken,
      },
      headers:
      {
        'postman-token': 'f9879aea-cc53-51fd-9522-47699ed654e0',
        'cache-control': 'no-cache',
      },
      json: true,
    };
    request(options, (error, response, body) => {
      console.log(`exchange token${  response.statusCode}`, body);
      if (response && response.statusCode === 200) {
        if (body.access_token && !body.error) {
          resolve(body.access_token);
        } else {
          reject(body.error);
        }
      } else {
        reject(body.error);
      }
    });
  });
};
export default {
  options,
  requestApi,
  exchangeToken,
};
