'use strict';

const Joi = require('joi');

const postCodeSchema = Joi.object({
  postcode: Joi.string().description('Postcode')
}).meta({className: 'PostcodeData'});

exports.register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/postcodes/{postcode}',
    handler: (request, reply) => {
      reply({postcode: request.params.postcode});
    },
    config: {
      tags: ['api'],
      validate: {
        params: {
          postcode: Joi.string().required().description('A postcode')
        }
      },
      response: {
        status: {
          200: postCodeSchema.description('Postcode data')
        }
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'postcodes'
};
