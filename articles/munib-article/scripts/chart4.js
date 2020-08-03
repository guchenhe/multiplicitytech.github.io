var options = {
  colors: ['#eb3e42', '#74fbd1','#777'],
  series: [ {
    name: 'Yes',
    data: [39,36,36,33,33,31,31,29,27,27,27,27,26,26,25,25,24,23,23,23,22,22,21,19,19,18,17,16,14]
  },
  {
    name: 'No',
    data: [48,58,56,55,59,56,61,59,68,65,64,58,65,69,68,66,70,64,68,65,74,64,67,71,71,68,78,77,80]
  }, {
    name: "Don't know",
    data: [13,6,8,12,8,13,8,12,5,8,9,15,9,5,7,9,6,13,9,12,4,14,12,10,10,14,5,7,6]
  }],
  chart: {
    fontFamily: 'ministry, sans-serif',
    type: 'bar',
    height: 600,
    stacked: true,
    toolbar: {
      show: false
    }

  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
  stroke: {
    width: 1,
    colors: ['#fff']
  },
  title: {
    text: ['Do you use software that prevents your online activities from being monitored? (%)'],
    style: {
      fontFamily: 'ministry, sans-serif'
    },

  },
  xaxis: {
    categories: [['🇸🇰','SK','🔴'], ['🇱🇺','LU'], ['🇦🇹','AT'],['🇩🇪','DE'], ['🇸🇮', 'SI','🔴'], ['🇬🇧','UK'],['🇵🇹','PT'],['🇲🇹','MT'],['🇨🇾','CY'],["🇬🇷",'EL'], ["🇪🇺",'EU','🔵'], ["🇩🇰",'DK'], ['🇮🇪','IE'], ['🇫🇷','FR'], ["🇪🇸",'ES'],['🇵🇱','PL','🔴'],['🇭🇺','HU','🔴'],['🇨🇿','CZ','🔴'],['🇧🇪','BE'],['🇫🇮','FI'],['🇮🇹','IT'],['🇪🇪','EE','🔴'],['🇸🇪','SE'],['🇧🇬','BG','🔴'],['🇭🇷','HR','🔴'],["🇳🇱",'NL'],["🇷🇴",'RO','🔴'],["🇱🇻",'LV','🔴'],["🇱🇹",'LT','🔴']],                              
    labels: {
      rotate: false
    }
  },
  yaxis: {
    max: 100
  },
  tooltip: {
    enabled: false
  },
  fill: {
    opacity: 1

  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    offsetX: 40,
    onItemClick: {
      toggleDataSeries: false
    },
    onItemHover: {
      highlightDataSeries: false
    },

  },
  states: {
    hover: {
      filter: {
        type: 'lighten',
        value: 0.15,
      }
    },
    active: {
      filter: {
        type: 'none' /* none, lighten, darken */
      }
    },



  }

};

var chart = new ApexCharts(document.querySelector("#chart4"), options);
chart.render();




