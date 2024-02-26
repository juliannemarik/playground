import {
  updateProject,
  fetchProject,
  HubProject
} from "@esri/hub-common";
import { generateContext } from "../scripts/generateContext.ts";
import { PASSWORD, USERNAME, PORTAL } from "./resources.ts";
import _ from 'lodash';

export const functionalMatchProjectLocations = async (
  projectIdToMatch: string,
  projectIdsToUpdate: string[]
): Promise<void> => {
  const context = await generateContext({ username: USERNAME, password: PASSWORD, portal: PORTAL});
  const projectToMatch = await fetchProject(projectIdToMatch, context.requestOptions);
  
  await Promise.all(projectIdsToUpdate.map(async (id: string) => {
    const project = await fetchProject(id, context.requestOptions);
    const updatedProject = _.assign(project, { location: projectToMatch.location });

    await updateProject(updatedProject, context.userRequestOptions);
  }));

  console.log('>>> hubjs_automation_demo SUCCESS! ✨');
};

export const classMatchProjectLocations = async (
  projectIdToMatch: string,
  projectIdsToUpdate: string[]
  ): Promise<void> => {
  const context = await generateContext({ username: USERNAME, password: PASSWORD, portal: PORTAL});
  const projectToMatchInstance = await HubProject.fetch(projectIdToMatch, context);

  await Promise.all(projectIdsToUpdate.map(async (id: string) => {
    const projectInstance = await HubProject.fetch(id, context);

    await projectInstance.update({ location: projectToMatchInstance.toJson().location });
    await projectInstance.save();
  }));

  console.log('>>> hubjs_automation_demo SUCCESS! ✨');
};

const projectIdToMatch = '58a2a936e69b43758843b4bc7c007192';
const projectIdsToUpdate = ['0af34008a958419bbd764a913ec80054'];

// functionalMatchProjectLocations(projectIdToMatch, projectIdsToUpdate);
classMatchProjectLocations(projectIdToMatch, projectIdsToUpdate);