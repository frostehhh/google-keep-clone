import { StatusCodes } from 'http-status-codes';

export const commonResponseHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

export const handleSuccessfulResponse = ({ body }: { body: unknown }) => ( {
  statusCode: StatusCodes.OK,
  body: JSON.stringify(body),
  headers: commonResponseHeaders,
});

export const handleResponseError = ({ error }: { error: unknown }) => ({
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  body: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    error,
  },
  headers: commonResponseHeaders,
});