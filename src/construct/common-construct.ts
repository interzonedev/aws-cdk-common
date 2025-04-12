import { Construct } from 'constructs';

export interface CommonConstructProps {
    appName: string;
    stackIdFragment: string;
}

export abstract class CommonConstruct extends Construct {
    protected constructor(scope: Construct, id: string, props: CommonConstructProps) {
        super(scope, id);
    }
}
