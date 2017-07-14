// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
// All of this created with love by Jake Tripp June 2017
// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

// handle if there is no localStorage (kinda odd but works?)
try {
    localStorage.setItem('available', true);
    localStorage.removeItem('available');
} catch(e) {
    sweetAlert({
        html:true,
        type: 'error',
        title:'Oops...localStorage not available.',
        text: 'Redirecting to the about page for troubleshooting options...',
        showConfirmButton: false
    });
    setTimeout(function() {
        window.location.href = 'views/about.html';
    }, 2000)
}

if (localStorage.seenLanding === undefined) {
    $('body').css('display', 'none');
    window.location.href = 'views/landing.html';
}

// =========
// VARIABLES 
// =========

// hardcoded local storage (a reference)
// var ls = {
//     brand:"Dr. Pepper",
//     caffeine:"41",
//     config:"true",
//     cost:"5.00",
//     numPerDay:"6",
//     poison:"soda",
//     quitDate:"2017-02-23",
//     sugar:"1",
//     time:"10"
// }

// Date.parse throws a fit in some browsers - parse manually
var dateArr = localStorage.getItem('quitDate').split('-');
var dYear = dateArr[0],
    dMonth = dateArr[1] - 1,
    dDay = dateArr[2];

var quitDate = new Date(dYear, dMonth, dDay);
var currentDate = Date.now();

// milliseconds / 1000
var seconds = (currentDate - quitDate) / 1000; 
var minutes = seconds / 60;
var hours = minutes / 60;
var days = Math.floor(hours / 24);

// use the number per day to find the avg amount of time between
// use later to decide the total number (number of hours / hours in between)
var hoursBetweenPoison = (24 / Number(localStorage.numPerDay));

