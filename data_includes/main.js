PennController.ResetPrefix(null); // Initiates PennController

// Start typing your code here. The PennController() function is obligatory

//// Welcome page ////
PennController(
    defaultText
        .print()                                           //insert the .print() command after each newText() command by default
    ,
    newText("<p>Welcome!</p>")
    ,
    newText("<p>In this experiment, you will have to report which of two pictures matches a description.</p>")
    ,
    newText("<p>Press the <strong>F</strong> key for the picture on the left, or the <strong>J</strong> key for the picture on the right.</p>")
    ,
    newText("You can also click on the picture.")
    ,
    newText("<p>Click the button below to start the experiment.</p>")
    ,
    newText("<p>Please enter you ID in the box below, then click on 'start' to begin the experiment.</p>")
    ,
    newTextInput("ID")                                          //add a box to enter the id 
        .print()
    ,
    newButton("Start")                                          
        .print()
        .wait()
    ,
    newVar("ID")                                                //create the new variable ID (as entered by the participant)
        .settings.global()                                      //set the ID variable to each subsequent trials 
        .set(getTextInput("ID"))                                //specify the value of the ID variable (as entered by the participant)
)
.log("ID", getVar("ID"))                                        //record the ID value into the results file

//// Settings of the experimental trials ////
Template(                                        //set a template of the experiment for how it has to run
variable => PennController(                                     //set the actual PennController as a variable, so that it can loop into each trial
    newAudio("description", variable.AudioFile)                  //add an audio to the experimental trial ("label", "name of the variable under which file names are found")
        .play()                                                 //and play it
    ,
    newText(variable.Description)                               //add a text (concrete text to be taken from the template file)          
        .print()                                                //and print it on the screen
//        .unfold(2600)                                           //alternative: make the text unfold on the screen (number = ms to unfold)    
    ,
    newImage("two", variable.PluralImageFile)                       //add an image newImage("label of the image to refer to", "name of the image as stored on the server")
        .settings.size(200, 200)                                //resize the image (in pixels)
    ,
    newImage("one", variable.SingularImageFile)
        .settings.size(200, 200)
    ,
    newCanvas(450, 200)                                         //add a canvas, size of the cancas in pixels
        .settings.add(0, 0, getImage("one"))                    //add elements in the canvas, numbers used to locate the position, get the element by its label
        .settings.add(250, 0, getImage("two"))
            .print()                                            //print the canvas and the elements inside on the screen 
    ,
//    newKey("FJ")                                                //key(s) that the participants can press  
//        .settings.log()                                         //record the participant's responses into the results file
//        .wait()                                                 //make the program wait for the participant to press the key before heading to the next trial 
    newSelector()                                               //more powerful function than newKey()
        .settings.add(getImage("two"), getImage("one"))         //enable to select an image with the mouse 
        .settings.keys("F", "J")                                //at the same time, possibility to press a button to make a choice (same as newKey())
        .settings.log()                                         //record participants' responses
        .settings.once()                                        //enable only one response by trial (not possible to click on the two pictures)
        .wait()                                                 //wait for the participant to respond to continue with the next trial 
    ,
    getAudio("description")                                     //after pressing the key, take the play
        .stop()                                                 //and stop the audio (such that once the key is pressed, even if the audio is not terminated, it stops)   
//        .wait("first")                                          //alternative if you want to wait for the audio to finish before getting into the next trial
)
.log("ID", getVar("ID"))                                        //record the participant's ID for the results of each trial 
.log("Item", variable.Item)                                     //record the name/number of the item, as specified in the design file        
.log("Ending", variable.Ending)                                 //record the value of the cilumn "Ending" as specified in the design file for each item 
.log("Group", variable.Group)                                   //record the group to which the trial belongs to (automatic counterbalanced design)
)
PennController.SendResults()                                    //send the results after the experiment is completed (do not record the resutls from subjects who gave up)

//// Goodbye page ////
PennController(
    newText("<p>Thank you for your participation!</p>")
        .print()
    ,
    newText("Press the button below to quit the experiment.")
        .print()
    ,
    newButton("Quit")
        .print()
        .wait()
    )
