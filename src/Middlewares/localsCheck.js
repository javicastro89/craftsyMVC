module.exports = (req,res,next)=>{
    if(req.session.usuarioLogueado){
        res.locals.user = req.session.usuarioLogueado;
    }
    next()
}
