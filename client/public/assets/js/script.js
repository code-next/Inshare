$(() => {
  if ($(window).width() > 900) {
      $('.masterlayer').css({ height: $(window).innerHeight() });
      $(window).resize(() => {
        $('.masterlayer').css({ height: $(window).innerHeight() });
      });
  }
});
