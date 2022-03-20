export default {
  data() {
    return {
      pagination: {
        per_page: 5,
        total_page: '',
        current_page: '',
        current_page_data: [],
      },
    };
  },
  methods: {
    getPage() {
      this.pagination.total_page = Math.ceil(this.apiData.length / this.pagination.per_page);
      this.updatePage(1);
    },
    updatePage(nowPage) {
      this.pagination.current_page = nowPage;
      this.pagination.current_page_data = [];
      const minData = this.pagination.current_page * this.pagination.per_page
        - this.pagination.per_page + 1;
      const maxData = this.pagination.current_page * this.pagination.per_page;
      this.apiData.forEach((item, index) => {
        const num = index + 1;
        if (num >= minData && num <= maxData) {
          this.pagination.current_page_data.push(item);
        }
      });
    },
  },
};
