$(document).ready(function(){

// dynamically update the number of diet cokes listed for mom
function dynamicDietCokes() {
	var quitDate = new Date(2017, 01, 23, 13);
	var currentDate = Date.now();
	var hours = (currentDate - quitDate) / 3600000; 
	var dietCokes = (Math.round(hours / 4)).toString();
	$('#num').text(dietCokes);
}

// dynamically add external icon to li's w/ external links 
function addExternalIcons() {
	$('li a[target="_blank"]').each(function(i, a) {
		a.innerHTML+=' <i class="small external icon"></i>';
	});
}

// dynamically add down carets to h3's
function addCaretIcons() {
	$('h3').not('#donate').not('#thanks').each(function(i, a) {
		a.innerHTML+=' <i class="small caret down icon" style="color: #4d4d4d"></i>';
	});
}

function toggle(){
	// start hidden using jQuery instead of CSS (in case someone views the page with JS disabled)
	$('h3').not('#donate').not('#thanks').next('.toggle').css('display', 'none');

	// make everything but Donate and Acknowledgements toggle-able
	// rotate caret (add class and use css)
	// scroll page
	$('h3').off();
	$('h3').not('#donate').not('#thanks').on('click', function(e){
		$(this).next('.toggle').slideToggle(300);
		$(this).toggleClass('rotate');
		$('html, body').animate({
			scrollTop: $(e.target).offset().top - 50
		}, 'slow');
	})
}

// takes in total oz drank per day and total cost per day
// returns approx cans per day and cost per 12 pack
// i.e. '60', '5.67'
// should return "5.0 cans per day. $13.61 per 12 pack." 
function convertToCans(totalOZ, totalCost) {
	// convert str to num
	var totalOZ = Number(totalOZ);
	var totalCost = Number(totalCost);

	var numberOfCans = (totalOZ / 12).toFixed(2).toString();

	var twelvePackCost = ((totalCost * 12) / numberOfCans).toFixed(2).toString();

	// only update localStorage if both inputs are filled
	if ($('[name="oz"]').val() && $('[name="cost"]').val()) {
		localStorage.setItem('numPerDay', numberOfCans);
		localStorage.setItem('cost', twelvePackCost);
	}
}

// semantic tooltip
function popup() {
    // set the popup to manual (as opposed to click or hover)
    $('#convert').popup({on: 'manual'});

    // show on click
    $('#convert').on('click', function() {
		// only show popup if both inputs are filled
		if ($('[name="oz"]').val() && $('[name="cost"]').val()) {
	        $('#convert').popup('show');
	        // hide after 1 second
	        setTimeout(function() {
	            $('#convert').popup('hide');
	        }, 1000)
	    }
    });
}

// handle clear localStorage button message
function sweetAlert() {
	swal({
		title: "Are you sure?",
		text: "You will not be able to recover your current settings!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#CA1010",
		confirmButtonText: "Yes, clear localStorage!",
		closeOnConfirm: false
	},
	function(){
		swal({
			html: true,
			title: "Clear!",
			text: "Your localStorage has been cleared. Redirecting...",
			type: "success",
			showConfirmButton: false
		});
		localStorage.clear();
		// don't redirect back to landing page
		localStorage.seenLanding = 'true';
		// redirect to settings page (prevent errors and makes it easy?)
		setTimeout(function() {
			window.location.href = 'settings.html';
		}, 2000)
	});
}

function init() {

	dynamicDietCokes();
	addExternalIcons();
	addCaretIcons();
	toggle();
	$('#clearLS').on('click', sweetAlert);
	if (localStorage) {
		popup();
		$('#convert').on('click', function(){
			convertToCans($('[name="oz"]').val(),$('[name="cost"]').val());
		});

	}
}

init();

});
