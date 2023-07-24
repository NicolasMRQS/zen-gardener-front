import MockAdapter from 'axios-mock-adapter';

/** Adds mock requests to axios
 * @param {axios} axios instance
 * @param {string} API URL, e.g. '/session'
 * @returns {axios}
 */
const sessionMockAdapter = (axios, apiUrl) => {
  const mockAdapter = new MockAdapter(axios);

  mockAdapter
    // Mock failed login at first request
    .onPost(apiUrl)
    .replyOnce((_) => [
      401, // HTTP 401 Unathorized
      {
        message: 'Unauthorized',
      },
    ])
    // Mock successful login
    .onPost(apiUrl)
    .reply(() => [
      200, // HTTP 200 OK
      {
        userData: {
          id: 1234,
          pseudo: 'Igor',
          email: 'Igor@hossegor.fr',
          address: 'Rue de la vague',
          city: 'Hossegor',
          postalCode: '40150',
          phoneNumber: '0612345678',
          sendTaskEmails: true,
          sendWeeklyEmails: true,
          updatedAt: Date.now(),
        },
      },
    ])
    // Mock log out request
    .onDelete(apiUrl)
    .reply(() => [
      204, // HTTP 204 No Content
      {
        message: 'Unauthorized',
      },
    ]);

  return axios;
};

export default sessionMockAdapter;
