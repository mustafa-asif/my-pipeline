import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { CodePipeline,CodePipelineSource,ShellStep  } from 'aws-cdk-lib/pipelines';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    // testing pipeline code
    const pipeline = new CodePipeline(this, 'MyPipeline', {
      pipelineName: 'MyServicePipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection(
          'mustafa-asif/my-pipeline', 'main',
          {
            connectionArn:'arn:aws:codeconnections:ap-south-1:763701915116:connection/eefbdaf7-3fd7-421c-bc6e-37602deba6fd',
            triggerOnPush:true
          }
        ),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ]
      })
    });
  }
}
