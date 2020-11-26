<template>
  <!-- 四象限 -->
  <div id="app">
    <!-- 顶部名 -->
    <el-row :gutter="10" class="top">
      <el-col :span="16" :offset="1">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          size="mini"
          v-model="input2"
          style="margin-top: 10px"
          @change="searchFun"
          @keyup.enter.native="enterBlur($event)"
        ></el-input>
      </el-col>
      <el-col :span="2" :offset="1">
        <i
          class="el-icon-circle-plus-outline"
          style="font-size: 24px; line-height: 40px"
          @click="outlineClick"
        ></i>
      </el-col>
      <el-col :span="3">
        <i
          v-if="tudingOn"
          class="iconfont icon-tuding"
          style="font-size: 24px; line-height: 40px; color: rgb(53, 122, 252)"
          @click="searchTuding"
        ></i>
        <i
          v-else
          class="iconfont icon-tuding"
          style="font-size: 24px; line-height: 40px"
          @click="searchTuding"
        ></i>
      </el-col>
    </el-row>
    <!-- 上面两个象限 -->
    <el-row style="margin-top: 1.125rem" :gutter="10" v-show="miniBox">
      <el-col :span="11" :offset="1">
        <el-card :body-style="{ padding: '0.5rem' }">
          <div>
            <el-row :gutter="10">
              <el-col :span="4" :offset="0">
                <img src="../assets/a.png" alt />
              </el-col>
              <el-col
                :span="20"
                style="color: #333333; font-size: 1rem; font-weight: bold"
              >
                <span @click="redClick">重要且紧急</span>
              </el-col>
            </el-row>
            <div style="height: 16rem; overflow-y: auto">
              <div
                v-for="(msg, key) in redData"
                :key="key"
                class="center"
                @click="taskData(msg)"
                style="
                  overflow: hidden;
                  margin-top: 1.1875rem;
                  border-bottom: 1px solid #e5e5e5;
                  padding-bottom: 0.5rem;
                "
              >
                <el-row :gutter="10">
                  <el-col :span="4">
                    <div
                      class="ColorNum"
                      style="background: rgba(254, 210, 210, 1); color: #f91f1f"
                    >
                      {{ key + 1 }}
                    </div>
                  </el-col>
                  <el-col :span="20" class="textTop">{{
                    msg.matterName
                  }}</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col
                    :span="20"
                    :offset="4"
                    class="textCenter"
                    style="margin-top: 4px"
                    >{{ msg.deptName }}</el-col
                  >
                </el-row>
                <el-row :gutter="10">
                  <el-col
                    :span="20"
                    :offset="4"
                    class="textCenter"
                    style="margin-top: 4px"
                    >{{ msg.matterOpen }}-{{ msg.end }}</el-col
                  >
                </el-row>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="11">
        <el-card :body-style="{ padding: '0.5rem' }">
          <div>
            <el-row :gutter="10">
              <el-col :span="4" :offset="0">
                <img src="../assets/b.png" alt />
              </el-col>
              <el-col
                :span="20"
                style="color: #333333; font-size: 1rem; font-weight: bold"
              >
                <span @click="orangeClick">重要但不紧急</span>
              </el-col>
            </el-row>
            <div style="height: 16rem; overflow-y: auto">
              <div
                v-for="(msg, key) in orangeData"
                :key="key"
                class="center"
                @click="taskData(msg)"
                style="
                  overflow: hidden;
                  margin-top: 1.1875rem;
                  border-bottom: 1px solid #e5e5e5;
                  padding-bottom: 0.5rem;
                "
              >
                <el-row :gutter="10">
                  <el-col :span="4">
                    <div
                      class="ColorNum"
                      style="background: rgba(252, 235, 206, 1); color: #ef9c0c"
                    >
                      {{ key + 1 }}
                    </div>
                  </el-col>
                  <el-col :span="20" class="textTop">{{
                    msg.matterName
                  }}</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col
                    :span="20"
                    :offset="4"
                    class="textCenter"
                    style="margin-top: 4px"
                    >{{ msg.deptName }}</el-col
                  >
                </el-row>
                <el-row :gutter="10">
                  <el-col
                    :span="20"
                    :offset="4"
                    class="textCenter"
                    style="margin-top: 4px"
                    >{{ msg.matterOpen }}-{{ msg.end }}</el-col
                  >
                </el-row>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 下面两个象限 -->
    <el-row style="margin-top: 11px" :gutter="10" v-show="miniBox">
      <el-col :span="11" :offset="1">
        <el-card :body-style="{ padding: '0.5rem' }">
          <div>
            <el-row :gutter="10">
              <el-col :span="4" :offset="0">
                <img src="../assets/c.png" alt />
              </el-col>
              <el-col
                :span="20"
                style="color: #333333; font-size: 1rem; font-weight: bold"
              >
                <span @click="blueClick">不重要但紧急</span>
              </el-col>
            </el-row>
            <div style="height: 16rem; overflow-y: auto">
              <div
                v-for="(msg, key) in blueData"
                :key="key"
                @click="taskData(msg)"
                class="center"
                style="
                  overflow: hidden;
                  margin-top: 1.1875rem;
                  border-bottom: 1px solid #e5e5e5;
                  padding-bottom: 0.5rem;
                "
              >
                <el-row :gutter="10">
                  <el-col :span="4">
                    <div
                      class="ColorNum"
                      style="background: rgba(214, 228, 255, 1); color: #357afc"
                    >
                      {{ key + 1 }}
                    </div>
                  </el-col>
                  <el-col :span="20" class="textTop">{{
                    msg.matterName
                  }}</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col
                    :span="20"
                    :offset="4"
                    class="textCenter"
                    style="margin-top: 4px"
                    >{{ msg.deptName }}</el-col
                  >
                </el-row>
                <el-row :gutter="10">
                  <el-col
                    :span="20"
                    :offset="4"
                    class="textCenter"
                    style="margin-top: 4px"
                    >{{ msg.matterOpen }}-{{ msg.end }}</el-col
                  >
                </el-row>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="11">
        <el-card :body-style="{ padding: '0.5rem' }">
          <div>
            <el-row :gutter="10">
              <el-col :span="4" :offset="0">
                <img src="../assets/d.png" alt />
              </el-col>
              <el-col
                :span="20"
                style="color: #333333; font-size: 1rem; font-weight: bold"
              >
                <span @click="greenClick">不重要且不紧急</span>
              </el-col>
            </el-row>
            <div style="height: 16rem; overflow-y: auto">
              <div
                v-for="(msg, key) in greenData"
                :key="key"
                @click="taskData(msg)"
                class="center"
                style="
                  margin-top: 1.1875rem;
                  border-bottom: 1px solid #e5e5e5;
                  padding-bottom: 0.5rem;
                  overflow: hidden;
                "
              >
                <el-row :gutter="10">
                  <el-col :span="4">
                    <div
                      class="ColorNum"
                      style="background: #d2f3d3; color: #1fc326"
                    >
                      {{ key + 1 }}
                    </div>
                  </el-col>
                  <el-col :span="20" class="textTop">{{
                    msg.matterName
                  }}</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col
                    :span="20"
                    :offset="4"
                    class="textCenter"
                    style="margin-top: 4px"
                    >{{ msg.deptName }}</el-col
                  >
                </el-row>
                <el-row :gutter="10">
                  <el-col
                    :span="20"
                    :offset="4"
                    class="textCenter"
                    style="margin-top: 4px"
                    >{{ msg.matterOpen }}-{{ msg.end }}</el-col
                  >
                </el-row>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 重要且紧急 -->
    <el-row v-show="redBox">
      <el-col :span="22" :offset="1">
        <el-card :body-style="{ padding: '0.5rem' }" class="bigCard">
          <div>
            <el-row :gutter="10">
              <el-col :span="4" :offset="0">
                <img src="../assets/a.png" alt />
              </el-col>
              <el-col
                :span="20"
                style="color: #333333; font-size: 1rem; font-weight: bold"
                >重要且紧急</el-col
              >
            </el-row>
            <div
              v-for="(msg, key) in bigData"
              :key="key"
              class="center"
              style="
                margin-top: 1.1875rem;
                border-bottom: 1px solid #e5e5e5;
                padding-bottom: 0.5rem;
                overflow: hidden;
              "
              @click="taskData(msg)"
            >
              <el-row :gutter="10">
                <el-col :span="2">
                  <div
                    class="ColorNum"
                    style="background: rgba(254, 210, 210, 1); color: #f91f1f"
                  >
                    {{ key + 1 }}
                  </div>
                </el-col>
                <el-col :span="20" class="textTop">{{ msg.matterName }}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col
                  :span="20"
                  :offset="2"
                  class="textCenter"
                  style="margin-top: 4px"
                  >{{ msg.deptName }}</el-col
                >
              </el-row>
              <el-row :gutter="10">
                <el-col
                  v-if="listForm.timeRadio === '1'"
                  :span="20"
                  :offset="2"
                  class="textCenter"
                  style="margin-top: 4px"
                  >{{ msg.createTime }}</el-col
                >
                <el-col
                  v-else
                  :span="20"
                  :offset="2"
                  class="textCenter"
                  style="margin-top: 4px"
                  >{{ msg.matterOpen }}-{{ msg.end }}</el-col
                >
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 重要但不紧急 -->
    <el-row v-show="orangeBox">
      <el-col :span="22" :offset="1">
        <el-card :body-style="{ padding: '0.5rem' }" class="bigCard">
          <div>
            <el-row :gutter="10">
              <el-col :span="4" :offset="0">
                <img src="../assets/b.png" alt />
              </el-col>
              <el-col
                :span="20"
                style="color: #333333; font-size: 1rem; font-weight: bold"
                >重要但不紧急</el-col
              >
            </el-row>
            <div
              v-for="(msg, key) in bigData"
              :key="key"
              class="center"
              style="
                margin-top: 1.1875rem;
                border-bottom: 1px solid #e5e5e5;
                padding-bottom: 0.5rem;
              "
              @click="taskData(msg)"
            >
              <el-row :gutter="10">
                <el-col :span="2">
                  <div
                    class="ColorNum"
                    style="background: rgba(252, 235, 206, 1); color: #ef9c0c"
                  >
                    {{ key + 1 }}
                  </div>
                </el-col>
                <el-col :span="20" class="textTop">{{ msg.matterName }}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col
                  :span="20"
                  :offset="2"
                  class="textCenter"
                  style="margin-top: 4px"
                  >{{ msg.deptName }}</el-col
                >
              </el-row>
              <el-row :gutter="10">
                <el-col
                  v-if="listForm.timeRadio === '1'"
                  :span="20"
                  :offset="2"
                  class="textCenter"
                  style="margin-top: 4px"
                  >{{ msg.createTime }}</el-col
                >
                <el-col
                  v-else
                  :span="20"
                  :offset="2"
                  class="textCenter"
                  style="margin-top: 4px"
                  >{{ msg.matterOpen }}-{{ msg.end }}</el-col
                >
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 紧急不重要 -->
    <el-row v-show="blueBox">
      <el-col :span="22" :offset="1">
        <el-card :body-style="{ padding: '0.5rem' }" class="bigCard">
          <div>
            <el-row :gutter="10">
              <el-col :span="4" :offset="0">
                <img src="../assets/c.png" alt />
              </el-col>
              <el-col
                :span="20"
                style="color: #333333; font-size: 1rem; font-weight: bold"
                >不重要但紧急</el-col
              >
            </el-row>
            <div
              v-for="(msg, key) in bigData"
              :key="key"
              class="center"
              style="
                margin-top: 1.1875rem;
                border-bottom: 1px solid #e5e5e5;
                padding-bottom: 0.5rem;
              "
              @click="taskData(msg)"
            >
              <el-row :gutter="10">
                <el-col :span="2">
                  <div
                    class="ColorNum"
                    style="background: rgba(214, 228, 255, 1); color: #357afc"
                  >
                    {{ key + 1 }}
                  </div>
                </el-col>
                <el-col :span="20" class="textTop">{{ msg.matterName }}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col
                  :span="20"
                  :offset="2"
                  class="textCenter"
                  style="margin-top: 4px"
                  >{{ msg.deptName }}</el-col
                >
              </el-row>
              <el-row :gutter="10">
                <el-col
                  v-if="listForm.timeRadio === '1'"
                  :span="20"
                  :offset="2"
                  class="textCenter"
                  style="margin-top: 4px"
                  >{{ msg.createTime }}</el-col
                >
                <el-col
                  v-else
                  :span="20"
                  :offset="2"
                  class="textCenter"
                  style="margin-top: 4px"
                  >{{ msg.matterOpen }}-{{ msg.end }}</el-col
                >
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 不重要不紧急 -->
    <el-row v-show="greenBox">
      <el-col :span="22" :offset="1">
        <el-card :body-style="{ padding: '0.5rem' }" class="bigCard">
          <div>
            <el-row :gutter="10">
              <el-col :span="4" :offset="0">
                <img src="../assets/d.png" alt />
              </el-col>
              <el-col
                :span="20"
                style="color: #333333; font-size: 1rem; font-weight: bold"
                >不重要且不紧急</el-col
              >
            </el-row>
            <div
              v-for="(msg, key) in bigData"
              :key="key"
              class="center"
              style="
                margin-top: 1.1875rem;
                border-bottom: 1px solid #e5e5e5;
                padding-bottom: 0.5rem;
              "
              @click="taskData(msg)"
            >
              <el-row :gutter="10">
                <el-col :span="2">
                  <div
                    class="ColorNum"
                    style="background: #d2f3d3; color: #1fc326"
                  >
                    {{ key + 1 }}
                  </div>
                </el-col>
                <el-col :span="20" class="textTop">{{ msg.matterName }}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col
                  :span="20"
                  :offset="2"
                  class="textCenter"
                  style="margin-top: 4px"
                  >{{ msg.deptName }}</el-col
                >
              </el-row>
              <el-row :gutter="10">
                <el-col
                  v-if="listForm.timeRadio === '1'"
                  :span="20"
                  :offset="2"
                  class="textCenter"
                  style="margin-top: 4px"
                  >{{ msg.createTime }}</el-col
                >
                <el-col
                  v-else
                  :span="20"
                  :offset="2"
                  class="textCenter"
                  style="margin-top: 4px"
                  >{{ msg.matterOpen }}-{{ msg.end }}</el-col
                >
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 齿轮 -->
    <div class="flexButton" @click="Popup">
      <img src="../assets/e.png" alt />
    </div>
    <!-- 收起 -->
    <div
      class="flexButton"
      @click="putAwayClick"
      v-show="putAway"
      style="top: 72%"
    >
      <p>收起</p>
    </div>
    <!-- 修改事项 -->
    <el-dialog
      :visible.sync="TaskEdit"
      width="80%"
      top="3.375rem"
      class="fourDialog"
      @close="closeDialog"
      :show-close="true"
    >
      <span
        slot="title"
        @click="TaskEdit = false"
        style="float: right; margin-right: 1rem; font-size: 1.5rem"
        >X</span
      >
      <el-form :model="newFormEdit">
        <el-form-item label="事项" :label-width="formLabelWidth">
          <br />
          <el-input
            :disabled="overForm.deptId !== 0"
            v-model="newFormEdit.matterName"
            size="mini"
            placeholder="请输入内容"
            @change="changeFun"
          ></el-input>
        </el-form-item>
        <el-form-item label="象限" :label-width="formLabelWidth">
          <br />

          <el-checkbox
            label="重要"
            :true-label="1"
            :false-label="0"
            v-model="newFormEdit.important"
            @change="changeFun"
          ></el-checkbox>
          <el-checkbox
            label="紧急"
            :true-label="1"
            :false-label="0"
            v-model="newFormEdit.urgent"
          ></el-checkbox>
        </el-form-item>
        <el-form-item label="日程时间安排" size="mini">
          <span>是否循环</span>
          <el-switch
            :disabled="overForm.deptId !== 0"
            style="margin-left: 1.25rem"
            v-model="newFormEdit.forEach"
            :active-value="1"
            :inactive-value="0"
            active-color="#3C76FF"
            inactive-color="#999999"
            @change="formSwitch"
          ></el-switch>
          <br />
          <span>{{ newFormEdit.matterOpen }}-{{ newFormEdit.end }}</span>
        </el-form-item>
        <el-form-item label="事件提醒设置">
          <br />
          <el-row :gutter="10" v-for="(msg, key) in dateMsg" :key="key">
            <el-col :span="10">{{ msg.remindTime }}</el-col>
            <el-col :span="6" :offset="6">
              <el-button
                type="text"
                @click="dateDelete(msg)"
                v-if="msg.userBy !== 0"
                >删除</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item
          v-for="(domain, index) in newFormEdit.domains"
          :key="index"
        >
          <!-- <el-date-picker v-model="domain.date" type="date" format="YYYY-MM-DD" placeholder="date"></el-date-picker> -->
          <el-date-picker
            v-model="domain.dateValue"
            type="date"
            placeholder="点击新增提醒日期"
            value-format="yyyy-MM-dd"
            @blur="DateBlur(index)"
            :editable="false"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            size="mini"
            @click="addDomainDate"
          >添 加</el-button>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="text"
          style="color: #333333; font-size: 18px; font-weight: bold"
          @click="TaskEdit = false"
          >取 消</el-button
        >
        <el-button
          @click="TaskEditTrue"
          type="text"
          style="
            color: #333333;
            font-size: 18px;
            font-weight: bold;
            margin-left: 2.5rem;
            margin-right: 2.215rem;
          "
          >保 存</el-button
        >
      </div>
    </el-dialog>
    <!-- 新建事项 -->
    <el-dialog
      :visible.sync="newTask"
      width="80%"
      top="5rem"
      class="fourDialog"
    >
      <span
        slot="title"
        @click="newTask = false"
        style="float: right; margin-right: 1rem; font-size: 1.5rem"
        >X</span
      >
      <el-form
        :model="newForm"
        :hide-required-asterisk="true"
        :rules="rules"
        ref="newtaskBox"
      >
        <el-form-item
          label="事项"
          :label-width="formLabelWidth"
          prop="matterName"
        >
          <br />
          <el-input
            v-model="newForm.matterName"
            size="mini"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="象限" :label-width="formLabelWidth" size="mini">
          <br />
          <el-checkbox
            label="重要"
            true-label="1"
            false-label="0"
            v-model="newForm.important"
            @change="changeFun"
          ></el-checkbox>
          <el-checkbox
            label="紧急"
            true-label="1"
            false-label="0"
            v-model="newForm.urgent"
            @change="changeFun"
          ></el-checkbox>
        </el-form-item>
        <el-form-item label="日程时间安排" prop="matterOpen">
          <el-date-picker
            size="mini"
            :editable="false"
            v-model="newForm.matterOpen"
            type="date"
            format="yyyy-MM-dd"
            placeholder="选择日期"
            @change="changeFun"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="end">
          <el-date-picker
            size="mini"
            style="margin-top: 10px"
            :editable="false"
            v-model="newForm.end"
            format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            @change="changeFun"
            :picker-options="pickerOption0"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="任务内容">
          <el-input type="textarea" v-model="newForm.matterText"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="text"
          style="color: #333333; font-size: 18px; font-weight: bold"
          @click="newTask = false"
          >取 消</el-button
        >
        <el-button
          @click="newTaskFun"
          type="text"
          style="
            color: #333333;
            font-size: 18px;
            font-weight: bold;
            margin-left: 2.5rem;
            margin-right: 2.215rem;
          "
          >添 加</el-button
        >
      </div>
    </el-dialog>
    <!-- 事项信息 -->
    <el-dialog
      :visible.sync="taskNoDialog"
      width="80%"
      top="5rem"
      class="fourDialog"
    >
      <span
        slot="title"
        @click="taskNoDialog = false"
        style="float: left; margin-left: 1rem; font-size: 1.5rem"
        >X</span
      >

      <div style="border-bottom: 1px solid #e5e5e5; padding-bottom: 5px">
        <el-card class="topRadios">
          <div v-if="this.overForm.finish === 0">
            <img class="overImg" src="../assets/g.png" ref="londImg" alt />
            <span style="color: #333333">未完成</span>
          </div>
          <div v-else>
            <img class="overImg" src="../assets/f.png" ref="londImg" alt />
            <span>已完成</span>
          </div>
        </el-card>
        <div class="tudingBox" v-if="overForm.sign === 0" @click="signIn(1)">
          <i
            class="iconfont icon-tuding"
            style="font-size: 24px; line-height: 40px"
          ></i>
        </div>
        <div class="tudingBox" v-else @click="signIn(0)">
          <i
            class="iconfont icon-tuding"
            style="font-size: 24px; line-height: 40px; color: red"
          ></i>
        </div>
        <el-form
          :model="overForm"
          :label-width="formLabelWidth"
          style="padding-top: 20px"
          class="overFormClass"
        >
          <el-form-item label="是否完成">
            <el-row :gutter="10">
              <el-col :span="6" :offset="9">
                <el-switch
                  v-model="taskload"
                  active-color="#3C76FF"
                  inactive-color="#E2E2E2"
                  @change="taskLoadFun"
                ></el-switch>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="事项">
            <br />
            <span>{{ overForm.matterName }}</span>
          </el-form-item>
          <el-form-item label="提醒时间">
            <br />
            <p v-for="(item, index) in tixingTime" :key="index">
              {{ item.remindTime }}
            </p>
          </el-form-item>
          <el-form-item label="创建时间">
            <br />
            <span>{{ overForm.createTime }}</span>
          </el-form-item>
          <el-form-item label="日程安排">
            <br />
            <span>{{ overForm.matterOpen }}-{{ overForm.end }}</span>
          </el-form-item>
          <el-form-item label="工作内容">
            <br />
            <span class="workValue">{{ overForm.matterText }}</span>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button
          type="text"
          style="color: #333333; font-size: 18px; font-weight: bold"
          @click="TaskEditFun"
          >编 辑</el-button
        >
        <el-button
          @click="taskDelete"
          type="text"
          style="
            color: #333333;
            font-size: 18px;
            font-weight: bold;
            margin-left: 2.5rem;
            margin-right: 2.215rem;
          "
          >删 除</el-button
        >
      </div>
    </el-dialog>
    <!-- 排序 -->
    <el-dialog
      class="fourDialog"
      :visible.sync="dataList"
      width="90%"
      top="5rem"
    >
      <div>
        <el-form
          :model="listForm"
          :label-width="formLabelWidth"
          class="listFormClass"
        >
          <el-form-item label="展示时间类型">
            <br />
            <el-radio-group
              v-model="listForm.timeRadio"
              size="small"
              @change="viewDate"
            >
              <el-radio-button label="1">创建时间</el-radio-button>
            </el-radio-group>
            <el-radio-group
              v-model="listForm.timeRadio"
              size="small"
              @change="viewDate"
              style="margin-left: 10px"
            >
              <el-radio-button label="2">要求完成时间</el-radio-button>
            </el-radio-group>
            <el-radio-group
              v-model="listForm.timeRadio"
              size="small"
              @change="viewDate"
              style="margin-left: 10px"
            >
              <el-radio-button label="3">实际完成时间</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序">
            <br />
            <el-radio-group
              v-model="listForm.listRadio"
              size="small"
              @change="sortFun"
            >
              <el-radio-button label="0">升序</el-radio-button>
            </el-radio-group>
            <el-radio-group
              v-model="listForm.listRadio"
              size="small"
              @change="sortFun"
              style="margin-left: 10px"
            >
              <el-radio-button label="1">降序</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="展示已完成的">
            <br />
            <el-radio-group
              v-model="listForm.overRadio"
              size="small"
              @change="finshFun"
            >
              <el-radio-button label="0">否</el-radio-button>
            </el-radio-group>
            <el-radio-group
              v-model="listForm.overRadio"
              size="small"
              @change="finshFun"
              style="margin-left: 10px"
            >
              <el-radio-button label="1">是</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="dataList = false">取 消</el-button>
        <el-button type="primary" @click="paixuFun">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="提醒时间"
      :visible.sync="tixingshijian"
      width="80%"
      top="5rem"
    >
      <el-form :model="shijian" size="mini">
        <el-form-item
          style="margin-top: 5px"
          v-for="(domain, index) in shijian.domains"
          :key="index"
        >
          <el-date-picker
            v-model="domain.dateValue"
            type="date"
            placeholder="点击新增提醒日期"
            value-format="yyyy-MM-dd"
            @blur="DateBlurs(index)"
            :editable="false"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="text"
          style="color: #333333; font-size: 18px; font-weight: bold"
          @click="shijianclose"
          >跳 过</el-button
        >
        <el-button
          @click="shijianclose"
          type="text"
          style="
            color: #333333;
            font-size: 18px;
            font-weight: bold;
            margin-left: 2.5rem;
            margin-right: 2.215rem;
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import newTask from "./newTask";
export default {
  components: {
    newTask,
  },
  data() {
    return {
      tixingshijian: false,
      matterId: null,
      shijian: {
        domains: [
          {
            dateValue: "",
          },
        ],
      },
      tixingTime: "",
      input2: "",
      redData: [
        // {
        //   matterName: "研究党建工作222",
        //   deptName: "党建工作部",
        //   matterOpen: "05/12",
        //   end: "08/12",
        //   finish: 0,
        //   matterText:
        //     "围绕企业高质量发展要求，按照省公司“1133” 建党工作体系和年度党建设工作要点，结合公 司建设规划，制定科学可行的、年度党建工作 目标计划，每两年至少两次。"
        // }
      ],
      orangeData: [],
      blueData: [],
      greenData: [],
      bigData: [],
      taskload: false,
      newForm: {
        matterName: "",
        important: "0",
        urgent: "0",
        matterOpen: "",
        end: "",
        matterText: "",
      },
      rules: {
        matterName: [{ required: true, message: " ", trigger: "blur" }],
        matterOpen: [
          {
            type: "date",
            required: true,
            message: " ",
            trigger: "change",
          },
        ],
        end: [
          {
            type: "date",
            required: true,
            message: " ",
            trigger: "change",
          },
        ],
      },
      overForm: {
        over: true,
        name: "",
        date: null,
        msg: "",
        matterOpen: null,
        end: null,
      },
      listForm: {
        timeRadio: "1",
        listRadio: "0",
        overRadio: "0",
      },
      dateMsg: [],
      newFormEdit: {
        domains: {
          dateValue: "",
        },
      },
      formLabelWidth: "32",
      miniBox: true,
      redBox: false,
      orangeBox: false,
      blueBox: false,
      greenBox: false,
      putAway: false,
      newTask: false,
      taskDialog: false,
      taskNoDialog: false,
      dataList: false,
      TaskEdit: false,
      date: "",

      pickerOptions: {
        disabledDate: (time) => {
          if (this.newForm.end != "") {
            return time.getTime() > this.newForm.end;
          } else {
            return;
          }
        },
      },
      pickerOption0: {
        disabledDate: (time) => {
          return time.getTime() < this.newForm.matterOpen;
        },
      },
      tudingOn: false,
    };
  },
  created() {
    var _this = this;
    console.log("dingshi");
    setTimeout(function () {
      _this.allmsg();
    }, 500);
  },
  methods: {
    searchTuding() {
      if (this.tudingOn === true) {
        this.allmsg();
        this.tudingOn = false;
      } else {
        this.tudingOn = true;
        axios
          .get(
            this.AJAX.AJAX_URL +
              "/matter/list?SIGN=1&userId=" +
              sessionStorage.getItem("userId"),
            {
              //  withCredentials:true
            }
          )
          .then((msg) => {
            console.log(msg);
            this.redData = [];
            this.orangeData = [];
            this.blueData = [];
            this.greenData = [];
            for (let i = 0; i < msg.data.data.length; i++) {
              msg.data.data[i].createTime = moment(
                msg.data.data[i].createTime
              ).format("yy/MM/DD");
              msg.data.data[i].end = moment(msg.data.data[i].end).format(
                "yy/MM/DD"
              );
              msg.data.data[i].matterOpen = moment(
                msg.data.data[i].matterOpen
              ).format("yy/MM/DD");
              // this.redData.push(msg.data.data[i]);
              if (msg.data.data[i].importantOne === 1) {
                if (msg.data.data[i].urgentOne === 1) {
                  this.redData.push(msg.data.data[i]);
                } else {
                  this.orangeData.push(msg.data.data[i]);
                }
              } else {
                if (msg.data.data[i].urgentOne === 1) {
                  this.blueData.push(msg.data.data[i]);
                } else {
                  this.greenData.push(msg.data.data[i]);
                }
              }
            }
            switch (true) {
              case this.redBox:
                this.bigData = this.redData;
                console.log("orangeBox");
                break;
              case this.orangeBox:
                this.bigData = this.orangeData;
                console.log("orangeBox");
                break;
              case this.blueBox:
                this.bigData = this.blueData;
                console.log("blueBox");
                break;
              case this.greenBox:
                this.bigData = this.greenData;
                console.log("greenBox");
                break;
              default:
                break;
            }
            // console.log(this.redData);
          })
          .catch((error) => {
            this.$message({
              duration: 1000,
              message: "1",
              type: "error",
            });
          });
      }
    },
    // 获取所有事项
    allmsg() {
      console.log(sessionStorage.getItem("userId"));
      axios
        .get(
          this.AJAX.AJAX_URL +
            "/matter/list?userId=" +
            sessionStorage.getItem("userId"),
          {
            //  withCredentials:true
          }
        )
        .then((msg) => {
          console.log(msg);
          this.redData = [];
          this.orangeData = [];
          this.blueData = [];
          this.greenData = [];
          for (let i = 0; i < msg.data.data.length; i++) {
            msg.data.data[i].createTime = moment(
              msg.data.data[i].createTime
            ).format("yy/MM/DD");
            msg.data.data[i].end = moment(msg.data.data[i].end).format(
              "yy/MM/DD"
            );
            msg.data.data[i].matterOpen = moment(
              msg.data.data[i].matterOpen
            ).format("yy/MM/DD");
            // this.redData.push(msg.data.data[i]);
            if (msg.data.data[i].importantOne === 1) {
              if (msg.data.data[i].urgentOne === 1) {
                this.redData.push(msg.data.data[i]);
              } else {
                this.orangeData.push(msg.data.data[i]);
              }
            } else {
              if (msg.data.data[i].urgentOne === 1) {
                this.blueData.push(msg.data.data[i]);
              } else {
                this.greenData.push(msg.data.data[i]);
              }
            }
          }
          switch (true) {
            case this.redBox:
              this.bigData = this.redData;
              console.log("orangeBox");
              break;
            case this.orangeBox:
              this.bigData = this.orangeData;
              console.log("orangeBox");
              break;
            case this.blueBox:
              this.bigData = this.blueData;
              console.log("blueBox");
              break;
            case this.greenBox:
              this.bigData = this.greenData;
              console.log("greenBox");
              break;
            default:
              break;
          }
          // console.log(this.redData);
        })
        .catch((error) => {});
    },
    // 事项完成
    taskLoadFun(msg) {
      console.log(this.overForm.over);
      this.taskload = msg;
      console.log(msg);
      console.log(this.overForm);
      if (msg) {
        axios
          .get(
            this.AJAX.AJAX_URL +
              "/matter/finish?userId=" +
              sessionStorage.getItem("userId"),
            {
              params: {
            
                matterId: this.overForm.matterId,
                finish: 1,
            
              },
            }
          )
          .then((msg) => {
            console.log(msg);
            this.overForm.finish = 1;
          });
      } else {
        axios
          .get(
            this.AJAX.AJAX_URL +
              "/matter/finish?userId=" +
              sessionStorage.getItem("userId"),
            {
              params: {
                matterId: this.overForm.matterId,
                finish: 0,
              },
            }
          )
          .then((msg) => {
            this.overForm.finish = 0;
            console.log(msg);
          });
      }
    },
    //测试函数
    changeFun(msg) {
      console.log(msg);
    },
    // 新建任务
    newTaskFun() {
      //  conso le.log(this.newForm)
      this.$refs.newtaskBox.validate((valid) => {
        if (valid) {
          axios
            .get(
              this.AJAX.AJAX_URL +
                "/matter/add?userId=" +
                sessionStorage.getItem("userId"),
              {
                params: {
                  matterName: this.newForm.matterName,
                  important: this.newForm.important,
                  matterOpenStr: moment(this.newForm.matterOpen).format(
                    "yyyy-MM-DD"
                  ),
                  endStr: moment(this.newForm.end).format("yyyy-MM-DD"),

                  urgent: this.newForm.urgent,
                  matterText: this.newForm.matterText,
                },
              }
            )
            .then((msg) => {
              if (msg.data.state === "2000") {
                this.matterId = msg.data.data;
                this.tixingshijian = true;
                this.paixuFun();
                Object.keys(this.newForm).forEach((key) => {
                  this.newForm[key] = "";
                });
                this.$refs.newtaskBox.resetFields();
                this.newTask = false;
                this.newForm.important = "0";
                this.newForm.urgent = "0";
                this.$message({
                  duration: 1000,
                  message: "添加成功",
                  type: "success",
                });
              }
            })
            .catch(function (error) {
              this.$message({
                duration: 1000,
                message: "添加失败",
                type: "error",
              });
            });
        }
      });
    },
    DateBlurs(msg) {
      var a = msg;
      if (this.shijian.domains[a].dateValue !== "") {
        axios
          .get(
            this.AJAX.AJAX_URL +
              "/remind/add?remindId=&matterId=" +
              this.matterId +
              "&remindTimestr=" +
              this.shijian.domains[msg].dateValue +
              "&userId=" +
              sessionStorage.getItem("userId")
          )
          .then((msg) => {
            if (msg.data.state === "2000") {
              this.shijian.domains.push({
                dateValue: "",
              });
              this.paixuFun();
            } else {
              this.$message.error(msg.data.message);
            }
          })
          .catch((err) => {
            this.$message.error("添加失败");
          });
      }

      // console.log(this.newFormEdit.domains[msg].dateValue)
    },
    shijianclose() {
      this.shijian = {
        domains: [
          {
            dateValue: "",
          },
        ],
      };
      this.tixingshijian = false;
    },
    redClick() {
      this.bigData = this.redData;
      this.miniBox = false;
      this.redBox = true;
      this.putAway = true;
    },
    orangeClick() {
      // console.log(1);
      this.bigData = this.orangeData;
      this.miniBox = false;
      this.orangeBox = true;
      this.putAway = true;
    },
    blueClick() {
      // console.log(1);
      this.bigData = this.blueData;
      this.miniBox = false;
      this.blueBox = true;
      this.putAway = true;
    },
    greenClick() {
      // console.log(1);
      this.bigData = this.greenData;
      this.miniBox = false;
      this.greenBox = true;
      this.putAway = true;
    },
    // 判断收起按钮展示隐藏
    Popup() {
      this.dataList = true;
    },
    // 收起按钮点击事件
    putAwayClick() {
      this.redBox = false;
      this.orangeBox = false;
      this.blueBox = false;
      this.greenBox = false;
      this.miniBox = true;
      this.putAway = false;
    },
    // 是否循环change事件
    formSwitch() {
      console.log(this.newFormEdit.forEach);
    },
    // 顶部+点击事件
    outlineClick() {
      // console.log(1);
      this.newTask = true;
    },
    // 事项点击事件
    taskData(msg) {
      this.overForm = msg;
      console.log(msg);
      if (msg.finish === 0) {
        this.taskNoDialog = true;
        this.taskload = false;
        this.overForm.over = true;
      } else {
        this.taskNoDialog = true;
        this.taskload = true;
        this.overForm.over = false;
      }
      axios
        .get(
          this.AJAX.AJAX_URL +
            "/remind/getBymatterId?matterId=" +
            msg.matterId +
            "&userId=" +
            sessionStorage.getItem("userId")
          // 14
        )
        .then((msg) => {
          if (msg.data.state === "2000") {
            this.tixingTime = [];
            for (let i = 0; i < msg.data.data.length; i++) {
              msg.data.data[i].remindTime = moment(
                msg.data.data[i].remindTime
              ).format("MM-DD");
              this.tixingTime.push(msg.data.data[i]);
            }
            console.log(this.tixingTime);
          }
        });
    },

    // 编辑按钮点击事件
    TaskEditFun() {
      this.newFormEdit = JSON.parse(JSON.stringify(this.overForm));
      console.log(this.newFormEdit);

      for (const key in this.overForm) {
        if (this.overForm.hasOwnProperty(key)) {
          this.newFormEdit[key] = this.overForm[key];
        }
        this.newFormEdit.forEach = Number(this.overForm.forEach);
      }

      // console.log(this.newFormEdit);
      this.newFormEdit.domains = [
        {
          dateValue: "",
        },
      ];
      this.dateMsgFun();
      // console.log(this.newFormEdit)
      this.TaskEdit = true;
      this.taskNoDialog = false;
    },
    // 事件提醒日期获取
    dateMsgFun() {
      axios
        .get(
          this.AJAX.AJAX_URL +
            "/remind/getBymatterId?matterId=" +
            this.newFormEdit.matterId +
            "&userId=" +
            sessionStorage.getItem("userId")
        )
        .then((msg) => {
          if (msg.data.state === "2000") {
            this.dateMsg = [];
            for (let i = 0; i < msg.data.data.length; i++) {
              msg.data.data[i].remindTime = moment(
                msg.data.data[i].remindTime
              ).format("MM-DD");
              this.dateMsg.push(msg.data.data[i]);
            }
          }
          // console.log(msg);
        });
    },
    // 确认修改
    TaskEditTrue() {
      console.log(this.newFormEdit);

      axios
        .get(
          this.AJAX.AJAX_URL +
            "/matter/update?userId=" +
            sessionStorage.getItem("userId"),
          {
            params: {
              important: this.newFormEdit.important,
              urgent: this.newFormEdit.urgent,
              matterId: Number(this.newFormEdit.matterId),
              finish: this.newFormEdit.finish,
              matterName: this.newFormEdit.matterName,
              SIGN: this.newFormEdit.sign,
              forEach: this.newFormEdit.forEach,
            },
          }
        )
        .then((msg) => {
          if (msg.data.state === "2000") {
            this.$message({
              duration: 1000,
              message: "保存成功",
              type: "success",
            });
            this.paixuFun();
            this.TaskEdit = false;
          } else {
            this.$message({
              duration: 1000,
              message: "保存失败",
              type: "error",
            });
          }
        });
    },
    // 删除提醒日期
    dateDelete(msg) {
      // console.log(msg);
      axios
        .get(this.AJAX.AJAX_URL + "/remind/delete/" + msg.remindId)
        .then((msg) => {
          this.dateMsgFun();
          // console.log(msg);
        });
    },
    // 新增提醒日期
    DateBlur(msg) {
      var a = msg;
      if (this.newFormEdit.domains[a].dateValue !== "") {
        axios
          .get(
            this.AJAX.AJAX_URL +
              "/remind/add?remindId=&matterId=" +
              this.newFormEdit.matterId +
              "&remindTimestr=" +
              this.newFormEdit.domains[msg].dateValue +
              "&userId=" +
              sessionStorage.getItem("userId")
          )
          .then((msg) => {
            // console.log(msg);
            if (msg.data.state === "2000") {
              this.dateMsgFun();
              this.newFormEdit.domains[a].dateValue = "";
              this.TaskEdit = false;
              this.TaskEdit = true;
            } else {
              this.$message.error(msg.data.message);
            }
          })
          .catch((err) => {
            this.$message.error("添加失败");
          });
      }
      // console.log(this.newFormEdit.domains[msg].dateValue)
    },
    // 查询事件
    searchFun(msg) {
      // console.log(msg);
      axios
        .get(
          this.AJAX.AJAX_URL +
            "/matter/list?matterName=" +
            msg +
            "&userId=" +
            sessionStorage.getItem("userId")
        )
        .then((msg) => {
          // console.log(msg);
          this.redData = [];
          this.orangeData = [];
          this.blueData = [];
          this.greenData = [];
          for (let i = 0; i < msg.data.data.length; i++) {
            msg.data.data[i].createTime = moment(
              msg.data.data[i].createTime
            ).format("yy/MM/DD");
            msg.data.data[i].end = moment(msg.data.data[i].end).format(
              "yy/MM/DD"
            );
            msg.data.data[i].matterOpen = moment(
              msg.data.data[i].matterOpen
            ).format("yy/MM/DD");
            // this.redData.push(msg.data.data[i]);
            if (msg.data.data[i].importantOne === 1) {
              if (msg.data.data[i].urgentOne === 1) {
                this.redData.push(msg.data.data[i]);
              } else {
                this.orangeData.push(msg.data.data[i]);
              }
            } else {
              if (msg.data.data[i].urgentOne === 1) {
                this.blueData.push(msg.data.data[i]);
              } else {
                this.greenData.push(msg.data.data[i]);
              }
            }
          }
        });
    },
    // 排序事件
    paixuFun() {
      if (this.tudingOn) {
        axios
          .get(
            this.AJAX.AJAX_URL +
              "/matter/list?order=" +
              this.listForm.listRadio +
              "&userId=" +
              sessionStorage.getItem("userId") +
              "&SIGN=1" +
              "&status=" +
              this.listForm.timeRadio +
              "&finish=" +
              this.listForm.overRadio
          )
          .then((msg) => {
            // console.log(msg);
            this.sortAllFun(msg);
            this.dataList = false;
          })
          .catch(() => {
            this.dataList = false;
          });
      } else {
        axios
          .get(
            this.AJAX.AJAX_URL +
              "/matter/list?order=" +
              this.listForm.listRadio +
              "&userId=" +
              sessionStorage.getItem("userId") +
              "&status=" +
              this.listForm.timeRadio +
              "&finish=" +
              this.listForm.overRadio
          )
          .then((msg) => {
            // console.log(msg);
            this.sortAllFun(msg);
            this.dataList = false;
          })
          .catch(() => {
            this.dataList = false;
          });
      }
    },
    sortFun(msg) {},
    // 加载排序后数据
    sortAllFun(msg) {
      this.redData = [];
      this.orangeData = [];
      this.blueData = [];
      this.greenData = [];

      for (let i = 0; i < msg.data.data.length; i++) {
        msg.data.data[i].createTime = moment(
          msg.data.data[i].createTime
        ).format("yy/MM/DD");
        msg.data.data[i].end = moment(msg.data.data[i].end).format("yy/MM/DD");
        msg.data.data[i].matterOpen = moment(
          msg.data.data[i].matterOpen
        ).format("yy/MM/DD");
        // this.redData.push(msg.data.data[i]);
        if (msg.data.data[i].importantOne === 1) {
          if (msg.data.data[i].urgentOne === 1) {
            this.redData.push(msg.data.data[i]);
          } else {
            this.orangeData.push(msg.data.data[i]);
          }
        } else {
          if (msg.data.data[i].urgentOne === 1) {
            this.blueData.push(msg.data.data[i]);
          } else {
            this.greenData.push(msg.data.data[i]);
          }
        }
      }
      switch (true) {
        case this.redBox:
          this.bigData = this.redData;
          // console.log(this.bigData);
          break;
        case this.orangeBox:
          this.bigData = this.orangeData;
          break;
        case this.blueBox:
          this.bigData = this.blueData;
          break;
        case this.greenBox:
          this.bigData = this.greenData;
          break;
        default:
          break;
      }
    },
    viewDate(msg) {
      console.log(msg);
      console.log(this.listForm);
    },
    // 事项完成
    finshFun(msg) {},
    // 图钉事件
    signIn(val) {
      axios
        .get(
          this.AJAX.AJAX_URL +
            "/matter/updates" +
            "?userId=" +
            sessionStorage.getItem("userId"),
          {
            params: {
              importantOne: this.overForm.importantOne,
              urgentOne: this.overForm.urgentOne,
              matterId: this.overForm.matterId,
              SIGN: val,
              finish: this.overForm.finish,
            },
          }
        )
        .then((msg) => {
          console.log(msg);
          this.overForm.sign = val;
          // this.sortAllFun(msg);
        });
    },
    // 修改事项框关闭事件
    closeDialog() {
      console.log(this.newFormEdit);
      var _this = this;
      Object.keys(this.newFormEdit).forEach((key) => {
        this.newFormEdit[key] = "";
      });
    },
    // 删除事项
    taskDelete() {
      // console.log(this.overForm);
      // console.log(this.overForm.deptId);
      if (this.overForm.deptId === 0) {
        axios
          .get(
            this.AJAX.AJAX_URL +
              "/matter/delete?matterId=" +
              this.overForm.matterId +
              "&useid=" +
              sessionStorage.getItem("userId")
          )
          .then((msg) => {
            // console.log(msg);
            if (msg.data.state === "2000") {
              this.$message({
                duration: 1000,
                message: "删除成功",
                type: "success",
              });
              this.taskNoDialog = false;
              this.paixuFun();
            } else {
              this.$message({
                duration: 1000,
                message: "删除失败",
                type: "error",
              });
            }
          });
      } else {
        this.$message({
          duration: 1000,
          message: "部门任务不允许删除",
          type: "error",
        });
      }
    },
    // 搜索框回车后失去焦点
    enterBlur(event) {
      event.target.blur();
    },
  },
};
</script>
<style scoped>
.el-card {
  width: 100%;
  height: 18.75rem;
  border: 0;
  overflow: scroll;
}
.bigCard {
  margin-top: 12px;
  height: 38.9375rem;
  overflow: scroll;
}
.ColorNum {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  font-size: 0.8125rem;
  text-align: center;
  line-height: 1rem;
}

