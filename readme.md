#Dolan

Plugin jquery for modificate string like the [Dolan](http://knowyourmeme.com/memes/dolan) meme

####How it works:

* Split each words in the string, and affect a numerical value on each letter ; If it's not an alphanumeric caracter, it can't be modified.
* Vowel can disapears, but can't change of place
* Only consonant letters can changing place.
* f can be change in b sometimes.

####Only one argument:

* `rnadVulae` : a number between 0 and 100. It's a percent indicating how much the string must be "Dolanize".

####How use:

* You can see an example of application on [paul.emik.free.fr/pls](http://paul.emik.free.fr/pls/dolan.php)
* You must use `.dolanize()`
* Code.

    $(document).ready(function(){
    	var feedback = $("#from").dolanize();
    	alert(feedback[0].defaultValue); // Return the string 
    })

####Author:

  * Simon Ertel ([korvus](https://github.com/korvus08))