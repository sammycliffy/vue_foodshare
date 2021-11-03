<template>
  <div class="scroll-overflow">
    <div v-if="!sharingRound">Something Occured. Please, Try Again</div>

    <div class="half-width">
      <div class="top-bar">
        <div class="top-row d-flex justify-content-between">
          <div class="d-flex justify-content-between">
            <partials-back-nav-button />
            <div class="div">
              <span>
                <img
                  :src="
                    FILE_BLOB ||
                    sharingRound.groupImage ||
                    '/assets/empty-photo.svg'
                  "
                  class="sharerLogoDisplay mr-2"
                />
              </span>
              <span class="primary-p text_semiBold color-green"
                >{{ sharingRound.name }}
              </span>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-between mt-3">
          <p class="color-orange mb-0">
            Order deadline
            <span class="d-block color-black pr-2">
              <!-- {{
              new Date(sharingRound.cutOffTime).toLocaleString()
            }} -->
              {{ sharingRound.cutOffTimeWithDay }}
            </span>
          </p>
          <p class="color-orange text-right mb-0">
            Sharing day
            <span class="d-block color-black pl-2">
              <!-- {{
              new Date(sharingRound.endTime).toLocaleString()
            }} -->
              {{ sharingRound.endTimeWithDay }}
            </span>
          </p>
        </div>
        <div class="mt-16">
          <p class="color-orange mb-0">
            Sharing Location
            <span class="d-block color-black">
              <span>{{ sharingRound.sharingAddress.lineOne }}</span
              >&comma;
              <span v-if="sharingRound.sharingAddress.lineTwo"
                >{{ sharingRound.sharingAddress.lineTwo }} &comma;</span
              >
              <span>{{ sharingRound.sharingAddress.town }}</span
              >&comma;
              <span>{{ sharingRound.sharingAddress.state }}</span>
            </span>
          </p>
        </div>
      </div>
      <div class="body-primary">
        <nav class="d-flex justify-content-between mb_15">
          <div class="">
            <span class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="25"
                fill="currentColor"
                class="bi bi-basket2"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0v-2z"
                />
                <path
                  d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6H2.163z"
                />
              </svg>
            </span>

            <span class="text-uppercase text_label">Basket</span>
          </div>
          <p class="m-0 text_bold">
            Total:&nbsp; NGN
            {{ Intl.NumberFormat().format(basketWorth) }}
          </p>
        </nav>

        <section
          v-for="(item, index) in sharingRound.commoditiesDetails"
          :key="item.commodityName + '-' + index"
        >
          <template v-if="cartPayload.sharedCommodities[index]">
            <div
              v-if="!cartToggle[index]"
              class="round_commodity"
              @click="toggleCartDropDown(index)"
            >
              <div class="d-flex justify-content-between">
                <div class="d-flex justify-content-around">
                  <div class="">
                    <div class="item__image">
                      <img
                        :src="item.imageUrl || '/assets/empty-photo.svg'"
                        class="commodityImg"
                      />
                    </div>
                    <div
                      v-show="item.sharingComment"
                      style="
                        width: 80px;
                        overflow: hidden;
                        text-transform: lowercase;
                      "
                      class="mt-1"
                    >
                      <p class="m-0 fs-12" v-text="item.sharingComment"></p>
                    </div>
                  </div>
                  <div class="ml-3 my-auto">
                    <span class="d-block primary-p text_semiBold">{{
                      item.commodityName
                    }}</span>
                    <p
                      v-if="
                        cartPayload.sharedCommodities[index] &&
                        cartPayload.sharedCommodities[index].numberOfSlots > 0
                      "
                      class="mb-0 mt-2"
                    >
                      {{ cartPayload.sharedCommodities[index].numberOfSlots }}
                      <span
                        v-text="
                          cartPayload.sharedCommodities[index].numberOfSlots > 1
                            ? 'slots'
                            : 'slot'
                        "
                      />
                      &nbsp;added&nbsp;
                    </p>
                    <p class="mb-0 mt-1 color-green text_medium">
                      <span
                        v-if="
                          cartPayload.sharedCommodities[index] &&
                          cartPayload.sharedCommodities[index].numberOfSlots > 0
                        "
                        >NGN
                        {{
                          Intl.NumberFormat().format(
                            item.sharingPrice *
                              cartPayload.sharedCommodities[index].numberOfSlots
                          )
                        }}
                      </span>
                      <span v-else>
                        NGN
                        {{ Intl.NumberFormat().format(item.sharingPrice) }}
                        <span class="d-block toggle_text_sub">
                          <span>
                            <span v-if="item.sharingUnits == 0.25"
                              >per 1/4</span
                            >
                            <span v-if="item.sharingUnits == 0.5">per 1/2</span>
                            <span v-if="item.sharingUnits == 0.75">
                              per 3/4</span
                            >
                            <span v-if="item.sharingUnits >= 1"
                              >per {{ item.sharingUnits }}</span
                            >
                            {{ item.unitOfMeasurement }}
                          </span>
                        </span>
                      </span>
                    </p>
                    <p
                      v-if="
                        cartPayload.sharedCommodities[index] &&
                        cartPayload.sharedCommodities[index].numberOfSlots > 0
                      "
                      class="mb-0 mt-2"
                    >
                      <span class="color-orange text-semiBold">Edit</span>
                    </p>
                  </div>
                </div>
                <span class="align-self-center toggle_icon text-right">
                  <!-- <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg> -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-check-lg color-green text-center"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div v-show="cartToggle[index]" class="round_commodity_toggle">
              <div class="d-flex justify-content-between">
                <h3 class="text_semiBold toggle_item_name">
                  {{ item.commodityName }}
                </h3>
                <span class="toggle_icon" @click="toggleCartDropDown(index)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-chevron-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                    />
                  </svg>
                </span>
              </div>
              <div class="">
                <b-row class="my-2 mx-0">
                  <b-col>
                    <div class="toggle_img_host text-center">
                      <div class="item__image">
                        <img
                          :src="item.imageUrl || '/assets/empty-photo.svg'"
                          class="commodityToggleImg"
                        />
                      </div>
                    </div>
                  </b-col>
                  <b-col>
                    <p class="toggle_text m-0">Sharing Price</p>
                    <span class="toggle_price text_bold d-block">
                      NGN
                      {{ Intl.NumberFormat().format(item.sharingPrice) }}</span
                    >
                    <span class="d-block toggle_text_sub">
                      <span v-if="item.sharingUnits == 0.25">per 1/4</span>
                      <span v-if="item.sharingUnits == 0.5"> per 1/2</span>
                      <span v-if="item.sharingUnits > 0.5"
                        >per {{ item.sharingUnits }}</span
                      >
                      {{ item.unitOfMeasurement }}
                    </span>
                  </b-col>
                </b-row>
                <b-row class="mx-0">
                  <b-col class="input-r-seperator input-col">
                    <div class="form-group">
                      <label class="toggle_label" for="remainingSlots">
                        <span>{{ item.remainingSlots }} available</span>
                        <span
                          v-text="item.remainingSlots > 1 ? 'slots' : 'slot'"
                        />
                      </label>
                      <input
                        v-model="cart[index]"
                        type="number"
                        min="0"
                        :max="item.remainingSlots"
                        class="form-control toggle_input"
                        :placeholder="
                          cartPayload.sharedCommodities[index]
                            ? cartPayload.sharedCommodities[index].numberOfSlots
                            : 'Enter # of slots e.g 0.5, 0.75, 1'
                        "
                      />
                    </div>
                  </b-col>
                  <b-col class="input-l-seperator input-col">
                    <b-btn
                      class="btn primary-btn mt-sub"
                      @click="addToCart(item, index, 'update')"
                      >Save Basket</b-btn
                    >
                  </b-col>
                </b-row>
              </div>
              <div class="">
                <hr
                  v-show="item.savings >= 1 || item.openMarketPrices"
                  class=""
                />
                <div
                  v-if="item.savings >= 1"
                  class="d-flex justify-content-between mb-0"
                >
                  <p class="mb-0 fs-12">Savings</p>
                  <p
                    v-if="
                      cartPayload.sharedCommodities[index] &&
                      cartPayload.sharedCommodities[index].numberOfSlots > 0
                    "
                    class="mb-0 color-orange text_semiBold fs-12"
                  >
                    NGN
                    {{
                      Intl.NumberFormat().format(
                        item.savings *
                          cartPayload.sharedCommodities[index].numberOfSlots
                      )
                    }}
                  </p>
                  <p v-else class="mb-0 color-orange text_semiBold fs-12">
                    NGN {{ Intl.NumberFormat().format(item.savings) }}
                  </p>
                </div>
                <div
                  v-if="item.openMarketPrices[0]"
                  class="d-flex justify-content-between"
                >
                  <!-- <p class="mb-0 fs-12">Open Market Price</p> -->
                  <p class="mb-0 fs-12">
                    {{ item.openMarketPrices[0].marketName }} Market Price
                  </p>
                  <p class="mb-0 fs-12 color-black text_semiBold">
                    {{
                      Intl.NumberFormat().format(
                        item.openMarketPrices[0].marketPrice
                      )
                    }}
                  </p>
                </div>
              </div>
              <!-- <div v-if="item.topMarkets" class="">
                <h6 class="toggle_text text_medium">Top Open Market Prices</h6>
                <div
                  v-for="market in item.topMarkets"
                  :key="market.id"
                  class=""
                >
                  <div class="row topMarket_item_mb">
                    <div class="col-8 input-r-seperator input-col">
                      <p class="toggle_text m-0">{{ market.name }}:</p>
                    </div>
                    <div class="col-4 input-l-seperator input-col">
                      <p class="toggle_text m-0 text_bold">
                        NGN &nbsp;{{ market.amount }}
                      </p>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
          </template>
        </section>
        <div class="text-center mb-2">
          <b-btn
            v-show="basketWorth"
            class="btn primary-btn padded-btn btn-block"
            @click="gotoLogistics"
            >Next</b-btn
          >
        </div>
        <header class="mb_15 mt-4">
          <span class="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="25"
              fill="currentColor"
              class="bi bi-card-list"
              viewBox="0 0 16 16"
            >
              <path
                d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
              />
              <path
                d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"
              />
            </svg>
          </span>
          <span class="text-uppercase text_label">Round List</span>
        </header>

        <section
          v-for="(item, index) in sharingRound.commoditiesDetails"
          :key="item.commodityName + '- -' + index"
        >
          <div
            v-if="!roundToggle[index]"
            class="round_commodity"
            :class="
              cartPayload.sharedCommodities[index] &&
              cartPayload.sharedCommodities[index].numberOfSlots > 0
                ? 'd-none'
                : ''
            "
            @click="toggleRoundDropDown(index)"
          >
            <div class="d-flex justify-content-between">
              <div class="d-flex justify-content-around">
                <div class="">
                  <div class="item__image">
                    <img
                      :src="item.imageUrl || '/assets/empty-photo.svg'"
                      class="commodityImg"
                    />
                  </div>
                  <div
                    v-show="item.sharingComment"
                    style="
                      width: 80px;
                      overflow: hidden;
                      text-transform: lowercase;
                    "
                    class="mt-1"
                  >
                    <p class="m-0 fs-12" v-text="item.sharingComment"></p>
                  </div>
                </div>
                <div class="ml-3 my-auto">
                  <span class="d-block item__name">{{
                    item.commodityName
                  }}</span>
                  <p class="mb-0 mt-2">
                    <span>{{ item.remainingSlots }}</span>
                    <span v-text="item.remainingSlots > 1 ? 'slots' : 'slot'" />
                    &nbsp;available&nbsp;
                  </p>
                  <p
                    v-if="
                      cartPayload.sharedCommodities[index] &&
                      cartPayload.sharedCommodities[index].numberOfSlots > 0
                    "
                    class="mb-0 mt-2"
                  >
                    {{ cartPayload.sharedCommodities[index].numberOfSlots }}
                    <span
                      v-text="
                        cartPayload.sharedCommodities[index].numberOfSlots > 1
                          ? 'slots'
                          : 'slot'
                      "
                    />
                    &nbsp;added&nbsp;
                  </p>
                  <p class="mb-0 mt-1 color-green text_medium">
                    <span
                      v-if="
                        cartPayload.sharedCommodities[index] &&
                        cartPayload.sharedCommodities[index].numberOfSlots > 0
                      "
                      >NGN
                      {{
                        Intl.NumberFormat().format(
                          item.sharingPrice *
                            cartPayload.sharedCommodities[index].numberOfSlots
                        )
                      }}
                    </span>
                    <span v-else>
                      NGN
                      {{ Intl.NumberFormat().format(item.sharingPrice) }}
                      <span class="d-block toggle_text_sub">
                        <span>
                          <span v-if="item.sharingUnits == 0.25">per 1/4</span>
                          <span v-if="item.sharingUnits == 0.5"> per 1/2</span>
                          <span v-if="item.sharingUnits > 0.5"
                            >per {{ item.sharingUnits }}</span
                          >
                          {{ item.unitOfMeasurement }}
                        </span>
                      </span>
                    </span>
                  </p>
                </div>
              </div>
              <span class="align-self-center text-right">
                <span v-if="item.remainingSlots >= 1" class="toggle_icon">
                  <!-- <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg> -->
                  <span class="btn select-btn">Select</span>
                </span>
                <span v-else class="toggle_icon color-orange">Sold Out</span>
              </span>
            </div>
            <hr v-show="item.savings >= 1" class="" />
            <div
              v-if="item.savings >= 1"
              class="d-flex justify-content-between mb-0"
            >
              <p class="mb-0 fs-12">Savings</p>
              <p
                v-if="
                  cartPayload.sharedCommodities[index] &&
                  cartPayload.sharedCommodities[index].numberOfSlots > 0
                "
                class="mb-0 color-orange text_semiBold fs-12"
              >
                NGN
                {{
                  Intl.NumberFormat().format(
                    item.savings *
                      cartPayload.sharedCommodities[index].numberOfSlots
                  )
                }}
              </p>
              <p v-else class="mb-0 color-orange text_semiBold fs-12">
                NGN {{ Intl.NumberFormat().format(item.savings) }}
              </p>
            </div>
          </div>
          <div v-show="roundToggle[index]" class="round_commodity_toggle">
            <div class="d-flex justify-content-between">
              <h3 class="text_bold toggle_item_name">
                {{ item.commodityName }}
              </h3>
              <span class="toggle_icon" @click="toggleRoundDropDown(index)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-chevron-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                  />
                </svg>
              </span>
            </div>
            <div class="">
              <b-row class="my-2 mx-0">
                <b-col>
                  <div class="toggle_img_host text-center">
                    <div class="item__image">
                      <img
                        :src="item.imageUrl || '/assets/empty-photo.svg'"
                        class="commodityToggleImg"
                      />
                    </div>
                  </div>
                </b-col>
                <b-col>
                  <p class="toggle_text m-0">Sharing Price</p>
                  <span class="toggle_price text_bold d-block">
                    NGN
                    {{ Intl.NumberFormat().format(item.sharingPrice) }}</span
                  >
                  <span class="d-block toggle_text_sub">
                    <span v-if="item.sharingUnits == 0.25">per 1/4</span>
                    <span v-if="item.sharingUnits == 0.5"> per 1/2</span>
                    <span v-if="item.sharingUnits == 0.75"> per 3/4</span>
                    <span v-if="item.sharingUnits >= 1"
                      >per {{ item.sharingUnits }}</span
                    >
                    {{ item.unitOfMeasurement }}
                  </span>
                </b-col>
              </b-row>
              <b-row class="mx-0">
                <b-col class="input-r-seperator input-col">
                  <div class="form-group">
                    <!-- <label class="toggle_label" for="remainingSlots">
                      <span
                        >{{ item.remainingSlots }} &nbsp;available&nbsp;</span
                      >
                      <span
                        v-text="item.remainingSlots > 1 ? 'slots' : 'slot'"
                      />
                    </label> -->
                    <label class="toggle_label" for="remainingSlots">
                      <span>{{ item.remainingSlots }} available </span>
                      <span v-if="item.remainingSlots > 1">slots</span>
                      <span v-else>slot</span>
                    </label>
                    <input
                      v-model="cart[index]"
                      type="number"
                      min="0"
                      :max="item.remainingSlots"
                      class="form-control toggle_input"
                      :placeholder="
                        cartPayload.sharedCommodities[index]
                          ? cartPayload.sharedCommodities[index].numberOfSlots
                          : 'Enter # of slots e.g 0.5, 0.75, 1'
                      "
                    />
                  </div>
                </b-col>
                <b-col class="input-l-seperator input-col">
                  <b-btn
                    class="btn primary-btn mt-sub"
                    @click="addToCart(item, index)"
                    >Add To Basket</b-btn
                  >
                </b-col>
              </b-row>
            </div>
            <div class="">
              <hr v-show="item.savings >= 1" class="" />
              <div
                v-if="item.savings >= 1"
                class="d-flex justify-content-between mb-0"
              >
                <p class="mb-0 fs-12">Savings</p>
                <p
                  v-if="
                    cartPayload.sharedCommodities[index] &&
                    cartPayload.sharedCommodities[index].numberOfSlots > 0
                  "
                  class="mb-0 color-orange text_semiBold fs-12"
                >
                  NGN
                  {{
                    Intl.NumberFormat().format(
                      item.savings *
                        cartPayload.sharedCommodities[index].numberOfSlots
                    )
                  }}
                </p>
                <p v-else class="mb-0 color-orange text_semiBold fs-12">
                  NGN {{ Intl.NumberFormat().format(item.savings) }}
                </p>
              </div>

              <!-- <div class="d-flex justify-content-between">
                <p class="mb-0 fs-12">Open Market Price</p>
                <p class="mb-0 color-black text_semiBold fs-12">
                  NGN {{ Intl.NumberFormat().format(5000) }}
                </p>
              </div> -->
            </div>
            <!-- <div v-if="item.topMarkets" class="">
              <h6 class="toggle_text text_medium">Top Open Market Prices</h6>
              <div v-for="market in item.topMarkets" :key="market.id" class="">
                <div class="row topMarket_item_mb">
                  <div class="col-8 input-r-seperator input-col">
                    <p class="toggle_text m-0">{{ market.name }}:</p>
                  </div>
                  <div class="col-4 input-l-seperator input-col">
                    <p class="toggle_text m-0 text_bold">
                      NGN &nbsp;{{ market.amount }}
                    </p>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </section>
      </div>
    </div>

    <partials-footer v-if="AUTH" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      AUTH: this.$store.state.auth.loggedIn,
      cart: [],
      cartToggle: [],
      roundToggle: [],
      basketWorth: 0,

      // sharerLogo
      FILE_BLOB: null,

      // fetch stuff from vuex
      cartPayload: this.$store.state.cart.payload,
      sharingRound: this.$store.state.cart.round,

      sharerId: this.$route.params.sharerId,
      sharingRoundId: this.$route.params.sharingRoundId,

      // sharerLogo
      sharingGroupLogo: '/assets/empty-photo.svg',
    }
  },

  mounted() {
    this.calculateBasketWorth()
  },

  methods: {
    toggleCartDropDown(index) {
      this.cartToggle[index] = !this.cartToggle[index]
      this.$forceUpdate()
    },

    toggleRoundDropDown(index) {
      this.roundToggle[index] = !this.roundToggle[index]
      this.$forceUpdate()
    },

    addToCart(item, index, action) {
      if (this.cart[index] < 0.5) {
        // Delete from Cart
        this.cartPayload.sharedCommodities[index] = null

        // Toggle drop-down
        this.toggleCartDropDown(index)
        // Save cart data to a perstisted Vuex store
        this.$store.commit('cart/SAVE_CART_DATA', this.cartPayload)
      } else if (
        this.cart[index] <=
        this.sharingRound.commoditiesDetails[index].remainingSlots
      ) {
        this.cartPayload.sharedCommodities[index] = {
          numberOfSlots: this.cart[index],
          pricePerSlot: item.sharingPrice,
          sharedCommodityId: item.id,
          sharedCommodityName: item.commodityName,
          imageUrl: item.imageUrl,
        }

        // toggle
        action === 'update'
          ? this.toggleCartDropDown(index)
          : this.toggleRoundDropDown(index)

        // Save cart data to a perstisted Vuex store
        this.$store.commit('cart/SAVE_CART_DATA', this.cartPayload)
      } else {
        // Display warning toast notification
        // this.ERROR_HANDLER(
        //   'Please enter at least one slot to proceed',
        //   'warning'
        // )
        this.$bvToast.toast('Please enter at least one slot to proceed', {
          title: 'No slot entered!',
          variant: 'warning',
          solid: true,
        })
      }
      this.calculateBasketWorth()
    },

    calculateBasketWorth() {
      let worth = 0
      try {
        this.sharingRound.commoditiesDetails.forEach((el, index) => {
          worth += this.cartPayload.sharedCommodities[index]
            ? this.cartPayload.sharedCommodities[index].numberOfSlots *
              el.sharingPrice
            : 0
        })
      } catch (e) {
        this.$router.replace(
          `/r/${this.sharingRound.sharerId}/${this.sharingRound.id}/`
        )
      } finally {
        this.basketWorth = worth
        this.$forceUpdate()
      }
    },

    gotoLogistics() {
      this.$router.replace('/cart/logistics/')
    },
  },
}
</script>

