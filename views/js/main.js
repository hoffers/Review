/*
Welcome to the 60fps project! My goal is to make Cam's Pizzeria website run
jank-free at 60 frames per second.

There are two major issues in this code that lead to sub-60fps performance. Can
you spot and fix both?

Built into the code, you'll find a few instances of the User Timing API
(window.performance), which will be console.log()ing frame rate data into the
browser console. To learn more about User Timing API, check out:
http://www.html5rocks.com/en/tutorials/webperformance/usertiming/

Creators:
Quintin Brubaker, Udacity Course student
Cameron Pittman, Udacity Course Developer
*/


// Here are arrays of all possible pizza ingredients.
var pizzaIngredients = {}; // semicolon following variable declaration, without whitespace
pizzaIngredients.meats = [
  'Pepperoni',
  'Sausage',
  'Fennel Sausage',
  'Spicy Sausage',
  'Chicken',
  'BBQ Chicken',
  'Chorizo',
  'Chicken Andouille',
  'Salami',
  'Tofu',
  'Bacon',
  'Canadian Bacon',
  'Proscuitto',
  'Italian Sausage',
  'Ground Beef',
  'Anchovies',
  'Turkey',
  'Ham',
  'Venison',
  'Lamb',
  'Duck',
  'Soylent Green',
  'Carne Asada',
  'Soppressata Picante',
  'Coppa',
  'Pancetta',
  'Bresola',
  'Lox',
  'Guanciale',
  'Chili',
  'Beef Jerky',
  'Pastrami',
  'Kielbasa',
  'Scallops',
  'Filet Mignon'
];
pizzaIngredients.nonMeats = [
  'White Onions',
  'Red Onions',
  'Sauteed Onions',
  'Green Peppers',
  'Red Peppers',
  'Banana Peppers',
  'Ghost Peppers',
  'Habanero Peppers',
  'Jalapeno Peppers',
  'Stuffed Peppers',
  'Spinach',
  'Tomatoes',
  'Pineapple',
  'Pear Slices',
  'Apple Slices',
  'Mushrooms',
  'Arugula',
  'Basil',
  'Fennel',
  'Rosemary',
  'Cilantro',
  'Avocado',
  'Guacamole',
  'Salsa',
  'Swiss Chard',
  'Kale',
  'Sun Dried Tomatoes',
  'Walnuts',
  'Artichoke',
  'Asparagus',
  'Caramelized Onions',
  'Mango',
  'Garlic',
  'Olives',
  'Cauliflower',
  'Polenta',
  'Fried Egg',
  'Zucchini',
  'Hummus'
];
pizzaIngredients.cheeses = [
  'American Cheese',
  'Swiss Cheese',
  'Goat Cheese',
  'Mozzarella Cheese',
  'Parmesean Cheese',
  'Velveeta Cheese',
  'Gouda Cheese',
  'Muenster Cheese',
  'Applewood Cheese',
  'Asiago Cheese',
  'Bleu Cheese',
  'Boursin Cheese',
  'Brie Cheese',
  'Cheddar Cheese',
  'Chevre Cheese',
  'Havarti Cheese',
  'Jack Cheese',
  'Pepper Jack Cheese',
  'Gruyere Cheese',
  'Limberger Cheese',
  'Manchego Cheese',
  'Marscapone Cheese',
  'Pecorino Cheese',
  'Provolone Cheese',
  'Queso Cheese',
  'Roquefort Cheese',
  'Romano Cheese',
  'Ricotta Cheese',
  'Smoked Gouda'
];
pizzaIngredients.sauces = [
  'Red Sauce',
  'Marinara',
  'BBQ Sauce',
  'No Sauce',
  'Hot Sauce'
];
pizzaIngredients.crusts = [
  'White Crust',
  'Whole Wheat Crust',
  'Flatbread Crust',
  'Stuffed Crust'
];

