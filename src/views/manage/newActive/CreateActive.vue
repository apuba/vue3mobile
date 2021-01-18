<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-05 00:21:31
 * @LastEditTime: 2021-01-19 01:19:21
 * @LastEditors: 侯兴章
 * @Description: 
-->
<template>
  <div>
    {{ formData.newFlag }}
    <van-nav-bar
      title="新增活动"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit" class="form">
      <div class="banner">
        <div class="uploader">
          <van-uploader
            :after-read="uploadHandler"
            v-model="formData.imageList"
            multiple
            :max-count="3"
          />
          <div class="txt">请上传广告活动图最多三张</div>
        </div>
      </div>

      <van-cell-group class="group">
        <van-cell title="账户余额" value="50000" />
        <van-field
          label="活动金额"
          placeholder="请输入活动金额"
          value="800"
          is-link
          v-model="formData.totalAmount"
        />
        <van-field
          label="主标题"
          placeholder="请输入主标题"
          value=""
          is-link
          v-model="formData.sub"
        />
        <van-field
          label="副标题"
          placeholder="请输入副标题"
          value=""
          is-link
          v-model="formData.subtitle"
        />

        <van-field name="switch" label="长期有效" input-align="right">
          <template #input>
            <van-switch v-model="formData.newFlag" size="20" />
          </template>
        </van-field>
        <van-field
          label="截止日期"
          placeholder="点击选择日期"
          v-show="formData.newFlag"
          v-model="formData.endTime"
          is-link
          @click="showCalendarHandler"
        />
      </van-cell-group>

      <van-cell-group class="group">
        <van-cell title="承接人">
          <template #default>
            <van-button type="primary" size="mini"
              ><van-icon name="plus" />请选择人员</van-button
            >
          </template>
        </van-cell>
        <div class="people">
          <div class="txt">可设置添加指定成员才有奖励，最多可选100人</div>

          <div class="people-list">
            <van-image
              class="people-img"
              round
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </div>
        </div>
      </van-cell-group>

      <van-cell-group class="group">
        <van-cell title="配置欢迎语"> </van-cell>
        <van-field
          v-model="formData.welcomeMsg"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="客户添加承接人后会自动收到的欢迎语"
          show-word-limit
        />
      </van-cell-group>

      <van-cell-group class="group">
        <van-cell title="启用新人红包">
          <template #default>
            <van-switch v-model="formData.activityEffectiveFlag" size="20" />
          </template>
        </van-cell>
        <van-field
          label="最小红包"
          v-model="formData.newAmountLow"
          is-link
          placeholder="新人获取最小红包(元）"
        />
        <van-field
          label="最大红包"
          v-model="formData.newAmountHigh"
          is-link
          placeholder="新人获取最大红包(元）"
        />
      </van-cell-group>

      <van-cell-group class="group">
        <van-cell title="邀请红包金额" value="邀请人红包领取的金额"> </van-cell>
        <van-field
          label="最小红包"
          is-link
          v-model="formData.invitationAmountLow"
          placeholder="邀请最小红包(元）"
        />
        <van-field
          label="最大红包"
          is-link
          v-model="formData.invitationAmountHigh"
          placeholder="邀请最大红包(元）"
        />
      </van-cell-group>

      <van-cell-group class="group">
        <van-field
          label="邀请人门槛"
          is-link
          v-model="formData.invitationNumber"
          placeholder="请输入1~5个人"
        />
        <div class="container">
          <div class="txt">设置每邀请1~5个人可再拆1个红包</div>
        </div>
      </van-cell-group>

      <van-cell-group class="group">
        <van-cell title="对外数据">
          <template #default>
            <van-switch v-model="formData.enabledExternalData" size="20" />
          </template>
        </van-cell>
        <div class="container">
          <div class="txt">
            仅在页面对外展示，非真实数据，用于活动造势；
            可选择关闭，将显示真实数据；发布后不可修改
          </div>
        </div>
        <div class="externalData" v-show="formData.enabledExternalData">
          <van-field
            label="红包总数量"
            is-link
            v-model="formData.externalData.hongbaoAmount"
            placeholder="请输入红包总数量"
          />

          <div class="container">
            <div class="txt">
              此数将影响活动页面的剩余红包数量，之后会随
              红包总数减去已获得红包人数变动
            </div>
          </div>

          <van-field
            label="初始领取人数"
            is-link
            v-model="formData.externalData.peopleAmount"
            placeholder="请输入初始领取人数"
          />
          <div class="container">
            <div class="txt">
              此数不宜过大或过小，有利于活动初期启动， 激发用户参与
            </div>
          </div>
        </div>
      </van-cell-group>

      <van-cell-group class="group">
        <van-cell title="活动规则">
          <template #default>
            <van-button type="primary" size="mini">使用默认规则</van-button>
          </template>
        </van-cell>

        <!-- <div class="container">
          <div class="txt">
            结束时间：即日起至2021-2-12，红包抢完提 前结束；
            红包规则：首次添加客服企业微信可获得红包；
            邀请规则：邀请好友添加客服企业微信以首次为主，
            之前有添加过则无奖励； 邀请攻略：邀请3个好友可获得1个现金红包，不累
            计产生红包，请及时拆开，否则更多邀请将不会产 生更多红包
          </div>
        </div> -->

        <van-field
          v-model="formData.activityExplain"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="结束时间：即日起至2021-2-12，红包抢完提 前结束；
红包规则：首次添加客服企业微信可获得红包；
邀请规则：邀请好友添加客服企业微信以首次为主，
之前有添加过则无奖励； 邀请攻略：邀请3个好友可获得1个现金红包，不累
计产生红包，请及时拆开，否则更多邀请将不会产 生更多红包"
          show-word-limit
        />
      </van-cell-group>
    </van-form>
    <van-calendar v-model:show="showCalendar" @confirm="selectEndTime" />
  </div>
</template>

<script lang="ts" src="./CreateActive">
</script>

<style lang="scss" scoped>
.form {
  background-color: #f5f5f5;
}
.banner {
  text-align: center;
  height: 220px;
  background-color: #0dbadd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  .uploader {
    margin: 0 auto;
  }
}
.group {
  margin: 16px;
  border-radius: 8px;
  overflow: hidden;
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
.people-img {
  width: 36px;
  height: 36px;
  margin: 6px;
}
</style>