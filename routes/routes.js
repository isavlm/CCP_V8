import baseCtrl from '../controllers/baseCtrl'
import insertionCtrl from '../controllers/insertionCtrl'
import searchCtrl from '../controllers/searchCtrl'

const routes = (router) => {
  router.route('/basePage')
    .get(baseCtrl.basePage)

  router.route('/')
    .post(insertionCtrl.insertValue)

  router.route('/search/name/:searchQuery')
    .get(searchCtrl.searchByName)
}

export default routes