// Name generator pulled from http://saturdaykid.com/usernames/generator.html
// Capitalizes first letter of each word
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// Pulls adjective out of array using random number sent from generator
function getAdj(x){
  switch(x) {
    case 'dark': 
      var dark = ['dark','morbid', 'scary', 'spooky', 'gothic', 'deviant', 'creepy', 'sadistic', 'black', 'dangerous', 'dejected', 'haunted', 
      'morose', 'tragic', 'shattered', 'broken', 'sad', 'melancholy', 'somber', 'dark', 'gloomy', 'homicidal', 'murderous', 'shady', 'misty', 
      'dusky', 'ghostly', 'shadowy', 'demented', 'cursed', 'insane', 'possessed', 'grotesque', 'obsessed'];
      return dark;
    case 'color': 
      var colors = ['blue', 'green', 'purple', 'grey', 'scarlet', 'NeonGreen', 'NeonBlue', 'NeonPink', 'HotPink', 'pink', 'black', 'red', 
      'maroon', 'silver', 'golden', 'yellow', 'orange', 'mustard', 'plum', 'violet', 'cerulean', 'brown', 'lavender', 'violet', 'magenta',
      'chestnut', 'rosy', 'copper', 'crimson', 'teal', 'indigo', 'navy', 'azure', 'periwinkle', 'brassy', 'verdigris', 'veridian', 'tan', 
      'raspberry', 'beige', 'sandy', 'ElectricBlue', 'white', 'champagne', 'coral', 'cyan'];
      return colors;
    case 'whimsical': 
      var whimsy = ['whimsical', 'silly', 'drunken', 'goofy', 'funny', 'weird', 'strange', 'odd', 'playful', 'clever', 'boastful', 'breakdancing',
      'hilarious', 'conceited', 'happy', 'comical', 'curious', 'peculiar', 'quaint', 'quirky', 'fancy', 'wayward', 'fickle', 'yawning', 'sleepy',
      'cockeyed', 'dizzy', 'dancing', 'absurd', 'laughing', 'hairy', 'smiling', 'perplexed', 'baffled', 'cockamamie', 'vulgar', 'hoodwinked', 
      'brainwashed'];
      return whimsy;
    case 'shiny':
      var shiny = ['sapphire', 'opal', 'silver', 'gold', 'platinum', 'ruby', 'emerald', 'topaz', 'diamond', 'amethyst', 'turquoise', 
      'starlit', 'moonlit', 'bronze', 'metal', 'jade', 'amber', 'garnet', 'obsidian', 'onyx', 'pearl', 'copper', 'sunlit', 'brass', 'brassy',
      'metallic'];
      return shiny;
    case 'noisy':
      var noisy = ['untuned', 'loud', 'soft', 'shrieking', 'melodious', 'musical', 'operatic', 'symphonic', 'dancing', 'lyrical', 'harmonic', 
      'orchestral', 'noisy', 'dissonant', 'rhythmic', 'hissing', 'singing', 'crooning', 'shouting', 'screaming', 'wailing', 'crying', 'howling',
      'yelling', 'hollering', 'caterwauling', 'bawling', 'bellowing', 'roaring', 'squealing', 'beeping', 'knocking', 'tapping', 'rapping', 
      'humming', 'scatting', 'whispered', 'whispering', 'rasping', 'buzzing', 'whirring', 'whistling', 'whistled'];
      return noisy;
    case 'apocalyptic':
      var apocalyptic = ['nuclear', 'apocalyptic', 'desolate', 'atomic', 'zombie', 'collapsed', 'grim', 'fallen', 'collapsed', 'cannibalistic', 
      'radioactive', 'toxic', 'poisonous', 'venomous', 'disastrous', 'grimy', 'dirty', 'undead', 'bloodshot', 'rusty', 'glowing', 'decaying',
      'rotten', 'deadly', 'plagued', 'decimated', 'rotting', 'putrid', 'decayed', 'deserted', 'acidic'];
      return apocalyptic;
    case 'insulting':
      var insulting = ['stupid', 'idiotic', 'fat', 'ugly', 'hideous', 'grotesque', 'dull', 'dumb', 'lazy', 'sluggish', 'brainless', 'slow', 
      'gullible', 'obtuse', 'dense', 'dim', 'dazed', 'ridiculous', 'witless', 'daft', 'crazy', 'vapid', 'inane', 'mundane', 'hollow', 'vacuous',
      'boring', 'insipid', 'tedious', 'monotonous', 'weird', 'bizarre', 'backward', 'moronic', 'ignorant', 'scatterbrained', 'forgetful', 'careless', 
      'lethargic', 'insolent', 'indolent', 'loitering', 'gross', 'disgusting', 'bland', 'horrid', 'unseemly', 'revolting', 'homely', 'deformed',
      'disfigured', 'offensive', 'cowardly', 'weak', 'villainous', 'fearful', 'monstrous', 'unattractive', 'unpleasant', 'nasty', 'beastly', 'snide', 
      'horrible', 'syncophantic', 'unhelpful', 'bootlicking'];
      return insulting;
    case 'praise':
      var praise = ['beautiful', 'intelligent', 'smart', 'genius', 'ingenious', 'gorgeous', 'pretty', 'witty', 'angelic', 'handsome', 'graceful',
      'talented', 'exquisite', 'enchanting', 'fascinating', 'interesting', 'divine', 'alluring', 'ravishing', 'wonderful', 'magnificient', 'marvelous',
      'dazzling', 'cute', 'charming', 'attractive', 'nifty', 'delightful', 'superior', 'amiable', 'gentle', 'heroic', 'courageous', 'valiant', 'brave', 
      'noble', 'daring', 'fearless', 'gallant', 'adventurous', 'cool', 'enthusiastic', 'fierce', 'awesome', 'radical', 'tubular', 'fearsome', 
      'majestic', 'grand', 'stunning'];
      return praise;
    case 'scientific':
      var scientific = ['scientific', 'technical', 'digital', 'programming', 'calculating', 'formulating', 'cyberpunk', 'mechanical', 'technological', 
      'innovative', 'brainy', 'chemical', 'quantum', 'astro', 'space', 'theoretical', 'atomic', 'electronic', 'gaseous', 'investigative', 'solar', 
      'extinct', 'galactic'];
      return scientific;
    default:
      var scientific_default = ['scientific', 'technical', 'digital', 'programming', 'calculating', 'formulating', 'cyberpunk', 'mechanical', 'technological', 
      'innovative', 'brainy', 'chemical', 'quantum', 'astro', 'space', 'theoretical', 'atomic', 'electronic', 'gaseous', 'investigative', 'solar', 
      'extinct', 'galactic'];
      return scientific_default;
  }
}

