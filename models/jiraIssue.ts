export interface JiraIssue {
    expand: string;
    fields: JiraFieldContainer;
    id: string;
    key: string;
    self: string;
}

type FieldNameObject = {[fieldName: string]: any};

export interface JiraFieldContainer extends FieldNameObject {
    summary: string;
}