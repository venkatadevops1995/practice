import { type AppEventEnum } from "~/pages/api/api-typings";

export interface RuntimeEnv {
  working_dir: string;
  excludes: string[];
}

export interface CreatePoPayload {
  entrypoint: string;
  runtime_env: RuntimeEnv;
}


export type AckEventType = {
code: string;
event : AppEventEnum;
job_id : string;
message : string
}