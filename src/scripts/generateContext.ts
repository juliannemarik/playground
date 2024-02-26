import { UserSession } from "@esri/arcgis-rest-auth";
import { ArcGISContextManager } from "@esri/hub-common";
import { USERNAME, PASSWORD, PORTAL } from './resources.ts';

export const generateContext = async (
  opts?: {
    username?: string,
    password?: string,
    portal?: string
  }
) => {
  const userSession = new UserSession({
    username: opts?.username || USERNAME,
    password: opts?.password || PASSWORD,
    portal: opts?.portal || PORTAL
  });
  const ctxManager = await ArcGISContextManager.create({ authentication: userSession });
  const context = ctxManager.context;
  
  // console.log('CONTEXT >>>', context);
  return context;
};

// generateContext();