<style scoped>
.scroll-overflow {
  padding-bottom: 0;
  background-color: transparent;
}
.body-primary {
  padding-top: 20px;
  top: 200px;
  z-index: 5;
  bottom: 0;
  /* position: absolute; */
  min-height: 71vh;
  background-color: #eef5ee;
  overflow-y: auto;
  padding-bottom: 80px;
}

.top-bar {
  background-color: #ffffff;
  margin-top: unset;
  padding-top: 30px;
  scroll-padding-bottom: 19px;
}

.joinRound_details {
  font-weight: 500;
}

.round_commodity {
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid rgba(245, 245, 245, 1);
  font-size: 15px;
  line-height: 22px;
  padding: 10px;
  margin-bottom: 25px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
}

.commodityListBox {
  padding: 30px 0 10px;
}

.item__image {
  height: 80px;
  width: 80px;
  border-radius: 20px;
}

.item__name {
  font-size: 18px;
  line-height: 22px;
  color: rgba(20, 8, 8, 0.9);
  font-weight: bolder;
}

.item__price {
  color: #fe8f0a;
}

.round_commodity_toggle {
  background-color: #ffffff;
  padding: 10px 17px;
  margin-bottom: 25px;
  border: 1px solid rgba(183, 185, 197, 0.27);
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.05);
}

