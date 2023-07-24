import env from './index.json';

export default class Config {
  static get ENVIRONMENT() {
    return env.ENVIRONMENT;
  }

  static get API_URL() {
    return env.API_URL;
  }

  static get API_MOCK_ENABLED() {
    return env.API_MOCK_ENABLED;
  }

  static get API_URL_SESSION() {
    return `${Config.API_URL}/session`;
  }

  static get API_URL_MEMBER() {
    return `${Config.API_URL}/member`;
  }

  static get API_URL_TASKS() {
    return `${Config.API_URL}/tasks`;
  }

  static get API_URL_SHEETS() {
    return `${Config.API_URL}/sheets`;
  }

  static get API_URL_PUBLIC_SHEETS() {
    return `${Config.API_URL}/sheets/public?`;
  }
}
