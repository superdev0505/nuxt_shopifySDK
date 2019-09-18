<template>
  <footer>
    <div class="subscription-section">
      <div class="subscription-container container">
        <p class="subscription-header">
          Sign up for exclusive updates, promos and collaborations.
        </p>
        <div class="subscription-form">
          <form action="https://3magine.us13.list-manage.com/subscribe/post?u=6330f3314a702c28374fa4783&amp;id=3b8b1db2c0" method="post" name="mc-embedded-subscribe-form" id="contact_form" class="contact-form" target="_blank" novalidate="">
              <input type="email" value="" name="EMAIL" class="contact_email" placeholder="Enter Email Address" required="">
              <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
              <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_6330f3314a702c28374fa4783_3b8b1db2c0" tabindex="-1" value=""></div>
              <input type="submit" value="Subscribe" name="subscribe" class="action_button sign_up">
          </form>
        </div>
      </div>
    </div>
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-logo">
          <nuxt-link to="/">
            <img src="//cdn.shopify.com/s/files/1/0002/3117/8243/files/bunch-of-animals-underwear-logo_70x.jpg?v=1553515103" alt="Bunch of Animals underwear logo" title="Bunch of Animals underwear logo" class="footer-logo__img">
          </nuxt-link>
        </div>
        <div class="footer-box-menu">
          <ul class="footer-menu">
            <li class="footer-menu__item" v-for="m in menus.collections" :key="m.label">
              <nuxt-link :to="m.url">{{ m.label }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="footer-box-menu">
          <ul class="footer-menu">
            <li class="footer-menu__item" v-for="m in menus.about_us" :key="m.label">
              <nuxt-link :to="m.url">{{ m.label }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="footer-box-menu">
          <ul class="footer-menu">
            <li class="footer-menu__item" v-for="m in menus.privacy" :key="m.label">
              <nuxt-link :to="m.url">{{ m.label }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="footer-box-menu"></div>
        <div class="footer-payment">
          <div class="payment-methods">
            <div class="footer-payment-text">100% guaranteed secure checkout</div>
            <img src="https://cdn.shopify.com/s/files/1/0002/3117/8243/files/credit-cards_x35.png?v=1521219018">
          </div>
        </div>
      </div>
      <div class="copyright">
        <p>Copyright 2019 <nuxt-link to="/">Bunch of Animals.</nuxt-link></p>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data: function() {
    return {
      menus: {
        collections: [
          { label: "Boxer Briefs", url: "/boxer-briefs" },
          { label: "Bundles", url: "/boxer-briefs" }
        ],
        about_us: [
          { label: "Our Story", url: "/our-story" },
          { label: "Contact Us", url: "/contact-us" },
          { label: "Help", url: "/help" }
        ],
        privacy: [
          { label: "My Account", url: "/account" },
          { label: "Privacy Policy", url: "/privacy-policy" },
          { label: "Terms & Conditions", url: "/terms-conditions" },
          { label: "Refund Policy", url: "/refund-policy" }
        ]
      }
    }
  }
}
</script>

<style scoped lang="scss">
.subscription-section {
  background: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  .subscription-container {
    
    display: flex;
    flex-direction: column;
    @include bp(960px) {
      flex-direction: row;
    }
    flex-wrap: nowrap;
    align-items: center;
    position: relative;
    justify-content: center;
    padding: 40px 5px;
    .subscription-header {
      max-width: 400px;
      
      font-size: 14px;
      color: #FFF;
      font-weight: 500;
      letter-spacing: 1.5px;
      
      @include bp($tablet) {
        max-width: unset;
      }
      @include bp(960px) {
        padding-right: 70px;
        text-align: left;
        width: 500px;
        margin: 0px;
      }
      text-align: center;
    }

    .subscription-form  {
      width: 100%;
      form {
        display: flex;
        @include bp($tablet) {
          flex-wrap: nowrap;
        }
        flex-wrap: wrap;
        .contact_email {
          border-radius: 0;
          font-size: 16px;
          color: #999999;
          @include bp($tablet) {
            margin: 0;
          }
          margin-bottom: 15px;
          height: 50px;
          width: 100%;
          box-shadow: none;
          font-family: Josefin Sans;
          -webkit-appearance: none;
          min-height: 40px;
          padding: 0 9px;
          line-height: 22px;
          border: 1px solid #dfdfdf;
          outline: none;
          background: #fff;
        }
        .action_button {
          margin: 0;
          border: 2px solid #fff;
          height: 50px;
          line-height: 49px;
          padding: 1px;
          background-color: #000;
          color: white;
          width: 100%;
          @include bp($tablet) {
            max-width: 250px;
          }
          min-width: 150px;
          font-size: 16px;
          -webkit-appearance: none;
          -webkit-border-radius: 0;
          text-transform: uppercase;
          font-weight: bold;
          transition: background-color .2s ease-in-out;
          transition: border-color .2s ease-in-out;

          &:hover {
            background-color: #364391;
            border-color: #364391;
          }
        }
      }
    }
  }
}
.footer-container {
  padding: 0 50px;
  width: 100%;
  max-width: 1440px;
  margin: auto;

  .footer-content {
    margin-top: 2.5em;
    padding: 25px 0;
    display: flex;
    @include bp($navDesktop) {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .footer-box-menu {
      padding: 15px 0;

      .footer-menu__item {
        text-transform: capitalize;
        margin-bottom: 2px;
        letter-spacing: 1.5px;
        color: #666;
        padding: 5px 0;

        a {
          font-size: 14px;
          transition: color .2s ease-in-out;

          &:hover {
            color: #999;
            text-decoration: none;
          }
        }

        @include bp($navDesktop) {
          text-align: left;
        }
        text-align: center;
      }
    }

    .footer-payment-text {
      text-transform: uppercase;
      font-size: 11px;
      color: #999999;
      font-weight: 400;
      text-align: center;
      margin-bottom: 10px;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  }
  .copyright {
    padding: 25px 0;
    @include bp($navDesktop) {
      text-align: left;
    }
    text-align: center;
    p {
      font-size: 14px;
      font-weight: 400;
      color: #ccc;
    }
  }
}


</style>