var quotes = {
    0: "“I avoid looking forward or backward, and try to keep looking upward.” – Charlotte Brontë",
    1: "“The best time to plant a tree was 20 years ago. The second best time is now.” – Chinese proverb",
    2: "“Sometimes you can only find Heaven by slowly backing away from Hell.” – Carrie Fisher",
    3: "“Believe you can and you’re halfway there.” – Theodore Roosevelt",
    4: "“Nothing is impossible; the word itself says, ‘I’m possible!’” – Audrey Hepburn",
    5: "“People often say that motivation doesn’t last. Neither does bathing. That’s why we recommend it daily.” – Zig Ziglar",
    6: "“What lies behind us and what lies before us are tiny matters compared to what lies within us.” – Ralph Waldo Emerson",
    7: "“Success is the sum of small efforts, repeated day in and day out.” – Robert Collier",
    8: "“It’s difficult to believe in yourself because the idea of self is an artificial construction. You are, in fact, part of the glorious oneness of the universe. Everything beautiful in the world is within you.” – Russell Brand",
    9: "“When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.” – Henry Ford",
    10: "“If we are facing in the right direction, all we have to do is keep on walking.” – Zen proverb",
    11: "“Though no one can go back and make a brand new start, anyone can start from now and make a brand new ending.” – Carl Bard",
    12: "“I hated every minute of training, but I said, ‘Don’t quit. Suffer now and live the rest of your life as a champion.’” – Muhammad Ali",
    13: "“It is not easy to find happiness in ourselves, and it is not possible to find it elsewhere.” – Agnes Repplier",
    14: "“If things go wrong, don’t go with them.” – Roger Babson",
    15: "“Our greatest glory is not in never failing, but in rising up every time we fail.” – Ralph Waldo Emerson",
    16: "“When the past calls, let it go to voicemail. Believe me, it has nothing new to say.” – Unknown",
    17: "“Everyone has inside of him a piece of good news. The good news is that you don’t know how great you can be! How much you can love! What you can accomplish! And what your potential is!” – Anne Frank",
    18: "“It always seems impossible until it’s done.” – Nelson Mandela",
    19: "“The greatest mistake you can make in life is to continually be afraid you will make one.” – Elbert Hubbard",
    20: "“Tomorrow is the most important thing in life. Comes into us at midnight very clean. It’s perfect when it arrives and it puts itself in our hands. It hopes we’ve learned something from yesterday.” – John Wayne",
    21: "“What progress, you ask, have I made? I have begun to be a friend to myself.” – Hecato",
    22: "“Every worthy act is difficult. Ascent is always difficult. Descent is easy and often slippery.” – Mahatma Gandhi",
    23: "“People can be more forgiving than you can imagine. But you have to forgive yourself. Let go of what’s bitter and move on.” – Bill Cosby",
    24: "“Life is like riding a bicycle. To keep your balance you must keep moving.” – Albert Einstein",
    25: "“If you can quit for a day, you can quit for a lifetime.” – Benjamin Alire Sáenz",
    26: "“I understood, through rehab, things about creating characters. I understood that creating whole people means knowing where we come from, how we can make a mistake and how we overcome things to make ourselves stronger.” – Samuel L. Jackson",
    27: "“In the midst of winter, I found there was, within me, an invincible summer. And that makes me happy. For it says that no matter how hard the world pushes against me, within me, there’s something stronger — something better, pushing right back.” – Albert Camus",
    28: "“Patience and the mulberry leaf becomes a silk gown.” – Chinese proverb",
    29: "“It is by going down into the abyss that we recover the treasures of life. Where you stumble, there lies your treasure.” – Joseph Campbell",
    30: "“Whether you think you can or you think you can’t, you’re right.” – Henry Ford",
    31: "“There came a time when the risk to remain tight in the bud was more painful than the risk it took to blossom.” – Anaïs Nin",
    32: "“The most common way people give up their power is by thinking they don’t have any.” – Alice Walker",
    33: "“The past is a ghost, the future a dream and all we ever have is now.” – Bill Cosby",
    34: "“Don’t judge each day by the harvest you reap but by the seeds that you plant.” – Robert Louis Stevenson",
    35: "“Not feeling is no replacement for reality. Your problems today are still your problems tomorrow.” – Larry Michael Dredla",
    36: "“I think that the power is the principle. The principle of moving forward, as though you have the confidence to move forward, eventually gives you confidence when you look back and see what you’ve done.” – Robert Downey Jr.",
    37: "“Turn your face to the sun and the shadows fall behind you.” – Charlotte Whitton",
    38: "“Every experience in your life is being orchestrated to teach you something you need to know to move forward.” – Brian Tracy",
    39: "“Be yourself; everyone else is already taken.” – Oscar Wilde",
    40: "“Fall seven times, stand up eight.” – Japanese proverb",
    41: "“Either you run the day, or the day runs you.” – Jim Rohn",
    42: "“I have learned over the years that when one’s mind is made up, this diminishes fear.” – Rosa Parks",
    43: "“When was the last time you woke up and wished you’d had just one more drink the night before? I have never regretted not drinking. Say this to yourself, and you’ll get through anything.” – Meredith Bell",
    44: "“The best way out is always through.” – Robert Frost",
    45: "“If you don’t know where you are going, you’ll end up someplace else.” – Yogi Berra",
    46: "“Amazing how we can light tomorrow with today.” – Elizabeth Barrett Browning",
    47: "“Sometimes we motivate ourselves by thinking of what we want to become. Sometimes we motivate ourselves by thinking about who we don’t ever want to be again.” – Shane Niemeyer",
    48: "“Every noble work is at first impossible.” – Thomas Carlyle",
    49: "“The great thing in this world is not so much where you stand, as in what direction you are moving.” – Oliver Wendell Holmes",
    50: "“Every strike brings me closer to the next home run.” – Babe Ruth",
    51: "“I’ve been absolutely terrified every moment of my life – and I’ve never let it keep me from doing a single thing I wanted to do.” – Georgia O’Keeffe",
    52: "“Keep steadily before you the fact that all true success depends at last upon yourself.” – Theodore T. Hunger",
    53: "“Character cannot be developed in ease and quiet. Only through experience of trial and suffering can the soul be strengthened, ambition inspired, and success achieved.” – Helen Keller",
    54: "“Never say anything about yourself you do not want to come true.” – Brian Tracy",
    55: "“If you hear a voice within you say ‘you cannot paint,’ then by all means paint and that voice will be silenced.” – Vincent Van Gogh",
    56: "“To improve the golden moment of opportunity, and catch the good that is within our reach, is the great art of life.” – Samuel Johnson",
    57: "“As one goes through life, one learns that if you don’t paddle your own canoe, you don’t move.” – Katharine Hepburn",
    58: "“Happiness is where we find it, but rarely where we seek it.” – J. Petit Senn",
    59: "“We may think there is willpower involved, but more likely … change is due to want power. Wanting the new addiction more than the old one. Wanting the new me in preference to the person I am now.” – George Sheehan",
    60: "“What makes the desert beautiful is that somewhere it hides a well.” – Antoine de Saint-Exupery",
    61: "“Man never made any material as resilient as the human spirit.” – Bernard Williams",
    62: "“I dwell in possibility.” – Emily Dickinson",
    63: "“The only journey is the one within.” – Rainer Maria Rilke",
    64: "“What is addiction, really? It is a sign, a signal, a symptom of distress. It is a language that tells us about a plight that must be understood.” – Alice Miller",
    65: "“If you accept the expectations of others, especially negative ones, then you never will change the outcome.” – Michael Jordan",
    66: "“I can’t change the direction of the wind, but I can adjust my sails to always reach my destination.” – Jimmy Dean",
    67: "“When you get into a tight place and everything goes against you, till it seems you could not hang on a minute longer, never give up then, for that is just the place and time that the tide will turn.” – Harriet Beecher Stowe",
    68: "“You must do the things you think you cannot do.” – Eleanor Roosevelt",
    69: "“The only person you are destined to become is the person you decide to be.” – Ralph Waldo Emerson"
}


