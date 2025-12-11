# --- 1. EL CARNET DE IDENTIDAD (Role para EC2) ---
resource "aws_iam_role" "ec2_role" {
  name = "chat_ec2_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ec2_ecr_access" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "chat_ec2_profile"
  role = aws_iam_role.ec2_role.name
}

# --- 2. EL FIREWALL (Security Group) ---
resource "aws_security_group" "web_sg" {
  name        = "chat_web_sg"
  description = "Permitir trafico web y API"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# --- 3. LA MÁQUINA VIRTUAL (EC2) ---
resource "aws_instance" "app_server" {
  ami           = "ami-04b70fa74e45c3917" # Ubuntu 24.04 en us-east-1 (N. Virginia)
  instance_type = "t3.micro"              # Capa gratuita (la que sí funciona en tu cuenta)

  iam_instance_profile   = aws_iam_instance_profile.ec2_profile.name
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  # --- SCRIPT DE INICIO CORREGIDO (User Data) ---
  user_data = <<-EOF
              #!/bin/bash
              # 1. Instalar dependencias esenciales y Docker
              apt-get update
              apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
              
              # Instalar Docker (Método recomendado)
              install -m 0755 -d /etc/apt/keyrings
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
              echo \
                "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
                $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
              apt-get update
              apt-get install -y docker-ce docker-ce-cli containerd.io

              # 2. Instalar AWS CLI v2 (Método más confiable para ECR)
              curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
              unzip awscliv2.zip
              ./aws/install

              # 3. Loguearse en AWS ECR
              /usr/local/bin/aws ecr get-login-password --region ${var.aws_region} | docker login --username AWS --password-stdin ${aws_ecr_repository.backend_repo.repository_url}

              # 4. Descargar y Correr Backend (Puerto 3000)
              docker run -d --restart always -p 3000:3000 \
                -e GROQ_API_KEY="${var.groq_api_key}" \
                ${aws_ecr_repository.backend_repo.repository_url}:latest

              # 5. Descargar y Correr Frontend (Puerto 80)
              docker run -d --restart always -p 80:80 \
                ${aws_ecr_repository.frontend_repo.repository_url}:latest
              EOF

  tags = {
    Name = "${var.project_name}-server"
  }
}

# --- 4. IP ESTATICA (Para que no cambie al reiniciar) ---
resource "aws_eip" "static_ip" {
  instance = aws_instance.app_server.id
  domain   = "vpc"
}

output "public_ip" {
  value = aws_eip.static_ip.public_ip
}
