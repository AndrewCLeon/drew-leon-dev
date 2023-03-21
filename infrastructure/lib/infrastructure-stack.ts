import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import { PublicHostedZone } from 'aws-cdk-lib/aws-route53'
import { ARecord } from 'aws-cdk-lib/aws-route53'
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager'
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets'

export type WebsiteDistributionProps = cdk.StackProps & {
  websiteDomainName: string
}

export class WebsiteDistribution extends cdk.Stack {
  constructor(scope: Construct, id: string, props: WebsiteDistributionProps) {
    super(scope, id, props)

    const domainName = props.websiteDomainName
    const bucket = new cdk.aws_s3.Bucket(this, 'TheWebsiteBucket', {
      bucketName: `${cdk.Aws.ACCOUNT_ID}-${domainName}`
    })

    const zone = PublicHostedZone.fromLookup(this, 'TheZone', { domainName })

    const sslCertificate = new Certificate(this, 'TheCertificate', {
      domainName,
      subjectAlternativeNames: [
        `www.${domainName}`
      ],
      validation: CertificateValidation.fromDns(zone)
    })

    const distribution = new cdk.aws_cloudfront.Distribution(this, 'TheDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket)
      },
      certificate: sslCertificate,
      domainNames: [
        `www.${domainName}`
      ],
      defaultRootObject: 'index.html'
    })

    new ARecord(this, 'TheARecord', {
      zone,
      recordName: `www.${domainName}`,
      target: cdk.aws_route53.RecordTarget.fromAlias(new CloudFrontTarget(distribution))
    })
  }
}
