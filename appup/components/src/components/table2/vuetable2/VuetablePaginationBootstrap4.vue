<template>
  <nav>
    <ul class="pagination">
      <li :class="['page-item', {'disabled': isOnFirstPage}]">
        <a class="page-link" @click.prevent="loadPage('prev')">
          <span>&laquo;</span>
        </a>
      </li>
      
      <template v-if="notEnoughPages">
        <li v-for="n in totalPage" :key="n" :class="['page-item', {'active': isCurrentPage(n)}]">
          <a class="page-link" @click.prevent="loadPage(n)" v-html="n"></a>
        </li>
      </template>
      <template v-else>
        <li v-for="n in windowSize" :key="n" :class="['page-item', {'active': isCurrentPage(windowStart+n-1)}]">
          <a class="page-link" @click.prevent="loadPage(windowStart+n-1)" v-html="windowStart+n-1"></a>
        </li>
      </template>

      <li :class="['page-item', {'disabled': isOnLastPage}]">
        <a class="page-link" href="" @click.prevent="loadPage('next')">
          <span>&raquo;</span>
        </a>
      </li>
    </ul>  
  </nav>
</template>

<script>
import VuetablePaginationMixin from "./VuetablePaginationMixin.vue";

export default {
  mixins: [VuetablePaginationMixin]
};
</script>
