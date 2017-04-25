$(document).ready(function(){

	$(".current_masting").each(function(){
		$(".current").append($(this));
	});

	$(".current_year").each(function(){
		$(".currentyear").append($(this));
	});

	$(".masting2016").each(function(){
		$(".year2016").append($(this));
	});

	$(".masting2015").each(function(){
		$(".year2015").append($(this));
	});

	$(".masting2014").each(function(){
		$(".year2014").append($(this));
	});

	$(".masting2013").each(function(){
		$(".year2013").append($(this));
	});

	$(".masting2012").each(function(){
		$(".year2012").append($(this));
	});

	$(".masting2011").each(function(){
		$(".year2011").append($(this));
	});

	$(".yearcontainer > h3").click(function(){
		$(this).next().toggleClass("big");
		if ($(this).children().hasClass("fa-chevron-right") == true) {
			$(this).children().removeClass('fa-chevron-right').addClass('fa-chevron-down');
		}
		else {
			$(this).children().removeClass('fa-chevron-down').addClass('fa-chevron-right');
		}
	});

	// CHART.JS

	var ctx = document.getElementById("myChart").getContext('2d');
	var myChart = new Chart(ctx, {
	  type: 'pie',
	  options: {
	  		  defaultFontSize: 20,
	  		  animation: false,
	          legend: {
	              display: false,
	          }
	  },
	  data: {
	    labels: ["Multiple sections", "The Sovereign, the Governor General and the Prime Minister", "Sovereign's Family", "Former Governor General", "Former Prime Minister", "Chief Justice of Canada and Members of the Canadian Ministry", "Lieutenant Governors", "Privy Councillors and Senators", "Members of the House of Commons", "Accredited Heads of Mission to Canada while in Canada", "Half-Masting Initiated by a Province or Territory", "Special Days", "Foreign Heads of State or Heads of Government - Half-masting Abroad", "Special Circumstances in a Foreign Country", "Employees of the Federal Government", "Foreign Heads of State or Heads of Government - Half-masting in Canada", "Exceptional Circumstances", "Delegation of Authority", "Information from the Department of Canadian Heritage", "Procedures: Legal holidays", "Procedures: Visiting Foreign Head of State or Head of Government", "Procedures: Exceptions to Sections 19 and 20", "Procedures: Half-Masting Notice", "Procedures: Coming into Effect"],
	    datasets: [{
	      backgroundColor: [
	        "#494947",
	        "#CB4B16",
	        "#1F8261",
	        "#FFA500",
	        "#35FF69",
	        "#44CCFF",
	        "#7494EA",
	        "#D138BF",
	        "#C6C5B9",
	        "#62929E",
	        "#EDB7AB",
	        "#D7FDEC",
	        "#A9FBD7",
	        "#938BA1",
	        "#9C528B",
	        "#7371FC",
	        "#E8FFB7",
	        "#0CCA4A",
	        "#03254E",
	        "#D64933",
	        "#D4AA7D",
	        "#90A9B7",
	        "#CC444B"

	      ],
	      data: [$(".multiple").length, 
	      $(".rule1").length,
	      $(".rule2").length,
	      $(".rule3").length,
	      $(".rule4").length,
	      $(".rule5").length,
	      $(".rule6").length,
	      $(".rule7").length,
	      $(".rule8").length,
	      $(".rule9").length,
	      $(".rule10").length,
	      $(".rule11").length,
	      $(".rule12").length,
	      $(".rule13").length,
	      $(".rule14").length,
	      $(".rule15").length,
	      $(".rule16").length,
	      $(".rule17").length,
	      $(".rule18").length,
	      $(".rule19").length,
	      $(".rule20").length,
	      $(".rule21").length,
	      $(".rule22").length,
	      $(".rule23").length

	      ]
	    }]
	  }
	});

});