import Axios from 'axios';
import ls from 'local-storage';
import { restbaseurl, cdnurl } from 'globals/utils/constants';
import { updateUserInfo, clearCookies, parseJwt } from 'globals/utils/index';

class RestDataSource {
  static async SendRequest(method, url, callback, data = {}, urlType = 'api') {
    try {
      const req = Axios.request({
        baseURL: (urlType === 'cdn' ? cdnurl : restbaseurl),
        method,
        url,
        data,
        withCredentials: true,
      });

      const resp = (await req);
      const respdata = resp.data;
      if (resp.status === 200) {
        const {
          estatus, emessage, _c1, _c2,
        } = respdata;

        if (estatus === true && emessage === 'success') {
          if (String(url).search('user/login') !== -1 || String(url).search('user/saveUserRegistration') !== -1 || String(url).search('secure/pluginSSOLogin') !== -1 || String(url).search('a/n') !== -1) {
            // const { data: { valid, isBlocked } } = respdata;
            // if (valid === true && isBlocked === false) {
            if (respdata.data.valid === true) {
              updateUserInfo(_c1);
              ls.set('_c2', _c2);
            } else {
              console.log('Invalid Credentials');
            }
          } else {
            const cookieObj = ls.get('_c1');
            if (cookieObj !== undefined && cookieObj !== null) {
              const now = new Date();

              if (Math.floor(now.getTime() / 1000) <= cookieObj.expiry) {
                const cookie = parseJwt(cookieObj.data);
                cookieObj.expiry = Math.floor(now.getTime() / 1000) + cookie.max_age;
                ls.set('_c1', cookieObj);
              } else {
                ls.remove('_c1');
                window.localStorage.setItem('isEventClosed', '');
              }
            }
          }
        } else {
          console.log('Regular flow');
        }
      }
      callback(resp.data);
    } catch (err) {
      if (err.response && err.response.status === 401 && err.response.data.message === 'Invalid token') {
        clearCookies();
        document.location.href = '/login';
      } else if (err.response && err.response.status === 401) {
        document.location.href = '/unauthorized';
      } else if (err.response && err.response.status === 500) {
        document.location.href = '/500';
      }
    }
  }

  static async GetData(callback, url, data = {}, method = 'GET', urlType = 'api') {
    RestDataSource.SendRequest(method, url, callback, data, urlType);
  }

  static async Save(callback, url, data) {
    RestDataSource.SendRequest('post', url, callback, data);
  }

  static async Update(callback, url, data) {
    RestDataSource.SendRequest('put', `${url}/${data.id}`, callback, data);
  }

  static async Delete(callback, url, data) {
    RestDataSource.SendRequest('delete', `${url}/${data.id}`, callback, data);
  }

  static async Put(callback, url, data) {
    RestDataSource.SendRequest('put', url, callback, data);
  }

  static async crossDomainRequest(callback, method, url, data = {}, additionalReqParams = {}) {
    try {
      const req = Axios.request({
        method,
        url,
        data,
        ...additionalReqParams,
      });
      const resp = (await req);
      callback(resp.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        document.location.href = '/unauthorized';
      } else if (err.response && err.response.status === 500) {
        // const isThirdEyeUrl = url.includes('proctoring/attemptGenuine')
        //  || url.includes('proctoring/saveAttemptScreen');
        // console.log(isThirdEyeUrl, 'thirdEyeUrl');
        // if (isThirdEyeUrl) {
        // console.log(err);
        // } else {
        //   document.location.href = '/500';
        // }
      }
    }
  }
}

export default RestDataSource;
