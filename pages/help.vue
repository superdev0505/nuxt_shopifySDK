<template>
  <section>
    <div class="Max__Width">
      <h2 class="title">Help</h2>
      <div class="content">
        <p><strong>What Makes Our Bunch the Best?</strong></p>
        <p><strong>Soo soft:</strong> We may be a Bunch of Animals but our underwear are softer than a fluffy kitten, thanks to MicroModal which is 3x softer than cotton</p>
        <p><strong>Sooo not sticky:</strong> MicroModal is 50% more breathable than cotton</p>
        <p><strong>Sooo not stinky:</strong> Unlike synthetic fabrics such as rayon or polyester, MicroModal doesn't trap sweat or odors</p>
        <p><strong>Sooo cool:</strong> Literally! MicroModal doesn't trap in body heat (no more sweaty coconuts)</p>
        <p><strong>Mother Earth approved:</strong> MicroModal is made from beech, a sustainably-harvested tree</p>
        <p><strong>Easy to care for:</strong> Our products are long-lasting, hard-wearing and color-fast.</p>
        <p><strong>No shrinkage:</strong> Thanks to a touch of Elastane, our undies keep their size (even if your name is George Costanza)</p>
        <p><strong>Unrivaled Styling:</strong> Bunch of Animals' unique printing process ensures a seamless design in vibrant colors</p>
        <p><strong>One Of a Kind Designs:</strong> Every month, we introduce new designs, curated from artists worldwide</p>
        <p><strong>Comfy Waistbands:</strong> Ultra-soft and flexible make them uber-comfy</p>
        <p><strong>Bunch of Philanthropists:</strong> A portion of every purchase supports local charities</p>
        <p>&nbsp;</p>
        <p><strong>Do you have a size chart for the underwear?</strong></p>
        <table class="sizeChart">
            <thead>
                <tr>
                    <th>Size</th>
                    <th>XS</th>
                    <th>S</th>
                    <th>M</th>
                    <th>L</th>
                    <th>XL</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Waist</td>
                    <td>24-25"</td>
                    <td>26-28"</td>
                    <td>29-31"</td>
                    <td>32-34"</td>
                    <td>35-37"</td>
                </tr>
            </tbody>
        </table>
        <p>We recommend sizing up if you prefer a looser fit or if you are in between sizes.</p>
        <p>&nbsp;</p>
        <p><strong>What are the washing instructions for the underwear?</strong></p>
        <p>For best performance and longevity, please hand wash cold and lay flat to dry. This will help to protect the color of the garment and the fabric. Please do not iron, bleach, or dry clean.</p>
      </div>
      
    </div>
  </section>
</template>

<script>
export default {
  components: {}
};
</script>

<style scoped lang="scss">
.Max__Width {
  .title {
    padding-top: 70px;
    padding-bottom: 60px;
    background: #f4f4f4;
    text-transform: capitalize;
    color: #364491;
    font-size: 60px;
    font-weight: 600;
    font-family: "Josefin sans";
  }
  .content {
    max-width: 1000px;
    padding-left: 10%;
    padding-right: 10%;
    margin-left: auto;
    margin-right: auto;
    color: #666;
    font-size: 20px;
    font-weight: 300;
    line-height: 1.6;
    p {
      text-align: left;
    }
    table.sizeChart {
        border: 1px solid #CCC;
        border-collapse: collapse;
        width: 100%;
        thead th {
            font-size: 15px;
            font-weight: bold;
            color: #333333;
            background: #f9f9f9;
        }
        tr {
            border-bottom: 1px solid #DCDCDC;  
            &:first-child {
                border-top: 1px solid #DCDCDC;
            }
            
        }
        th, td {
            border: 1px solid #CCC;
            padding: 7px 10px;
            text-align: left;
        }
    }
  }
}
</style>

