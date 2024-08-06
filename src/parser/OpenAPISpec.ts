// OpenAPISpecParser.ts

export interface OpenAPISpec {
  openapi: string;
  info: InfoObject;
  servers?: ServerObject[];
  paths: PathsObject;
  components?: ComponentsObject;
}

export interface InfoObject {
  title: string;
  version: string;
  description?: string;
}

export interface ServerObject {
  url: string;
  description?: string;
}

export interface PathsObject {
  [path: string]: PathItemObject;
}

interface PathItemObject {
  $ref?: string;
  summary?: string;
  description?: string;
  get?: OperationObject;
  put?: OperationObject;
  post?: OperationObject;
  delete?: OperationObject;
  options?: OperationObject;
  head?: OperationObject;
  patch?: OperationObject;
  trace?: OperationObject;
}

interface OperationObject {
  summary?: string;
  description?: string;
  operationId?: string;
  parameters?: (ParameterObject | ReferenceObject)[];
  requestBody?: RequestBodyObject | ReferenceObject;
  responses: ResponsesObject;
}

interface ParameterObject {
  name: string;
  in: 'query' | 'header' | 'path' | 'cookie';
  description?: string;
  required?: boolean;
  schema?: SchemaObject | ReferenceObject;
}

interface RequestBodyObject {
  description?: string;
  content: { [mediaType: string]: MediaTypeObject };
  required?: boolean;
}

interface ResponsesObject {
  [statusCode: string]: ResponseObject | ReferenceObject;
}

interface ResponseObject {
  description: string;
  content?: { [mediaType: string]: MediaTypeObject };
  headers?: { [headerName: string]: HeaderObject | ReferenceObject };
}

interface MediaTypeObject {
  schema?: SchemaObject | ReferenceObject;
  example?: unknown;
}

interface HeaderObject {
  description?: string;
  required?: boolean;
  schema?: SchemaObject | ReferenceObject;
}

interface SchemaObject {
  type?: string;
  properties?: { [propertyName: string]: SchemaObject | ReferenceObject };
  items?: SchemaObject | ReferenceObject;
  required?: string[];
  [key: string]: unknown; // For additional properties
}

export interface ComponentsObject {
  schemas?: { [key: string]: SchemaObject | ReferenceObject };
  responses?: { [key: string]: ResponseObject | ReferenceObject };
  parameters?: { [key: string]: ParameterObject | ReferenceObject };
  requestBodies?: { [key: string]: RequestBodyObject | ReferenceObject };
  headers?: { [key: string]: HeaderObject | ReferenceObject };
  securitySchemes?: { [key: string]: SecuritySchemeObject | ReferenceObject };
}

interface SecuritySchemeObject {
  type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';
  description?: string;
  name?: string;
  in?: 'query' | 'header' | 'cookie';
  scheme?: string;
  bearerFormat?: string;
  flows?: OAuthFlowsObject;
  openIdConnectUrl?: string;
}

interface OAuthFlowsObject {
  implicit?: OAuthFlowObject;
  password?: OAuthFlowObject;
  clientCredentials?: OAuthFlowObject;
  authorizationCode?: OAuthFlowObject;
}

interface OAuthFlowObject {
  authorizationUrl?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  scopes: { [scope: string]: string };
}

interface ReferenceObject {
  $ref: string;
}
