const currentmap = document.querySelector('#google-map');
let count = 0; 

function prev()
{
    var previous = document.getElementById("prev");
    var next= document.getElementById("next");

        previous.classList.add('active');
        next.classList.add('active');
        previous.classList.remove('disabledbutton');
        next.classList.remove('disabledbutton');
        next.disabled = false;
        previous.disabled = false;
        count--;
        mapdisplay(count);

         if(count === 0)
            {
            previous.disabled = true;
            previous.classList.add('disabledbutton');
            previous.classList.remove('active');

            }
}

function next()
{
    var previous = document.getElementById("prev");
    var next= document.getElementById("next");

        previous.classList.add('active');
        next.classList.add('active');
        previous.classList.remove('disabledbutton');
        next.classList.remove('disabledbutton');
        next.disabled = false;
        previous.disabled = false;

        count++;
        mapdisplay(count);
        if(count === 2)
        {            
            next.disabled = true;
            next.classList.remove('active');
            next.classList.add("disabledbutton");
    
        }
    
}