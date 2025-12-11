variable "aws_region" {
  description = "La región de AWS donde desplegaremos"
  default     = "us-east-1"
}

variable "project_name" {
  description = "Nombre del proyecto para etiquetar recursos"
  default     = "chat-beca18"
}

variable "groq_api_key" {
  description = "La API Key de Groq para el backend"
  type        = string
  sensitive   = true # Esto oculta el valor en la salida
}
