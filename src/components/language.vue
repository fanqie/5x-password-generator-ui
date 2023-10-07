<script setup>
import {langItems} from '../assets/lang/'
import {ref,onMounted} from "vue";
import { useRouter } from 'vue-router'
import {useI18n} from "vue-i18n/dist/vue-i18n.esm-bundler.js";
const router = useRouter()
const path=ref("")
let {locale} = useI18n()
onMounted(()=>{
  console.log(router.currentRoute.value);
  path.value=router.currentRoute.value.path
})
</script>
<template>
  <div v-if="router.currentRoute.value.matched[0]">
    <template v-for="lang in langItems">
      <el-space :size="20">
        <el-link :type="lang.lang===locale?'danger':'info'" :href="`${router.currentRoute.value.matched[0].path.replace(/:lang\?/,lang.lang)}`" >{{lang.name}}</el-link>
      </el-space>
    </template>
  </div>
</template>

<style scoped>

</style>
