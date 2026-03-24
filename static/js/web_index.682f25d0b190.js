var swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 'auto',
    loop: true,
    loopAdditionalSlides: 1,
    watchSlidesProgress: true,
    autoplay: {
        delay: 2000,
        pauseOnMouseEnter: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

document.querySelectorAll('.index-video').forEach(element => {
    element.addEventListener('click', () => {
        swiper.autoplay.stop();
        const rawUrl = element.dataset.url || '';
        let videoId = '';
        try {
            const parsed = new URL(rawUrl);
            videoId = parsed.searchParams.get('v') || '';
            if (!videoId && parsed.pathname) {
                videoId = parsed.pathname.split('/').filter(Boolean).pop() || '';
            }
        } catch (error) {
            videoId = '';
        }

        if (!videoId) {
            return;
        }

        document.querySelector('#modalForVideo .modal-content').innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    });
});

document.querySelector('#modalForVideo').addEventListener('hide.bs.modal', () => {
    document.querySelector('#modalForVideo .modal-content').innerHTML = '';
    swiper.autoplay.start();
});

window.addEventListener('load', () => {
    let index_about = document.querySelector('.index-about-background');
    if (index_about && index_about.dataset && index_about.dataset.bgimg) {
        let bgimg = index_about.dataset.bgimg;
        document.getElementsByClassName('index-about-background')[0].style.backgroundImage = `url(${location.origin + bgimg})`;
    }

    document.querySelectorAll('#carousel .carousel-inner > a').forEach((anchor, index) => {
        if (!anchor.getAttribute('aria-label')) {
            anchor.setAttribute('aria-label', `查看第${index + 1}則公告`);
        }
    });
});
