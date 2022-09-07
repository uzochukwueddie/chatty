# Cloudfront, S3, Route53 and Certificates will be created in the us-east-1 region
variable "global_region" {
  type        = string
  description = "AWS Global Region"
  default     = "us-east-1"
}

variable "prefix" {
  type        = string
  description = "Prefix to be added to the AWS resources tags"
  default     = "" # Add a unique name
}

variable "project" {
  type        = string
  description = "Prefix to be added to the AWS local tags"
  default     = "" # You can use the name unique identifier created above
}

variable "main_client_app_domain" {
  type        = string
  description = "Main client app domain"
  default     = "" # Your frontend domain you created a route53 zone for
}

variable "dev_client_app_domain" {
  type        = string
  description = "Dev client app domain"
  default     = "dev.<your-frontend-domain>"
}

variable "custom_error_response" {
  type = list(object({
    error_caching_min_ttl = number
    error_code            = number
    response_code         = number
    response_page_path    = string
  }))
  description = "List of one or more custom error response element maps"
  default = [
    {
      error_caching_min_ttl = 10
      error_code            = 400
      response_code         = 200
      response_page_path    = "/index.html"
    },
    {
      error_caching_min_ttl = 10
      error_code            = 403
      response_code         = 200
      response_page_path    = "/index.html"
    },
    {
      error_caching_min_ttl = 10
      error_code            = 404
      response_code         = 200
      response_page_path    = "/index.html"
    },
    {
      error_caching_min_ttl = 10
      error_code            = 405
      response_code         = 200
      response_page_path    = "/index.html"
    },
  ]
}

