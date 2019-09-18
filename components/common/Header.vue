<template>
  <header>
    <div class="free-shiping">
      <p>
        FREE CANADA AND US SHIPPING ON ALL ORDERS OVER $70
      </p>
    </div>
    <nav class="container">
      <div class="Bar">
        <button
          @click.prevent="toggleNav"
          class="hamburger hamburger--slider"
          :class="{'is-active':isNavOpen}"
          aria-label="menu"
          type="button"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
        <nuxt-link to="/" class="Logo">Bunch of Animals</nuxt-link>
      </div>
      <ul class="Main">
        <li v-for="m in menus.main" :key="m.label">
          <nuxt-link :to="m.url">{{ m.label }}</nuxt-link>
        </li>
      </ul>
      <ul class="Right">
        <li v-for="m in menus.account" :key="m.label">
          <nuxt-link :to="m.url">{{ m.label }}</nuxt-link>
        </li>
      </ul>
      <ul class="Cart">
        <li>
          <nuxt-link to="/cart">
            <img src="https://cdn.shopify.com/s/files/1/0002/3117/8243/t/12/assets/cart.png">
            <span class="badge" v-if="this.$store.state.lineItemCount>0">{{ this.$store.state.lineItemCount }}</span>
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <div class="mobile-nav" v-bind:class="isNavOpen ? 'active' : ''" v-scroll-lock="isNavOpen">
      <button
        @click.prevent="toggleNav"
        class="hamburger hamburger--slider"
        :class="{'is-active':isNavOpen}"
        aria-label="menu"
        type="button"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
      <ul>
        <li v-for="m in menus.mobile" :key="m.label" @click.prevent="toggleNav">
          <nuxt-link :to="m.url">{{ m.label }}</nuxt-link>
        </li>
      </ul>
    </div>
  </header>
</template>
<script>
export default {
  data: function() {
    return {
      menus: {
        main: [
          { label: "Our Story", url: "/our-story" },
          { label: "Boxer Briefs", url: "/boxer-briefs" }
        ],
        account: [
          { label: "Help", url: "/help" },
          { label: "Login", url: "/account" }
        ],
        mobile: [
          { label: "Boxer Briefs", url: "/boxer-briefs" },
          { label: "Our Story", url: "/our-story" },
          { label: "Contact Us", url: "/contact-us" },
          { label: "Help", url: "/help" },
          { label: "My Account", url: "/account" },
          { label: "Privacy Policy", url: "/privacy-policy" },
          { label: "Terms & Conditions", url: "/terms-conditions" },
          { label: "Refund Policy", url: "/refund-policy" },
        ]
      },
      isNavOpen: false,
    };
  },
  methods: {
    toggleNav() {
      if (!this.isNavOpen) {
        //disableBodyScroll(this.$refs.nav);
        //this.closeSearch();
      } else {
        //enableBodyScroll(this.$refs.nav);
      }
      //prevents minor header jump
      setTimeout(() => {
        this.isNavOpen = !this.isNavOpen;
      }, 1);
    },
    closeNav() {
      if (!this.isNavOpen) return;
      //enableBodyScroll(this.$refs.nav);
      setTimeout(() => {
        this.isNavOpen = false;
      }, 1);
    }
  }
};
</script>

<style scoped lang="scss">
header {
  @include bp($tablet) {
    position: absolute;
  }
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
}
.free-shiping {
  background-color: black;
  color: white;
  text-align: center;
  padding: 5px 0;
  p {
    font-size: 14px;
    color: white;
    line-height: 1.4em;
  }
}
nav {
  position: relative;
  a {
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 2px;
    color: #333;
    transition: color .2s ease-in-out;
    &:hover {
      color: #999;
      text-decoration: none;
    }
  }
}
.Bar {
  position: relative;
  height: $navHeight;

  display: flex;

  @include bp($navDesktop) {
    height: $navHeightDesktop;
  }
}
.hamburger {
  @include bp($tablet) {
    display: none;
  }
}
.mobile-nav {
  @include bp($tablet) {
    display: none;
  }

  .hamburger {
    position: absolute;
    top: 0;
    left: 0;
  }
  z-index: 9999;
  opacity: 0;
  display: none;
  transform: scale(0.5);
  visibility: hidden;
  transition: all 0.5s;
  &.active {
    visibility: visible;
    opacity: 1;
    transform: scale(1);
    position: fixed;
    display: block;
    left: 0;
    right: 0;
    top: 0px;
    bottom: 0;
    background: white;
    text-align: center;
    padding-top: 40px;
  }
  li {
    text-transform: capitalize;
    font-weight: 600;
    font-size: 24px;
    line-height: 1.8em;
    letter-spacing: 1px;
    text-decoration: underline;
    color: #364491;
    transition: color .2s ease-in-out;
    &:hover {
      color: #333;
    }
  }
}
.Logo {
  user-select: none;
  white-space: nowrap;
  display: inline-block;
  position: absolute;
  font-weight: 600;
  letter-spacing: 0px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  &:hover {
    text-decoration: none;
    color: black
  }
  @include poly-fluid-sizing(
    "font-size",
    (
      $mobileL: 20px,
      $laptop: 27px
    )
  );
}
.Main {
  display: none;
  @include bp($tablet) {
    display: flex;
    position: absolute;
    top: 50%;
    left: $spacing;
    transform: translateY(-50%);
    font-size: 1.5rem;
    li {
      margin-right: 32px;
    }
  }
}
.Right {
  display: none;
  @include bp($tablet) {
    display: flex;
    position: absolute;
    top: 50%;
    right: 50px;
    transform: translateY(-50%);
    font-size: 1.5rem;
    li {
      margin-right: 32px;
    }
  }
}
.Cart {
  display: flex;
  position: absolute;
  top: 50%;
  @include bp($tablet) {
    right: $spacing;
  }
  right: 15px;
  transform: translateY(-50%);
  font-size: 1.5rem;
  li {
    img {
      width: 25px;
    }
    a {
      transition: opacity .2s ease-in-out;
    }
    a:hover {
      opacity: 0.5;
    }
    span.badge {
      width: 21px;
      height: 21px;
      font-size: 11px;
      font-weight: bold;
      padding: 0px;
      border-radius: 50%;
      position: absolute;
      right: -9px;
      top: -5px;
      background: #364491;
      color: #fff !important;
      display: block;
      line-height: 23px;
      text-align: center;
      text-indent: 3px;
      opacity: 1;
      transition: all .3s ease-out;
    }
  }
}

@media (max-width: 1200px) and (min-width: 768px) {
  .Main {
    li {
      margin-right: 24px;
    }
  }
  .Right {
    li {
      margin-right: 24x;
    }
  }
}
@media (max-width: 767px) {
  nav {
    width: 100%;
  }
}
</style>

