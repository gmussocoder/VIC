#The following code lets put on swagger editor to make the VIC Solution API Swagger:
openapi: 3.0.3
info:
  title: VIC Solution Swagger 3.0
  description: |-
    This is a swagger that enables the documentation & contracts and lets each API. [https://swagger.io](https://swagger.io)
    You can now help us improve the API whether it's by making changes to the definition itself or to the code.
    
    _By Guillermo Musso_
  termsOfService: http://swagger.io/terms/
  contact:
    email: gamussorodriguez@teco.com.ar
  license:
    name: GM 1.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html
  version: 1.0.0
externalDocs:
  description: Find out more about Swagger
  url: http://swagger.io
servers:
  - url: https://gmussoserver.ddns.net/vicApi/v1
tags:
  - name: Train Model Service
    description: Train selected Models with their hyperparameters
    externalDocs:
      description: Find out more
      url: http://swagger.io
  - name: Train
    description: Access to Train Models orders
    externalDocs:
      description: Find out more about our Train
      url: http://swagger.io
  - name: user
    description: Operations about user
paths:
  /tmService:
    post:
      tags:
        - TrainModelService
      summary: Train a Model
      description: Train a new or existing model
      operationId: trainModelService
      requestBody:
        description: Train a new or existing model
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/postRequestTrainServiceBody'
        required: true
      responses:
        '201':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/postResponseTrainServiceBody'          
        '400':
          description: "Bad Request: Missing parameters"
        '415':
          description: 'Unsupported Media Type: JSON expected'
        '500':
          description: 'Internal Server Error'
components:
  schemas:
    modelId:
      type: string
      format: "modelDownloadUrl"
    hyperparameters: 
      type: object
      example: {"one":1,"two":2,"three":3}
    dataset:
      type: string
      format: "datasetDownloadUrl"
    postRequestTrainServiceBody:
      type: object
      required:
        - modelId
        - datset
        - hyperparameters
      properties:
        modelId:
          $ref: '#/components/schemas/modelId'
        hyperparameters:
          $ref: '#/components/schemas/hyperparameters'
        dataset:
          $ref: '#/components/schemas/dataset'
    postResponseTrainServiceBody:
      type: object
      properties:
        job:
          type: object
          properties:
            model: 
              type: string
              example: "The model is Started training"
            status:
              type: string
              example: "Training"
            code:
              type: integer
              example: 0
            id:
              type: string
              example: "BRch98OrX3"