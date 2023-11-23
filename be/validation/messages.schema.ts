import * as statusCodes from './statusCodes';

export default {
  user: {
    notFound: {
      message: 'User not found',
      code: statusCodes.NOT_FOUND,
    },
    notEnoughMoney: {
      message: 'Not enough money',
      code: statusCodes.BAD_REQUEST,
    },
    notSeller: {
      message: 'User not a seller',
      code: statusCodes.BAD_REQUEST,
    },
    notOwner: {
      message: 'User not the owner of the product',
      code: statusCodes.BAD_REQUEST,
    },
    notBuyer: {
      message: 'User not a buyer',
      code: statusCodes.BAD_REQUEST,
    },
  },
  deposit: {
    invalidAmount: {
      message: 'Invalid amount',
      code: statusCodes.BAD_REQUEST,
    },
  },
  product: {
    notFound: {
      message: 'Product not found',
      code: statusCodes.NOT_FOUND,
    },
    notEnoughProduct: {
      message: 'Not enough product',
      code: statusCodes.BAD_REQUEST,
    },
  },
  validation: {
    message: 'Validation Error',
    code: statusCodes.BAD_REQUEST,
  },
  internalServerError: {
    message: 'Internal Server Error',
    code: statusCodes.INTERNAL_SERVER_ERROR,
  },
  authentication: {
    invalidCredentials: {
      message: 'Invalid credentials',
      code: statusCodes.UNAUTHORIZED,
    },
    notLoggedIn: {
      message: 'Not logged in',
      code: statusCodes.UNAUTHORIZED,
    },
    missingCredentials: {
      message: 'No credentials provided',
      code: statusCodes.UNAUTHORIZED,
    },
  },
};
