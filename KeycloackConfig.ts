import Keycloack from "keycloak-js";

const keycloakConfig = {
  url: "http://localhost:8180",
  realm: "React-auth",
  clientId: "react-auth",
};

export const keycloak = new Keycloack(keycloakConfig);