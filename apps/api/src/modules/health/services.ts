import type { HealthStatus } from "./handlers";

export function getHealthStatus(): HealthStatus {
  return {
    ok: true,
    timestamp: new Date().toISOString(),
  };
}
