import { CfnOutput, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  aws_apigateway,
  aws_lambda_nodejs,
  aws_dynamodb,
  aws_logs,
  aws_lambda,
} from "aws-cdk-lib";

export class AuctionHouseStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const auctionHouseTable = new aws_dynamodb.Table(this, "AuctionHouse", {
      tableName: "AuctionHouse",
      partitionKey: {
        name: "id",
        type: aws_dynamodb.AttributeType.STRING,
      },
      billingMode: aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY
    });

    const envVariables = {
      AWS_ACCOUNT_ID: Stack.of(this).account,
      AUCTION_HOUSE_TABLE: auctionHouseTable.tableName,
    };

    const functionSettings = {
      handler: "handler",
      runtime: aws_lambda.Runtime.NODEJS_16_X,
      memorySize: 128,
      environment: {
        ...envVariables
      },
      logRetention: aws_logs.RetentionDays.ONE_WEEK,
      bundling: {
        minify: true
      }
    }

    const auctionHouseFunction = new aws_lambda_nodejs.NodejsFunction(
      this,
      "AuctionHouseFunction",
      {
        awsSdkConnectionReuse: true,
        entry: "./src/index.ts",
        ...functionSettings
      }
    );
    auctionHouseTable.grantReadData(auctionHouseFunction);
    auctionHouseTable.grantWriteData(auctionHouseFunction);

    const auctionHouseApi = new aws_apigateway.RestApi(this, "AuctionHouseApi", {
      restApiName: `${this.stackName}-api`,
      description: `${this.stackName}-api`,
      deployOptions: {
        tracingEnabled: false,
        dataTraceEnabled: false,
        loggingLevel: aws_apigateway.MethodLoggingLevel.ERROR,
        metricsEnabled: false
      }
    });

    const products = auctionHouseApi.root.addResource("auction-house");
    products.addMethod("ANY", new aws_apigateway.LambdaIntegration(auctionHouseFunction));

    new CfnOutput(this, "ApiURL", {
      value: `${auctionHouseApi.url}`,
    });
  }
}