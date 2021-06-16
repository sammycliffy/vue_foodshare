<template>
  <footer class="actionBar">
    <ul class="nav nav-pills nav-fill d-flex justify-content-between">
      <li class="nav-item">
        <nuxt-link
          v-b-tooltip.hover
          nuxt-link
          title="Home"
          class="nav-link"
          to="/user/"
        >
          <img class="nav-icon" src="/assets/icons/home.svg" />
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link
          v-b-tooltip.hover
          nuxt-link
          title="Sharing Groups"
          class="nav-link"
          to="/user/groups/"
        >
          <img class="nav-icon" src="/assets/icons/group.svg" />
        </nuxt-link>
      </li>

      <li class="nav-item">
        <nuxt-link
          v-b-tooltip.hover
          nuxt-link
          title="Orders"
          class="nav-link"
          to="/user/order/"
        >
          <img
            class="height-18 nav-icon"
            src="/assets/icons/shopping-basket.svg"
          />
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link
          v-b-tooltip.hover
          nuxt-link
          title="Dashboard"
          class="nav-link"
          to="/user/dashboard/"
        >
          <img class="nav-icon height-20" src="/assets/icons/statistics.svg" />
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link
          v-b-tooltip.hover
          title="Profile"
          class="nav-link"
          to="/profile/"
        >
          <img class="nav-icon" src="/assets/icons/profile.svg" />
        </nuxt-link>
      </li>
    </ul>
  </footer>
</template>
