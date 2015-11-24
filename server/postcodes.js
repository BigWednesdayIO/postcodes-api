'use strict';

const Boom = require('boom');
const Joi = require('joi');
const errorSchemas = require('hapi-error-schemas');

const postCodeSchema = Joi.object({
  postcode: Joi.string().required().description('Postcode'),
  place: Joi.string().allow(null).description('Place'),
  district: Joi.string().allow(null).description('District'),
  county: Joi.string().allow(null).description('County'),
  region: Joi.string().description('Region'),
  country: Joi.string().description('Country')
}).meta({className: 'PostcodeData'});

const dataset = require('../lib/dataset');

exports.register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/postcodes/{postcode}',
    handler: (request, reply) => {
      dataset.get(dataset.key(['Postcode', request.params.postcode.toUpperCase()]), (err, entity) => {
        if (err) {
          console.error(err);
          return reply(err);
        }

        if (!entity) {
          return reply(Boom.notFound());
        }

        const resource = {
          postcode: entity.data.postcode,
          place: entity.data.place.length ? entity.data.place : null,
          district: entity.data.district.length ? entity.data.district : null,
          county: entity.data.county.length ? entity.data.county : null,
          region: entity.data.region,
          country: entity.data.country
        };

        reply(resource);
      });
    },
    config: {
      tags: ['api'],
      validate: {
        params: {
          postcode: Joi.string().required().description('A postcode')
        }
      },
      response: {
        status: Object.assign({
          200: postCodeSchema.description('Postcode data')
        }, errorSchemas.statuses([404]))
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'postcodes'
};
