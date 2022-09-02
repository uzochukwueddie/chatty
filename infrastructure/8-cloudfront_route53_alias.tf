resource "aws_route53_record" "cloudfront_dns_record" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = var.dev_client_app_domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.chatapp_cloudfront_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.chatapp_cloudfront_distribution.hosted_zone_id
    evaluate_target_health = false
  }

  depends_on = [
    aws_cloudfront_distribution.chatapp_cloudfront_distribution
  ]
}
