<template>
  <nav class="">
    <b-input-group class="searchBarDiv poppins mt-2 mb-4">
      <b-form-input
        v-model="searchInput"
        class="searchBarInput bg-transparent border-right-0 addon-left"
        placeholder="Search for commodities"
        required
        @keyup.enter="searchItem()"
      />
      <b-input-group-append @click="searchItem()">
        <b-input-group-text
          class="color-white input-addon bg_green border-0 pl-3 pr-3 addon-right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            />
          </svg>
        </b-input-group-text>
      </b-input-group-append>
    </b-input-group>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      searchInput: null,
    }
  },

  methods: {
    searchItem() {
      this.$router.push(`/search/#!/${this.searchInput}`)
    },
  },
}
</script>
