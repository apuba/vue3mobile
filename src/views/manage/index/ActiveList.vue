<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-02 02:20:56
 * @LastEditTime: 2021-02-02 02:15:40
 * @LastEditors: 侯兴章
 * @Description: 
-->

<template>
  <div>
    <van-tabs
      v-model:active="activeName"
      color="#007aff"
      @click="queryActiveStatusHandler(activeName)"
    >
      <van-tab
        :badge="item.badge"
        :title="item.title"
        :name="item.key"
        v-for="item in activeTab"
        :key="item.key"
      ></van-tab>
    </van-tabs>
    <div class="pt10">
      <ComScrollPage v-model:value="inBottom" v-model:reload="scrollReload" @loadData="onRefresh">
        <div class="active-list">
          <div class="active-item" v-for="(item, index) in activeList" :key="item.activityId">
            <div class="progres">
              <van-progress :percentage="getComplete(item.useAmount,item.totalAmount)" />
            </div>
            <ul class="active-detail">
              <li>
                <span class="title">标题</span>
                <span>{{ item.sub }}</span>
              </li>
              <li>
                <span class="title">副标题</span>
                <span>{{ item.subtitle }}</span>
              </li>
              <li>
                <span class="title">金额</span>
                <span>{{ item.totalAmount }}元</span>
              </li>
              <li>
                <span class="title">时间</span>
                <span v-if="!item.newFlag">
                  {{ item.startTime.split(" ")[0] }} 至
                  {{ item.endTime.split(" ")[0] }}
                </span>
                <span v-else>长期有效</span>
              </li>
              <li>
                <span class="title">状态</span>
                <span>{{ item.statusLabel }}</span>
              </li>
            </ul>
            <div class="active-btn-list">
              <span
                class="active-btn"
                v-show="item.activityStatus===4 || item.activityStatus===1"
                @click="updateStatusHandler(item, 2)"
                title="启动"
              >
                <span class="iconfont icon-ai23"></span>
              </span>

              <span
                class="active-btn"
                title="暂停"
                v-show="item.activityStatus ===2"
                @click="updateStatusHandler(item, 4)"
              >
                <span class="iconfont icon-zanting"></span>
              </span>

              <span
                class="active-btn"
                title="停止"
                v-show="item.activityStatus ===2 || item.activityStatus ===4"
                @click="updateStatusHandler(item, 3)"
              >
                <span class="iconfont icon-tingzhi"></span>
              </span>

              <router-link
                title="详情"
                class="active-btn"
                :to="'/activityDetail?type=detail&id=' + item.activityId"
                @click="commitCurrentActivityHandler(item)"
              >
                <span class="iconfont icon-xiangqing"></span>
              </router-link>

              <router-link
                title="数据"
                class="active-btn"
                :to="'/activityDetail?type=data&id=' + item.activityId"
                @click="commitCurrentActivityHandler(item)"
              >
                <span class="iconfont icon-shuju"></span>
              </router-link>

              <router-link
                title="分享"
                class="active-btn active"
                :to="'/customer/hongbao?id=' + item.activityId"
                @click="commitCurrentActivityHandler(item)"
                v-show="item.activityStatus === 2"
              >
                <span class="iconfont icon-fenxiang"></span>
              </router-link>
            </div>
          </div>
        </div>
      </ComScrollPage>
    </div>
  </div>
</template>

<script lang="ts" src="./activieList">
</script>

<style scoped lang="scss">
.progres {
  padding: 8px 0;
}
.active-btn {
  border: 1px solid #0dbadd;
  border-radius: 32px;
  width: 32px;
  height: 32px;
  line-height: 32px;
  color: #0dbadd;
  text-align: center;
  display: inline-block;
  margin-right: 8px;
  &.active {
    background-color: #0dbadd;
    color: #fff;

    &:active {
      background-color: darken($color: #0dbadd, $amount: 3);
    }
  }
  &:active {
    background-color: #dff8fd;
  }
}
.active-item {
  border-radius: 8px;
  border: solid 1px #eeeeee;
  margin: 0 16px;
  padding: 16px;
  margin-bottom: 16px;
}
.active-detail {
  font-size: 14px;
  font-weight: bold;
  li {
    line-height: 28px;
  }
  .title {
    color: #666;
    display: inline-block;
    margin-right: 8px;
    font-weight: normal;
  }
}
</style>