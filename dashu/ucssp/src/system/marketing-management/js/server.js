/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 15:05:45
 * @LastEditTime: 2019-08-15 16:37:53
 * @LastEditors: Please set LastEditors
 */
import { fileCos } from "@/common/js/fileCos";
let host = "api/cpms";
let host2 = "api";

if (process.env.NODE_ENV !== 'production') {
  // host = 'http://ds-ts-0531:8080';
  // host2 = 'http://ds-ts-0531:8080';
  // host = 'http://dsapp18.intuat.dsfdc.com/h5/api/cpms';
  // host2 = 'http://dsapp18.intuat.dsfdc.com/h5/api';
  host = fileCos.getHost()[1];
  host2 = fileCos.getHost()[0];
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
  Organizations: host2 + "/ucss/v1/UserAuthorizationSystem/Organizations",
  memberExchangeSave: host + "/mm/member-exchange", // 保存营销人员修改记录
  memberExchangeEditList: host + "/mm/member-exchange/application", // 查询营销人员修改列表
  assistantSelect: host + "/mm/member-exchange/assistant", // 查询业务助理
  custManagerSelect: host + "/mm/member-exchange/cust-manager", // 查询客户经理
  initialCustManagerSelect: host + "/mm/member-exchange/initial-cust-manager", // 查询初始客户经理
  marketingManagementGetQrCodeList: host + "/cpms/v1/marketing-management/getQrCodeList",
  marketingManagementNewQrCode: host + "/cpms/v1/marketing-management/newQrCode",
  marketingManagementSwitch: host + "/cpms/v1/marketing-management/qrcode/switch",
  allMembers: host + "/cpms/v1/marketing-management/allMembers",
  teamOfManager: host + "/cpms/v1/marketing-management/teams/team-of-manager",
  exclusivQrcodeList: host + "/cpms/v1/marketing-management/exclusive-channels/exclusive-qrcode-list",
  exclusiveQrcodeSave: host + "/cpms/v1/marketing-management/exclusive-channels/exclusive-qrcode-save",
  handleOverLog: host + "/cpms/v1/marketing-management/qrcode/overlog"
};

export {
    marketingApi
};
