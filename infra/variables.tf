variable "aws_region" {
  description = "La región de AWS donde desplegaremos"
  default     = "us-east-1" # Usamos N. Virginia que es la estándar
}

variable "project_name" {
  description = "Nombre del proyecto para etiquetar recursos"
  default     = "chat-beca18"
}
