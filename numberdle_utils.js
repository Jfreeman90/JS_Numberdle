//function that will highlight a given co-ordinate
function draw_to_highlight_box(i, j){
    //draw out the rectangles shape a different colour 
    ctx.beginPath()
    ctx.lineWidth = "3"
    ctx.strokeStyle = "canvas_square_colour"
    ctx.rect(x_margin_size+ x_padding*i + i*square_size, y_margin_size+y_padding*j+1 + j*square_size, square_size, square_size)
    ctx.stroke()

    //fill the rectangle
    ctx.fillStyle=canvas_highlight_background
    ctx.fillRect(x_margin_size+ x_padding*i + i*square_size, y_margin_size+y_padding*j+1 + j*square_size, square_size, square_size)

    //draw out the rectangles highlight
    ctx.beginPath()
    ctx.lineWidth = "2"
    ctx.strokeStyle = canvas_highlight_edge
    ctx.rect(x_margin_size+ x_padding*i-3+ i*square_size, y_margin_size+y_padding*j-1 + j*square_size-1, square_size+5, square_size+5)
    ctx.stroke()

}

//function that will highlight a given co-ordinate
function draw_to_checkvalue(value, i, j, color){
    //draw out the rectangles shape a different colour 
    ctx.beginPath()
    ctx.lineWidth = "3"
    ctx.strokeStyle = canvas_square_colour
    ctx.rect(x_margin_size+ x_padding*i + i*square_size, y_margin_size+y_padding*j+1 + j*square_size, square_size, square_size)
    ctx.stroke()

    //fill the rectangle
    ctx.fillStyle=color
    ctx.fillRect(x_margin_size+ x_padding*i + i*square_size, y_margin_size+y_padding*j+1 + j*square_size, square_size, square_size)

    //draw out the value
    ctx.font = "48px Comic Sans MS"
    ctx.fillStyle = canvas_font_colour
    ctx.textAlign = "center"
    ctx.fillText(value, 
        square_size/2+ x_margin_size+ x_padding*i + i*square_size,
        square_size/1.4 +y_margin_size+y_padding*j+1 + j*square_size)
}

//function to write out wether the number is too big or too small
function add_text_too_big_too_small(value, row, difference){
    //draw out the value
    ctx.font = "22px Comic Sans MS"
    ctx.fillStyle = canvas_font_colour
    ctx.textAlign = "center"
    if (difference=='too_big'){
        ctx.fillText(value, canvas.width-x_margin_size/2, y_margin_size+y_padding*(row+1) + row*square_size)
        ctx.fillText('Too big', canvas.width-x_margin_size/2, 1.5*y_margin_size+y_padding*(row+1) + row*square_size)
    }else if (difference=='too_small') {
        ctx.fillText(value, canvas.width-x_margin_size/2, y_margin_size+y_padding*(row+1) + row*square_size)
        ctx.fillText('Too small', canvas.width-x_margin_size/2, 1.5*y_margin_size+y_padding*(row+1) + row*square_size)
    }
    
}