.textTop {
  font-size: 1rem;
  color: #333333;
}
.textCenter {
  font-size: 1rem;
  color: #999999;
}
.flexButton {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  position: fixed;
  top: 80%;
  right: 1.5rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 6px rgba(3, 46, 126, 0.1);
  opacity: 1;
}
.flexButton img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.flexButton p {
  text-align: center;
  line-height: 3rem;
  color: #357afc;
  font-size: 14px;
}
.el-form-item {
  margin-bottom: 0;
}
.el-form-item >>> .el-form-item__label {
  font-size: 1rem;
  color: #333333;
  font-weight: bold;
}
.topRadios {
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  position: absolute;
  top: -2.5rem;
  left: 0;
  right: 0;
  margin: auto;
}
.overImg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 40px;
  margin: auto;
}
.topRadios span {
  display: block;
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  text-align: center;
  margin: auto;
  font-size: 14px;
  font-weight: bold;
  color: #357afc;
}
.tudingBox {
  text-align: right;
  position: absolute;
  top: 16px;
  right: 14px;
}
.workValue {
  display: block;
  line-height: 22px;
}
</style>

<style>
.fourDialog .el-dialog__header {
  padding: 0px !important;
}
.fourDialog .el-dialog {
  border-radius: 10px !important;
  padding: 0.2rem 0.1rem;
}
.fourDialog .el-dialog__close {
  display: none;
}
.overFormClass .el-form-item {
  margin-bottom: 0;
}
.listFormClass .el-radio-group .el-radio-button__inner {
  padding: 7px 8px;
}
</style>