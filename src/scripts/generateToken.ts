import { UserSession } from "@esri/arcgis-rest-auth";
import { USERNAME, PASSWORD, PORTAL } from './resources.ts';

export const generateToken = async () => {
  const userSession = new UserSession({
    username: USERNAME,
    password: PASSWORD,
    portal: PORTAL
  });
  const token = await userSession.getToken(PORTAL);

  console.log('TOKEN >>>', token);
  return token;
};

// generateToken();