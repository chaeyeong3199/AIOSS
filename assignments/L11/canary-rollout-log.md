# Canary Rollout Log

```txt
[canary] stage=1% health=healthy
[promote] current=1% next=10% reason="health check passed"
[canary] stage=10% health=healthy
[promote] current=10% next=50% reason="health check passed"
[canary] stage=50% health=unhealthy
[rollback] failed_stage=50% rollback_to=10% reason="health check failed"
```
