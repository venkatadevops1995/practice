
export interface RuntimeEnv {
  working_dir: string;
  excludes: string[];
}

export interface CreatePoPayload {
  entrypoint: string;
  runtime_env: RuntimeEnv;
}
