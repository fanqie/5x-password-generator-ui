<script setup>
import {ref, onMounted, reactive, watch} from 'vue'
import {useI18n} from 'vue-i18n'
import {randomStr,CHARS} from "5x-random-str";
import {ElMessage} from 'element-plus'
import copy from 'copy-to-clipboard';
import {passwordStrength} from 'check-password-strength'
import {CopyDocument, Setting} from "@element-plus/icons-vue";

const {t} = useI18n()
const charsList = [
  {name: t('pwd.charsList.0'), text: CHARS.ABC_XYZ},
  {name: t('pwd.charsList.1'), text: CHARS.abc_xyz},
  {name: t('pwd.charsList.2'), text: CHARS["1234567890"]},
  {name: t('pwd.charsList.3'), text: CHARS["!@#$%^&*()_"]},
  {name: t('pwd.charsList.4'), text: CHARS["+.(~)[]?}|{][,-"]},
]
let length = ref(12)
let chars = ref(reactive([charsList[0].text, charsList[1].text, charsList[2].text]))
let firstChar = ref("")
let prefix = ref("")
let suffix = ref("")
let marks = reactive({})
let passwordResult = ref('')
let strongResult = ref({id: 0})
let generate = () => {
  if (!chars.value) {
    return
  }
  let password = "";
  let len = length.value;
  let firstCharRes = ""
  if (firstChar.value.length > 0) {
    len -= 1;
    firstCharRes = randomStr(1, [firstChar.value], false)
  }
  password = randomStr(len, chars.value, false)
  password = firstCharRes + password
  passwordResult.value = prefix.value + password + suffix.value;
  strongResult.value = passwordStrength(passwordResult.value, [
    {
      id: 0,
      value: t("pwd.strongResult.0"),
      minDiversity: 0,
      minLength: 0
    },
    {
      id: 1,
      value: t("pwd.strongResult.1"),
      minDiversity: 2,
      minLength: 6
    },
    {
      id: 2,
      value: t("pwd.strongResult.2"),
      minDiversity: 4,
      minLength: 12
    },
    {
      id: 3,
      value: t("pwd.strongResult.3"),
      minDiversity: 4,
      minLength: 25
    }
  ])
}

watch(length, generate)
watch(chars, generate)
watch(suffix, generate)
watch(prefix, generate)
watch(firstChar, generate)
onMounted(() => {
  for (let i = 1; i <= 50; i++) {
 if (i <= 30) {
      if (!(i % 2)) {
        marks[i] = i.toString()
      }
    } else if (i <= 40) {
      if (!(i % 3)) {
        marks[i] = i.toString()
      }
    } else if (i <= 50) {
      if (!(i % 5)) {
        marks[i] = i.toString()
      }
    }
  }
  generate();
})

function copyPwd(text) {
  copy(text)
  ElMessage({
    type: "success",
    message: t("copySuccess")
  },)
}


</script>
<template>
  <div class="pwd-container">
    <div class="pwd-header">
         <el-icon class="icon-key"><Key/></el-icon>
      <el-button type="danger" @click="copyPwd(passwordResult)"   class="passwordResult" size="large" rows="1" >{{passwordResult}}</el-button>

      <span>
        <el-link   class="copy-button"  @click="copyPwd(passwordResult)">
              <el-icon >
                <CopyDocument/>
              </el-icon>
            </el-link>
      </span>


    </div>
    <el-card >
      <el-form   label-position="top" size="small">
        <el-row :gutter="35">
          <el-col :span="24">
            <el-form-item :label="$t('pwd.length')">
              <el-input-number v-model="length"  :min="1" :max="100"></el-input-number>
              &nbsp;&nbsp;&nbsp;
              <el-slider style="width: 380px" size="small"  :min="1" :max="100"
                         v-model="length"/>
            </el-form-item>
          </el-col>
          <el-col :span="24" >
            <el-form-item :label="$t('pwd.charInclude')">
              <el-checkbox-group v-model="chars">
                <el-checkbox v-for="(char,i) in charsList" :key="'char_'+i" :label="char.text">{{
                    char.name
                  }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col  :md="12">
            <el-form-item :label="$t('pwd.prefix')">
              <el-input v-model="prefix" :placeholder="$t('pwd.prefix_placeholder')"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :md="12">
            <el-form-item :label="$t('pwd.suffix')">
              <el-input v-model="suffix" :placeholder="$t('pwd.suffix_placeholder')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">&nbsp;</el-col>
          <el-col :span="24">
            <el-form-item :label="$t('pwd.firstChar')">
              <el-radio-group v-model="firstChar">
                <el-radio label="">{{ $t("pwd.no") }}</el-radio>
                <el-radio v-for="(char,i) in charsList" :key="'char_'+i" :label="char.text">{{ char.name }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('pwd.strength')">
              <el-progress style="width: 300px"  :format="(percentage) => ('')" :stroke-width="20"
                           :percentage="100/4*(strongResult.id+1)" :color="[
  { color: '#ff0000', percentage: 40 },
  { color: '#aaff00', percentage: 60 },
  { color: '#00c0af', percentage: 80 },
  { color: '#004aff', percentage: 100 },
]"/>
              <small>{{ strongResult.value }}</small>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-row style="display:flex;justify-content: center;margin-top: 20px">
      <el-button size="large" type="danger" round @click="generate"><el-icon><Setting /></el-icon> &nbsp;&nbsp;{{$t("pwd.title")}}</el-button>
      <el-button size="large" type="success" round @click="copyPwd(passwordResult)"><el-icon><CopyDocument /></el-icon> &nbsp;&nbsp;{{$t("copy")}}</el-button>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.pwd-container{
  max-width: 700px;
  margin: auto;
}
.pwd-header {
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0050c3;
  color: #ffffff;
  position: relative;
  border-radius: 10px 10px  0 0;
  & .passwordResult {
    margin-left: 30px;
    width: calc(100% - 80px);
    overflow: hidden;
    display: inline-block;
    background-color: transparent;
    font-size: 18px;
    position: relative;
    color: #ffffff;
    border: none;
    text-shadow: 1px 1px 1px #01092c;
    line-height: 15px;
    font-style: italic;

    &:hover{
      color: #ffd800;
      cursor: pointer;
      text-shadow: 1px 1px 1px #01092c;
      transform: scale(1.03);
    }
    &:after{
      content: "";
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5;
      background-color: transparent;
    }
  }

  & .icon-key {
    display: inline-block;
    height: 100%;
    width: 80px;
    text-align: center;
    position: absolute;
    line-height: 60px;
    font-size: 30px;
    left: 0;
    top: 0;
    text-shadow: 1px 1px 1px #01092c;
  }
  .copy-button{
    display: inline-block;
    height: 100%;
    width: 60px;
    text-align: center;
    position: absolute;
    line-height: 55px;
    font-size: 22px;
    right: 0;
    top: 0;
    color: white;

    &:hover{
      color: #ffd800;
      cursor: pointer;
    }
  }

}
</style>