.toggle_label {
  font-size: 12px;
  color: #000000;
  margin: 6px 10px;
}

.toggle_input {
  border: 1px solid #4f9e55;
  color: #000000;
  padding: 10px;
  height: 40px;
}

.toggle_input::-webkit-input-placeholder {
  /* Edge */
  font-size: 12px;
  line-height: 22px;
  color: rgba(100, 100, 100, 0.81);
  word-break: break-all;
}

.toggle_input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  font-size: 12px;
  line-height: 22px;
  color: rgba(100, 100, 100, 0.81);
  word-break: break-all;
}

.toggle_input::placeholder {
  font-size: 12px;
  line-height: 22px;
  color: rgba(100, 100, 100, 0.81);
  word-break: break-all;
}

.mt-sub {
  margin-top: 30px;
  font-size: 14px;
  line-height: 7px;
  height: 40px;
}

.topMarket_item_mb {
  margin-bottom: 8px;
}

.toggle_text {
  font-size: 15px;
  line-height: 22px;
  color: #000000;
}

.toggle_text_sub {
  font-size: 12px;
  line-height: 22px;
  color: #b7b9c5;
}

.toggle_price {
  font-size: 20px;
  line-height: 22px;
  color: #4f9e55;
  margin: 2px 0;
}

.toggle_icon > svg {
  color: #000000;
}

.toggle_item_name {
  font-size: 18px;
  line-height: 22px;
  margin-top: 13px;
}

.toggle_img_host {
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.toggle_img_host > .item__image {
  height: 100px;
  width: 100px;
}

.mb_15 {
  margin-bottom: 15px;
}

.text_label {
  vertical-align: middle;
  font-size: 15px;
  line-height: 22px;
}
hr {
  margin-bottom: 5px;
  margin-top: 15px;
}
</style>
