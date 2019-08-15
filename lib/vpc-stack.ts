import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');
import autoscaling = require('@aws-cdk/aws-autoscaling');
import {Port, SubnetType} from "@aws-cdk/aws-ec2";

export class VpcStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "VPC", {
        maxAzs: 2
    });
    cdk.Tag.add(vpc, 'Name', 'Dev');
    cdk.Tag.add(vpc, 'Env', 'Dev');

    // Bastion host
    const asg = new autoscaling.AutoScalingGroup(this, 'ASG', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage(),
      keyName: 'dev',
      vpcSubnets: {subnetType: SubnetType.PUBLIC},
      associatePublicIpAddress: true
    });
    asg.connections.allowFromAnyIpv4(Port.tcp(22));
  }
}