// Pulls noun out of array using random number sent from generator
function getNoun(y) {
  switch(y) {
    case 'animals': 
      var animals = ['flamingo', 'hedgehog', 'owl', 'elephant', 'pussycat', 'alligator', 'dachsund', 'poodle', 'beagle', 'crocodile', 'kangaroo', 
      'wallaby', 'woodpecker', 'eagle', 'falcon', 'canary', 'parrot', 'parakeet', 'hamster', 'gerbil', 'squirrel', 'rat', 'dove', 'toucan', 
      'raccoon', 'vulture', 'peacock', 'goldfish', 'rook', 'koala', 'skunk', 'goat', 'rooster', 'fox', 'porcupine', 'llama', 'grasshopper', 
      'gorilla', 'monkey', 'seahorse', 'wombat', 'wolf', 'giraffe', 'badger', 'lion', 'mouse', 'beetle', 'cricket', 'nightingale', 
      'hawk', 'trout', 'squid', 'octopus', 'sloth', 'snail', 'locust', 'baboon', 'lemur', 'meerkat', 'oyster', 'frog', 'toad', 'jellyfish', 
      'butterfly', 'caterpillar', 'tiger', 'hyena', 'zebra', 'snail', 'pig', 'weasel', 'donkey', 'penguin', 'crane', 'buzzard', 'vulture', 
      'rhino', 'hippopotamus', 'dolphin', 'sparrow', 'beaver', 'moose', 'minnow', 'otter', 'bat', 'mongoose', 'swan', 'firefly', 'platypus'];
      return animals;
    case 'profession': 
      var professions = ['doctor', 'lawyer', 'ninja', 'writer', 'samurai', 'surgeon', 'clerk', 'artist', 'actor', 'engineer', 'mechanic',
      'comedian', 'fireman', 'nurse', 'RockStar', 'musician', 'carpenter', 'plumber', 'cashier', 'electrician', 'waiter', 'president', 'governor', 
      'senator', 'scientist', 'programmer', 'singer', 'dancer', 'director', 'mayor', 'merchant', 'detective', 'investigator', 'navigator', 'pilot',
      'priest', 'cowboy', 'stagehand', 'soldier', 'ambassador', 'pirate', 'miner', 'police'];
      return professions; 
    case 'fantasy': 
      var fantasy = ['centaur', 'wizard', 'gnome', 'orc', 'troll', 'sword', 'fairy', 'pegasus', 'halfling', 'elf', 'changeling', 'ghost', 
      'knight', 'squire', 'magician', 'witch', 'warlock', 'unicorn', 'dragon', 'wyvern', 'princess', 'prince', 'king', 'queen', 'jester', 
      'tower', 'castle', 'kraken', 'seamonster', 'mermaid', 'psychic', 'seer', 'oracle'];
      return fantasy;
    case 'music':
      var music = ['violin', 'flute', 'bagpipe', 'guitar', 'symphony', 'orchestra', 'piano', 'trombone', 'tuba', 'opera', 'drums', 
      'harpsichord', 'harp', 'harmonica', 'accordion', 'tenor', 'soprano', 'baritone', 'cello', 'viola', 'piccolo', 'ukelele', 'woodwind', 'saxophone',
      'bugle', 'trumpet', 'sousaphone', 'cornet', 'stradivarius', 'marimbas', 'bells', 'timpani', 'bongos', 'clarinet', 'recorder', 'oboe', 'conductor',
      'singer'];
      return music;
    case 'horror':
      var horror = ['murderer', 'chainsaw', 'knife', 'sword', 'murder', 'devil', 'killer', 'psycho', 'ghost', 'monster', 'godzilla', 'werewolf', 
      'vampire', 'demon', 'graveyard', 'zombie', 'mummy', 'curse', 'death', 'grave', 'tomb', 'beast', 'nightmare', 'frankenstein', 'specter', 
      'poltergeist', 'wraith', 'corpse', 'scream', 'massacre', 'cannibal', 'skull', 'bones', 'undertaker', 'zombie', 'creature', 'mask', 'psychopath',
      'fiend', 'satanist', 'moon', 'fullMoon'];
      return horror;
    case 'gross':
      var gross = ['slime', 'bug', 'roach', 'fluid', 'pus', 'booger', 'spit', 'boil', 'blister', 'orifice', 'secretion', 'mucus', 'phlegm', 
      'centipede', 'beetle', 'fart', 'snot', 'crevice', 'flatulence', 'juice', 'mold', 'mildew', 'germs', 'discharge', 'toilet', 'udder', 'odor', 'substance', 
      'fluid', 'moisture', 'garbage', 'trash', 'bug'];
      return gross;
    case 'everyday':
      var everyday = ['mirror', 'knife', 'fork', 'spork', 'spoon', 'tupperware', 'minivan', 'suburb', 'lamp', 'desk', 'stereo', 'television', 'TV',
      'book', 'car', 'truck', 'soda', 'door', 'video', 'game', 'computer', 'calender', 'tree', 'plant', 'flower', 'chimney', 'attic', 'kitchen',
      'garden', 'school', 'wallet', 'bottle'];
      return everyday;
    case 'jewelry':
      var jewelry = ['earrings', 'ring', 'necklace', 'pendant', 'choker', 'brooch', 'bracelet', 'cameo', 'charm', 'bauble', 'trinket', 'jewelry', 
      'anklet', 'bangle', 'locket', 'finery', 'crown', 'tiara', 'blingBling', 'chain', 'rosary', 'jewel', 'gemstone', 'beads', 'armband', 'pin',
      'costume', 'ornament', 'treasure'];
      return jewelry;
    case 'places':
      var places = ['swamp', 'graveyard', 'cemetery', 'park', 'building', 'house', 'river', 'ocean', 'sea', 'field', 'forest', 'woods', 'neighborhood',
      'city', 'town', 'suburb', 'country', 'meadow', 'cliffs', 'lake', 'stream', 'creek', 'school', 'college', 'university', 'library', 'bakery',
      'shop', 'store', 'theater', 'garden', 'canyon', 'highway', 'restaurant', 'cafe', 'diner', 'street', 'road', 'freeway', 'alley'];
      return places;
    case 'scifi':
      var scifi = ['robot', 'alien', 'raygun', 'spaceship', 'UFO', 'rocket', 'phaser', 'astronaut', 'spaceman', 'planet', 'star', 'galaxy', 
      'computer', 'future', 'timeMachine', 'wormHole', 'timeTraveler', 'scientist', 'invention', 'martian', 'pluto', 'jupiter', 'saturn', 'mars',
      'quasar', 'blackHole', 'warpDrive', 'laser', 'orbit', 'gears', 'molecule', 'electron', 'neutrino', 'proton', 'experiment', 'photon', 'apparatus',
      'universe', 'gravity', 'darkMatter', 'constellation', 'circuit', 'asteroid'];
      return scifi;
    default:
      var scifi_default = ['robot', 'alien', 'raygun', 'spaceship', 'UFO', 'rocket', 'phaser', 'astronaut', 'spaceman', 'planet', 'star', 'galaxy', 
      'computer', 'future', 'timeMachine', 'wormHole', 'timeTraveler', 'scientist', 'invention', 'martian', 'pluto', 'jupiter', 'saturn', 'mars',
      'quasar', 'blackHole', 'warpDrive', 'laser', 'orbit', 'gears', 'molecule', 'electron', 'neutrino', 'proton', 'experiment', 'photon', 'apparatus',
      'universe', 'gravity', 'darkMatter', 'constellation', 'circuit', 'asteroid'];
      return scifi_default;
  } 
}

