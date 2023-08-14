import type { APIGatewayEvent, APIGatewayProxyCallback, Context, Handler } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

const baseApiGatewayHandler = (lambda: Handler) => {
  const baseHandler: Handler = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) => {
    let body: unknown, statusCode;

    try {
      // Run the Lambda
      body = await lambda(event, context, callback);
      statusCode = StatusCodes.OK;
    } catch (e: any) {
      body = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        error: e,
      };
      statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }

    // Return HTTP response
    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    };
  };

  return baseHandler;
};

export default baseApiGatewayHandler;