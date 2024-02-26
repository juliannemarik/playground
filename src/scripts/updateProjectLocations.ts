import {
  updateProject,
  fetchProject,
  HubProject
} from "@esri/hub-common";
import { generateContext } from "./generateContext.ts";
import _ from 'lodash';

export const functionalMatchProjectLocations = async (
  projectIdToMatch: string,
  projectIdsToUpdate: string[]
): Promise<void> => {
  await Promise.all(projectIdsToUpdate.map(async (id: string) => {
    const context = await generateContext();
    const projectToMatch = await fetchProject(projectIdToMatch, context.requestOptions);
    const project = await fetchProject(id, context.requestOptions);
    const updatedProject = _.merge(project, { location: projectToMatch.location });

    await updateProject(updatedProject, context.userRequestOptions);
  }));
};

export const classMatchProjectLocations = async (
  projectIdToMatch: string,
  projectIdsToUpdate: string[]
): Promise<void> => {
  await Promise.all(projectIdsToUpdate.map(async (id: string) => {
    const context = await generateContext();
    const projectToMatchInstance = await HubProject.fetch(projectIdToMatch, context);
    const projectInstance = await HubProject.fetch(id, context);

    await projectInstance.update({ location: projectToMatchInstance.toJson().location });
    await projectInstance.save();
  }));
};

const projectIdToMatch = '58a2a936e69b43758843b4bc7c007192';
const projectIdsToUpdate = ['0af34008a958419bbd764a913ec80054'];

functionalMatchProjectLocations(projectIdToMatch, projectIdsToUpdate);
// classMatchProjectLocations(projectIdToMatch, projectIdsToUpdate);