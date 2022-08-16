//get the canvas object from the html
const canvas=document.querySelector('canvas')
const ctx= canvas.getContext('2d')
//hide the new game button
var new_game_button = document.getElementById("new_game_button")
//define the sqaures size as well as margin and padding between sqaures
const square_size=80
const x_margin_size=180
const y_margin_size=50
const x_padding=10
const y_padding=30
//define how big the grid will be
const code_length=6
const code_guess=6
//define the canvas size based 
canvas.width = x_margin_size*2 + square_size*code_length + x_padding*(code_length-1)
canvas.height= y_margin_size*2 + square_size*code_guess + y_padding*(code_guess-1)
//define canvas colours for font, background and highlighting
const canvas_background='white'
const canvas_square_colour='black'
const canvas_font_colour='black'
const canvas_highlight_background='#DCDCDC'
const canvas_highlight_font="#d9f99d"
const canvas_highlight_edge="#DDA0DD"
const canvas_correct_highlight="#d9f99d"
const canvas_almost_highlight="#fed7aa"
const canvas_wrong_highlight="#fecaca"
const canvas_attempt_row="#DCDCDC"


//take a 4x4 grid array and draw it on the canvas, if the game hasnt begun yet then set blank to true on creation
function draw_grid(grid, highlight=[row,col], attempt){
    //draw out a rectagle below the current attempt row for the player to see where they are at
    if (0<attempt && attempt<code_guess+1){
        ctx.fillStyle = canvas_attempt_row
        ctx.fillRect(x_margin_size-x_padding*2, y_margin_size+(square_size*(attempt-1))+(y_padding*(attempt-1))-y_padding/2,
                (square_size*code_length + x_padding*(code_length-1))+x_padding*4, square_size+y_padding);
    }
    
    //draw a 4 x4 grid of rectangles on the canvas
    ctx.beginPath()
    ctx.lineWidth = "2"
    ctx.strokeStyle = canvas_square_colour
    //j is the rows and i is the cols
    for (let i = 0; i<code_length; i++){
        for (let j=0; j<code_guess; j++){
            //console.log(i, j)
            //draw out the rectangles for each part of the grid
            ctx.rect(x_margin_size+ x_padding*i + i*square_size, y_margin_size+y_padding*j+1 + j*square_size, square_size, square_size)
            ctx.stroke()

            //in each grid you can write out the value depnding on the index
            ctx.font = "48px Comic Sans MS"
            ctx.fillStyle = canvas_font_colour
            ctx.textAlign = "center"
            if (grid[j][i]=='x'){
                ctx.fillText(' ', 
                    square_size/2+ x_margin_size+ x_padding*i + i*square_size, square_size/1.4 +y_margin_size+y_padding*j+1 + j*square_size)
            } else {
                ctx.fillText(grid[j][i], 
                    square_size/2+ x_margin_size+ x_padding*i + i*square_size, square_size/1.4 +y_margin_size+y_padding*j+1 + j*square_size)
            }
            
            
        }
    }
    
    //given the input users attempt highlight the grid and redraw the value over the top
    draw_to_highlight_box(highlight[0], highlight[1])
    ctx.font = "48px Comic Sans MS"
    ctx.fillStyle = canvas_font_colour
    ctx.textAlign = "center"
    if (grid[highlight[1]][highlight[0]]=='x') {
        ctx.fillText(' ', 
            square_size/2+ x_margin_size+ x_padding*highlight[0] + highlight[0]*square_size,
            square_size/1.4 +y_margin_size+y_padding*highlight[1]+1 + highlight[1]*square_size)
    } else {
        ctx.fillText(grid[highlight[1]][highlight[0]], 
            square_size/2+ x_margin_size+ x_padding*highlight[0] + highlight[0]*square_size,
            square_size/1.4 +y_margin_size+y_padding*highlight[1]+1 + highlight[1]*square_size)
    }
    
    //check each row that has been attempted 
    if (attempt==1) {
        return
    }else {
        for (let j=0; j<attempt-1; j++){
            var players_guess=player_grid[attempt-2-j]
            
            //check if the combined number for that row is bigger or smaller than the code to be cracked.
            var players_number=players_guess.join('')
            //console.log('players_number', players_number, '----', 'code_number', code_number)
            if (players_number == code_number){
                //console.log('CORRECT GUESS GAME OVER')
           } else if (players_number > code_number){
                //console.log('Player guess is too big')
                add_text_too_big_too_small(players_number, attempt-2-j, 'too_big')
                
            } else {
                //console.log('Player guess is too small')
                add_text_too_big_too_small(players_number, attempt-2-j, 'too_small')

            }

            //check each value of players grid vs code to be cracked and draw the relevent rectangle for it
            for (let i=0; i<players_guess.length; i++){
                if (players_guess[i]==code[i]){
                    //console.log('correct guess at position', i)
                    draw_to_checkvalue(players_guess[i],i, attempt-2-j, canvas_correct_highlight)
                } else if (Number(players_guess[i])+1==code[i] || Number(players_guess[i])-1==code[i] ) {
                    //console.log('guess is 1 too big or 1 too small at position', i)
                    draw_to_checkvalue(players_guess[i],i, attempt-2-j, canvas_almost_highlight)
                } else {
                    //console.log('guess is wrong at position', i)
                    draw_to_checkvalue(players_guess[i],i, attempt-2-j, canvas_wrong_highlight)
                }
            }
        }
    }

}