var adjectives = ['dark', 'color', 'whimsical', 'shiny', 'noise', 'apocalyptic', 'insulting', 'praise', 'scientific'];  // types of adjectives for pizza titles
var nouns = ['animals', 'everyday', 'fantasy', 'gross', 'horror', 'jewelry', 'places', 'scifi'];                        // types of nouns for pizza titles

// Generates random numbers for getAdj and getNoun functions and returns a new pizza name
function generator(adj, noun) {
  var adjectives = getAdj(adj);
  var nouns = getNoun(noun);
  var randomAdjective = parseInt(Math.random() * adjectives.length);
  var randomNoun = parseInt(Math.random() * nouns.length);
  var name = 'The ' + adjectives[randomAdjective].capitalize() + ' ' + nouns[randomNoun].capitalize();
  return name;
}

// Chooses random adjective and random noun
function randomName() {
  var randomNumberAdj = parseInt(Math.random() * adjectives.length);
  var randomNumberNoun = parseInt(Math.random() * nouns.length);
  return generator(adjectives[randomNumberAdj], nouns[randomNumberNoun]);
}

// These functions return a string of a random ingredient from each respective category of ingredients.
var selectRandomMeat = function() {
  var randomMeat = pizzaIngredients.meats[Math.floor((Math.random() * pizzaIngredients.meats.length))];
  return randomMeat;
};

