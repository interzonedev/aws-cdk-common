import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CommonConstructProps } from '../construct';
import { getConstructName } from '../config';

export interface CommonStackProps extends StackProps, CommonConstructProps {
    codeVersionHash?: string;
    codeVersionRef?: string;
    exportSuffix: string;
}

export abstract class CommonStack extends Stack {
    protected constructor(scope: Construct, id: string, props: CommonStackProps) {
        super(scope, id, props);

        const {appName, stackIdFragment, codeVersionHash, codeVersionRef, exportSuffix} = props;

        if (codeVersionHash) {
            const codeVersionHashOutputId = `code-version-hash-${exportSuffix}`;
            const codeVersionHashOutputName = getConstructName(appName, stackIdFragment, codeVersionHashOutputId);
            new CfnOutput(this, codeVersionHashOutputId, {
                exportName: codeVersionHashOutputName,
                value: codeVersionHash
            });
        }

        if (codeVersionRef) {
            const codeVersionRefOutputId = `code-version-ref-${exportSuffix}`;
            const codeVersionRefOutputName = getConstructName(appName, stackIdFragment, codeVersionRefOutputId);
            new CfnOutput(this, codeVersionRefOutputId, {
                exportName: codeVersionRefOutputName,
                value: codeVersionRef
            });
        }
    }
}
