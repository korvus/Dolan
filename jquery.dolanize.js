/**
 * DolanText plugin for jQuery
 * v1.0
 * Reverses some letter and erase some voyels.
 *
 * By Simon Ertel, simonertel.net
 *
 * As featured on simonertel.net
 * Good luke for speak with Dolan !
 */

/**
 * Usage:
 *
 * From JavaScript, use:
 *     $(<tag>).dolanize({rnadVulae:number value between 0 and 100});
 *	   rnadVulae is the degree of dolanization. If you lock it to 100, all the vowel will disapears and and the "f" letters will be transformed in "b"...
 */
(function($) {

	// jQuery plugin definition
	$.fn.dolanize = function(params){
	
		params = $.extend({rnadVulae: 20}, params);
		
		
		dolanisation = (100-params.rnadVulae)/100;
		console.log(dolanisation);
		this.each(function(){
		
			valueString = $(this).val();
			
			eachWords = valueString.split(" ");
			feedb = "";
			paternLetters = new Array();
			word = new Array();
			
			for(var i=0; i<eachWords.length; i++){
				if(eachWords[i].length>2){//Dolan is ok for writing words under 3 letters. It's the maximum.
					sizeWord = eachWords[i].length;// Dolan need the length of each words. SRRY GOOBY.
					paternLetters[i] = new Array();
					eachWords[i] = eachWords[i].split("");//transform the string in array (need for using method for array later)
					for(var j=0; j<sizeWord; j++){
						paternLetters[i][j] = "";
						letter = eachWords[i][j];
						if(j==0 || j==sizeWord){
							paternLetters[i][j] = 0;//First letter stay at its own place
						}else{
							if(letter.match(/[a-zßàáâãäåæçèéêëìíîïñòóôõöøùúûüýÿāăąćĉċčďđēĕėęěĝğġģĥħĩīĭįıĵķļľŀłńņňŉōŏőœŕŗřśŝşšţťŧũūŭůűųŵŶŷźżžſƒơưǎǐǒǔǖǘǚǜǻǽǿ]{1}/gi)){//Dolan is international
								if(letter.match(/[aeiouyàáâãäåèéêëìíîïòóôõöùúûüýÿāăąēĕėęěĩīĭįơưǎǐǒǔǖǘǚǜǻ]{1}/gi)){//If vowel
									paternLetters[i][j] = 2;//It's such like an instability factor in Dolan language ! When it's 2, it could be suppress !
								}else{
									if(letter=="f" && Math.random()>dolanisation){
										eachWords[i][j] = "b";//Goofy >>>> Gooby ihihi
										paternLetters[i][j] = 0;
									}else{
										paternLetters[i][j] = 1;
									}
								}
							}else{
								paternLetters[i][j] = 0;
							}
						}
					}
								
					word[i] = new Array();
					for(var k=0; k<sizeWord; k++){
						word[i][k] = "";
						rnad = Math.floor(((Math.random()*100)*sizeWord)/100); //Plz Dolan, no rnad
						if(paternLetters[i][k]==0 || paternLetters[i][k]==2){//Means it's a ponctuation symbol or a vowel, so it don't change place
							if(paternLetters[i][k]==2){
								if(Math.random()>dolanisation){//chance vowel disapear :( srry
									word[i][k] = word[i][k].concat("");
								}else{
									word[i][k] = word[i][k].concat(eachWords[i][k]);
								}
							}else{
								word[i][k] = word[i][k].concat(eachWords[i][k]);
							}
							paternLetters[i][k] = 0;
						}else{//Only consonant
							if(paternLetters[i][rnad]!=0 && paternLetters[i][rnad]!=2){//Check if randomly patern choosen is correct for re-use
								var memoryLetter = eachWords[i][k];
								word[i][k] = word[i][k].concat(eachWords[i][rnad]);
								eachWords[i][rnad] = memoryLetter;//permute letters
							}else{//If all ok
								word[i][k] = word[i][k].concat(eachWords[i][k]);
							}
							paternLetters[i][rnad] = 0;
							paternLetters[i][k] = 0;
						}
					}

					word[i] = word[i].join("");
					feedb += word[i]+" ";
				}else{
					feedb += eachWords[i]+" ";
				}
			}
			
			$(this).text(feedb);
		
		});

		return this;

	};

})(jQuery);