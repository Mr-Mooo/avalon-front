import { BigNumber } from 'bignumber.js';

const config = {
  // base_url: 'http://119.3.87.150:7001/api',

  base_url: 'http://127.0.0.1:7001/api',
  MAX_DECIMAL_DIGITS: 2,
  version: 'v1.3.1',
  getLanguage() {
    const language = window.navigator.browserLanguage || window.navigator.language;
    if (language.startsWith('zh')) {
      return 'zh-CN';
    }
    if (language.startsWith('en')) {
      return 'en-US';
    }
    return 'en-US';
  },
  // 对URL的组成部分进行个别编码 encodeURIComponent()
  getEncodeURIComponent: str => {
    let result = str;
    if (str) {
      result = encodeURIComponent(str);
    }
    return result;
  },
  // 对URL的组成部分进行个别解码 encodeURIComponent()
  getDecodeURIComponent: str => {
    let result = str;
    if (str) {
      result = decodeURIComponent(str);
    }
    // console.log(result, 'result')
    return result;
  },
  // 超过最大小数位时保留最大位数，其他返回原来值
  // eslint-disable-next-line consistent-return
  getNumericalValue: value => {
    if (value) {
      const valueBig = new BigNumber(value);
      if (valueBig.isInteger()) {
        return valueBig.toNumber();
      }
      const DECIMAL = value.toString().split('.')[1].length;
      let CURRENT_DECIMAL = DECIMAL;

      // console.log(value, DECIMAL, config.MAX_DECIMAL_DIGITS);
      if (DECIMAL > config.MAX_DECIMAL_DIGITS) {
        CURRENT_DECIMAL = config.MAX_DECIMAL_DIGITS;
      }
      const amount = new BigNumber(valueBig.toFixed(CURRENT_DECIMAL));
      return amount.toNumber();
    } else {
      return 0;
    }
  },

  getDecimalLength: value => {
    const valueBig = new BigNumber(value);
    if (valueBig.isInteger()) {
      return 0;
    }
    const DECIMAL = value.toString().split('.')[1] ? value.toString().split('.')[1].length : 0;
    let CURRENT_DECIMAL = DECIMAL;
    // console.log(value, DECIMAL, config.MAX_DECIMAL_DIGITS);
    if (DECIMAL > config.MAX_DECIMAL_DIGITS) {
      CURRENT_DECIMAL = config.MAX_DECIMAL_DIGITS;
    }
    return CURRENT_DECIMAL;
  },

  getDefaultLocale: () => {
    const lang = navigator.language || navigator.userLanguage;
    const lacallang = lang === 'zh-CN' ? 'zh' : 'en';
    const locale = localStorage.getItem('locale');
    let mLocale = lacallang;
    if (locale) {
      mLocale = locale;
    }
    return mLocale;
  },
};

export default config;
