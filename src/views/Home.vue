<template>
  <div class="home">
    <DateForm></DateForm>
  </div>
</template>

<script>
// @ is an alias to /src
import DateForm from '@/components/DateForm.vue'

export default {
  name: 'home',
  components: {
    DateForm
  }
}
</script>
<style>
  .home {
    padding-top: 80px;
    width: 714px;
    margin: 0 auto;
  }
</style>
