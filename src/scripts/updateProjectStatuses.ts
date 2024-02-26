import {
  updateProject,
  fetchProject,
  HubEntityStatus,
  HubProject
} from "@esri/hub-common";
import { generateContext } from "./generateContext.ts";
import _ from 'lodash';

export const functionalUpdateProjectStatuses = async (
  projectIds: string[],
  status: HubEntityStatus
): Promise<void> => {
  await Promise.all(projectIds.map(async (id: string) => {
    const context = await generateContext();
    const currentProject = await fetchProject(id, context.requestOptions);
    const updatedProject = _.merge(currentProject, { status });

    await updateProject(updatedProject, context.userRequestOptions);
  }));
};

export const classUpdateProjectStatuses = async (
  projectIds: string[],
  status: HubEntityStatus
): Promise<void> => {
  await Promise.all(projectIds.map(async (id: string) => {
    const context = await generateContext();
    const projectInstance = await HubProject.fetch(id, context);

    await projectInstance.update({ status });
    await projectInstance.save();
  }));
};

const projectIds = ['2e8f535385184711b26b89e53cbc719f'];
// functionalUpdateProjectStatuses(projectIds, HubEntityStatus.inProgress);
classUpdateProjectStatuses(projectIds, HubEntityStatus.complete);