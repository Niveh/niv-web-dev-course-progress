// $("h1").on("mouseover", function () {
// 	$("h1").css("color", "purple");
// });

// $("h1").on("mouseleave", function () {
// 	$("h1").css("color", "yellow");
// });

// $("h1").before("<button>New</button>");
// $("h1").after("<button>New</button>");
// $("h1").prepend("<button>New</button>");
// $("h1").append("<button>New</button>");
// // $("button").remove();

$("button").on("click", function () {
	$("h1").slideUp().slideDown().animate({ opacity: 0.5 });
});
