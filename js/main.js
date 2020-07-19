

$(function () {
    // $("#header").load("components/header.html");
    // $("#footer").load("components/footer.html");
    let header = $('header'),
        pageID = $('body').attr('id'),
        headerContent = $('.header .header-content'),
        lowHead = $('.lower-header'),
        upperHead = $('.upper-header'),
        hamburgerIcon = $('.hamburger-icon'),
        navLink = $('.lower-header .nav-item .nav-link'),
        searchIcon = $('.link-search'),
        menuLink = $('#menu .nav-list a'),
        menu = $('#menu'),
        outLContainer = $('.out-lcontainer'),
        homeProducts = $('.home-products-li'),
        productSelect = $('.product-select'),
        sellingCart,
        isMenuInit = false,

        ///**********Dimentions********/
        headerHeigh, lowHeadHeigh, upperHeadHeigh, menuWidth, leftOffset;

    function calcDimetions() {
        headerHeigh = headerContent.innerHeight();
        lowHeadHeigh = lowHead.innerHeight();
        upperHeadHeigh = upperHead.innerHeight();
        menuWidth = menu.innerWidth();//
        // leftOffset = outLContainer.offset().left;//for verical slider
        menuWidth = menu.innerWidth();


    }

    //************header******************************************************************************/
    //************search icon**********/
    //
    function controlSearchicon(icon) {
        icon.hasClass('fa-arrow-left') ? searchIcon.fadeOut(100) : searchIcon.fadeIn(100);
    }


    ///***********nav-minue-active*********/
    navLink.on('click', function () {
        $(this).parent().addClass('active').siblings().removeClass('active');
    });

    menuLink.on('click', function () {
        $(this).parent().addClass('active').siblings().removeClass('active');

    })



    //***********menu********/

    function initMenu() {
        isMenuInit = true;
        $('#menu').multilevelpushmenu(
            {
                container: $('#menu'),
                fullCollapse: true,
                collapsed: false,
                mode: 'cover',
                backText: 'Back',                                          // Text for 'Back' menu item.
                backItemClass: 'backItemClass',                            // CSS class for back menu item.
                backItemIcon: 'fa fa-angle-left',                         // FontAvesome icon used for back menu item.
                groupIcon: '',

            }
        );

    }
    function setTopValue() {
        calcDimetions();
        // header.hasClass('sticky') ? $('body').css("padding-top", headerHeigh + 100) : $('body').css("padding-top", 0);
        menu.css("top", headerHeigh);
    }

    function animateMinue() {

        menu.animate({
            left: `${menu.hasClass("show") ? 0 : - menuWidth}`
        },
            100
        )



    }

    ///////////////////////////////
    hamburgerIcon.on('click', function () {

        $(this).find('.icon').toggleClass('fa-arrow-left  fa-bars');
        menu.toggleClass('show')
        animateMinue();
        controlSearchicon($(this).find('.icon'));
    })


    ///*********checkWindow *************/
    function checkWindow() {
        calcDimetions();
        $('body').css('padding-top', headerHeigh);
        menu.css("left", -menuWidth);
        if (window.innerWidth < 768) {
            initMenu();
            menu.css("left", -menuWidth);
            setTopValue();
            animateMinue();

        }

    }


    //************Main Content******************************************************************************/
    let colorSlider = $(".colors-types .slick-slider");
    ///////////////init slicks////////////////////////////////////////
    function initColorsSlick() {
        colorSlider.slick({
            vertical: true,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            //variableHeight: true,
            // centerMode: false,
            prevArrow: ".colors-types .prev-arrow",
            nextArrow: ".colors-types .next-arrow",
            responsive: [

                {
                    breakpoint: 768,
                    settings: {
                        vertical: false,
                        arrows: false,
                        centerMode: true,
                        // centerPadding: '40px',
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }

            ]


        });

    }

    function initLipsSlick(slickLips) {

        $('.lipsStick .slick-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,

            dots: true,
            autoplay: true,
            pauseOnHover: true

        });
    }

    function initRelBestSlick(slickParent, slideNum) {
        slickParent.slick({
            slidesToShow: slideNum,
            slidesToScroll: 1,
            //centerMode: true,
            arrows: false,
            dots: false,
            cssEase: true,
            infinite: false,
            //focusOnSelect: true,
            //  centerPadding: '0 20% 0 0',
            // autoplay: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2.5,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        vertical: false,
                        arrows: false,
                        //  centerMode: true,
                        // centerPadding: '40px',
                        slidesToShow: 1.5,
                        slidesToScroll: 1
                    }
                }

            ]



        });

    }

    /////////////////////////////////////////////////////////////////

    // productSelect.text(homeProducts.attr('data-path'));

    /////////////**view********** */

    async function renderIn(parent, items) {
        await items.map(item => {
            let { src, name, mark, type } = item;
            let sliderItem = `<div class="card-wrapper">
             
              <div class="card text-center"">
            <div class='img-container card-img-top'><img class="img" src=${src}   alt=${name}></div>
            <div class="card-body">
            <a href="#" class="card-title name link">${name}</a>
              
            </div>
            <div class="card-footer">
            <h6 class="card-subtitle type">${type}</h6>
              <p class="desc">${mark}</p>
            </div>
           
          
            <div class='cart icon'><img src=${pageID === "home" ? ('imgs/cart-w.svg') : ('imgs/cart(2).svg')} alt='cart'></div>
          </div>
          
           
            </div>`
            parent.append(sliderItem);


        })
    }
    //////////////
    let minusIcon = $(".icon-minus");
    let plusIcon = $(".icon-plus");
    let numberQ = $(".quantity .number");

    function setQuantity(isInc) {
        let prevQ = +numberQ.text();
        isInc ? (numberQ.text(++prevQ)) : (prevQ ? numberQ.text(--prevQ) : null);



    }
    function setProdType(lipsobj) {
        let colors = lipsobj[0].colors,
            img = lipsobj[1].selectedimg,
            { src, srcset, name, deg } = img;


        colors.map(item => {
            let { backgroundColor, name, deg } = item;
            // style="color: red"
            let style = `background-color:${backgroundColor}`
            // colorSlider

            let sliderItem = `<div id=${name}>
            <div class='slider-item' data-name=${name} data-deg=${deg}  style=${style}>
                             <span class="name">${name}</span>
                             <div class='selected-container'>
                             <img src="imgs/selected.jpg"
                             srcset="imgs/selected@2x.jpg 2x,
                                     imgs/selected@3x.jpg 3x"
                             class="Selected">
                              </div>
                             <span class="deg">${deg}</span>
                            </div>
            </div>`;

            colorSlider.append(sliderItem);

        })
        //this selected
        let sliderImg = `<div>
        <div class='slider-item latte-img' data-name=${name} data-deg=${deg} >
                                <img src=${src}
                                alt=${name}
                                srcset=${srcset}/>

                                <div class="latte-desc"> 
                                    <span class="name">${name}</span>
                                    <div class='selected-container'>
                                    <img src="imgs/selected.jpg"
                                    srcset="imgs/selected@2x.jpg 2x,
                                            imgs/selected@3x.jpg 3x"
                                    class="Selected">
                                     </div>
                                    <span class="deg">${deg}</span>
                                </div>
                         </div>
        </div>`;
        colorSlider.find('#Truffle').after(sliderImg);
        initColorsSlick();
        ///add class selected
        let colorsItem = $('.colors-types .slider-item');
        colorsItem.on('click', function () {

            if ($(this).hasClass('select')) {
                $(this).removeClass('select')
            } else {
                colorsItem.removeClass('select');
                $(this).addClass('select');

            }
        })
        //  console.log(colorsItem);


    }
    //////

    function setlipsImgs(lipstickimgs) {
        let slickLips = $('.lipsStick .slick-slider');
        lipstickimgs.map(item => {
            //console.log(item);
            let { src, srcset } = item;
            let sliderItem = `<div class='slider-item'>
            <img src=${src}
            srcset=${srcset}
           />
           </div>`;
            slickLips.append(sliderItem);

        });
        initLipsSlick(slickLips);
    }

    function setrelatedItems(relateditems) {
        let slickRelated = $('.related-item .slick-slider');
        renderIn(slickRelated, relateditems);
        initRelBestSlick(slickRelated, 3.5);

    }
    ///HOME PAGE
    function setBestItems(bestItems) {
        let slickSellings = $('.sellings .slick-slider')
        renderIn(slickSellings, bestItems);
        initRelBestSlick(slickSellings, 4.2);
        sellingCart = $('.sellings .slick-slider .cart');
        console.log(sellingCart);

    }
    function setcategories(categories) {
        let categoriesList = $('.categories .category-list');
        categories.map(item => {
            let { src, name } = item;
            let listItem = `<li class="category-item list-item">
                            <a class='list-link link'>
                            <img src=${src} alt=${name}>
                            <span class='name'>${name}</span>
                            </a>
                          </li>`
            categoriesList.append(listItem);
        });
    }
    /*ajax req***************************************************************************************/
    async function getAjaxData() {
        console.log('in ajax');
        let res = await $.ajax({
            type: "Get",
            url: "https://my-json-server.typicode.com/sajidaqadomi/productsjson/db",
            data: "",
            dataType: 'jsonp',

            success: function (response) {
                let { lips, lipstickimgs, relateditems, bestItems, categories } = response;
                //let lipstickimgs = response.lipstickimgs;
                // console.log(bestItems);
                if (pageID === "pdp") {
                    setProdType(lips);
                    setlipsImgs(lipstickimgs);
                    setrelatedItems(relateditems);

                } else if (pageID === "home") {
                    setBestItems(bestItems);
                    setcategories(categories);

                }


            },
            error: function (xhr, status, error) {

            }

        });
        // console.log(res);
        return res;

    }

    ////////////////////////////////////////

    let res = getAjaxData();

    checkWindow();

    ///////////////////////////////////////////
    $(window).on('resize', function () {
        checkWindow();
        setTopValue();
    });
    $(window).on('scroll', function () {
        if (menu.hasClass('show')) {
            hamburgerIcon.click();
        }

        if ($(this).scrollTop() > 150) {

            upperHead.addClass('d-none');
            setTopValue();

        } else {
            upperHead.removeClass('d-none');
            setTopValue();


        }

    })

    /////////////events//////////
    minusIcon.on('click', () => setQuantity(false));
    plusIcon.on('click', () => setQuantity(true));
    ///chang img src
    $('.sellings .slick-slider').on('mouseenter', '.cart', function () {
        $(this).find('img').attr('src', 'imgs/cart-added.svg');

    });
    $('.sellings .slick-slider').on('mouseleave', '.cart', function () {
        $(this).find('img').attr('src', 'imgs/cart-w.svg');

    });



})