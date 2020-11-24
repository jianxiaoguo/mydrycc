<!--分页器-->
<template>
    <div id="ember1842" class="bg-white pv3 bt justify-center flex flex ember-view">      <span class="mh1 hk-button--disabled-tertiary">
        <svg style="height: 16px; width: 16px;" id="malibu-icon-svg-ember1843" class="icon malibu-icon mr1 fill-gray" data-test-icon-name="direction-left-16" aria-labelledby="malibu-icon-ember1843" data-test-target="malibu-icon" aria-hidden="false" role="img">
    <title id="malibu-icon-ember1843">Cannot go to previous page</title>
  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#direction-left-16"></use>
</svg>

        Previous
      </span>

        <a href="/apps?page=1" class="w3 mh--3 hk-button--tertiary bg-lightest-purple" data-ember-action="" data-ember-action-1845="1845">
            1
        </a>

        <!---->      <a href="/apps?page=2" class="w3 mh--3 hk-button--tertiary" data-ember-action="" data-ember-action-1847="1847">
            2
        </a>

        <!---->
        <a href="/apps?page=2" class="mh1 hk-button--tertiary" data-ember-action="" data-ember-action-1848="1848">
            Next
            <svg style="height: 16px; width: 16px;" id="malibu-icon-svg-ember1849" class="icon malibu-icon ml1 malibu-fill-gradient-purple" data-test-icon-name="direction-right-16" data-test-target="malibu-icon" aria-hidden="true" role="img">
                <!---->  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#direction-right-16"></use>
            </svg>

        </a>

    </div>
</template>

<script>
    export default {
        name: "page"
    }
</script>

<style scoped>

</style>
