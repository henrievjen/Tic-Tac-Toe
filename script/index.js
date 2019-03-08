$(document).ready(function() {
    
    let markedSquares = [false, false, false, false, false, false, false, false, false];
    let markedX = [false, false, false, false, false, false, false, false, false];
    let markedO = [false, false, false, false, false, false, false, false, false];
    let win = false;
    let selectable = true;
    
    let declareWinner = (arr) => {
        win = false;
        
        // Check Horizontal
        for(let i = 0; i <= 6; i+=3) {
            if(arr[i] == true && arr[i + 1] == true && arr[i + 2] == true) {
                win = true;
            }
        }

        // Check Verticle
        for(let j = 0; j <= 2; j++) {
            if(arr[j] == true && arr[j + 3] == true && arr[j + 6] == true) {
                win = true;
            }
        }

        // Check Diagonals
        if(arr[0] == true && arr[4] == true && arr[8] == true) {
            win = true;
        }
        if(arr[2] == true && arr[4] == true && arr[6] == true) {
            win = true;
        }

        if(win) {
            $('.game-over-content').fadeIn(1000);
            if(arr == markedX) {
                $('.game-over').html("<br><br><img src='images/x.png'><br><p>is the winner!</p><button class='play-again'>Play Again</button>");
            }
            else if(arr == markedO) {
                $('.game-over').html("<br><br><img src='images/o.png'><br><p>is the winner!</p><button class='play-again'>Play Again</button>");
            }
            $('.game-over').css("z-index", "2");
            $('.block').css("z-index", "1");
        }
        
        if((markedSquares.indexOf(false) == -1) && win == false) {
            $('.game-over').html("<br><br><p>Tie game!</p><br><br><button class='play-again'>Play Again</button>");
            $('.game-over').css("z-index", "2");
            $('.game-over-content').fadeIn(1000);
            $('.block').css("z-index", "1");
        }

        $('.play-again').click(function() {
            location.reload();
        });
    }
    
    $('.choose-x')
    .click(function() {
        if(selectable) {
            $(this).css("backgroundColor", "#ddd");
            $('.choose-o').css("backgroundColor", "#fff");
        }
    })
    .hover(function() {
        if(selectable) {
            $(this).css("border", "solid 2px #ddd");
        }
    })
    .mouseleave(function() {
        if(selectable) {
            $(this).css("border", "solid 2px #fff");
        }
    });


    $('.choose-o')
    .click(function() {
        if(selectable) {
            $(this).css("backgroundColor", "#ddd");
            $('.choose-x').css("backgroundColor", "#fff");
        }
    })
    .hover(function() {
        if(selectable) {
            $(this).css("border", "solid 2px #ddd");
        }
    })
    .mouseleave(function() {
        if(selectable) {
            $(this).css("border", "solid 2px #fff");
        }
    });
    
    
    $('.p1').mousedown(function() {
        if($(this).css("backgroundColor") == "rgb(204, 204, 204)") {
            $(this).css("outline", "solid 1px #000");
        }
    });
    
    $('.p1').click(function() {
        selectable = true;
        $('.p2').css({"backgroundColor": "#eee", "outline": "none"});
        $('#selected-text').css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 300);
        $(this).css({"backgroundColor": "#ccc", "outline": "solid 1px #000"});
        $('.choose-x').animate({"margin-right": "0px"}, 300);
        $('.choose-o')
            .animate({"margin-left": "0px"}, 300)
            .css("backgroundColor", "#fff");
        
        if($('.choose img:eq(0)').hasClass("choose-o")) {
            $('.choose-x').insertBefore($('.choose-o'));
        }
        
        if($('.p1').css("backgroundColor") == "rgb(238,238,238)") {
            setTimeout(function() {
                $('#selected-text').html("You Selected:");
            }, 300);
        }
        else {
            setTimeout(function() {
                $('#selected-text').html("");
            }, 300);
        }
    });
    
    
    $('.p2').click(function() {
        selectable = false;
        $(this).css({"backgroundColor": "#ccc", "outline": "solid 1px #000"});
        $('.p1').css({"backgroundColor": "#eee", "outline": "none"});
        $('#selected-text')
            .html("Player 1:<button class='swap'>Swap</button>Player 2:")
            .css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 300);
        $('.swap').fadeIn(300);
        
        if(window.matchMedia('(max-width: 218px)').matches) {
            $('.swap').css({"margin-left": "4px", "margin-right": "4px", "width": "40px", "font-size": "10px"});
            $('.swap').click(function() {
                $('#break').show();
                $('.choose img:eq(1)').insertBefore($('.choose img:eq(0)'));
                $('#break').insertBefore($('.choose img:eq(1)'));
            });
        }
        else {
            $('.choose-x').animate({"margin-right": "30px"}, 300);
            $('.choose-o').animate({"margin-left": "30px"}, 300);
            $('.swap').click(function() {
                $('.choose img').css({"margin-left": "30px", "margin-right": "30px"});
                $('.choose img:eq(1)').insertBefore($('.choose img:eq(0)'));
            });
        }
        $('.choose-x').css("backgroundColor", "#ddd");
        $('.choose-o').css("backgroundColor", "#ddd");
    });
    
    $(window).resize(function() {
        if(window.matchMedia('(max-width: 218px)').matches) {
            $('#break').show();
            if($('.p2').css("backgroundColor") == "rgb(204, 204, 204)") {
                $('.swap').css({"margin-left": "4px", "margin-right": "4px", "width": "40px", "font-size": "10px"});
            }
        }
        else if(window.matchMedia('(min-width: 218px)').matches) {
            $('#break').hide();
            $('.choose img').css({"margin-left": "30px", "margin-right": "30px"});
        }
        else {
            $('.swap').css({"margin-left": "31px", "margin-right": "31px", "width": "50px", "font-size": "12px"});
        }
    });
    
    $('.play').mousedown(function() {
        $(this).css("outline", "solid 1px #000");
    })
    
    
    $('.play').click(function() {
        $('.block').css("visibility", "visible");
        
        if($('.p1').css("backgroundColor") == "rgb(204, 204, 204)") {
            $('.choose img').animate({"margin-left": "0px", "margin-right": "0px"}, {queue: false, duration: 600});
            
            let clickable = true;
            
            if($('.choose-x').css("backgroundColor") == "rgb(221, 221, 221)") {
                $('.choose-o').hide(600);
                
                $('#0, #1, #2, #3, #4, #5, #6, #7, #8').click(function() {
                    if(markedSquares[this.id] == false && clickable) {
                        clickable = false;
                        $(this).append("<img src='images/x.png' class='box-mark'>");
                        markedSquares[this.id] = true;
                        markedX[this.id] = true;
                        declareWinner(markedX);
                        if(markedSquares.indexOf(false) != -1) {
                            let randomNum;
                            do {
                                randomNum = Math.floor(Math.random()* 9);
                            } while(markedSquares[randomNum] == true && markedSquares.indexOf(false) != -1);

                            if(win == false) {

                                let countFalse = (element) => {
                                    let count = 0;

                                    for(let j = 0; j < 3; j++) {
                                        if(element[j] == false) {
                                            count++;
                                        }
                                    }
                                    return count;
                                }

                                let logic = false;
                                let pair1o = markedO.slice(0, 3);
                                let pair2o = markedO.slice(3, 6);
                                let pair3o = markedO.slice(6, 9);
                                let pair4o = [markedO[0], markedO[3], markedO[6]];
                                let pair5o = [markedO[1], markedO[4], markedO[7]];
                                let pair6o = [markedO[2], markedO[5], markedO[8]];
                                let pair7o = [markedO[0], markedO[4], markedO[8]];
                                let pair8o = [markedO[2], markedO[4], markedO[6]];
                                let pair1x = markedX.slice(0, 3);
                                let pair2x = markedX.slice(3, 6);
                                let pair3x = markedX.slice(6, 9);
                                let pair4x = [markedX[0], markedX[3], markedX[6]];
                                let pair5x = [markedX[1], markedX[4], markedX[7]];
                                let pair6x = [markedX[2], markedX[5], markedX[8]];
                                let pair7x = [markedX[0], markedX[4], markedX[8]];
                                let pair8x = [markedX[2], markedX[4], markedX[6]];
                                let pairs = [pair1o, pair2o, pair3o, pair4o , pair5o , pair6o, pair7o, pair8o, pair1x, pair2x, pair3x, pair4x , pair5x , pair6x, pair7x, pair8x];

                                for(let i = 0; i < pairs.length; i++) {
                                    if(countFalse(pairs[i]) == 1) {
                                        index = pairs[i].indexOf(false);
                                        switch(pairs[i]) {
                                                case pair2o:
                                                case pair2x:
                                                    index += 3;
                                                    break;

                                                case pair3o:
                                                case pair3x:
                                                    index += 6;
                                                    break;

                                                case pair4o:
                                                case pair4x:
                                                    if(index == 1) {
                                                        index += 2;
                                                    }
                                                    else if(index == 2) {
                                                        index += 4;
                                                    }
                                                    break;

                                                case pair5o:
                                                case pair5x:
                                                    if(index == 0) {
                                                        index += 1;
                                                    }
                                                    else if(index == 1) {
                                                        index += 3;
                                                    }
                                                    else if(index == 2) {
                                                        index += 5;
                                                    }
                                                    break;

                                                case pair6o:
                                                case pair6x:
                                                    if(index == 0) {
                                                        index += 2;
                                                    }
                                                    else if(index == 1) {
                                                        index += 4;
                                                    }
                                                    else if(index == 2) {
                                                        index += 6;
                                                    }
                                                    break;

                                                case pair7o:
                                                case pair7x:
                                                    if(index == 1) {
                                                        index += 3;
                                                    }
                                                    else if(index == 2) {
                                                        index += 6;
                                                    }
                                                    break;

                                                case pair8o:
                                                case pair8x:
                                                    if(index == 0) {
                                                        index += 2;
                                                    }
                                                    else if(index == 1) {
                                                        index += 3;
                                                    }
                                                    else if(index == 2) {
                                                        index += 4;
                                                    }
                                                    break;
                                        }

                                        logic = true;
                                        if(markedSquares[index] == true) {
                                            logic = false;
                                            continue;
                                        }
                                        else {
                                            setTimeout(function() {
                                                $('#' + index).append("<img src='images/o.png' class='box-mark'>");
                                                markedSquares[index] = true;
                                                markedO[index] = true;
                                                declareWinner(markedO);
                                                clickable = true;
                                                logic = true;
                                            }, 500);
                                            break;
                                        }
                                    }
                                }

                                if(logic == false) {
                                    setTimeout(function() {
                                        $('#' + randomNum).append("<img src='images/o.png' class='box-mark'>");
                                        markedSquares[randomNum] = true;
                                        markedO[randomNum] = true;
                                        declareWinner(markedO);
                                        clickable = true;
                                    }, 500);
                                }
                                logic = false;
                            }
                        }
                    }
                });
            }
            
            if($('.choose-o').css("backgroundColor") == "rgb(221, 221, 221)") {
                $('.choose-x').hide(600);
                
                $('#0, #1, #2, #3, #4, #5, #6, #7, #8').click(function() {
                    if(markedSquares[this.id] == false && clickable) {
                        clickable = false;
                        $(this).append("<img src='images/o.png' class='box-mark'>");
                        markedSquares[this.id] = true;
                        markedO[this.id] = true;
                        declareWinner(markedO);
                        if(markedSquares.indexOf(false) != -1) {
                            let randomNum;
                            do {
                                randomNum = Math.floor(Math.random()* 9);
                            } while(markedSquares[randomNum] == true && markedSquares.indexOf(false) != -1);

                            if(win == false) {

                                let countFalse = (element) => {
                                    let count = 0;

                                    for(let j = 0; j < 3; j++) {
                                        if(element[j] == false) {
                                            count++;
                                        }
                                    }
                                    return count;
                                }

                                let logic = false;
                                let pair1o = markedX.slice(0, 3);
                                let pair2o = markedX.slice(3, 6);
                                let pair3o = markedX.slice(6, 9);
                                let pair4o = [markedX[0], markedX[3], markedX[6]];
                                let pair5o = [markedX[1], markedX[4], markedX[7]];
                                let pair6o = [markedX[2], markedX[5], markedX[8]];
                                let pair7o = [markedX[0], markedX[4], markedX[8]];
                                let pair8o = [markedX[2], markedX[4], markedX[6]];
                                let pair1x = markedO.slice(0, 3);
                                let pair2x = markedO.slice(3, 6);
                                let pair3x = markedO.slice(6, 9);
                                let pair4x = [markedO[0], markedO[3], markedO[6]];
                                let pair5x = [markedO[1], markedO[4], markedO[7]];
                                let pair6x = [markedO[2], markedO[5], markedO[8]];
                                let pair7x = [markedO[0], markedO[4], markedO[8]];
                                let pair8x = [markedO[2], markedO[4], markedO[6]];
                                let pairs = [pair1x, pair2x, pair3x, pair4x , pair5x , pair6x, pair7x, pair8x, pair1o, pair2o, pair3o, pair4o , pair5o , pair6o, pair7o, pair8o];

                                for(let i = 0; i < pairs.length; i++) {
                                    if(countFalse(pairs[i]) == 1) {
                                        index = pairs[i].indexOf(false);
                                        switch(pairs[i]) {
                                                case pair2x:
                                                case pair2o:
                                                    index += 3;
                                                    break;

                                                case pair3x:
                                                case pair3o:
                                                    index += 6;
                                                    break;

                                                case pair4x:
                                                case pair4o:
                                                    if(index == 1) {
                                                        index += 2;
                                                    }
                                                    else if(index == 2) {
                                                        index += 4;
                                                    }
                                                    break;

                                                case pair5x:
                                                case pair5o:
                                                    if(index == 0) {
                                                        index += 1;
                                                    }
                                                    else if(index == 1) {
                                                        index += 3;
                                                    }
                                                    else if(index == 2) {
                                                        index += 5;
                                                    }
                                                    break;

                                                case pair6x:
                                                case pair6o:
                                                    if(index == 0) {
                                                        index += 2;
                                                    }
                                                    else if(index == 1) {
                                                        index += 4;
                                                    }
                                                    else if(index == 2) {
                                                        index += 6;
                                                    }
                                                    break;

                                                case pair7x:
                                                case pair7o:
                                                    if(index == 1) {
                                                        index += 3;
                                                    }
                                                    else if(index == 2) {
                                                        index += 6;
                                                    }
                                                    break;

                                                case pair8x:
                                                case pair8o:
                                                    if(index == 0) {
                                                        index += 2;
                                                    }
                                                    else if(index == 1) {
                                                        index += 3;
                                                    }
                                                    else if(index == 2) {
                                                        index += 4;
                                                    }
                                                    break;
                                        }

                                        logic = true;
                                        if(markedSquares[index] == true) {
                                            logic = false;
                                            continue;
                                        }
                                        else {
                                            setTimeout(function() {
                                                $('#' + index).append("<img src='images/x.png' class='box-mark'>");
                                                markedSquares[index] = true;
                                                markedX[index] = true;
                                                declareWinner(markedX);
                                                clickable = true;
                                                logic = true;
                                            }, 500);
                                            break;
                                        }
                                    }
                                }

                                if(logic == false) {
                                    setTimeout(function() {
                                        $('#' + randomNum).append("<img src='images/x.png' class='box-mark'>");
                                        markedSquares[randomNum] = true;
                                        markedX[randomNum] = true;
                                        declareWinner(markedX);
                                        clickable = true;
                                    }, 500);
                                }
                                logic = false;
                            }
                        }
                    }
                });
            }
            
            $('.p1').animate({"margin-right": "0px"}, 600);
            $('.p2').hide(600);
            $('#selected-text')
                .html("You Selected:")
                .css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 600);
        }
        
        if($('.p2').css("backgroundColor") == "rgb(204, 204, 204)") {            
            $('.p2').animate({"margin-left": "0px"}, 600)
            $('.p1').hide(600);
            $('.choose img:eq(1)').css("backgroundColor", "#fff");
            
            $('#0, #1, #2, #3, #4, #5, #6, #7, #8').click(function() {
                if($('.choose-x').css("backgroundColor") == "rgb(221, 221, 221)") {
                   if(markedSquares[this.id] == false) {
                        $(this).append("<img src='images/x.png' class='box-mark'>");
                        markedSquares[this.id] = true;
                        markedX[this.id] = true;
                        declareWinner(markedX);
                        $('.choose-x').css("backgroundColor", "#fff");
                        $('.choose-o').css("backgroundColor", "#ddd");
                   }
                }

                if($('.choose-o').css("backgroundColor") == "rgb(221, 221, 221)") {
                   if(markedSquares[this.id] == false) {
                        $(this).append("<img src='images/o.png' class='box-mark'>");
                        markedSquares[this.id] = true;
                        markedO[this.id] = true;
                        declareWinner(markedO);
                        $('.choose-o').css("backgroundColor", "#fff");
                        $('.choose-x').css("backgroundColor", "#ddd");
                   }
                }
            });
        }
        
        $('.play').hide(200);
        $('.swap').css("visibility", "hidden");
    });
    
    
});