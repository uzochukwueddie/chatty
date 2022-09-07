terraform {
  backend "s3" {
    bucket  = "" # Your unique AWS S3 bucket
    key     = "develop/chatapp.tfstate"
    region  = "" # Your AWS region
    encrypt = true
  }
}

locals {
  prefix = "${var.prefix}-${terraform.workspace}"

  common_tags = {
    Environment = terraform.workspace
    Project     = var.project
    ManagedBy   = "Terraform"
    Owner       = "" # Your fullname
  }
}
