Link portalLink = client
  .organizations()
  .generatePortalLink(organizationId, Arrays.asList(Feature.sso, Feature.dir_sync));