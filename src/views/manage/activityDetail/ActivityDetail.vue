<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-05 00:21:31
 * @LastEditTime: 2021-02-02 01:59:57
 * @LastEditors: 侯兴章
 * @Description: 
-->
<template>
  <div class="form">
    <van-nav-bar title="活动详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model:active="active" @click="changeType">
      <van-tab title="详情"></van-tab>
      <van-tab title="数据"></van-tab>
    </van-tabs>
    <div v-show="active===1">
      <div class="active-group">
        <h2>
          <span class="iconfont icon-shuju"></span>活动效果
        </h2>
        <van-grid :column-num="2">
          <van-grid-item>
            <div class="column">
              <div class="total">{{ activityTotalData.clickNumber || 0}}</div>
              <div class="title">点击次数(次)</div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="column">
              <div class="total">{{ activityTotalData.shareNumber || 0}}</div>
              <div class="title">分享次数(次)</div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="column">
              <div class="total">{{ activityTotalData.memberNumber || 0}}</div>
              <div class="title">新增客户(位)</div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="column">
              <div class="total">{{ activityTotalData.useAmount || 0}}</div>
              <div class="title">单个获客成本(元)</div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>

      <div class="active-group">
        <h2>
          <span class="iconfont icon-shuju"></span>发放数据
        </h2>

        <van-grid :column-num="1">
          <van-grid-item>
            <div class="column">
              <div class="total maincolor">{{ activityTotalData.surplusAmount || 0}}</div>
              <div class="title">活动剩余金额(元)</div>
            </div>
          </van-grid-item>
        </van-grid>

        <van-grid :column-num="2">
          <van-grid-item>
            <div class="column">
              <div class="total">{{ activityTotalData.countMember || 0}}</div>
              <div class="title">已发放新人红包(个)</div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="column">
              <div class="total">{{ activityTotalData.actualAmt || 0}}</div>
              <div class="title">已发放新人红包金额(元)</div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="column">
              <div class="total">{{ activityTotalData.inviteesMember || 0}}</div>
              <div class="title">已发放邀请红包(个)</div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="column">
              <div class="total">{{ activityTotalData.inviteesAmt || 0}}</div>
              <div class="title">已发放邀请红包金额(元)</div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>

      <div class="active-group pb10">
        <h2>
          <span class="iconfont icon-shuju"></span>邀请排名
        </h2>
        <InvitationList :data-list="invitationData" />
      </div>
    </div>
    <div v-show="active===0">
      <div class="banner" v-if="bannerList.length">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(url, index) in bannerList" :key="index">
            <img :src="url" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <van-cell-group class="group">
        <van-cell title="活动金额(元)" :value="activity.totalAmount" />
        <van-cell title="主标题" :value="activity.sub" />
        <van-cell title="副标题" :value="activity.subtitle" />

        <van-cell title="长期有效" :value="activity.subtitle">
          <template #default>
            <van-switch v-model="activity.activityEffectiveFlag" size="20" disabled />
          </template>
        </van-cell>

        <van-cell title="截止日期" v-if="!activity.activityEffectiveFlag" :value="activity.endTime" />
      </van-cell-group>

      <van-cell-group class="group">
        <van-cell title="承接人"></van-cell>
        <div class="people">
          <div class="txt" v-show="!errorPeople">可设置添加指定成员才有奖励，最多可选100人</div>
          <div class="txt red" v-show="errorPeople">至少要选一个承接人</div>

          <ul class="people-list">
            <comp-avatar :data-list="externalContact"></comp-avatar>
          </ul>
        </div>
      </van-cell-group>

      <van-cell-group class="group">
        <van-cell title="配置欢迎语"></van-cell>

        <div class="p15">{{ activity.welcomeMsg }}</div>
      </van-cell-group>

      <van-cell-group class="group">
        <van-cell title="启用新人红包">
          <template #default>
            <van-switch v-model="activity.newFlag" size="20" disabled />
          </template>
        </van-cell>

        <van-cell title="最小红包" :value="activity.newAmountLow" v-if="activity.newFlag" />
        <van-cell title="最大红包" :value="activity.newAmountHigh" v-if="activity.newFlag" />
      </van-cell-group>

      <van-cell-group class="group">
        <van-cell title="邀请红包金额" value="邀请人红包领取的金额"></van-cell>

        <van-cell title="最小红包" :value="activity.invitationAmountLow" />
        <van-cell title="最大红包" :value="activity.invitationAmountHigh" />
      </van-cell-group>

      <van-cell-group class="group">
        <van-cell title="邀请人门槛" :value="activity.invitationNumber" />
        <div class="container">
          <div class="txt">设置每邀请1~5个人可再拆1个红包</div>
        </div>
      </van-cell-group>

      <van-cell-group class="group">
        <van-cell title="对外数据">
          <template #default>
            <van-switch v-model="activity.externalData" size="20" />
          </template>
        </van-cell>
        <div class="container">
          <div class="txt">
            仅在页面对外展示，非真实数据，用于活动造势；
            可选择关闭，将显示真实数据；发布后不可修改
          </div>
        </div>
        <div class="externalData" v-if="activity.externalData">
          <van-cell title="红包总数量" :value="activity.initRedCount" />

          <div class="container">
            <div class="txt">
              此数将影响活动页面的剩余红包数量，之后会随
              红包总数减去已获得红包人数变动
            </div>
          </div>
          <van-cell title="红包总数量" :value="activity.initMemberCount" />

          <div class="container">
            <div class="txt">此数不宜过大或过小，有利于活动初期启动， 激发用户参与</div>
          </div>
        </div>
      </van-cell-group>

      <van-cell-group class="group">
        <van-cell title="活动规则"></van-cell>
        <div class="p20">{{activity.activityExplain}}</div>
      </van-cell-group>
    </div>
    <div class="btnlist">
      <div class="btnlist-item">
        <van-button type="primary" round block :to="'/customer/hongbao?id=' + activity.activityId">分享活动</van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./ActivityDetail">
</script>

<style lang="scss" scoped>
.active-group {
  background: #fff;
  margin-top: 10px;
  .iconfont {
    margin-right: 8px;
  }
  h2 {
    margin: 0;
    padding: 16px;
    font-weight: normal;
    font-size: 16px;
    color: #0dbadd;
  }
  .maincolor {
    color: #0dbadd;
  }
  .column {
    // color: #333;
    text-align: center;

    .total {
      font-size: 18px;
    }
    .title {
      font-size: 12px;
      color: #999;
    }
  }
}
.activityExplain {
  padding: 16px;
  position: absolute;
  z-index: 1;
}
.btnlist {
  background: #f5f5f5;
  display: flex;
  padding: 16px 0;
  position: fixed;
  width: 100%;
  bottom: 0px;
  .btnlist-item {
    flex: 1;
    padding: 0 8px;
  }
}
.form {
  background-color: #f5f5f5;
  overflow-x: hidden;
  padding-bottom: 60px;
}
.banner {
  height: 160px;
  position: relative;
  margin: 16px;
  border-radius: 16px;
  overflow: hidden;

  img {
    height: 160px;
    width: 100%;
  }
}

.group {
  margin: 16px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.people,
.container {
  margin: 0 16px 8px 16px;
  padding: 8px;
  background-color: #f5f5f5;
  // text-align: center;
  .txt {
    padding: 4px 0;
    color: #999;
    font-size: 13px;
  }
}
.people-list {
}
.red {
  color: red !important;
}
</style>