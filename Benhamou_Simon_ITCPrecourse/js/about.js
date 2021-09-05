const currentmap = document.querySelector('#google-map');
let count = 0; 
function prev()
{
    if(count === 0)
    {
        document.getElementsByClassName(
            'prev').disabled = true;
        document.getElementsByClassName(
            'next').disabled = false;
    }
    else {
        count--;
        mapdisplay(count);
    }
}
function next()
{
    if(count === 2)
    {
    document.getElementsByClassName(
        'prev').disabled = false;
    document.getElementsByClassName(
        'next').disabled = true;
    }
    else{
        count++;
        mapdisplay(count);
    }
}