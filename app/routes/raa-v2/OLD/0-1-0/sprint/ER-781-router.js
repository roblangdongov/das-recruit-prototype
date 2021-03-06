module.exports = function (router) {

  // CHANGE ME TO THE VERSION YOURE WORKING ON

  var version = '0-1-0'
  var employer_base_url = 'raa-v2/' + version + '/sprint/ER-781';
  var locations = ["Abingdon", "Accrington", "Ashton-under-Lyne", "Askern", "Axminster", "Aylesbury", "Aylsham", "Bacup", "Bakewell", "Baldock", "Banbury", "Barrow-in-Furness", "Barton-upon-Humber", "Basildon", "Basingstoke", "Bath", "Bingham", "Birmingham", "Bishop Auckland", "Blackburn", "Blackpool", "Blandford Forum", "Bletchley", "Blyth", "Bodmin", "Bracknell", "Bradford", "Budleigh Salterton", "Bungay", "Buntingford", "Caistor", "Calne", "Camberley", "Camborne", "Cambridge", "Camelford", "Chesterfield", "Chester-le-Street", "Chorley", "Christchurch", "Church Stretton", "Coventry", "Crediton", "Crewe", "Dagenham", "Darlington", "Dartford", "Derby", "Dereham", "Droylsden", "Dudley", "Exmouth", "Failsworth", "Farnborough", "Farnham", "Gillingham", "Gloucester", "Godalming", "Keynsham", "Kidderminster", "Leamington Spa", "Lechlade", "London", "Long Eaton", "Ludlow", "Macclesfield", "Middleham", "Middlesbrough", "Middleton", "Newbury", "Newcastle upon Tyne", "Norwich", "Nottingham", "Nuneaton", "Oldbury", "Oldham", "Oxford", "Reading", "Scarborough", "Scunthorpe", "Slough", "Sunderland", "Sutton", "Telford", "Westminster", "Wycombe", "Wymondham"]

  // GLOBAL GET ROUTER.
  // code here will be called on every page within this version
  router.get('/' + employer_base_url + '*', function (req, res,next) {
    // added ER-781
    if(req.query.alt){req.session.alt="yes"}
    if(req.query.firstVacancy){req.session.firstVacancy=req.query.firstVacancy}

    req.session.alt = req.session.alt|| "no"
    req.session.firstVacancy = req.session.firstVacancy || "no"
    return next()
  })


  // router.post('/' + employer_base_url + 'create-vacancy-options/display-employer', function (req, res) {
  //   console.log("display-employer")
  //   if(req.body.selected_display_name== "anonymous"){
  //     res.redirect(301, '/' + employer_base_url + 'create-vacancy-options/training-alt')
  //   }else{
  //     res.redirect(301, '/' + employer_base_url + 'employer/create-vacancy-options/location')
  //   }
  // })
  // ER-787 Added
  router.get('/' + employer_base_url + '/create-vacancy-options/create-vacancy', function (req, res) {
    res.render(employer_base_url + '/create-vacancy-options/create-vacancy', {
      "data" : req.session,
      }
    )
  })

  // ER-787 Added
  router.post('/' + employer_base_url + '/create-vacancy-options/create-vacancy', function (req, res) {
    if(req.body.create_option == "new"){
      res.redirect(301, '/' + employer_base_url + '/create-vacancy-options/title')
    }else{
      res.redirect(301, '/' + employer_base_url + '/create-vacancy-options/clone-vacancy')
    }
  })
  // ER-787 Added
  router.get('/' + employer_base_url + '/create-vacancy-options/clone-vacancy', function (req, res) {
    res.render(employer_base_url + '/create-vacancy-options/clone-vacancy', {
      "data" : req.session,
      "query" : req.query.query
      }
    )
  })

  // ER-788 Added
  router.get('/' + employer_base_url + '/create-vacancy-options/employer', function (req, res) {
    res.render(employer_base_url + '/create-vacancy-options/employer', {
      "data" : req.session,
      "locations" : locations,
      "query" : req.query.query,
      }
    )
  })
  router.get('/' + employer_base_url + '/create-vacancy-options/search-results-preview', function (req, res) {
    req.session.orgname = "Organisation"
    if(req.session.alt == "yes"){
      req.session.orgname = "ABC Opticians Nottingham"
    }
    res.render(employer_base_url + '/create-vacancy-options/search-results-preview', {
      "data" : req.session,
      }
    )
  })

  // EMPLOYER | PREVIEW
  router.get('/' + employer_base_url + '/employer/vacancy-preview', function (req, res) {
    res.render(employer_base_url + '/employer/vacancy-preview', {
      "data" : req.session,
      }
    )
  })
  router.post('/' + employer_base_url + '/vacancy-preview', function (req, res) {
    res.redirect(301, '/' + employer_base_url + '/vacancy-preview/confirmation')
  })


  router.post('/' + employer_base_url + '/vacancy-preview/confirmation', function (req, res) {
    console.log(req.session.firstVacancy)
    if(req.session.firstVacancy == "yes"){
      res.redirect(301, '/' + employer_base_url + '/dashboard-one-vacancy');
    }else{
      res.redirect(301, '/' + employer_base_url + '/dashboard')
    }

  })
  router.get('/' + employer_base_url + '/vacancy-preview/vacancy-description', function (req, res) {
    res.render(employer_base_url + '/vacancy-preview/vacancy-description', {
      "data" : req.session,
      }
    )
  })

  router.post('/' + employer_base_url + '/vacancy-preview/vacancy-description', function (req, res) {
    req.session.VacancyDescription = req.body.VacancyDescription
    req.session.TrainingDescription = req.body.TrainingDescription
    req.session.OutcomeDescription = req.body.OutcomeDescription
    res.redirect(301, '/' + employer_base_url + '/vacancy-preview')
  })

  // *SKILLS*
  router.get('/' + employer_base_url + '/vacancy-preview/skills', function (req, res) {
    res.render(employer_base_url + '/vacancy-preview/skills', {
      "data" : req.session,
      }
    )
  })
  router.post('/' + employer_base_url + '/vacancy-preview/skills', function (req, res) {
  req.session.Skills = req.body.Skills
    res.redirect(301, '/' + employer_base_url + '/vacancy-preview')
  })

  // *QUALIFICATIONS*
  router.get('/' + employer_base_url + '/vacancy-preview/qualifications', function (req, res) {
    res.render(employer_base_url + '/vacancy-preview/qualifications', {
      "data" : req.session,
      }
    )
  })
  router.post('/' + employer_base_url + 'vacancy-preview/qualifications', function (req, res) {
    res.redirect(301, '/' + employer_base_url + '/vacancy-preview')
  })
  router.post('/' + employer_base_url + '/vacancy-preview/considerations', function (req, res) {
    req.session.ThingsToConsider = req.body.ThingsToConsider;
    res.redirect(301, '/' + employer_base_url + '/vacancy-preview')
  })
  router.post('/' + employer_base_url + '/vacancy-preview/employer-contact-details', function (req, res) {
    req.session.EmployerContactName = req.body.EmployerContactName;
    req.session.EmployerContactEmail = req.body.EmployerContactEmail;
    req.session.EmployerContactPhone = req.body.EmployerContactPhone;
    res.redirect(301, '/' + employer_base_url + '/vacancy-preview')
  })
  // delete
  router.post('/' + employer_base_url + '/vacancy-preview/delete', function (req, res) {
    if(req.body.ConfirmDeletion == "yes"){
      res.redirect(301, '/' + employer_base_url + '/dashboard')
    }else{
      res.redirect(301, '/' + employer_base_url + '/vacancy-preview')
    }
  })

}
