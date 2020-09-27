let host = "api/cpms";
let host2 = "api";

if (process.env.NODE_ENV !== 'production') {
  // host = 'http://10.20.0.13:8080';
  // host2 = 'http://10.20.0.4:8080';
}
const marketingApi = {
  commonSetting: host + "/common/selection/all",
  marketingManagementTeams: host + "/cpms/v1/marketing-management/teams",
  marketingManagementTeamHistory: host + "/cpms/v1/marketing-management/teams/{marketTeamId}/history",
  marketingManagementMembers: host + "/cpms/v1/marketing-management/members",
  marketingManagementMemberHistory: host + "/cpms/v1/marketing-management/members/{userId}/history",
  marketingManagementMemberTakeOverHistory: host + "/cpms/v1/marketing-management/members/{userId}/take-over-history",
  marketingManagementMembertakeOverCustomer: host + "/cpms/v1/marketing-management/members/take-over-customer",
  marketingManagementMemberAvailable: host + "/cpms/v1/marketing-management/members/available",
  getMemberByTeamLeader: host + "/cpms/v1/marketing-management/members/base-info/by-team-leader-user-id",
  OrganizationChannels: host + "/cpms/v1/marketing-management/organization-channels",
  PersonalChannels: host + "/cpms/v1/marketing-management/personal-channels",
  ExclusiveChannels: host + "/cpms/v1/marketing-management/exclusive-channels",
  ProductTopBusinessType: host + "/product/topBusinessType/list",
  UserAuthorizationSystem: host2 + "/ucss/v1/UserAuthorizationSystem/Users",
  UIUserInfo: host2 + "/ucss/v1/UserAuthorizationSystem/Users/$userId/UIUserInfo",
  Organizations: host2 + "/ucss/v1/UserAuthorizationSystem/Organizations"
};

export {
    marketingApi
};