var selectRandomNonMeat = function() {
  var randomNonMeat = pizzaIngredients.nonMeats[Math.floor((Math.random() * pizzaIngredients.nonMeats.length))];
  return randomNonMeat;
};

var selectRandomCheese = function() {
  var randomCheese = pizzaIngredients.cheeses[Math.floor((Math.random() * pizzaIngredients.cheeses.length))];
  return randomCheese;
};

var selectRandomSauce = function() {
  var randomSauce = pizzaIngredients.sauces[Math.floor((Math.random() * pizzaIngredients.sauces.length))];
  return randomSauce;
};

var selectRandomCrust = function() {
  var randomCrust = pizzaIngredients.crusts[Math.floor((Math.random() * pizzaIngredients.crusts.length))];
  return randomCrust;
};

var ingredientItemizer = function(string) {
  return '<li>' + string + '</li>';
};

// Returns a string with random pizza ingredients nested inside <li> tags
var makeRandomPizza = function() {
  var pizza = '';

  var numberOfMeats = Math.floor((Math.random() * 4));
  var numberOfNonMeats = Math.floor((Math.random() * 3));
  var numberOfCheeses = Math.floor((Math.random() * 2));

  for (var i = 0; i < numberOfMeats; i++) {
    pizza = pizza + ingredientItemizer(selectRandomMeat());
  }

  for (var j = 0; j < numberOfNonMeats; j++) {
    pizza = pizza + ingredientItemizer(selectRandomNonMeat());
  }

  for (var k = 0; k < numberOfCheeses; k++) {
    pizza = pizza + ingredientItemizer(selectRandomCheese());
  }

  pizza = pizza + ingredientItemizer(selectRandomSauce());
  pizza = pizza + ingredientItemizer(selectRandomCrust());

  return pizza;
};

