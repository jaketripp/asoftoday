// ph stands for input placeholder
var vice = 
{
    soda: {
        brandph: 'Coke',
        container: 'Cans',
        containerph: '3',
        quantity: '12 pack',
        costph: '5.00',
    },
    cigarettes: {
        brandph: 'Marlboro',
        container: 'Cigarettes',
        containerph: '15',
        quantity: 'pack',
        costph: '7.50',    	
    }

}

function dynamicSettingsInputs() {
	// dynamically change labels and placeholders based on poison
	$('[value="' + localStorage.poison + '"]').prop('selected', true);
	var poison = vice[localStorage.poison];
	$('[name="brand"]').attr('placeholder', poison.brandph);
	$('#units').text(poison.container + ' per day:');
	$('[name="numPerDay"]').attr('placeholder', poison.containerph);
	$('#quantity').text('Cost per ' + poison.quantity + ': ($)');
	$('[name="cost"]').attr('placeholder', poison.costph);
	// dynamically show/hide fields
	toggleFields();
}

// update localStorage and change date input value
function getCurrentISODate() {
    var d = new Date();
    var n = d.toISOString();
    n = n.split('T');
    // n[0] is 2017-06-02 (input date format)

    if (localStorage.quitDate === undefined) {    	
    	localStorage.setItem("quitDate", n[0]);
    }
    $('[name="quitDate"]').val(localStorage.quitDate);
}

// handle if input[type="date"] isnt supported *cough* firefox
function normalizeDatepicker() {
	if (!Modernizr.inputtypes.date) {
		$('#datepicker').attr('type', 'text').datepicker({
			dateFormat: "yy-mm-dd"
		});
	}
}

// dynamically change link to return search query
function buildCustomURL() {
	var url = 'https://www.caffeineinformer.com/search#stq=';
	var brand = localStorage.brand || 'Coke';

	brand = brand.split(' ').join('+');

	url += (brand + '&stp=1');

	$('#caffeineContent').attr('href', url);
}

function toggleFields() {
	if (localStorage.getItem('poison') === 'soda') {
		$('.soda-exclusive').show();
		$('.cig-exclusive').hide();
	} else if (localStorage.getItem('poison') === 'cigarettes') {
		$('.cig-exclusive').show();
		$('.soda-exclusive').hide();
	}
}

// sync up localStorage with placeholders
function setDefaultLocalStorage() {
	
	if ($('select').val() === 'soda') {

		localStorage.setItem('poison', 'soda');
		localStorage.setItem('brand', 'Coke');
		localStorage.setItem('numPerDay', '3');
		localStorage.setItem('cost', '5.00');
		localStorage.setItem('caffeine', '34');
		localStorage.setItem('sugar', '39');

	} else if ($('select').val() === 'cigarettes') {
		localStorage.setItem('poison', 'cigarettes');
		localStorage.setItem('brand', 'Marlboro');
		localStorage.setItem('numPerDay', '15');
		localStorage.setItem('cost', '7.50');
		localStorage.setItem('time', '6');
	
	} 
}

function wipeInputValues() {
	$('input').each(function(i, element) {
		element.value = '';
	});
}

function init() {
	getCurrentISODate();
	normalizeDatepicker();
	buildCustomURL();

	if (localStorage.config === undefined) {
		setDefaultLocalStorage();
	}

	dynamicSettingsInputs();
}


$(document).ready(function(){

	// handle if no localStorage
	try {
    	localStorage.setItem('available', true);
    	localStorage.removeItem('available');
	} catch(e) {
		console.log(e)
	    sweetAlert({
	        html:true,
	        type: 'error',
	        title:'Oops...localStorage not available.',
	        text: 'Redirecting to the about page for troubleshooting options...',
	        showConfirmButton: false
	    });
	    setTimeout(function() {
			window.location.href = 'about.html';
		}, 2000)
	}

	init();

	$('select').on('change', function(){
		// once select value is changed, update localStorage and visible fields
		setDefaultLocalStorage();
		dynamicSettingsInputs();
		wipeInputValues();
	});

	$('input').on('change', function(e){
		// input lost focus AND input has a value
		if (e.currentTarget.value !== '') {

			localStorage.setItem("config", "true");

			// handle one by one
			localStorage.setItem(e.currentTarget.name, e.currentTarget.value);

			// update caffeine link if brand input blured
			if (e.currentTarget.name === "brand") {
				buildCustomURL();
			}
		}
	});

	// settings have been at least partially configured (2nd visit to settings page)
	if (localStorage.getItem('config') === 'true') {
		var data = $('form').serializeArray();

		// repopulate fields from localStorage
		$.each(data, function(i, obj){
			$('[name="' + obj.name + '"]').val(localStorage.getItem(obj.name));
		});
	}

});