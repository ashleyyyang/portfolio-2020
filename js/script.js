var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}






// EMOJI DRAG
// source: https://www.kirupa.com/html5/examples/drag_multiple.htm

var dragarea = document.querySelector("#dragarea");
var activeItem = null;
var active = false;

// originally, it was dragarea.addEventListener(...); which made the emojis stop moving if the mouse left the emoji area (like if you moved the mouse too fast)
// changing to window.addEventListener(...); increases the listening area to the entire window, so the emojis will keep moving as long as it is in the window.
window.addEventListener("touchstart", dragStart, false);
window.addEventListener("touchend", dragEnd, false);
window.addEventListener("touchmove", drag, false);

window.addEventListener("mousedown", dragStart, false);
window.addEventListener("mouseup", dragEnd, false);
window.addEventListener("mousemove", drag, false);

function dragStart(e) {
  if (e.target.classList.contains("dragitem")) { // only drag elements with class "dragitem"
    active = true;

    activeItem = e.target; // this is the item we are interacting with

    if (activeItem !== null) {
      if (!activeItem.xOffset) {
        activeItem.xOffset = 0;
      }

      if (!activeItem.yOffset) {
        activeItem.yOffset = 0;
      }

      if (e.type === "touchstart") {
        activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
        activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
      } else {
        console.log("doing something!");
        activeItem.initialX = e.clientX - activeItem.xOffset;
        activeItem.initialY = e.clientY - activeItem.yOffset;
      }
    }
  }
}

function dragEnd(e) {
  if (activeItem !== null) {
    activeItem.initialX = activeItem.currentX;
    activeItem.initialY = activeItem.currentY;
  }

  active = false;
  activeItem = null;
}

