insureadmin = (req,res,next) =>{
  const role = req.session.user 
  if (role !== 'admin'){
    return res.send(error)
  }
  next()
}

module.exports = insureadmin