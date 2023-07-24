import MockAdapter from 'axios-mock-adapter';

/** Adds mock requests to axios
 * @param {axios} axios instance
 * @param {string} API URL, e.g. '/session'
 * @returns {axios}
 */
const tasksMockAdapter = (axios, apiUrl) => {
  const mockAdapter = new MockAdapter(axios);

  mockAdapter
    .onGet(apiUrl)
    .reply(() => [
      200, // HTTP 200 OK
      [
        {
          id: 1,
          label: 'Tache 1',
          begin_date: '2022-10-10T11:00:00Z',
          limit_date: '2022-10-11T11:00:00Z',
          user_id: 1,
          sheet_id: 1,
        },
        {
          id: 2,
          label: 'Tache 2',
          begin_date: '2022-10-12T11:00:00Z',
          limit_date: '2022-10-13T11:00:00Z',
          user_id: 1,
          sheet_id: 2,
        },
      ],
    ])
    .onPost(apiUrl)
    .reply(() => [
      201, // HTTP 201 Created
      [
        {
          id: 3,
          label: 'Tache 3',
          begin_date: '2022-10-14T11:00:00Z',
          limit_date: '2022-10-15T11:00:00Z',
          user_id: 1,
          sheet_id: 3,
        },
      ],
    ])
    .onPut(apiUrl)
    .reply(204)
    .onDelete(`${apiUrl}/:id`)
    .reply(204);

  return axios;
};

export default tasksMockAdapter;
