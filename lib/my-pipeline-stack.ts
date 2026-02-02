import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { CodePipeline,CodePipelineSource,ShellStep  } from 'aws-cdk-lib/pipelines';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { MyPipelineAppStage } from './my-pipeline-app-stage';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    // testing pipeline code 2
    const pipeline = new CodePipeline(this, 'MyPipeline', {
      pipelineName: 'MyServicePipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection(
          'owner/my-pipeline', 'main',
          {
            // copy connection arn from setting code pipeline in aws console
            connectionArn:'arn:aws:codeconnections:ap-south-1:1234567890:connection/xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx',
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

    pipeline.addStage(new MyPipelineAppStage(this, 'test',{
      //  add account number and region
      env: { account: '1234567890', region: 'ap-south-1' }
    }));

  }
}