// returns a DOM element for each pizza
var pizzaElementGenerator = function(i) {
  var pizzaContainer,             // contains pizza title, image and list of ingredients
      pizzaImageContainer,        // contains the pizza image
      pizzaImage,                 // the pizza image itself
      pizzaDescriptionContainer,  // contains the pizza title and list of ingredients
      pizzaName,                  // the pizza name itself
      ul;                         // the list of ingredients

  pizzaContainer  = document.createElement('div');
  pizzaImageContainer = document.createElement('div');
  pizzaImage = document.createElement('img');
  pizzaDescriptionContainer = document.createElement('div');

  pizzaContainer.classList.add('randomPizzaContainer');
  pizzaContainer.style.width = '33.33%';
  pizzaContainer.style.height = '325px';
  pizzaContainer.id = 'pizza' + i;                // gives each pizza element a unique id
  pizzaImageContainer.classList.add('col-md-6');

  pizzaImage.src = 'images/pizza.png';
  pizzaImage.classList.add('img-responsive');
  pizzaImageContainer.appendChild(pizzaImage);
  pizzaContainer.appendChild(pizzaImageContainer);

  pizzaDescriptionContainer.classList.add('col-md-6');

  pizzaName = document.createElement('h4');
  pizzaName.innerHTML = randomName();
  pizzaDescriptionContainer.appendChild(pizzaName);

  ul = document.createElement('ul');
  ul.innerHTML = makeRandomPizza();
  pizzaDescriptionContainer.appendChild(ul);
  pizzaContainer.appendChild(pizzaDescriptionContainer);

  return pizzaContainer;
};

/* The stretchPizzas var is defined once pizzaElementGenerator() has run.
 * It will be used by resizePizzas().
 */
var stretchPizzas = document.getElementsByClassName('randomPizzaContainer');

