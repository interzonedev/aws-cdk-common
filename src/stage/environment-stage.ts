import { Construct } from 'constructs';
import { Environment } from 'aws-cdk-lib/core/lib/environment';
import { CommonStage, CommonStageProps } from './common-stage';

export interface AWSAccount {
    name: string;
    number: string;
}

export interface EnvironmentStageProps extends Omit<CommonStageProps, 'env'> {
    awsAccount: AWSAccount;
    region: string;
    appName: string;
}

export abstract class EnvironmentStage extends CommonStage {
    protected constructor(scope: Construct, id: string, props: EnvironmentStageProps) {
        super(scope, id, props);

        const {stackIdFragment, codeVersionHash, codeVersionRef, awsAccount, region, appName} = props;

        const env: Environment = {
            account: awsAccount.number,
            region: region
        };
        console.log('env = %O', env);

        const commonStageProps: CommonStageProps = {
            stackIdFragment: stackIdFragment,
            codeVersionHash: codeVersionHash,
            codeVersionRef: codeVersionRef,
            env: env,
            appName: appName
        };

        this.createSubStages(commonStageProps);
    }

    protected abstract createSubStages(commonStageProps: CommonStageProps): void;
}
