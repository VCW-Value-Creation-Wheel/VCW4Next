ARG KC_VERSION=20.0.2

FROM quay.io/keycloak/keycloak:${KC_VERSION} as builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
# Configure a database vendor
ENV KC_DB=postgres

WORKDIR /opt/keycloak

COPY themes/. themes/
# COPY ./realms/ /tmp/import
# COPY ./providers/ /opt/keycloak/providers/

RUN /opt/keycloak/bin/kc.sh build

#####################
#
#####################
FROM quay.io/keycloak/keycloak:${KC_VERSION} 

COPY --from=builder /opt/keycloak/ /opt/keycloak/

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
# Configure a database vendor
ENV KC_DB=postgres

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]