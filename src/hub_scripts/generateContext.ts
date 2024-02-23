import { UserSession } from "@esri/arcgis-rest-auth";
import { ArcGISContextManager } from "@esri/hub-common";
import { USERNAME, PASSWORD, PORTAL } from './resources';

export const generateContext = async () => {
  const userSession = new UserSession({
    username: USERNAME,
    password: PASSWORD,
    portal: PORTAL
  });
  const ctxManager = await ArcGISContextManager.create({ authentication: userSession });
  const context = ctxManager.context;
  
  console.log('CONTEXT >>>', context);
  return context;
};

generateContext();