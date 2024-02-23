import { createInitiative as createHubInitiative, ArcGISContextManager, IHubInitiative } from "@esri/hub-common"
import { UserSession } from "@esri/arcgis-rest-auth"
import { USERNAME, PASSWORD, PORTAL } from './resources'
import _ from 'lodash';

const DEFAULT_INITITIVE = {
  access: "private",
  name: "",
  tags: [],
  type: "Hub Initiative",
  typeKeywords: ["hubInitiativeV2"],
  catalog: { schemaVersion: 0 },
  permissions: [],
  schemaVersion: 2,
  status: "notStarted",
  features: {
    "hub:initiative:events": false,
    "hub:initiative:content": true,
    "hub:initiative:discussions": false,
  },
  view: {
    featuredContentIds: [],
    hero: "map"
  },
};

export const createInitiative = async (partialInitiative: Partial<IHubInitiative>) => {
  const userSession = new UserSession({
    username: USERNAME,
    password: PASSWORD,
    portal: PORTAL
  });

  const ctxManager = await ArcGISContextManager.create({ authentication: userSession });
  const context = ctxManager.context;
  
  partialInitiative = _.merge(DEFAULT_INITITIVE, partialInitiative);
  partialInitiative.orgUrlKey = context.portal.urlKey;
  const initiative = await createHubInitiative(partialInitiative, context.userRequestOptions);

  console.log('NEW INITIATIVE >>>', initiative.name, initiative.id);
}
createInitiative({ name: 'Test V2 Initiative 52' });

// for (let i = 0; i < 50; i++) {
//   createInitiative({ name: `Test V2 Initiative ${i}`, access: "org" });
// }