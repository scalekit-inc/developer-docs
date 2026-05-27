import com.scalekit.ScalekitClient;
import com.scalekit.api.UserClient;
import com.scalekit.grpc.scalekit.v1.users.*;
ScalekitClient scalekitClient = new ScalekitClient(
    System.getenv("SCALEKIT_ENV_URL"),
    System.getenv("SCALEKIT_CLIENT_ID"),
    System.getenv("SCALEKIT_CLIENT_SECRET")
);
UserClient users = scalekitClient.users();
CreateMembershipRequest membershipReq = CreateMemb
  ershipRequest.newBuilder()
        .setMembership(
          CreateMembership.newBuilder()
                .addRoles(Role.newBuilder(
                  ).setName("admin").build())
                .putMetadata("department", "engineering")
                .putMetadata("location", "nyc-office")
                .build())
        .build();
CreateMembershipResponse res = users.
  createMembership("org_123", "usr_123", 
    membershipReq);