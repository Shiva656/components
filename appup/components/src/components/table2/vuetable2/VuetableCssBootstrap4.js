// Bootstrap4 with FontAwesome
export default {
    table: {
      tableWrapper: "",
      tableHeaderClass: "mb-0",
      tableBodyClass: "mb-0",
      tableClass: "table table-bordered table-hover",
      loadingClass: "loading",
      ascendingIcon: "fa fa-chevron-up",
      descendingIcon: "fa fa-chevron-down",
      ascendingClass: "sorted-asc",
      descendingClass: "sorted-desc",
      sortableIcon: "",
      detailRowClass: "vuetable-detail-row",
      handleIcon: "fa-bars text-secondary",
      renderIcon(classes, options) {
        return `<i class="${classes.join(" ")}" ${options}></span>`;
      }
    },
  
    pagination: {
      wrapperClass: 'pagination float-right',
      activeClass: 'active',
      disabledClass: 'disabled',
      pageClass: 'page-item',
      linkClass: 'page-link',
      paginationClass: 'pagination',
      paginationInfoClass: 'float-left',
      dropdownClass: 'form-control',
      icons: {
        first: 'fa fa-chevron-left',
        prev: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        last: 'fa fa-chevron-right',
      }
    }
  };
  