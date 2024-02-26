import {
  updateProject,
  fetchProject,
} from "@esri/hub-common";
import { generateContext } from "../scripts/generateContext.ts";
import { PASSWORD, USERNAME, PORTAL, ORIGINAL_LOCATION } from "./resources.ts";
import _ from 'lodash';

export const revertProjectLocations = async (
  projectIds: string[]
) => {
  const context = await generateContext({ username: USERNAME, password: PASSWORD, portal: PORTAL});
  
  await Promise.all(projectIds.map(async (id: string) => {
    const project = await fetchProject(id, context.requestOptions);
    const updatedProject = _.assign(project, { location: ORIGINAL_LOCATION });

    await updateProject(updatedProject, context.userRequestOptions);
  }));

  console.log('>>> cleanup SUCCESS! ✨');
}

revertProjectLocations(['58a2a936e69b43758843b4bc7c007192', '0af34008a958419bbd764a913ec80054']);