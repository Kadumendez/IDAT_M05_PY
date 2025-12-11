# Repositorio para el Backend
resource "aws_ecr_repository" "backend_repo" {
  name                 = "${var.project_name}-backend"
  image_tag_mutability = "MUTABLE"
  force_delete         = true # Permite borrar el repo aunque tenga imágenes (útil para pruebas)

  image_scanning_configuration {
    scan_on_push = false
  }
}

# Repositorio para el Frontend
resource "aws_ecr_repository" "frontend_repo" {
  name                 = "${var.project_name}-frontend"
  image_tag_mutability = "MUTABLE"
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = false
  }
}
