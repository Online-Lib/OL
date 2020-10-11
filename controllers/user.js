exports.getSearch = (req, res ,next )=> {
	res.render('search', {title: 'Search results'})
}