// ===================
// AUXILIARY FUNCTIONS
// ===================

// add commas to numbers
function commafy(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// return random integer between min and max
function getRandomInt(min, max) {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// use correct plural ending based on count (i.e. 1 diet coke vs 2 diet cokes) 
function pluralize(count, word) {
    return count === 1 ? count + ' ' + word : count + ' ' + word + 's';
}

// converts hours to simplified time (1 year, 3 months, 2 weeks, 1 day, 9 hours) and appends string
function formatTime(hours, sentenceEnd) {
    var value = hours;

    var units = {
        "year": 24*365,
        "month": 24*30,
        "week": 24*7,
        "day": 24,
        "hour": 1
    }

    var result = [];

    for(var name in units) {
        var p =  Math.floor(value/units[name]);
        if (p > 0) {
            result.push(pluralize(p,name));
        }
        value %= units[name];
    }

    var str = result[0];

    for (var i = 1; i < result.length; i++) {
        str += (', ' + result[i]);
    }

    return (str + sentenceEnd);
}


// =========================
// POISON SPECIFIC FUNCTIONS
// =========================

function decideDOMRender() {
    // at least one setting has been configured
    if (localStorage.config) {
        if (localStorage.poison === 'soda') {
            sodas();
        } else if (localStorage.poison === 'cigarettes') {
            cigarettes();
        }
    // somehow user got to stats page without configuring settings 
    } else {
        swal({
            html:true,
            type: 'error',
            title:'Settings not configured',
            text:'Redirecting to settings page...',
            showConfirmButton: false
        }, 
        // redirect to settings page (prevent errors and makes it easy?)
        setTimeout(function() {
            window.location.href = 'views/settings.html';
        }, 2000)
        );
    }
}

function sodas() {
    // establish variables exclusive to sodas

    var brand = localStorage.brand;

    // number of hours / how many hours in between drinks ( 4 a day ~ 1 every 6 hours ish)
    var totalSodas = Math.round(hours / hoursBetweenPoison);

    var costPerOne = (Number(localStorage.cost) / 12.00);
    var dollars = Math.round(totalSodas * costPerOne); 

    // 12 oz per can, 128 oz per gallon
    var gallons = ((totalSodas * 12) / 128).toFixed(1); 

    // approx 40 gallons in a full bathtub
    var bathtubs = (gallons / 40.0).toFixed(1);

    // sodas * caffeine per soda
    var caffeine = totalSodas * (Number(localStorage.caffeine)); 

    var kilogramsSugar = totalSodas * (Number(localStorage.sugar)) / 1000;

    var lbsSugar = (kilogramsSugar * 2.20462).toFixed(1); 

    // 1 lb of aluminum used per 31 sodas
    var aluminumSaved = (totalSodas / 31).toFixed(1);

    // add commas to numbers
    var totalSodasWithCommas = commafy(totalSodas);
    var daysWithCommas = commafy(days);
    var dollarsWithCommas = commafy(dollars);
    var gallonsWithCommas = commafy(gallons);
    var caffeineWithCommas = commafy(caffeine);
    var aluminumWithCommas = commafy(aluminumSaved);
    var sugarWithCommas = commafy(lbsSugar);

    $('ul').append('<li id="days"></li><li id="dollars"></li><li id="gallons"></li><li id="bathtubs"></li><li id="caffeine"></li><li id="aluminum"></li>')

    $('h1').html("As of today, I've given up <span id='num'>" + pluralize(totalSodasWithCommas,brand) + ". </span><br>I can give up <em>one more</em>.");
    $('#days').text(daysWithCommas + " day streak");
    $('#dollars').text("$" + dollarsWithCommas + " saved");
    $('#gallons').text(gallonsWithCommas + " gallons");
    $('#bathtubs').text(bathtubs + " full bathtubs");
    $('#caffeine').text(caffeineWithCommas + " mg of caffeine");
    $('#aluminum').text(aluminumWithCommas + " lbs of aluminum");

    // only include sugar li if soda has more than 1 g of sugar per can (NOT DIET)
    if (localStorage.sugar !== '' && localStorage.sugar !== '0') {
        $('ul').append('<li id="sugar">');
        $('#sugar').text(sugarWithCommas + " lbs of sugar");
    }
}

function cigarettes() {
    // establish variables exclusive to cigarettes;

    var brand = localStorage.brand;

    // number of hours / how many hours in between smokes ( 15 a day ~ 1 every 90 mins ish)
    var totalCigarettes = Math.round(hours / hoursBetweenPoison);

    // 20 cigarettes per pack
    var packs = Math.round(totalCigarettes / 20.0);

    var costPerOne = (Number(localStorage.cost) / 20.0);
    var dollars = Math.round(totalCigarettes * costPerOne); 

    var hoursSaved = (totalCigarettes * Number(localStorage.time)) / 60;

    // 0.95 mg of nicotine absorbed per cigarette on average
    var nicotine = Math.round(totalCigarettes * 0.95); 

    // 1 tree cut down for every 300 cigarettes (paper, speeding up tobacco curing by burning wood)
    var treesSaved = (totalCigarettes / 300).toFixed(1);

    // add commas to numbers
    var totalCigsWithCommas = commafy(totalCigarettes);
    var daysWithCommas = commafy(days);
    var dollarsWithCommas = commafy(dollars);
    var packsWithCommas = commafy(packs);
    var nicotineWithCommas = commafy(nicotine);
    var treesWithCommas = commafy(treesSaved);

    $('ul').append('<li id="days"></li><li id="packs"></li><li id="time"></li><li id="nicotine"></li><li id="dollars"></li><li id="trees"></li>')

    $('h1').html("I've given up <span id='num'>" + pluralize(totalCigsWithCommas,brand) + ". </span><br>I can give up <em>one more</em>.");
    $('#days').text(daysWithCommas + " day streak");
    $('#dollars').text("$" + dollarsWithCommas + " saved");
    $('#time').text(formatTime(hoursSaved, " saved"));
    $('#packs').text(packsWithCommas + " packs");
    $('#nicotine').text(nicotineWithCommas + " mg of nicotine");
    $('#trees').text(treesWithCommas + " trees saved");
}


// ===================
// UNIVERSAL FUNCTIONS
// ===================

function updateBackgroundColor() {
    var r = getRandomInt(0,225);
    var g = getRandomInt(0,225);
    var b = getRandomInt(0,225);
    var rgbString = 'rgb(' + r + ',' + g + ',' + b + ')';
    document.body.style.backgroundColor = rgbString;
}

function updateQuote() {
    var htmlQuote = document.querySelector(".quote");
    var randomNum = getRandomInt(0, 69);
    htmlQuote.textContent = this.quotes[randomNum];
}

function facebookShare() {

    var list = $('ul > li');
    var numberOfPoison = document.getElementById('num').textContent;
    var stringOfStats = numberOfPoison; 

    // build the string of stats
    for (var i = 0; i < list.length; i++) {
      stringOfStats += (list[i].textContent + '. ');
    }

    var hrefQuote = stringOfStats.split(' ').join('%20');

    $('#fb')[0].href = 'https://www.facebook.com/dialog/share?app_id=312283985879917display=popup&hashtag=%23AsofToday&href=http%3A%2F%2Fwww.asoftoday.me&quote=';
    $('#fb')[0].href += hrefQuote;

}

function init() {
    decideDOMRender();
    updateBackgroundColor();
    updateQuote();
    facebookShare();
}

init();


// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
// All of this created with love by Jake Tripp June 2017
// =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+