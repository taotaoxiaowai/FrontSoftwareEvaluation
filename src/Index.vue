<template>
  <div id="app">
    <header class="header">
      <div class="logo">软件造价评估系统</div>
      <div class="user-info">
        <el-button link type="primary" @click="1">帮助</el-button>
        <el-button link type="primary" @click="1">通知</el-button>
        <el-popover
            placement="bottom"
            width="200"
            trigger="click"
            v-model:visible="popoverVisible">
          <template #reference>
            <el-avatar class="user-avatar" size="large" :src="userAvatar"/>
          </template>
          <div class="popBox">
            <h4 style="padding: 5px 0">姓名: {{ "xxx" }}</h4>
            <h4 style="border-bottom: 1px solid #e0e0e0; padding: 5px 0 10px 0">账号: {{ "xxx" }}</h4>
            <p style="padding: 10px 0 5px 0" @click="1">个人信息</p>
            <p style="color: #e10505" @click="1">退出登录</p>
          </div>
        </el-popover>
      </div>
    </header>
    <div class="main-content">
      <aside class="sidebar">
        <el-menu
            :default-active="activeTab"
            class="el-menu-vertical-demo"
            background-color="#2d3a4b"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
          <el-menu-item index="course" @click="openTab('course')">
            <el-icon><Setting /></el-icon> 界面一
          </el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <User></User>
              </el-icon>
              <span>报告生成子系统</span>
            </template >
            <el-menu-item-group>
              <el-menu-item index="reportGeneration" @click="openTab('reportGeneration')">报告生成</el-menu-item>
              <el-menu-item index="reportGenerationChild" @click="openTab('projectDashBoardList')">看板列表</el-menu-item>
              <el-menu-item index="reportReview" @click="openTab('reportReview')">项目审核</el-menu-item>
              <el-menu-item index="reportReviewEvaluation" @click="openTab('reportReviewEvaluation')">评估项目审核</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </aside>
      <main class="content">
        <div class="tabs">
          <el-tabs v-model="activeTab" type="card" @tab-click="handleTabClick" @tab-remove="removeTab" closable>
            <el-tab-pane
                v-for="tab in tabs"
                :key="tab.name"
                :label="tab.label"
                :name="tab.name"
            >
              <router-view :key="tab.name"></router-view>
            </el-tab-pane>
          </el-tabs>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

interface Tab {
  name: string;
  label: string;
  path: string;
}

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const userAvatar = require('@/assets/image.png');
    const activeTab = ref();
    const tabs = ref<Tab[]>([]);
    const popoverVisible = ref(false);
    const getTabLabel = (tabName: string) => {
      switch (tabName) {
        case 'course':
          return '界面一';
        case 'reportGeneration':
          return '报告生成';
        case 'projectDashBoardList':
          return '看板列表';
        case 'reportReview':
          return '报告审核';
        case 'reportReviewEvaluation':
          return '评估报告审核'
        default:
          return tabName;
      }
    };

    const handleTabClick = (tab: any) => {
      const selectedTab = tabs.value.find((t) => t.name === tab.props.name);
      if (selectedTab) {
        router.push({ path: selectedTab.path });
      }
    };

    const removeTab = (tabName: string) => {
      const tabIndex = tabs.value.findIndex((t) => t.name === tabName);
      tabs.value.splice(tabIndex, 1);
      localStorage.setItem('tabs', JSON.stringify(tabs.value));
      if (activeTab.value === tabName) {
        activeTab.value = tabs.value.length ? tabs.value[0].name : '';
        localStorage.setItem('activeTab', activeTab.value);
        if (activeTab.value) {
          const nextTab = tabs.value.find((t) => t.name === activeTab.value);
          if (nextTab) {
            router.push({ path: nextTab.path });
          }
        } else {
          router.push('/index');
        }
      }
    };

    const openTab = (tabName: string) => {
      const tab = tabs.value.find((t) => t.name === tabName);
      if (!tab) {
        const newTab = {
          name: tabName,
          label: getTabLabel(tabName),
          path: `/${tabName}`
        };
        tabs.value.push(newTab);
        localStorage.setItem('tabs', JSON.stringify(tabs.value));
      }
      activeTab.value = tabName;
      localStorage.setItem('activeTab', tabName);
      router.push({ path: `/${tabName}` });
    };

    return {
      activeTab,
      tabs,
      popoverVisible,
      handleTabClick,
      removeTab,
      openTab,
      userAvatar,
    };
  }
});
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #001529;
  color: #fff;
  height: 50px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.nav .el-button {
  color: #fff;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info .el-button {
  color: #fff;
  margin-right: 15px; /* 增加右边距来增加按钮和头像之间的距离 */
}

.user-avatar {
  margin-left: 15px; /* 增加左边距来进一步拉开距离 */
  width: 40px; /* 设置头像的宽度 */
  height: 40px; /* 设置头像的高度 */
}

.popBox {
  padding: 10px;
}

.main-content {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 200px;
  background-color: #2d3a4b;
}

.content {
  flex: 1;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  overflow-y: auto;
}

.tabs {
  width: 100%;
}


.user-info-dialog .info-item {
  margin: 10px 0;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #e0e0e0;
}

.user-info-dialog .info-item span {
  font-weight: bold;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>