// resizePizzas(size) is called when the slider in the 'Our Pizzas' section of the website moves.
var resizePizzas = function(size) { 
  window.performance.mark('mark_start_resize');   // User Timing API function

  // Changes the value for the size of the pizza above the slider
  function changeSliderLabel(size) {
    /* I made expressed this control more concise, in the interest
     * of not repeating one's self.
     */
    var lookUp = {1:'Small', 2:'Medium', 3:'Large'};
    document.getElementById('pizzaSize').innerHTML = lookUp[size];
  }
  
  changeSliderLabel(size);

  // Returns the size difference to change a pizza element from one size to another. Called by changePizzaSlices(size).
  function determineDx (elem, size) {
    var oldwidth = elem.offsetWidth;
    var windowwidth = document.querySelector('#randomPizzas').offsetWidth;
    var oldsize = oldwidth / windowwidth;

    // TODO: change to 3 sizes? no more xl?
    // Changes the slider value to a percent width
    function sizeSwitcher (size) {
      switch(size) {
        case '1':
          return 0.25;
        case '2':
          return 0.3333;
        case '3':
          return 0.5;
        default:
          console.log('bug in sizeSwitcher');
    }}

    var newsize = sizeSwitcher(size);
    var dx = (newsize - oldsize) * windowwidth;

    return dx;
  }

  /* These variables can be here, defined once per call to 
   * resizePizzas(). Their previous usage within changePizzaSlices()
   * was a big bottleneck. 
   */
  var dx = determineDx(stretchPizzas[0], size);
  var newwidth = (stretchPizzas[0].offsetWidth + dx) + 'px';

  /* Iterate through pizza elements on the page and changes their widths
   * I replaced... document.querySelectorAll('.randomPizzaContainer')
   * with references to the global 'stretchPizzas' object.
   * More importantly, I extracted the calculation of newsize and dx to
   * a larger scope, so it doesn't have to happen for each piece of pie.
   */
  function changePizzaSizes(size) {
    for (var i = 0; i < stretchPizzas.length; i++) {
      stretchPizzas[i].style.width = newwidth;
  }}

  changePizzaSizes(size);

  // User Timing API is awesome
  window.performance.mark('mark_end_resize');
  window.performance.measure('measure_pizza_resize', 'mark_start_resize', 'mark_end_resize');
  var timeToResize = window.performance.getEntriesByName('measure_pizza_resize');
  /* Changed this line because displaying the 0th index each time wasn't very
   * very helpful...
   * http://stackoverflow.com/questions/3216013/get-the-last-item-in-an-array
   * console.log('Time to resize pizzas: ' + timeToResize[0].duration + 'ms');
   */
  console.log('Time to resize pizzas: ' + timeToResize.slice(-1)[0].duration + ' ms');
};

window.performance.mark('mark_start_generating'); // collect timing data

// This for-loop actually creates and appends all of the pizzas when the page loads
for (var i = 2; i < 100; i++) {
  var pizzasDiv = document.getElementById('randomPizzas');
  pizzasDiv.appendChild(pizzaElementGenerator(i));
}

// User Timing API again. These measurements tell you how long it took to generate the initial pizzas
window.performance.mark('mark_end_generating');
window.performance.measure('measure_pizza_generation', 'mark_start_generating', 'mark_end_generating');
var timeToGenerate = window.performance.getEntriesByName('measure_pizza_generation');
console.log('Time to generate pizzas on load: ' + timeToGenerate[0].duration + 'ms');

// Iterator for number of times the pizzas in the background have scrolled.
// Used by updatePositions() to decide when to log the average time per frame
var frame = 0;

// Logs the average amount of time per 10 frames needed to move the sliding background pizzas on scroll.
function logAverageFrame(times) {   // times is the array of User Timing measurements from updatePositions()
  var numberOfEntries = times.length;
  var sum = 0;
  for (var i = numberOfEntries - 1; i > numberOfEntries - 51; i--) {
    sum = sum + times[i].duration;
  }
  console.log('Average time to generate last 50 frames: ' + sum / 50 + 'ms');
}

