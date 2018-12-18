// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
    let nodeList = [];
    if (typeof className === 'string') { 
        if (document.body.classList.contains(className)) { nodeList.push(document.body); }
        className = [className, document.body]; 
    };
    let currentLocation = className[1].childNodes;
    if (!currentLocation) { return null }
    for (let i = 0; i < currentLocation.length; i++) {
        if (!currentLocation[i].classList) { continue; }
        if (currentLocation[i].classList.contains(className[0])) { nodeList.push(currentLocation[i]); }
        let childNodeList = getElementsByClassName([className[0], currentLocation[i]]);
        if (childNodeList !== null) { nodeList = [...nodeList, ...childNodeList]; };
    }
    console.log(nodeList);
    return nodeList;
};


//if className is a string, then we know it is the first instance (.class)
//if className is a array, etc...., we know it is second IMPORTANT.
//this is how we can get around setting document.body on the first instance


//start off with simple if-statement
    //if it's string, rerun getelements... with an array as the parameters
    //else if it's array... then run normal recursive logic
        //run get all child nodes
        //check length of child nodes, if none return out (or skip iterate)
        //iterate over child nodes
            //recursion in? if it has child nodes? Yes, recursion in, if nothing, it will return when we try to iterate over
            //check if it matches the className string, if so: Delete? Added to list?
            