function drag(e) {
  if (active) {
      e.preventDefault();
    if (e.type === "touchmove") {
      activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
      activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
    } else {
      activeItem.currentX = e.clientX - activeItem.initialX;
      activeItem.currentY = e.clientY - activeItem.initialY;
    }

    activeItem.xOffset = activeItem.currentX;
    activeItem.yOffset = activeItem.currentY;

    setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

// EMOJI DRAG END






// chunk below is from when i wanted the emojis to populate the entire webpage, not just the viewport area
// // SET DRAG AREA TO HEIGHT OF ENTIRE PAGE
// // get height of entire page
// let daheight = document.documentElement.scrollHeight;







// GENERATE AND PRINT RANDOM EMOJIS, PART 1/3
// source: https://bobbyhadz.com/blog/javascript-get-multiple-random-elements-from-array
function getRandomArray(arr, num) { //function takes 2 arguments: (1) original array, (2) number of desired items in shuffled array
  const shuffled = [...arr].sort(() => 0.5 - Math.random()); // spread syntax [...] makes a temp copy of the original array, and sort() shuffles it

  return shuffled.slice(0, num); // slice() gets multiple random elements from shuffled array
}









// SHOW EMOJIS -> break up into smaller functions
function showEmojis() {
  // var daheight = document.documentElement.scrollHeight; // this was for when i wanted the emojis to populate the entire webpage, not just the viewport area
  var daheight = window.innerHeight; // get viewport height
  document.getElementById("dragarea").style.height = daheight + "px"; // set drag area height to the calculated height above

  // checking if page heights match. mostly for when i wanted the entire webpage height. in that case i think they were different because they were calculated before the window fully loaded
  console.log("test entire page height: " + daheight);
  console.log("real entire page height: " + document.documentElement.scrollHeight);

  // RANDOMIZE EMOJI COORDINATES
  // convert emoji size from rem to px. i can easily shorten this but im scared to touch it. and also im lazy
  var remItemSize = 1;
  var itemSizePixels = remItemSize * parseFloat(getComputedStyle(document.getElementById("one")).fontSize);
  // 8rem = 128px (?) idk why i left this comment here but i will keep it just in case

  // get height and width of vp
  let viewportHeight = window.innerHeight; // get vp height
  let heightMax = viewportHeight - itemSizePixels; // make sure all the emojis stay within the window (and don't get cut off at the bottom)
  let viewportWidth = window.innerWidth; // get vp width
  let viewportWidthMax = viewportWidth - itemSizePixels; // make sure all the emojis stay within the window (and don't get cut off at the right)
  let viewportWidthHalf = viewportWidthMax / 2; // for the first two emojis on each page.. makes sure there is at least one emoji on both sides. to make the page look more balanced

  // // check
  // // console.log("vp width: " + viewportWidth);
  // // console.log("vp height: " + viewportHeight);


  // random number generator to generate coordinates
  function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // generate a number from 1 -> dragarea height to get px from top
  const itemOneTop = randomIntFromInterval(1, heightMax);
  const itemTwoTop = randomIntFromInterval(1, heightMax);
  const itemThreeTop = randomIntFromInterval(1, heightMax);
  const itemFourTop = randomIntFromInterval(1, heightMax);
  const itemFiveTop = randomIntFromInterval(1, heightMax);

  // generate a number from 1 -> vp width to get px from left
  const itemOneLeft = randomIntFromInterval(1, viewportWidthHalf); //one item on left side for balance
  const itemTwoLeft = randomIntFromInterval(viewportWidthHalf, viewportWidthMax); //one item on right side for balance
  const itemThreeLeft = randomIntFromInterval(1, viewportWidthMax);
  const itemFourLeft = randomIntFromInterval(1, viewportWidthMax);
  const itemFiveLeft = randomIntFromInterval(1, viewportWidthMax);

  // // check
  // // console.log("item one from top: " + itemOneTop);
  // // console.log("item one from left: " + itemOneLeft);

  // assign values
  // more efficient
  var itemPositions = [ //making an array with item info to make things easier later
    { id: "one", top: itemOneTop, left: itemOneLeft },
    { id: "two", top: itemTwoTop, left: itemTwoLeft },
    { id: "three", top: itemThreeTop, left: itemThreeLeft },
    { id: "four", top: itemFourTop, left: itemFourLeft },
    { id: "five", top: itemFiveTop, left: itemFiveLeft }
  ];

  // GENERATE AND PRINT RANDOM EMOJIS, PART 2/3
    const arrAllEmojis = ['🥑', '🥔', '🥦', '🍋‍🟩', '🥒', '🥕', '🌽', '🍅',
                        '🥬', '🫜', '🧅', '🌶️',
                        '🫛', '🍠', '🫑', '🥗', '🍒', '🫐', '🍐',
                        '🍓', '🍇', '🍎', '🍉', '🍑', '🍊', '🍋',
                        '🍍', '🍌', 
                        '🍏', '🍈', '🥝', '🥭', '🥥'];
  // const arrAllEmojis = ['🥯', '🐈‍⬛', '🍰', '🌞', '🤓', '🥸', '😳', '😩',
  //                       '🧍🏻‍♀️', '🕶️', '🐰', '🐟',
  //                       '🌈', '🫔', '🍕', '🫑', '🍅', '🫐', '🍐',
  //                       '💭', '💯', '❤️‍🔥', '💕', '🧴', '📖', '📔',
  //                       '💋', '🛌',
  //                       '🍵', '🍦', '🍠', '🍝', '🥗'];
  // , '', '', '', '', '', ''
  const arrFiveEmojis = getRandomArray(arrAllEmojis, 5); // get shuffled array of 5 random emojis



  for (var i = 0; i < itemPositions.length; i++) {
    var item = document.getElementById(itemPositions[i].id);
    item.style.top = itemPositions[i].top + "px";
    item.style.left = itemPositions[i].left + "px";

    // GENERATE AND PRINT RANDOM EMOJIS, PART 3/3
    var addEmoji = arrFiveEmojis.pop(); //select last emoji in array
    document.getElementById(itemPositions[i].id).innerHTML = addEmoji; //show emojis yay!!!

    console.log(getRandomArray(arrAllEmojis, 5));

  }



  // manually correct each item width and height.. idk why it keeps changing the draggable area lol
  var dragItems = document.getElementsByClassName("dragitem");

  for (var i = 0; i < dragItems.length; i++) {
    dragItems[i].style.height = itemSizePixels + "px";
    dragItems[i].style.width = itemSizePixels + "px";
  }

};



// HEADER HEIGHT

document.addEventListener("DOMContentLoaded", function() {
  var headerHeight = document.getElementById("headerHeight").offsetHeight; // get height of header
  var introPaddingPixels = parseFloat(getComputedStyle(document.getElementById("intro")).paddingTop); // convert intro padding from rem to px
  document.getElementById("intro").style.paddingTop = (introPaddingPixels + headerHeight) + "px"; // make new intro paddingTop = header height + original intro padding
  document.body.classList.add("ready"); // CSS transition
});



// TOGGLE EMOJIS ON/OFF

    window.onload = function() { // NEED TO LOAD ENTIRE WINDOW FIRST OR ELSE THE WEBPAGE HEIGHT WILL GET MESSED UP.... THERE WILL BE EXTRA SPACE AT THE BOTTOM AND IT WILL FLUCTUATE WHEN THE VP SIZE CHANGES
      var checkbox = document.querySelector('input[type="checkbox"]');
      var dragAreaClose = document.getElementById("#dragarea")



      // // HEIGHT OF HEADER (PADDING BC OF STICKY HEADER)
      // // get height of header
      // var headerHeight = document.getElementById("headerHeight").offsetHeight;

      // // convert intro padding from rem to px
      // var rem = 1;
      // var introPaddingPixels = rem * parseFloat(getComputedStyle(document.getElementById("intro")).paddingTop);

      // // make new intro paddingTop = header height + original intro padding
      // document.getElementById("intro").style.paddingTop = introPaddingPixels + headerHeight + "px";

      // showEmojis.call();

      //actual toggle part
      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          // show emojis
          showEmojis.call();
          document.getElementById("dragarea").style.visibility = "visible";
          console.log('Checked');
        } else {
          // hide emojis
          document.getElementById("dragarea").style.visibility = "hidden";
          console.log('Not checked');
        }
      });
    }





// FIX SCROLLING BUG source: https://stackoverflow.com/questions/3664381/force-page-scroll-position-to-top-at-page-refresh-in-html
history.scrollRestoration = "manual";

window.onbeforeunload = function () {
  window.scrollTo(0, 0); // scroll to top of page
}
