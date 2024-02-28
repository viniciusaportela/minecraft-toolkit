import type { ObjectSchema } from 'realm';

const Realm = window.require('realm');

export class ItemModel extends Realm.Object {
  static schema: ObjectSchema = {
    name: 'Item',
    properties: {
      _id: 'objectId',
      id: 'string',
      name: 'string',
      model: 'string',
      project: {
        type: 'linkingObjects',
        objectType: 'Project',
        property: 'items',
      },
    },
  };
}