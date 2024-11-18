export interface Project {
    id:number;
    tenant_id:number;
    project_name: string;
    start_time:Date;
    end_time:Date;
    completed_time:Date;
    requirement:string;
    state:string;
    background:string
}