<template>
  <section class="Reviews">
    <div class="Max__Width Padded">
      <img :src="require('~/assets/img/customer-testimonials.png')" width="170" alt="Customer Testimonials">
      <h2>
        From Our Amazing Customers
      </h2>
      <div class="row">
        <Flickity :options="flickityOptions">
          <div class="carousel-cell" v-for="(review,index) in reviews" :key="index">
            <div class="Review">
              <div class="review-header">
                <div class="rating">
                  <img :src="i <= review.stars ? require('~/assets/img/star.svg') : require('~/assets/img/star-gray.svg')" v-for="i in 5" :key="'star-' + i" width="12" />
                </div>
                <div class="review-date">
                  <p>{{review.date}}</p>
                </div>
              </div>
              <div class="review-content">
                <h5>{{review.author}}</h5>
                <p>{{review.testimonial}}</p>
              </div>
            </div>
          </div>
        </Flickity>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    reviews: {}
  },
  data: function() {
    return {
      flickityOptions: {
        pageDots: false,
        wrapAround: true,
        cellAlign: 'left',
        groupCells: 1,
        autoPlay: true,
        arrowShape: 'M 59, 72 L 59, 28 L 27.5, 50 L 21.5, 50 L 63, 20 L 63, 80 L 21.5, 50 L 27.5, 50  Z'
      },
    };
  }
}
</script>
<style lang="scss">
.Reviews {
  .carousel-cell {
    @include bp(500px) {
      width: 50%;
    }
    @include bp(820px) {
      width: 25%;
    }
    width: 66.66667%;
    padding: 15px 20px;
  }
  .flickity-enabled {
    width: 100%;
  }
  .Review {
    .review-header {
      overflow: auto;
      height: 30px;
      .rating {
        text-align: left;
        float: left;
        img {
          margin-left: 4px;

          &:first-child {
            margin-left: 0px;
          }
        }
      }
      .review-date {
        float: right;
        p {
          font-size: 12px;
          color: #999;
        }
      }
    }
    .review-content {
      text-align: left;

      h5 {
        font-size: 11px;
        color: #333333;
        font-weight: 400;
        margin-bottom: 5px;
        padding-bottom: 0;
        text-align: left;
        text-transform: uppercase;
      }
      & > p {
        text-align: left;
        margin: 0 0 15px;
        font-style: normal;
        line-height: 1.8em; 
        font-size: 16px;
      }
    }
  }
  .flickity-prev-next-button {
    top: unset;
    background: transparent;
    border: 1px solid;
    opacity: 0.6;
    transition: opacity .2s ease-in-out;
    &.previous {
      left: calc(50% - 100px);
    }
    &.next {
      right: calc(50% - 100px);
    }
    &:hover {
      opacity: 1;
    }
  }
}
</style>
