settings = [
        {
            "name": "sso",
            "enabled": True
        },
        {
            "name": "dir_sync",
            "enabled": True
        }
    ]

scalekit_client.organization.update_organization_settings(
  organization_id='<organization_id>', settings=settings
)