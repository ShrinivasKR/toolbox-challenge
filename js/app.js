// app.js: our main javascript file for this app
"use strict";

var tiles = [];
var tile;
var turn = false;
var remaining;
var missed;
var matched;
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
    $('#start-game').click(function(){
        console.log('start game button clicked!');
        tiles = _.shuffle(tiles);
        var selectedTiles = tiles.slice(0,8);
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
        window.setInterval(function() {
            var elapsedSeconds = (Date.now() - startTime) / 1000;
            elapsedSeconds = Math.floor(elapsedSeconds);
            $('#elapsed-seconds').text(elapsedSeconds + ' seconds');
        }, 1000);

        $('#game-board img').click(function() {
            //console.log(this.alt);
            var clickedIMG = $(this);
            var tile = clickedIMG.data('tile');
            console.log(tile);
            flipTile(tile, clickedIMG);
        })

    }); //start game button click
}); //document ready button

function flipTile(tile, img) {
    if(tile.flipped) {
        return;
    }
    turn = !turn;
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

function compareTile(otherTile) {
    if(tile.tileNum == otherTile.tileNum) {
        return;
    } else {
        this.flipped == false;
        otherTile.flipped == false;
        missed++;
        return false;
    }
}