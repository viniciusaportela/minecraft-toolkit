import Realm, { BSON, Types } from 'realm';

export class GlobalStateModel extends Realm.Object {
  _id!: BSON.ObjectId;

  selectedProjectId?: Types.ObjectId;

  static schema: Realm.ObjectSchema = {
    name: 'GlobalState',
    properties: {
      selectedProjectId: 'objectId?',
    },
  };
}