// The following code for sliding background pizzas was pulled from Ilya's demo found at:
// https://www.igvita.com/slides/2012/devtools-tips-and-tricks/jank-demo.html

/* I gave floatingPizzas a broader scope; declared here due to its usage by
 * the updatePositions() function, however it is defined below in
 * pizza generating function below.
 */
var floatingPizzas;
// Moves the sliding background pizzas based on scroll position
var updatePhases
function updatePositions() {
  frame++;
  window.performance.mark('mark_start_frame');
  /* Using this if control means only half of frame transitions demand
   * positional recalculation.
   */
  if (frame % 2 != 0) {
  /* CS Barbie says 'Math is hard' - so let's do less of it. 
   * Now the place var only gets determined once per scroll event.
   * Use of the phases array means Math.sin() only has to work twice - rather
   * than my previous 11 - times per call.
   */
    var place = document.body.scrollTop,
      pixels,
      phases = [];
    // These calculations use magic numbers I refined to my tastes iteratively
    phases[0] = 40 * Math.sin(place/1700);
    phases[1] = 40 * Math.sin(place/1200+2);
    for (var i = 0; i < floaterCount; i++) {
      pixels = floatingPizzas[i].basicLeft + phases[i%2];
      /* I tried using transfrom:translateX, but it seemed to hinder rather than
       * help my rendering.
       * floatingPizzas[i].style.transform = 'translateX(' + pixels + 'px)';
       */
      floatingPizzas[i].style.left = pixels + 'px';
    }
  }
  // User Timing API makes it easy to create custom metrics.
  window.performance.mark('mark_end_frame');
  window.performance.measure('measure_frame_duration', 'mark_start_frame', 'mark_end_frame');
  if (frame % 50 === 0) {
    var timesToUpdatePosition = window.performance.getEntriesByName('measure_frame_duration');
    logAverageFrame(timesToUpdatePosition);
  }
}

/* This gets designated by dropFloaters(), and saves updatePositions() the
 * trouble of calculating floatingPizzas.length each update;
 */
var floaterCount;

/* This helps keep the number of floating pies ('floaters') to the minimum
 * necessary. It is only called by document.addEventListener('DOMContentLoaded')
 * so it doesn't seem like it should have any bearing on ongoing FPS
 * calculation demands, as was suggested in a Nitpick point in the previous 
 * submission review.
 */
var dropFloaters = function() {
  var rows = 2,
      row_space = document.documentElement.clientHeight / 2,
      doc_width = document.documentElement.clientWidth,
      col_space = (doc_width > 600 ? 240 : 160)
      cols = Math.floor(doc_width / col_space),
      pies = rows * cols;

  /* I am decreasing the total number of floating pies. Only 24 (three rows)
   * appeared on my browser @ 1280x640 screen.
   */
  for (var i = 0; i < pies; i++) {
    var elem = document.createElement('img');
    // Removed control of .height and .width from JS to style.css
    elem.className = 'floater';
    elem.src = 'images/pizza.png';
    elem.basicLeft = Math.floor(((i % cols) + 0.5) * col_space);// - doc_width/2;
    elem.style.top = ((Math.floor(i / cols) + 0.3) * row_space) + 'px';
    // Changed this from document.querySelector('#movingPizzas1')
    document.getElementById('movingPizzas1').appendChild(elem);
  }
  /* Once the floating pies have been (re-)initialized, that collection
   * won't change with scrolling. So we reference the collection
   * once, here. Note the updatePosition() definition above.
   */
  // Changed this from document.querySelector('.floater')
  floatingPizzas = document.getElementsByClassName('floater');
  floaterCount = floatingPizzas.length;
  updatePositions();
};



// Generates the sliding pizzas when the page loads.
document.addEventListener('DOMContentLoaded', dropFloaters);
// runs updatePositions on scroll
window.addEventListener('scroll', updatePositions);

