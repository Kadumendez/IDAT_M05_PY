output "backend_repo_url" {
  description = "URL del repositorio ECR para el backend"
  value       = aws_ecr_repository.backend_repo.repository_url
}

output "frontend_repo_url" {
  description = "URL del repositorio ECR para el frontend"
  value       = aws_ecr_repository.frontend_repo.repository_url
}
