import BackTop from "components/content/backTop/BackTop"
import {POP, NEW, SELL} from "./const";
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  }
};
