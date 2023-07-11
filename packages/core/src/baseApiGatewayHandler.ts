import type { APIGatewayEvent,APIGatewayProxyCallback, Context, Handler } from 'aws-lambda';
 
const baseApiGatewayHandler = (lambda: Handler) => {
  const baseHandler: Handler = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) => {
    let body: unknown, statusCode;

    try {
      // Run the Lambda
      body = await lambda(event, context, callback);
      statusCode = 200;
    } catch (e: any) {
      body = { 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        error: e.message
      };
      statusCode = 500;
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