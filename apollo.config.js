module.exports = {
  client: {
    includes: ["./src/**/*.graphql"],
    excludes: ["./node_modules/**/*.ts", "./src/graphql/*.ts"],
    service: {
      name: "laundry-service",
      url: "http://128.199.110.106:8080/v1/graphql",
      headers: {
        "x-hasura-admin-secret": "myadminsecretkey",
      },
    },
  },
};