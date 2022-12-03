
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    "http://128.199.110.106:8080/v1/graphql": {
      headers: {
        "x-hasura-admin-secret": "myadminsecretkey",
      },
    },
  },
  documents: "src/index.graphql",
  generates: {
    "src/generated/index.ts": {
      plugins: [ "typescript-react-apollo",
      "typescript",
      "typescript-operations",]
    }
  }
};

export default config;
