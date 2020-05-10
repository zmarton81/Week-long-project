console.log('Script is loaded.');

let folder = 'images/'; //folder path
let fileExtension = ".jpg"; //image format
let currentPhoto = 0; //counter of photo number
let imagesData = []; //array


$(document).ready(function () {
    $("#idSubFrame").hover(function () {
        // subfolder pops up and back when mouse moves over it
        $('#idSubFrame').css({ 'opacity': '0.6', 'color': 'white' });
    }, function () {
        $(this).css("opacity", "0");
    });

    
    // changing the colors of the left side arrow on button hover 
    $('.arrowButtonL').hover(function () {
        $('.cls-1').attr('fill', '#838584');
    }, function () {
        $('.cls-1').attr('fill', '#363837');
    });

    $('.leftSideArrow').hover(function () {
        $('.cls-1').attr('fill', '#838584');
    }, function () {
    });


    // changing the colors of the right side arrow on button hover 
    $('.arrowButtonR').hover(function () {
        $('.cls-2').attr('fill', '#838584');
    }, function () {
        $('.cls-2').attr('fill', '#363837');
    });

    $('.rightSideArrow').hover(function () {
        $('.cls-2').attr('fill', '#838584');
    }, function () {
    });


    //left button steps backwards images
    $('#idArrowButtonL').click(function () {
        if (currentPhoto === 0) {
            currentPhoto = 24;
            loadPhoto(currentPhoto);
        } else {
            currentPhoto = currentPhoto - 1;
            loadPhoto(currentPhoto);
        }
    });


    //right button steps forward images
    $('#idArrowButtonR').click(function () {
        if (currentPhoto === 24) {
            currentPhoto = 0;
            loadPhoto(currentPhoto);
        } else {
            currentPhoto = currentPhoto + 1;
            loadPhoto(currentPhoto);
        }
    });


    //open full size image in new window when mainFrame is clicked
    $('#photo').click(function () {
        var loc = $(this).attr('src');
        window.open(loc, '_blank');
    });

});


//load all image files (path, title, description) from folder into array
for (i = 0; i !== 25; i++) {
    let photoNumber = i + 1;
    imagesData[i] = {
        photo: (folder + photoNumber + fileExtension),
        title: ('Title #' + photoNumber),
        description: ('Description #' + photoNumber),
    };
};


//load first frame
loadPhoto();

// load in thumbnails
for (i = 0; i !== 25; i++) {
    $('ul').append('<li><a class="thumbButtons" id="' + i + '"><img class="thumbImages" id="thumbnail-' + i + '"><span class="hiddenInfo" id="' + i + '">' + imagesData[i].title + '</span></a></li>');
    $('#thumbnail-' + i).attr('src', imagesData[i].photo);
};


$('.thumbImages').hover(function () {
    // currentPhoto = parseInt(index); if it wouldnt be only a number I need to convert it into number
    $(this).css({ 'display': 'block', 'width': '5em', 'height': '5em', 'border': '0.2em solid white' });
    $(this).next('.hiddenInfo').css({ 'display': 'block', 'position': 'absolute', 'top': '-0.8em', 'padding': '.3em', 'white-space': 'nowrap', 'background': 'rgba(41, 41, 41, 0.8', 'color': 'white', 'font-size': '1em', 'font-style': '', 'font-weight': '' })
}, function () {
    $(this).css({ 'width': '4em', 'height': '4em', 'border': '0.2em solid white' });
    $('.hiddenInfo').css({ 'display': 'none' })
});


//load thumbnail image into mainFrame on click
$('ul li').delegate('.thumbButtons', 'click', function () {
    currentPhoto = $(this).parent('li').index();
    loadPhoto();
});


// load image with details
function loadPhoto() {
    $('#photo').attr('src', imagesData[currentPhoto].photo);
    $('#photo-title').html(imagesData[currentPhoto].title);
    $('#photo-description').html(imagesData[currentPhoto].description);
}