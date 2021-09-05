function mapdisplay(count)
{
    if (count === 0)
    {
    currentmap.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.0586958356093!2d4.8905403509434375!3d45.770013920903985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4c03799618dcb%3A0xdeb5738de3f29555!2s168%20Rue%20de%20Ch%C3%A2teau%20Gaillard%2C%2069100%20Villeurbanne%2C%20France!5e0!3m2!1sfr!2sil!4v1630575310352!5m2!1sfr!2sil";
    document.getElementById("location-description").innerHTML = "This is where I have lived until the age of 19. I was born in Lyon, France. I grew up there and even started studying accounting. ";

    }
    else if (count === 1)
    {
    currentmap.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.431630131044!2d-73.99471278776814!3d40.75253041218817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259b5a9bd152b%3A0x31453e62a3be9f76!2sH%C3%B4tel%20New%20Yorker!5e0!3m2!1sfr!2sil!4v1630575627558!5m2!1sfr!2sil";
    document.getElementById("location-description").innerHTML = "After leaving my home city of Lyon , I decided to learn english and to start challenging myself so I went to New york and learnt at St giles school. Here is the location where I lived in New york. Student accomodation in the New Yorker Hotel ";
    }
    else if (count === 2)
    {
    currentmap.src ="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3364.8013235683493!2d34.913981750575395!3d32.50473890503304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d0d4650d9777f%3A0xed65d67f2fe941ba!2sHaShikmim%202%2C%20Or%20Akiva!5e0!3m2!1sfr!2sil!4v1630575806130!5m2!1sfr!2sil";
    document.getElementById("location-description").innerHTML = "This is where I live now. Right in front of the Cesarea golf. I moved here with my wife close to our family.";
    }
}