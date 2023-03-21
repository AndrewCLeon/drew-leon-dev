import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import { PublicHostedZone } from 'aws-cdk-lib/aws-route53'
import { CnameRecord } from 'aws-cdk-lib/aws-route53'
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager'

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
      validation: CertificateValidation.fromDns(zone)
    })

    const distribution = new cdk.aws_cloudfront.Distribution(this, 'TheDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket)
      },
      certificate: sslCertificate,
      domainNames: [zone.zoneName],
      defaultRootObject: 'index.html'
    })

    new CnameRecord(this, 'TheCnameRecord', {
      zone,
      domainName: distribution.domainName,
      recordName: `www.${domainName}`,
    })
  }
}
