function deleteLegend() {
	for (i=24; i>-1;i--){
		$("text").eq(i).remove();
	}
	for (i=25; i>-1;i--){
		$("path").eq(i).remove();
	}
}

function placeContent() {
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
}

$(".yearcontainer > h3").click(function(){
	$(this).next().toggleClass("big");
	if ($(this).children().hasClass("fa-chevron-right") == true) {
		$(this).children().removeClass('fa-chevron-right').addClass('fa-chevron-down');
	}
	else {
		$(this).children().removeClass('fa-chevron-down').addClass('fa-chevron-right');
	}
});

function chartJS(){
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
	        "#00005F",
	        "#FFFF00",
	        "#1CE6FF",
	        "#FF34FF",
	        "#008941",
	        "#006FA6",
	        "#A30059",
	        "#63FFAC",
	        "#B79762",
	        "#997D87",
	        "#FFB500",
	        "#C2FFED",
	        "#7900D7",
	        "#D25B88",
	        "#6C5E46",
	        "#6C8F7D",
	        "#BDC9D2",
	        "#EA8B66",
	        "#00C6C8",
	        "#494B5A",
	        "#B894A6",
	        "#006A66",
	        "#F4D749",
	       	"#6B94AA", 

	      ],
	      data: [
	      $(".multiple").length, 
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
};


$(document).ready(function(){
	setTimeout(deleteLegend, 1000);
	chartJS();
	placeContent();
});