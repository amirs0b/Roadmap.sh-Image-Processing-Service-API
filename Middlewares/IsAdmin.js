const isAdmin = (req, res, next) => {
    if (req.role !== "admin") {
        return res.status(403).json({
            success: false, message: "You are not authorized to access this resource"
        })
    }
    next()
}

export default isAdmin;