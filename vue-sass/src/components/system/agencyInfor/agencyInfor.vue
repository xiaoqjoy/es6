<template>
  <div>
    <sys-tem></sys-tem>
    <div class="agencyInfor positionContent">
      <h3>机构信息</h3>
      <div class="agencyInfors contentBorder">
        <div class="tabss">
          <ul>
            <li v-for="(it,index) in arrs" v-bind:class="{actives:'/agencyInfor/'+it.typeCode == $route.path}" @click="$router.push(it.typeCode)">
              {{it.typeName}}
            </li>
          </ul>
        </div>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'agencyInfor',
    data() {
      return {
        currentPage1: 1,
        pagesize1: 15,
        orgCode: '',
        orgName: '',
        //多选框
        checkAll_1: false,
        checkAll_2: false,
        checkAll_3: false,
        checkedCities_1: ['功能1', '功能2'],
        checkedCities_2: ['全部患者', '糖尿病患者'],
        checkedCities_3: ['功能1', '功能2'],
        cities_1: ['功能1', '功能2', '功能3'],
        cities_2: ['全部患者', '糖尿病患者', '高血压患者'],
        cities_3: ['功能1', '功能2', '功能3'],
        isIndeterminate_1: true,
        isIndeterminate_2: true,
        isIndeterminate_3: true,
        radio2: 1,
        radio: 0,
        radio3: 1,
        activess: 0,
        arrs: [{
            typeCode: "agenInfor",
            typeName: "机构信息"
          },
          {
            typeCode: "manageDepart",
            typeName: "科室管理"
          },
          {
            typeCode: "roleManage",
            typeName: "角色管理"
          },
          {
            typeCode: "staffManage",
            typeName: "员工管理"
          }
        ],
        tableDatake: [],
        currentPage4: 1,
        pagesize: 5,
        tableDataUser: [],
        organizationIdNew: '',
        roleIdNew: '',
      }
    },
    methods: {
      //myTabss(index, it) {
      //  this.$router.push(it.typeCode);
      //},
    },
  }
</script>
