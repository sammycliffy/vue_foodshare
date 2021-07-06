<template>
  <footer class="actionBar">
    <ul class="nav nav-pills nav-fill d-flex justify-content-between">
      <li class="nav-item">
        <nuxt-link
          v-b-tooltip.hover
          nuxt-link
          title="Dashboard"
          class="nav-link"
          to="/sharer/dashboard/"
        >
          <img class="nav-icon" src="/assets/icons/home.svg" />
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link
          v-b-tooltip.hover
          nuxt-link
          title="Members"
          class="nav-link"
          to="/sharer/dashboard/group/"
        >
          <img class="nav-icon" src="/assets/icons/group.svg" />
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link
          v-b-tooltip.hover
          nuxt-link
          title="Create round"
          class="nav-link"
          to="/sharer/round/create/"
        >
          <img class="actionBtn" src="/assets/icons/actionbtn-2.svg" />
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link
          v-b-tooltip.hover
          nuxt-link
          title="Ongoing Sharing Rounds "
          class="nav-link"
          to="/sharer/dashboard/rounds/basket/"
        >
          <img class="nav-icon" src="/assets/icons/round-basket.svg" />
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link
          v-b-tooltip.hover
          title="Account"
          class="nav-link"
          to="/profile/"
        >
          <img class="nav-icon" src="/assets/icons/profile.svg" />
        </nuxt-link>
      </li>
    </ul>
  </footer>
</template>
