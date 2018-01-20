import { fbUrl } from '../config/index';
const optionDeleteGreeting = (pageToken) => {
  return {
    method: 'DELETE',
    url: `${fbUrl}/messenger_profile`,
    qs: { access_token: pageToken }, //eslint-disable-line
    headers:
    {
      'Content-type': 'application/json',
    },
    body: {
      fields: [
        'greeting',
      ],
    },
    json: true,
  };
};
const optionDeteleStartButton = (pageToken) => {
  return {
    method: 'DELETE',
    url: `${fbUrl}/messenger_profile`,
    qs: { access_token: pageToken }, //eslint-disable-line
    headers: {
      'Content-type': 'application/json',
    },
    body: {
      fields: [
        'get_started',
      ],
    },
    json: true,
  };
};
const optionDeleteMenu = (pageToken) => {
  return {
    method: 'DELETE',
    url: `${fbUrl}/messenger_profile`,
    qs: { access_token: pageToken },      //eslint-disable-line
    headers: {
      'Content-type': 'application/json',
    },
    body: {
      fields: [
        'persistent_menu',
      ],
    },
    json: true,
  };
};

const optionsRegister = (pageToken) => {
  return {
    method: 'POST',
    url: `${fbUrl}/subscribed_apps`,
    qs: { access_token: pageToken },      //eslint-disable-line
    json: true,
  };
};

const optionsStartButton = (pageToken) => {
  return {
    method: 'POST',
    url: `${fbUrl}/messenger_profile`,
    qs: { access_token: pageToken }, //eslint-disable-line
    headers: {
      'Content-type': 'application/json',
    },
    body: {
      get_started: {  //eslint-disable-line
        payload: 'GET_STARTED_PAYLOAD',
      },
    },
    json: true,
  };
};
const optionsMenu = (pageToken) => {
  return {
    method: 'POST',
    url: `${fbUrl}/messenger_profile`,
    qs: { access_token: pageToken },      //eslint-disable-line
    headers: {
      'Content-type': 'application/json',
    },
    body: {
      persistent_menu: [                            //eslint-disable-line
        {
          locale: 'default',
          composer_input_disabled: false,            //eslint-disable-line
          call_to_actions: [                          //eslint-disable-line
            {
              title: 'Categories',
              type: 'postback',
              payload: 'CATEGORY_LIST_PAYLOAD',
            },
            {
              title: 'Products',
              type: 'postback',
              payload: 'PRODUCT_LIST_PAYLOAD',
            },
            {
              title: 'Contact',
              type: 'postback',
              payload: 'CONTACT_INFO',
            },
          ],
        },

      ],
    },
    json: true,
  };
};
const optionsWhiteList = (pageToken) => {
  return {
    method: 'POST',
    url: `${fbUrl}/messenger_profile`,
    qs: { access_token: pageToken }, //eslint-disable-line
    headers: {
      'Content-type': 'application/json',
    },
    body: {
      whitelisted_domains: [           //eslint-disable-line
        'https://bot2shop.com',
        'http://bot2shop.com',
        'https://scontent.fhan2-2.fna.fbcdn.net/',
        'https://facebook.com',
      ],
    },
    json: true,
  };
};
export {
  optionsMenu,
  optionsRegister,
  optionsStartButton,
  optionsWhiteList,
  optionDeleteMenu,
  optionDeleteGreeting,
  optionDeteleStartButton,
};
