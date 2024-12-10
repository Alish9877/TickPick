insureadmin = (req,res,next) =>{
  const role = req.session.user?.role
  console.log(role)
  if (role !== 'admin'){
    return res.status(403).json({ message: 'Access denied: Admins only' })
  } 
  next() 
}

module.exports = insureadmin