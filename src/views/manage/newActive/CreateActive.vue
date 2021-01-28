<!--
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-05 00:21:31
 * @LastEditTime: 2021-01-28 23:51:54
 * @LastEditors: 侯兴章
 * @Description: 
-->
<template>
  <div>
    <van-nav-bar
      title="新增活动"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit" class="form" :scroll-to-error="true">
      <div class="banner">
        <div class="uploader">
          <van-uploader
            :after-read="uploadHandler"
            v-model="fileList"
            multiple
            :max-count="3"
            @delete="deleteBannerHandler"
            :disabled="disabledUpload"
          />
          <div class="txt">请上传广告活动图最多三张</div>
        </div>
      </div>
      <van-cell-group class="group">
        <van-cell title="账户余额(元)" :value="enteInfo.balance" />
        <van-field
          label="活动金额(元)"
          placeholder="请输入活动金额"
          is-link
          v-model="formData.totalAmount"
          :rules="validator.totalAmount"
          type="digit"
        />
        <van-field
          label="主标题"
          placeholder="请输入主标题"
          value=""
          is-link
          v-model="formData.sub"
          :rules="validator.sub"
        />
        <van-field
          label="副标题"
          placeholder="请输入副标题"
          value=""
          is-link
          v-model="formData.subtitle"
          :rules="validator.subtitle"
        />

        <van-field name="switch" label="长期有效" input-align="right">
          <template #input>
            <van-switch
              v-model="formData.newFlag"
              size="20"
              @change="updateActivityExplain"
            />
          </template>
        </van-field>
        <van-field
          label="截止日期"
          placeholder="点击选择日期"
          v-if="!formData.newFlag"
          v-model="formData.endTime"
          is-link
          @click="showCalendarHandler"
          :rules="validator.endTime"
          readonly
        />
      </van-cell-group>

      <van-cell-group class="group">
        <van-cell title="承接人">
          <template #default>
            <van-button
              type="primary"
              size="mini"
              @click="selectExternalContact"
              ><van-icon name="plus" />请选择人员</van-button
            >
          </template>
        </van-cell>
        <div class="people">
          <div class="txt" v-show="!errorPeople">
            可设置添加指定成员才有奖励，最多可选100人
          </div>
          <div class="txt red" v-show="errorPeople">至少要选一个承接人</div>

          <ul class="people-list">
            <comp-avatar
              :data-list="externalContact"
              @delHandler="deleContactHandler"
            ></comp-avatar>
            <!-- <span
              class="people-img"
              v-for="item in externalContact"
              :key="item.id"
              @click="activeContactHandler(item.id)"
              :class="{ active: activeContactList.indexOf(item.id) > -1 }"
            >
              <span class="mask" @click="deleContactHandler(item.id)">X</span>
              <van-image width="36" height="36" :src="item.avatar" />
            </span> -->
          </ul>
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
          :rules="validator.newAmountLow"
          type="number"
          v-if="formData.activityEffectiveFlag"
        />
        <van-field
          label="最大红包"
          v-model="formData.newAmountHigh"
          is-link
          placeholder="新人获取最大红包(元）"
          :rules="validator.newAmountHigh"
          type="number"
          v-if="formData.activityEffectiveFlag"
        />
      </van-cell-group>

      <van-cell-group class="group">
        <van-cell title="邀请红包金额" value="邀请人红包领取的金额"> </van-cell>
        <van-field
          label="最小红包"
          is-link
          v-model="formData.invitationAmountLow"
          placeholder="邀请最小红包(元）"
          :rules="validator.invitationAmountLow"
          type="number"
        />
        <van-field
          label="最大红包"
          is-link
          v-model="formData.invitationAmountHigh"
          :rules="validator.invitationAmountHigh"
          placeholder="邀请最大红包(元）"
          type="number"
        />
      </van-cell-group>

      <van-cell-group class="group">
        <van-field
          label="邀请人门槛"
          is-link
          v-model="formData.invitationNumber"
          placeholder="请输入1~5个人"
          :rules="validator.invitationNumber"
          type="digit"
        />
        <div class="container">
          <div class="txt">设置每邀请1~5个人可再拆1个红包</div>
        </div>
      </van-cell-group>

      <van-cell-group class="group">
        <van-cell title="对外数据">
          <template #default>
            <van-switch v-model="formData.externalData" size="20" />
          </template>
        </van-cell>
        <div class="container">
          <div class="txt">
            仅在页面对外展示，非真实数据，用于活动造势；
            可选择关闭，将显示真实数据；发布后不可修改
          </div>
        </div>
        <div class="externalData" v-if="formData.externalData">
          <van-field
            label="红包总数量"
            is-link
            v-model="formData.initRedCount"
            :rules="validator.initRedCount"
            placeholder="请输入红包总数量"
            type="digit"
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
            v-model="formData.initMemberCount"
            :rules="validator.initMemberCount"
            placeholder="请输入初始领取人数"
            type="digit"
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
          rows="4"
          autosize
          type="textarea"
          maxlength="150"
          show-word-limit
          :placeholder="activityExplain"
        />

        <!-- <div class="activityExplain">{{ activityExplain }}</div> -->
      </van-cell-group>
      <div class="btnlist">
<!--         <div class="btnlist-item">
          <van-button type="default" round block>查看样式</van-button>
        </div> -->
        <div class="btnlist-item">
          <van-button type="primary" round block native-type="submit" :loading="submitBtn.loading"
          :disabled="submitBtn.disabled" :loading-text="submitBtn.loadingTxt">确定创建</van-button
          >
        </div>
      </div>
    </van-form>
    <van-calendar v-model:show="showCalendar" @confirm="selectEndTime" />

   
  </div>
</template>

<script lang="ts" src="./CreateActive">
</script>

<style lang="scss" scoped>
.activityExplain {
  padding: 16px;
  position: absolute;
  z-index: 1;
}
.btnlist {
  background: #fff;
  display: flex;
  padding: 8px;
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
  position: relative;
  text-align: center;
  height: 220px;
  // background-color: #0dbadd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  .uploader {
    margin: 0 auto;
    z-index: 1;
  }
}

.banner::after {
  width: 140%;
  height: 100%;
  position: absolute;
  left: -20%;
  top: 0;
  // z-index: -1;
  content: "";
  border-radius: 0 0 50% 50%;
  // background-image: linear-gradient(-270deg, #2af598 0%, #009efd 100%);
  background: #0dbadd;
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
/* .people-img {
  display: inline-block;
  width: 36px;
  height: 36px;
  margin: 6px;
  position: relative;
  overflow: hidden;
  line-height: 36px;
  text-align: center;
  border-radius: 18px;
  .mask {
    display: none;
  }
  &.active {
    .mask {
      display: inline-block;
      color: rgb(255, 0, 0);
      background: rgba($color: rgb(0, 0, 0), $alpha: 0.6);
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      font-size: 22px;
    }
  }

  img {
    width: 100%;
    height: 100%;
  }
} */
.red {
  color: red !important;
}
</style>