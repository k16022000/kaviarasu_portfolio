/* eslint-disable react/jsx-props-no-spreading */
import Cookies from 'js-cookie';
import UserInfo from 'models/UserInfo';
import GlobalService from 'services/GlobalService';
import { resturls } from 'globals/utils/apiurls';
import { cookiedomain } from 'globals/utils/constants';
import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import ls from 'local-storage';

function parseJwt(token) {
  console.log('token', token);
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
  console.log('Payload', jsonPayload);
  return JSON.parse(jsonPayload);
}

function updateC1() {
  const expmin = new Date(new Date().getTime() + 20 * 60 * 1000);
  const val1 = Cookies.get('_c1', { domain: cookiedomain });
  if (val1 !== undefined && val1 !== null) {
    // console.log('updateC1  val1', val1);
    Cookies.remove('_c1', { domain: cookiedomain });
    Cookies.set('_c1', val1, { path: '/', expires: expmin, domain: cookiedomain });
    // const p = parseJwt(val1);
    // console.log('update - C1 Payload', p);
  }
}

function updateUserInfo(c1 = null) {
  let val1 = c1;
  console.log(cookiedomain);
  const ck = Cookies.get('_c1', { domain: cookiedomain });

  if (ck != null) {
    val1 = ck;
    console.log('Thru cookie');
  } else if (c1 !== undefined && c1 !== null) {
    const cookie = parseJwt(c1);
    const now = new Date();
    const cookieObj = {
      data: (c1),
      expiry: now.getTime() + cookie.max_age,
    };
    ls.set('_c1', cookieObj);
    console.log('Thru Params - post login');
  }
  if (val1 === undefined || val1 === null) {
    const cookieObj = ls.get('_c1');
    if (cookieObj !== undefined && cookieObj !== null) {
      const cookie = parseJwt(cookieObj.data);
      const now = new Date();

      if (Math.floor(now.getTime() / 1000) <= cookieObj.expiry) {
        val1 = cookieObj.data;

        cookieObj.expiry = Math.floor(now.getTime() / 1000) + cookie.max_age;
        ls.set('_c1', cookieObj);
      } else {
        ls.remove('_c1');
        window.localStorage.setItem('isEventClosed', '');
      }
    }
    console.log('Thru Local Store');
  }

  if (val1 !== undefined && val1 !== null && val1) {
    const data = parseJwt(val1);
    UserInfo.setUserDetail(data);
    console.log('data\n\n');
    console.log(data);
  } else {
    console.log('updateUserInfo - Cookie / LS / Params not found');
  }
}

function clearCookies() {
  let ck = Cookies.get('_c1', { domain: cookiedomain });
  console.log('before logout ck', ck, cookiedomain);
  Cookies.remove('_c1', { domain: cookiedomain });
  ck = Cookies.get('_c1', { domain: cookiedomain });
  console.log('after logout ck', ck, cookiedomain);
  ls.remove('_c1');
  document.cookie = '_c1=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.location.href = '/login';
  window.localStorage.setItem('isEventClosed', '');
  window.localStorage.setItem('authAmphiSessionId', undefined);
}

function processLogout(redirectToLogin = true) {
  console.log('Logout process');
  const obj = {};
  GlobalService.generalSelect(
    (respdata) => {
      const { estatus, emessage, data } = respdata;
      console.log(estatus, emessage, data);
      if (estatus && emessage) {
        if (data.status === 'logged out') {
          let ck = Cookies.get('_c1', { domain: cookiedomain });
          console.log('before logout ck', ck, cookiedomain);
          Cookies.remove('_c1', { domain: cookiedomain });
          ls.remove('schoolId');
          ls.remove('schoolName');
          ck = Cookies.get('_c1', { domain: cookiedomain });
          console.log('after logout ck', ck, cookiedomain);
          ls.remove('_c1');
          ls.remove('institutionId');
          ls.remove('domain');
          ls.remove('activePrgmScreen');
          ls.remove('roleDetailsMap');
          ls.remove('defaultRedirection');
          document.cookie = '_c1=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          if (redirectToLogin) {
            document.location.href = '/login';
          }
          UserInfo.clear();
          window.localStorage.setItem('isEventClosed', '');
          window.localStorage.setItem('authAmphiSessionId', undefined);
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage('loggedOut');
            window.ReactNativeWebView.postMessage('loggedOut');
          }
        }
      }
    }, resturls.logout, obj, 'POST',
  );
}

function PrivateRoute({ component: Component, cprops, ...rest }) {
  const valid = UserInfo.getRole();

  return (
    <Route
      {...rest}
      render={(props) => ((valid)
        ? <Component {...cprops} {...props} />
        : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        ))}
    />
  );
}

function updateFavIcon() {
  const favicon = document.getElementById('favicon');
  const bodyTagEle = document.getElementsByTagName('body')[0];
  GlobalService.generalSelect(
    (respdata) => {
      const {
        estatus,
        emessage,
        data: {
          faviconLink, titleContent, roleDetailsMap, defaultRedirection,
          domainTheme, isTrank,
        },
      } = respdata;
      favicon.href = `${favicon.href}/favicon.webp`;
      document.title = 'E-Box App | We Revolutionize Technology and Engineering Learning';
      if (estatus === true && emessage === 'success') {
        if (faviconLink !== '') {
          favicon.href = faviconLink;
          document.title = titleContent;
        }
        ls.set('roleDetailsMap', roleDetailsMap);
        ls.set('defaultRedirection', defaultRedirection);
        ls.set('isTrank', isTrank);
        if (domainTheme !== null && domainTheme !== undefined && domainTheme.length > 0) {
          bodyTagEle.classList.add(domainTheme);
        }
      }
    }, resturls.obtainFavIconAndTitle,
  );
}

export {
  parseJwt, updateC1, updateUserInfo, PrivateRoute, processLogout, clearCookies, updateFavIcon,
};
