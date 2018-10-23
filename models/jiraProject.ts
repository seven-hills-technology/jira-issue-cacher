export interface JiraProject {
    avatarUrls: {[resolution: string]: string};
    expand: string;
    id: string;
    key: string;
    name: string;
    projectTypeKey: string;
    self: string;
    simplified: boolean;
    style: string;
}