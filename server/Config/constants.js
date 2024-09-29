export const collections = {
  SCRIPT_MODAL: "scripts",
  ENVIRONMENT_MODEL: "environments",
};
export const scriptTypes = {
  ENV: "environment",
  TEST: "test-execution",
  RUN: "exploit-execution",
  UPDATE: "update",
  SCAN: "scanning-execution",
};
export const replacement = [
  { replace: "<ip>", value: "ip" },
  { replace: "<ip address>", value: "ip" },
  { replace: "<port>", value: "port" },
  { replace: "<url>", value: "url" },
];
