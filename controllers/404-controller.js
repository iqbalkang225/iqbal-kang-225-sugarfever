const get404 = (req, res) => {
  res.render('404.ejs', {
    path: "/",
    pageTitle: "Page not found"
  })
}

module.exports = get404