//take the given x and y position of a click on the grid and return the col and row index as a list.
function rows_and_cols(x_click, y_click){
    var x=x_click
    var y=y_click
    //define the rows of the grid clicked depending on the locations and will be dynamic depending on sqaure size, padding and margins
    if (y<y_margin_size+square_size && y>y_margin_size){
        row_ = 0
    } else if (y<y_margin_size+2*square_size+y_padding && y>y_margin_size+square_size+y_padding) {
        row_ = 1
    } else if (y<y_margin_size+3*square_size+2*y_padding && y>y_margin_size+2*square_size+2*y_padding){
        row_ = 2
    } else if (y<y_margin_size+4*square_size+3*y_padding && y>y_margin_size+3*square_size+3*y_padding){
        row_ = 3
     }else if (y<y_margin_size+5*square_size+4*y_padding && y>y_margin_size+4*square_size+4*y_padding){
        row_ = 4
    }else if (y<y_margin_size+6*square_size+5*y_padding && y>y_margin_size+5*square_size+5*y_padding){
        row_ = 5
    }

    //define the cols of the grid clicked depending on the locations and will be dynamic depending on sqaure size, padding and margins
    if (x>x_margin_size && x<x_margin_size+square_size){
        col_=0
    } else if (x>x_margin_size+square_size+x_padding && x<x_margin_size+2*square_size+x_padding){
        col_=1
    } else if (x>x_margin_size+2*square_size+2*x_padding && x<x_margin_size+3*square_size+2*x_padding){
        col_=2
    } else if (x>x_margin_size+3*square_size+3*x_padding && x<x_margin_size+4*square_size+3*x_padding){
        col_=3
    } else if (x>x_margin_size+4*square_size+4*x_padding && x<x_margin_size+5*square_size+4*x_padding){
        col_=4
    } else if (x>x_margin_size+5*square_size+5*x_padding && x<x_margin_size+6*square_size+5*x_padding){
        col_=5
    }

    return [col_, row_]
}

//function that will draw a text value in the given spot ddepending on row and col
function draw_guess(value, row, col){
    var i = col
    var j = row
    ctx.font = "48px Comic Sans MS"
    ctx.fillStyle = canvas_font_colour
    ctx.textAlign = "center"
    ctx.fillText(value, 
        square_size/2+ x_margin_size+ x_padding*i + i*square_size, square_size/1.4 +y_margin_size+y_padding*j+1 + j*square_size)
}


//function to draw out an endgame text on the canvas for the user
function end_game(code, attempt, won){
    game_status='false'
    //fill the rectangle with different color depending on win or loss
    if (won==true){
        ctx.fillStyle='#10b981'
    } else if (won==false) {
        ctx.fillStyle='#ef4444'
    }
    ctx.fillRect(x_margin_size+square_size*1.5+x_padding, y_margin_size+square_size/2, square_size*3.5-x_padding, square_size*4+y_padding/2);
    
    //add text
    ctx.font = "33px Comic Sans MS"
    ctx.fillStyle = '#374151'
    ctx.textAlign = "center"
    //add the text for game over and if player won or lost
    ctx.fillText('Game Over', canvas.width/2, canvas.height/5)
    if (won==true){
        ctx.fillText('YOU WON!',canvas.width/2, 2.8*(canvas.height)/5)
    } else if (won==false) {
        ctx.fillText('YOU LOST!',canvas.width/2, 2.2*(canvas.height)/5)
    }

    //add smaller text details
    ctx.font = "24px Comic Sans MS"
    ctx.fillText('The code was: '+code, canvas.width/2, 1.4*(canvas.height)/5)
    ctx.fillText('Guesses:'+ attempt,  canvas.width/2, 1.8*(canvas.height)/5)
}


//function to create a 6 digit random code 
function generate_code(length, min, max){
    code=[]
    for (let i =0; i <length; i ++){
        code.push(String(Math.floor(Math.random() * (max+1)) + min))
    }
    return code
}

//function to find the difference between two times in seconds as given date time objects
function diff_seconds(endtime, starttime){
  var diff_seconds =(endtime.getTime() - starttime.getTime()) / 1000
  return  Math.round(diff_seconds)
 }


//hide the image for rules or show it depending on click.
function show_hide_rules(){
    //hide the rules
    var rules_image = document.getElementById("rules_image")
    const display = window.getComputedStyle(rules_image).display;
    //get the list elements
    var show_rules_text = document.getElementById("show_rules_text")
    var hide_rules_text = document.getElementById("hide_rules_text")
    //check current display and update the html accordingly.
    if (display=="none") {
        rules_image.style.display = "block"
        show_rules_text.style.display = "none"
        hide_rules_text.style.display = "block"
    } else if (display=="block"){
        rules_image.style.display = "none"
        hide_rules_text.style.display = "none"
        show_rules_text.style.display = "block"
    }
    return false
}