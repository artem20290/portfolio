import type { Project } from '../data/projects';

export function getProjectDemoPath(project: Pick<Project, 'id' | 'demo'>) {
  return project.demo ?? `projects/${project.id}/index.html`;
}