//set up an event listening object that will react to a left mouse click
canvas.addEventListener('click', (Event)=>{
    //return the x and y position relative to where you clicked on the canvas by using the offset properties
    x=Event.clientX - canvas.offsetLeft
    y=Event.clientY - canvas.offsetTop
    var [col_check, row_check]=rows_and_cols(x,y)
    if (row_check==attempt-1){
        //allow user to click and change code
        col=rows_and_cols(x,y)[0]
        row=rows_and_cols(x,y)[1]
        //re draw grid with the higlight drawn where the user has clicked
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        draw_grid(player_grid, [col,row], row+1)
    }
})

// Add event listener on keydown
document.addEventListener('keydown', (Event) => {
    //only listen for key presses if game_status is true
    if (game_status=='true'){
        //define the variable key for the event
        var key = Event.key
        //ignore control press
        if (key === 'Control') {
            // Do nothing.
            return;
        }

        //check for event listener being enter to check row.
        if (key=='Enter'){
            check_row()
        }

        //check for arrowright/arrow left press to move around the row the user is currently on
        if (key === 'ArrowRight') {
            //check that the user is in a valid position to move to the left.
            if (col>=0 && col <code_length-1){
                //re draw grid with the higlight drawn where the user has clicked
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                col = col+1
                draw_grid(player_grid, [col,row], row+1)
            } else {return}

        } else if (key === 'ArrowLeft') {
            //check that the user is in a valid position to move to the left.
            if (col>0 && col <=code_length){
                //re draw grid with the higlight drawn where the user has clicked
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                col = col-1
                draw_grid(player_grid, [col,row], row+1)
            } else {return}
        }

        //check for valid key press 
        const valid_guesses=['0','1','2','3','4','5','6','7','8','9']
        if (row==attempt-1){
            if (valid_guesses.includes(key)){
                //draw the value of the guess in the box clicked or moved to
                //check that it isnt in the final column so it cant move across again
                if (col >=0 && col <code_length-1){
                    draw_guess(key, row, col)
                    //change the value currently highlighted in the player grid
                    player_grid[row][col]=key
                    col = col+1
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    draw_grid(player_grid, [col,row], row+1)
                } else if (col=code_length-1) {
                    draw_guess(key, row, col)
                    //change the value currently highlighted in the player grid
                    player_grid[row][col]=key
                    //automatically check the row when final value is entered
                    check_row()
                }

            } else { return }
        } 
    }
    else {return}
});

//function that will check the row and fill in the sqaure with green, amber, red depending on how close the guess is
function check_row(){
    //only check row if the attempt and current row match up
    if (game_status=='true' && attempt==row+1){
        var players_guess=player_grid[attempt-1]
        //console.log('players_guess', players_guess)
        //console.log('code', code)
        //check if the combined number for that row is bigger or smaller than the code to be cracked.
        var players_number_check=players_guess.join('')
        var code_number_check=code.join('')
        //check if guess is correct before running the rest of the checks.
        if (players_number_check==code_number_check){
            row_guesses.push(String(players_number_check))
            //PLAYER WINS
            attempt=attempt+1
            col=0
            row=row
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            draw_grid(player_grid, [0,row], attempt)
            //figure out how long the game took in seconds
            end_time = today = new Date()
            game_time=diff_seconds(end_time, start_time)
            //draw out the end game graphic
            end_game(code_number_check, attempt-1, won=true)
            update_form_stats(true)
            return
        }

        //check that the user has entered a value into all of the spaces+
        if (attempt==code_guess){
            //LAST ATTEMPT
            row_guesses.push(String(players_number_check))
            //console.log('this is the final attempt check for winning/losing game')
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            draw_grid(player_grid, [0,row], attempt+1)
            //figure out how long the game took in seconds
            end_time = today = new Date()
            game_time=diff_seconds(end_time, start_time)
            //draw out the end game graphic
            end_game(code_number_check, attempt, won=false)
            update_form_stats(false)
            return
        }else {
            //check the row the user just entered
            if (players_guess.includes('x')){
                //console.log('not entered all values')
                return
            } else {
                row_guesses.push(String(players_number_check))
                //update and draw grid 
                attempt=attempt+1
                col=0
                row=row+1
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                draw_grid(player_grid, [0,row], attempt)
                //console.log('all values attempted')
            }
        }
    //ignore check row function if the player is not on the same row as the attempt should be
    } else {
        return
        }
}


//function to reset all variables/grid/code
function new_game(){
    //track if game is being played or not
    game_status = 'true'
    //-------------------------LOADING AND INITIAL VARIABLES ------------------
    // start the user at col and row 0 and attempt 1
    col=0
    row=0
    attempt =1
    //empty list to sore every attempted row.
    row_guesses=[]
    //generate the code for the game
    code=generate_code(code_length, 0, 9)
    //code=['0','4','5','6','3','2']
    code_number=code.join('')
    //create list of length specified in initial stats
    //create the player grid which is an array of length code_guess
    player_grid=[]
    for (let i =0; i<code_guess; i ++){
        player_grid.push(Array(code_length).fill('x'))
    }

    //draw out the grid and highlight the given row which is the starting condition
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    draw_grid(player_grid, [col, row], attempt)
}
new_game()