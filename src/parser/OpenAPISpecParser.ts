import { OpenAPISpec } from "./OpenAPISpec";
export class OpenAPISpecParser {
    private spec: OpenAPISpec;
  
    constructor(specJson: string) {
      this.spec = JSON.parse(specJson);
      this.validate();
    }
  
    private validate() {
      if (!this.spec.openapi || !this.spec.info || !this.spec.paths) {
        throw new Error('Invalid OpenAPI specification');
      }
    }
  
    getInfo() {
      return this.spec.info;
    }
  
    getServers() {
      return this.spec.servers || [];
    }
  
    getPaths() {
      return this.spec.paths;
    }
  
    getComponents() {
      return this.spec.components || {};
    }
  
    // TODO
    // resolveReference(ref: string): unknown {
    //   const parts = ref.split('/');
    //   let current: any = this.spec;
    //   for (let i = 1; i < parts.length; i++) {
    //     if (current[parts[i]] === undefined) {
    //       throw new Error(`Invalid reference: ${ref}`);
    //     }
    //     current = current[parts[i]];
    //   }
    //   return current;
    // }
  
    // private resolveReferences(obj: any): any {
    //   if (typeof obj !== 'object' || obj === null) {
    //     return obj;
    //   }
  
    //   if (obj.$ref) {
    //     return this.resolveReference(obj.$ref);
    //   }
  
    //   if (Array.isArray(obj)) {
    //     return obj.map(item => this.resolveReferences(item));
    //   }
  
    //   const resolved: any = {};
    //   for (const [key, value] of Object.entries(obj)) {
    //     resolved[key] = this.resolveReferences(value);
    //   }
    //   return resolved;
    // }
  
    // getResolvedPaths() {
    //   return this.resolveReferences(this.spec.paths);
    // }
  
    // getResolvedComponents() {
    //   return this.resolveReferences(this.spec.components || {});
    // }
  }