<template>
    <section>
        <div class="info-box-container">
            <div class="info-boxes">
                <div class="info-box">
                    <img :src="require('~/assets/img/best-boxer-briefs.png')" class="testimonial__image left" alt="Best Boxer Brief" height="95">
                    <h2>The Best Boxer Briefs</h2>
                    <p>Voted best mens underwear, Bunch of Animals boxer briefs are built to last. Made with natural and breathable ultra soft Micro Modal, they give your stuff the support it needs without chafing or riding up.</p>
                </div>
                <div class="info-box">
                    <img :src="require('~/assets/img/get-lucky.png')" alt="Get Lucky" class="testimonial__image right" height="95">
                    <h2>Sexy Mens Underwear</h2>
                    <p>The world's most comfortable boxer briefs&nbsp;bringing you that&nbsp;sothern comfort. Cupping those magic balls juuuuust right to make you look - and feel - like you’re about to get lucky.</p>
                </div>
            </div>
        </div>
        <div class="info-box-container white" id="satisfaction-guaranteed">
            <div class="info-box">
                <img :src="require('~/assets/img/satisfaction-guarantee.png')" class="testimonial__image" alt="Satisfaction Guarantee" width="126">
                <h2>100% Satisfaction Guaranteed</h2>
                <p>Try BOAs risk-free today. If you’re not 100% satisfied with your first pair, we promise to make everything right. If you have any questions, before or after purchasing, <nuxt-link to="/contact-us"> please let us know!</nuxt-link></p>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    
}
</script>

<style lang="scss">
.info-box-container {
  background: #f4f4f4;
  display: flex;
  align-items: center;
  

  .info-boxes {
    display: flex;
    justify-content: center;
    @include bp($tablet) {
      flex-direction: row;
    }
    flex-direction: column;
    
    .info-box {
      @include bp($laptop) {
        max-width: 500px;
        width: 50%;
        padding-bottom: 0px;
      }
      width: 100%;;
      padding-bottom: 40px;
      text-align: center;
      margin: 0 auto;

      img {
        &.left {
          padding-bottom: 13px;
        }
        &.right {
          padding-top: 13px;
        }
      }

      p {
        max-width: 340px;
        line-height: 1.4em;
        letter-spacing: 1px;
        color: #333;
        margin: 0 auto;
        font-size: 18px;
        line-height: 1.8em;
      }
    }
  }
  padding: 70px 10px;
  flex-direction: column;
  margin: 0 auto;
  
  &.white {
    background: white;
    .info-box {
      max-width: 600px;
      text-align: center;
      img {
        padding-bottom: 13px;
      }
      p {
        letter-spacing: 1px;
        line-height: 1.8em;
        font-size: 18px;
        @include bp($tablet) {
          max-width: unset;
          width: 100%;
        }
          width: 340px;

        a {
          color: #364491;
          font-weight: 500;
          text-decoration: underline;
          transition: opacity .2s ease-in-out;

          &:hover {
            opacity: .6;
          }
        }
      }
    }
  }
}
</style>
