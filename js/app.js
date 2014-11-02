// app.js: our main javascript file for this app
"use strict";

var tiles = [];
//var tile;
var totalPairs;
var remaining;
var missed;
var previousImg;
var detectClick;
var gameTimer;
for(var i = 1; i < 32; i++) {
    tiles.push({
        tileNum: i,
        src: 'img/tile' + i + '.jpg',
        flipped: false,
        matched: false
    });
} //for each tile

console.log(tiles);

//when document is ready...
$(document).ready(function(){
    //catch click event of start game button
    detectClick = true
    $('#start-game').click(function(){
        console.log('start game button clicked!');
        tiles = _.shuffle(tiles);
        var selectedTiles = tiles.slice(0,8);
        totalPairs = selectedTiles.length;
        resetGame();
        updateStatistics();
        var tilePairs = [];
        _.forEach(selectedTiles, function(tile) {
            tilePairs.push(tile);
            tilePairs.push(_.clone(tile));
        });
        tilePairs = _.shuffle(tilePairs);
        console.log(tilePairs);

        var gameBoard = $('#game-board');
        var row = $(document.createElement('div'));
        var img;
        _.forEach(tilePairs, function(tile, elemIndex) {
            if(elemIndex > 0 && 0 == elemIndex % 4) {
                gameBoard.append(row);
                row = $(document.createElement('div'));
            }
            img = $(document.createElement('img'));
            img.attr({
                src: 'img/tile-back.png',
                alt: 'tile ' + tile.tileNum
            });
            img.data('tile', tile);
            row.append(img);
        });
        gameBoard.append(row);

        //get starting milliseconds
        var startTime = Date.now();
        gameTimer = window.setInterval(function() {
            var elapsedSeconds = (Date.now() - startTime) / 1000;
            elapsedSeconds = Math.floor(elapsedSeconds);
            $('#elapsed-seconds').text(elapsedSeconds + ' seconds');
        }, 1000);


        $('#game-board img').click(function() {
            if(!detectClick) {
                return;
            }
            //console.log(this.alt);
            var clickedIMG = $(this);
            var tile = clickedIMG.data('tile');

            console.log(tile);
            if(!tile.flipped) {
                flipTile(tile, clickedIMG);
                if(previousImg == null) {
                    previousImg = clickedIMG;
                } else {
                    var previousTile = previousImg.data('tile');
                    if(previousTile.src == tile.src) {
                        remaining -= 1;
                        $('#matches-missed').text('Matches missed: ' + missed);
                        previousImg = null;
                        if(remaining == 0) {
                            window.setTimeout(function() {
                                window.alert("You win! :)");
                            }, 250);
                        }
                    } else {
                        detectClick = false;
                        window.setTimeout(function () {
                            flipTile(tile, clickedIMG);
                            flipTile(previousTile, previousImg);
                            missed += 1;
                            $('#matches-missed').text('Matches missed: ' + missed);
                            previousImg = null;
                            detectClick = true;
                        }, 1000);
                    }
                }
                updateStatistics();
            }
        })
    }); //start game button click
}); //document ready button
function updateStatistics() {
    $('#wrong-matches').text(" " + missed);
    $('#matches-left').text(" " + remaining);
    $('#matches-made').text(" " + (totalPairs - remaining));
}

function resetGame() {
    $('#game-board').empty();
    remaining = totalPairs;
    missed = 0;
    detectClick = true;
    previousImg = null;
    window.clearInterval(gameTimer);
}
function flipTile(tile, img) {
    //if
    img.fadeOut(100, function() {
        if (tile.flipped) {
            img.attr('src', 'img/tile-back.png');
        } else {
            img.attr('src', tile.src);
        }
        tile.flipped = !tile.flipped;
        img.fadeIn(100);
    });
}
