# serverlessconf2017

Serverlessconf Tokyo 2017

# 掲示板アプリの開発

## やること

* サーバーレスで組む
* 認証はCognito使う
* ログインしないと使えないUIにする
* 投稿一覧(ログインフォームあり)、投稿詳細
* GUIリソースはS3で管理する

## 余裕あったらやること

* S3へのアクセスをCloudwatchログに保管してES連携して全文検索

## 諦めること

* 独自ドメインは使わない(S3、API Gateway(Cloudfront)のドメインのまま)
  * カスタムドメインの配布(1h以上)待ってられない
* 投稿一覧でページングはしない
* 細かなエラー制御はしない
  * HTTPステータスコードのハンドリング

# 構成

## Authentication

* Cognito

## Frontend

* S3

## Backend

* API Gateway
* Lambda
* DynamoDB

# がしかし、、、

## できたこと

* localでしか画面が動かない
* API Gateway/Lambda/DynamoDBの通信までできた

# はまったこと

* Lambda ProxyでのCORSの有効化
