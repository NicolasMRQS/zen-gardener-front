import axios from 'axios';

/**
 * The local storage key for the token
 */
const TOKEN_KEY_NAME = 'token';

/**
 * The Client class provides access to axios or whatever web client
 * to use by the application.
 * This provides encapsulation and uses a design pattern called Singleton.
 * https://refactoring.guru/fr/design-patterns/singleton
 */
class Client {
  /**
   * Use Client.getInstance() instead
   */
  static instance = null;

  /**
   * Always use Client.getInstance() to access axios
  */
  static getInstance() {
    if (Client.instance === null) {
      Client.create();
    }
    return Client.instance;
  }

  /**
   * DO NOT call Client.create() directly
   * This method creates and configures singleton instance
   */
  static create() {
    Client.instance = axios.create({
      crossDomain: true,
    });

    const token = localStorage.getItem(TOKEN_KEY_NAME);
    if (token) {
      Client.setToken(token);
    }
  }

  /**
   * Call Client.setToken("xxxxx") to set the token for every axios request
   */
  static setToken(token) {
    localStorage.setItem(TOKEN_KEY_NAME, token);
    Client.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  /**
   * Call Client.clearToken() to remove the token from local storage
   * and from axios default configuration
   */
  static clearToken() {
    localStorage.removeItem(TOKEN_KEY_NAME);
    delete Client.instance.defaults.headers.common.Authorization;
  }
}

export default Client;
